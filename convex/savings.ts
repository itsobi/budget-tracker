import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { rateLimiter } from './rateLimiter';

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

    const userId = identity.subject;

    const { ok } = await rateLimiter.limit(ctx, 'createSavingsGoal', {
      key: userId,
    });

    if (!ok) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
      };
    }

    try {
      const savingsId = await ctx.db.insert('savings', args);
      return {
        success: true,
        message: 'Savings goal added successfully!',
        savingsId,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to add savings goal.',
      };
    }
  },
});

export const updateSavingsGoal = mutation({
  args: {
    id: v.id('savings'),
    title: v.optional(v.string()),
    type: v.optional(v.string()),
    goalAmount: v.optional(v.number()),
    currentAmount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { ok } = await rateLimiter.limit(ctx, 'updateSavingsGoal', {
      key: userId,
    });

    if (!ok) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
      };
    }

    try {
      const { id, ...updateFields } = args;
      await ctx.db.patch(id, updateFields);
      return {
        success: true,
        message: 'Savings goal updated successfully!',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to update savings goal.',
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

export const getSavingsGoal = query({
  args: {
    id: v.id('savings'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const deleteSavingsGoal = mutation({
  args: {
    id: v.id('savings'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;

    const { ok } = await rateLimiter.limit(ctx, 'deleteSavingsGoal', {
      key: userId,
    });

    if (!ok) {
      return {
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
      };
    }

    try {
      await ctx.db.delete(args.id);
      return {
        success: true,
        message: 'Savings goal deleted successfully!',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to delete savings goal.',
      };
    }
  },
});
