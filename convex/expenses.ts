import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createExpense = mutation({
  args: {
    title: v.string(),
    amount: v.number(),
    type: v.string(),
    userId: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }
    try {
      const expenseId = await ctx.db.insert('expenses', args);
      return {
        success: true,
        message: 'Expense created successfully',
        expenseId,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create expense. Please try again.',
      };
    }
  },
});

export const getExpenses = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('expenses')
      .withIndex('by_user_and_order')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();
  },
});

export const getExpensesCount = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('expenses')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect()
      .then((expenses) => expenses.length);
  },
});

export const updateOrder = mutation({
  args: { id: v.id('expenses'), order: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { order: args.order });
  },
});
