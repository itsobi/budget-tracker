import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';

export const getUserId = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    return userId;
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    return await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('_id'), userId))
      .first();
  },
});

export const isMember = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return false;
    }

    const user = await ctx.db
      .query('users')
      .filter((q) =>
        q.and(q.eq(q.field('_id'), userId), q.eq(q.field('isMember'), true))
      )
      .first();

    return user !== null;
  },
});
