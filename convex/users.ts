import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const updateUserMembershipStatus = mutation({
  args: {
    userId: v.id('users'),
    isMember: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { isMember: args.isMember });
  },
});
