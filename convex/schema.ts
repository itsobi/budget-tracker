import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.optional(v.string()),
    isMember: v.optional(v.boolean()),
  }).index('by_auth_id', ['authId']),

  expenses: defineTable({
    authId: v.string(),
    expenseAuthId: v.string(),
    title: v.string(),
    type: v.string(),
    amount: v.number(),
    order: v.number(),
    date: v.string(),
  })
    .index('by_auth_id', ['authId'])
    .index('by_auth_id_and_order', ['authId', 'order'])
    .index('by_auth_id_and_date', ['authId', 'date']),

  transactions: defineTable({
    authId: v.string(),
    title: v.string(),
    type: v.string(),
    amount: v.number(),
    date: v.string(),
    yearAndMonth: v.string(),
    transactionAuthId: v.optional(v.string()),
  }).index('by_auth_id_and_date', ['authId', 'yearAndMonth']),

  preferences: defineTable({
    authId: v.string(),
    monthlyOverview: v.optional(v.boolean()),
    savings: v.optional(v.boolean()),
    preferenceAuthId: v.optional(v.string()),
  }).index('by_auth_id', ['authId']),

  budgetCap: defineTable({
    authId: v.string(),
    amount: v.number(),
  }).index('by_auth_id', ['authId']),

  savings: defineTable({
    authId: v.string(),
    title: v.string(),
    type: v.string(),
    goalAmount: v.number(),
    currentAmount: v.number(),
    savingsAuthId: v.optional(v.string()),
  }).index('by_auth_id', ['authId']),
});
