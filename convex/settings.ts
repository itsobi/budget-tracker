import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getSettings = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }
    try {
      return await ctx.db
        .query('settings')
        .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
        .first();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch settings');
    }
  },
});

export const updateSettings = mutation({
  args: {
    userId: v.string(),
    budgetBreakdown: v.optional(v.boolean()),
    savings: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }
    try {
      const existingSettings = await ctx.db
        .query('settings')
        .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
        .first();

      if (existingSettings) {
        await ctx.db.patch(existingSettings._id, args);
        return { success: true };
      } else {
        await ctx.db.insert('settings', {
          userId: args.userId,
          budgetBreakdown: args.budgetBreakdown ?? false,
          savings: args.savings ?? false,
        });
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Failed to update preferences' };
    }
  },
});
