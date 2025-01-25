import { RateLimiter, MINUTE } from '@convex-dev/rate-limiter';
import { components } from './_generated/api';

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  createExpense: { kind: 'token bucket', rate: 2, period: 5000 },
  updateExpense: { kind: 'token bucket', rate: 2, period: 10000 },
  deleteExpense: { kind: 'token bucket', rate: 1, period: 10000 },
  createTransaction: { kind: 'token bucket', rate: 2, period: 5000 },
  updateTransaction: { kind: 'token bucket', rate: 2, period: 10000 },
  deleteTransaction: { kind: 'token bucket', rate: 1, period: 10000 },
  createSavingsGoal: { kind: 'token bucket', rate: 2, period: 5000 },
  updateSavingsGoal: { kind: 'token bucket', rate: 2, period: 10000 },
  deleteSavingsGoal: { kind: 'token bucket', rate: 1, period: 10000 },
});
