import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { rateLimiter } from './rateLimiter';

export const createTransaction = mutation({
  args: {
    title: v.string(),
    amount: v.number(),
    type: v.string(),
    userId: v.string(),
    date: v.string(),
    yearAndMonth: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;
    const { ok } = await rateLimiter.limit(ctx, 'createTransaction', {
      key: userId,
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
    userId: v.string(),
    yearAndMonth: v.string(),
  },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query('transactions')
      .withIndex('by_user_id_and_date', (q) =>
        q.eq('userId', args.userId).eq('yearAndMonth', args.yearAndMonth)
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
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { ok } = await rateLimiter.limit(ctx, 'updateTransaction', {
      key: userId,
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
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { ok } = await rateLimiter.limit(ctx, 'deleteTransaction', {
      key: userId,
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
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
