import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  expenses: defineTable({
    title: v.string(),
    type: v.string(),
    amount: v.number(),
    userId: v.string(),
    order: v.number(),
  })
    .index('by_user_id', ['userId'])
    .index('by_user_and_order', ['userId', 'order']),
});
