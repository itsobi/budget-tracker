import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getUserByAuthId = query({
  args: {
    authId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_auth_id', (q) => q.eq('authId', args.authId))
      .first();
  },
});

export const isUserMember = query({
  args: {
    authId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_auth_id', (q) => q.eq('authId', args.authId))
      .first();
    return user?.isMember ?? false;
  },
});

export const createUser = mutation({
  args: {
    authId: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    isMember: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('users', {
      authId: args.authId,
      email: args.email,
      name: args.name,
      image: args.image,
      isMember: args.isMember,
    });
  },
});
