'use client';

import PageHeader from '@/components/PageHeader';
import { TransactionsTable } from './_components/transactions-table';
import { columns, TransactionType } from './_components/columns';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DownloadCSVButton } from '../dashboard/_components/DownloadCSVButton';

export default function TransactionsPage() {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.replace('/sign-in');
    }
  }, [userId, router]);

  const transactions = useQuery(api.transactions.getTransactions, {
    userId: userId!,
  });

  if (!transactions) {
    return <LoadingScreen />;
  }

  const data = transactions.map((transaction) => ({
    id: transaction._id,
    type: transaction.type as TransactionType,
    title: transaction.title,
    amount: transaction.amount,
    date: transaction.date,
  }));

  return (
    <div>
      <PageHeader title="Transactions" actions={<DownloadCSVButton />} />
      <TransactionsTable columns={columns} data={data} />
    </div>
  );
}
