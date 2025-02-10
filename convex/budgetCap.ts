import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getBudgetCap = query({
  args: {
    authId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('budgetCap')
      .withIndex('by_auth_id')
      .filter((q) => q.eq(q.field('authId'), args.authId))
      .first();
  },
});

export const setBudgetCap = mutation({
  args: {
    authId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const existingBudgetCap = await ctx.db
        .query('budgetCap')
        .withIndex('by_auth_id')
        .filter((q) => q.eq(q.field('authId'), args.authId))
        .first();

      let budgetCap;

      if (existingBudgetCap) {
        budgetCap = await ctx.db.patch(existingBudgetCap._id, {
          amount: args.amount,
        });
      } else {
        budgetCap = await ctx.db.insert('budgetCap', {
          authId: args.authId,
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
