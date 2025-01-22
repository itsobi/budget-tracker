import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getPreferences = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db
        .query('preferences')
        .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
        .first();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch settings');
    }
  },
});

export const updatePreferences = mutation({
  args: {
    userId: v.string(),
    monthlyOverview: v.optional(v.boolean()),
    savings: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('User not authenticated');
    }
    try {
      const existingSettings = await ctx.db
        .query('preferences')
        .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
        .first();

      if (existingSettings) {
        await ctx.db.patch(existingSettings._id, args);
        return { success: true };
      } else {
        await ctx.db.insert('preferences', {
          userId: args.userId,
          monthlyOverview: args.monthlyOverview ?? true,
          savings: args.savings ?? true,
        });
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Failed to update preferences' };
    }
  },
});
