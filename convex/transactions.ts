import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { rateLimiter } from './rateLimiter';

export const createTransaction = mutation({
  args: {
    title: v.string(),
    amount: v.number(),
    type: v.string(),
    authId: v.string(),
    date: v.string(),
    yearAndMonth: v.string(),
    transactionAuthId: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.authId) {
      throw new Error('Not authenticated');
    }
    const { ok } = await rateLimiter.limit(ctx, 'createTransaction', {
      key: args.authId,
    });

    if (!ok) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
      };
    }

    try {
      const transactionId = await ctx.db.insert('transactions', args);
      return {
        success: true,
        message: 'Transaction created successfully! 💪',
        transactionId,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to create transaction.',
      };
    }
  },
});

export const getTransactions = query({
  args: {
    authId: v.string(),
    yearAndMonth: v.string(),
  },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query('transactions')
      .withIndex('by_auth_id_and_date', (q) =>
        q.eq('authId', args.authId).eq('yearAndMonth', args.yearAndMonth)
      )
      .order('desc')
      .collect();

    const totalAmount = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    const count = transactions.length;

    return { transactions, totalAmount, count };
  },
});

export const getTransaction = query({
  args: {
    id: v.id('transactions'),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db.get(args.id);

    return transaction;
  },
});

export const updateTransaction = mutation({
  args: {
    id: v.id('transactions'),
    title: v.string(),
    amount: v.number(),
    type: v.string(),
    authId: v.string(),
    transactionAuthId: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.transactionAuthId && args.transactionAuthId !== args.authId) {
      throw new Error('Unauthorized');
    }

    const { ok } = await rateLimiter.limit(ctx, 'updateTransaction', {
      key: args.authId,
    });

    if (!ok) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
      };
    }

    try {
      const { id, ...updateFields } = args;
      await ctx.db.patch(id, updateFields);
      return {
        success: true,
        message: 'Transaction updated successfully! 💪',
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to update transaction.',
      };
    }
  },
});

export const deleteTransaction = mutation({
  args: {
    id: v.id('transactions'),
    authId: v.string(),
    transactionAuthId: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.authId !== args.transactionAuthId) {
      throw new Error('Not authorized');
    }

    const { ok } = await rateLimiter.limit(ctx, 'deleteTransaction', {
      key: args.authId,
    });

    if (!ok) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
      };
    }

    try {
      await ctx.db.delete(args.id);
      return {
        success: true,
        message: 'Transaction deleted successfully!',
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to delete transaction.',
      };
    }
  },
});

export const deleteTransactions = mutation({
  args: {
    ids: v.array(v.id('transactions')),
    authId: v.string(),
    transactionAuthIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const goodToDelete = args.transactionAuthIds.every(
      (transactionAuthId) => args.authId === transactionAuthId
    );

    if (!goodToDelete) {
      throw new Error('Not authorized');
    }

    try {
      for (const id of args.ids) {
        await ctx.db.delete(id);
      }
    } catch (error) {
      console.error(error);
    }
  },
});
