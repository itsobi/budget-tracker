import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  expenses: defineTable({
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    amount: v.number(),
    order: v.number(),
  })
    .index('by_user_id', ['userId'])
    .index('by_user_and_order', ['userId', 'order']),

  transactions: defineTable({
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    amount: v.number(),
  }).index('by_user_id', ['userId']),

  settings: defineTable({
    userId: v.string(),
    preferences: v.object({
      budgetBreakdown: v.boolean(),
      savings: v.boolean(),
    }),
  }).index('by_user_id', ['userId']),
});
