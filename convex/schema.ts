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
    budgetBreakdown: v.optional(v.boolean()),
    savings: v.optional(v.boolean()),
  }).index('by_user_id', ['userId']),

  budgetCap: defineTable({
    userId: v.string(),
    amount: v.number(),
  }).index('by_user_id', ['userId']),

  savings: defineTable({
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    goalAmount: v.number(),
    currentAmount: v.number(),
  }).index('by_user_id', ['userId']),
});
