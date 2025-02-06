'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../../../../components/ui/card';
import CustomTooltip from '../../../../components/CustomTooltip';
import { AddTransactionButton } from '@/app/(app)/dashboard/_components/AddTransactionButton';
import { Transaction } from './Transaction';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Link from 'next/link';
import { useYearAndMonth } from '@/lib/hooks';
import { Id } from '@/convex/_generated/dataModel';

const transactionTypes: { type: string; emoji: string }[] = [
  { type: 'bill', emoji: '💳' },
  { type: 'groceries', emoji: '🛒' },
  { type: 'entertainment', emoji: '🎥' },
  { type: 'shopping', emoji: '🛍️' },
  { type: 'transport', emoji: '🚗' },
  { type: 'restaurant', emoji: '🍽️' },
  { type: 'other', emoji: '💡' },
];

export function TransactionsCard({
  userId,
}: {
  userId: Id<'users'> | null | undefined;
}) {
  const yearAndMonth = useYearAndMonth();
  const data = useQuery(api.transactions.getTransactions, {
    userId: userId ?? '',
    yearAndMonth,
  });

  const totalAmount = data?.totalAmount;

  const totalAmountFormatted = totalAmount?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <Card className="shadow-md dark:border-white/60">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
          <CustomTooltip description="Add transaction">
            <div>
              <AddTransactionButton />
            </div>
          </CustomTooltip>
        </div>

        <CardDescription>
          You&apos;ve made {data?.count || 0} transaction
          {data?.count === 1 ? '' : 's'} this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data?.transactions.slice(0, 3).map((transaction) => {
          const transactionType = transactionTypes.find(
            (type) => type.type === transaction.type
          );
          const emoji = transactionType?.emoji || '💡';
          return (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              emoji={emoji}
            />
          );
        })}
        {data?.count && data?.count > 3 ? (
          <Link
            href="/transactions"
            className="flex justify-center text-xs text-muted-foreground hover:underline"
          >
            View all transactions
          </Link>
        ) : null}
      </CardContent>
      <CardFooter>
        {data?.count ? (
          <div className="w-full flex justify-end p-4">
            <p className="font-semibold">Total: {totalAmountFormatted}</p>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
