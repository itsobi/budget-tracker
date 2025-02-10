'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useSummaryDialog } from '@/store/useSumaryDialog';
import { useQuery } from 'convex/react';
import { useSession } from 'next-auth/react';

export function SummaryDialog() {
  const { data: session } = useSession();
  const authId = session?.user?.id;
  const { isOpen, close } = useSummaryDialog();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString('default', { month: 'long' });

  const MonthlyBudgetCap = useQuery(
    api.budgetCap.getBudgetCap,
    authId ? { authId } : 'skip'
  );

  const expensesData = useQuery(
    api.expenses.getExpenses,
    authId ? { authId } : 'skip'
  );

  const transactionsData = useQuery(api.transactions.getTransactions, {
    authId: authId ?? '',
    yearAndMonth: new Date().toISOString().slice(0, 7),
  });

  const rawTotalAmount =
    (expensesData?.expensesTotal ?? 0) + (transactionsData?.totalAmount ?? 0);

  const totalAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(
    (expensesData?.expensesTotal ?? 0) + (transactionsData?.totalAmount ?? 0)
  );

  const budgetCapAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(MonthlyBudgetCap?.amount ?? 0);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
        }
      }}
    >
      <DialogTrigger className="sr-only hidden">Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentMonth}, {currentYear} Summary
          </DialogTitle>
        </DialogHeader>

        <div>
          <p>
            You have spent{' '}
            <span
              className={cn(
                'font-bold text-lg',
                rawTotalAmount > (MonthlyBudgetCap?.amount ?? 0)
                  ? 'text-red-500'
                  : 'text-green-500'
              )}
            >
              {totalAmount}
            </span>{' '}
            of your alloted{' '}
            <span className="font-bold text-lg">{budgetCapAmount}</span> for
            this month.{' '}
            {rawTotalAmount > (MonthlyBudgetCap?.amount ?? 0) ? (
              <span className="text-lg">😢</span>
            ) : (
              <span className="text-lg">🤑</span>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
