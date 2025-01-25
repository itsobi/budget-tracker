'use client';

import {
  Car,
  CreditCard,
  LucideIcon,
  MoveUpRight,
  Popcorn,
  ShoppingBag,
  ShoppingCart,
  Utensils,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import CustomTooltip from './CustomTooltip';
import { AddTransactionButton } from '@/app/(app)/dashboard/_components/AddTransactionButton';
import { Transaction } from './Transaction';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Link from 'next/link';

const transactionTypes: { type: string; icon: LucideIcon }[] = [
  { type: 'bill', icon: CreditCard },
  { type: 'groceries', icon: ShoppingCart },
  { type: 'entertainment', icon: Popcorn },
  { type: 'shopping', icon: ShoppingBag },
  { type: 'transport', icon: Car },
  { type: 'restaurant', icon: Utensils },
  { type: 'other', icon: MoveUpRight },
];

interface TransactionsCardProps {
  userId: string;
}

export function TransactionsCard({ userId }: TransactionsCardProps) {
  const transactions = useQuery(api.transactions.getTransactions, { userId });

  const totalAmount = transactions?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

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
          You&apos;ve made {transactions?.length || 0} transaction
          {transactions?.length === 1 ? '' : 's'} this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions?.slice(0, 3).map((transaction) => {
          const transactionType = transactionTypes.find(
            (type) => type.type === transaction.type
          );
          const Icon = transactionType?.icon || MoveUpRight;
          return (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              Icon={Icon}
            />
          );
        })}
        {transactions?.length && transactions?.length > 3 ? (
          <Link
            href="/transactions"
            className="flex justify-center text-xs text-muted-foreground hover:underline"
          >
            View all transactions
          </Link>
        ) : null}
      </CardContent>
      <CardFooter>
        {transactions?.length ? (
          <div className="w-full flex justify-end p-2">
            <p className="font-semibold">Total: {totalAmountFormatted}</p>
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
}
