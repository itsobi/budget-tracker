import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createSavingsGoal = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    goalAmount: v.number(),
    currentAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }
    try {
      const savingsId = await ctx.db.insert('savings', args);
      return {
        success: true,
        message: 'Savings goal added successfully',
        savingsId,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to add savings goal',
      };
    }
  },
});

export const getSavingsGoals = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('savings')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .collect();
  },
});
