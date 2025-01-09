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
  CardHeader,
  CardTitle,
} from './ui/card';
import CustomTooltip from './CustomTooltip';
import { AddTransactionButton } from '@/app/(app)/dashboard/_components/AddTransactionButton';
import { Transaction } from './Transaction';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

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
  return (
    <Card className="shadow-md dark:border-white/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
          <CustomTooltip description="Add transaction">
            <div>
              <AddTransactionButton />
            </div>
          </CustomTooltip>
        </CardTitle>
        <CardDescription>
          You made {transactions?.length || 0} transaction
          {transactions?.length === 1 ? '' : 's'} this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions?.map((transaction) => {
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
      </CardContent>
    </Card>
  );
}
