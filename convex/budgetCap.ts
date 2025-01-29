import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getBudgetCap = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('budgetCap')
      .withIndex('by_user_id')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();
  },
});

export const setBudgetCap = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const existingBudgetCap = await ctx.db
        .query('budgetCap')
        .withIndex('by_user_id')
        .filter((q) => q.eq(q.field('userId'), args.userId))
        .first();

      let budgetCap;

      if (existingBudgetCap) {
        budgetCap = await ctx.db.patch(existingBudgetCap._id, {
          amount: args.amount,
        });
      } else {
        budgetCap = await ctx.db.insert('budgetCap', {
          userId: args.userId,
          amount: args.amount,
        });
      }

      return {
        success: true,
        message: 'Budget cap set successfully! 💪',
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Failed to set budget cap',
      };
    }
  },
});
