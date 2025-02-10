import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getPreferences = query({
  args: {
    authId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db
        .query('preferences')
        .withIndex('by_auth_id', (q) => q.eq('authId', args.authId))
        .first();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch settings');
    }
  },
});

export const updatePreferences = mutation({
  args: {
    authId: v.string(),
    monthlyOverview: v.optional(v.boolean()),
    savings: v.optional(v.boolean()),
    preferenceAuthId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const existingSettings = await ctx.db
        .query('preferences')
        .withIndex('by_auth_id', (q) => q.eq('authId', args.authId))
        .first();

      if (args.preferenceAuthId && args.preferenceAuthId !== args.authId) {
        throw new Error('Unauthorized');
      }

      if (existingSettings) {
        await ctx.db.patch(existingSettings._id, args);
        return { success: true };
      } else {
        await ctx.db.insert('preferences', {
          authId: args.authId,
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
