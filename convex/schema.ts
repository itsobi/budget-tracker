import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  expenses: defineTable({
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    amount: v.number(),
    order: v.number(),
    date: v.string(),
  })
    .index('by_user_id', ['userId'])
    .index('by_user_and_order', ['userId', 'order'])
    .index('by_user_and_date', ['userId', 'date']),

  transactions: defineTable({
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    amount: v.number(),
    date: v.string(),
  })
    .index('by_user_id', ['userId'])
    .index('by_user_and_date', ['userId', 'date']),

  preferences: defineTable({
    userId: v.string(),
    monthlyOverview: v.optional(v.boolean()),
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
