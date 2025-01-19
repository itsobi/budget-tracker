import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createTransaction = mutation({
  args: {
    title: v.string(),
    amount: v.number(),
    type: v.string(),
    userId: v.string(),
    month: v.string(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }
    try {
      const transactionId = await ctx.db.insert('transactions', args);
      return {
        success: true,
        message: 'Transaction created successfully',
        transactionId,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to create transaction. Please try again.',
      };
    }
  },
});

export const getTransactionsCount = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const transactionIds = await ctx.db
      .query('transactions')
      .withIndex('by_user_id')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();
    return transactionIds.length;
  },
});

export const getTransactions = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query('transactions')
      .withIndex('by_user_id')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .order('desc')
      .collect();

    return transactions;
  },
});
