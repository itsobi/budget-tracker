'use client';

import PageHeader from '@/components/PageHeader';
import { TransactionsTable } from './_components/transactions-table';
import { columns, TransactionType } from './_components/columns';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DownloadCSVButton } from '../dashboard/_components/DownloadCSVButton';
import { useYearAndMonth } from '@/lib/hooks';

export default function TransactionsPage() {
  const userId = useQuery(api.helpers.getUserId);
  const yearAndMonth = useYearAndMonth();

  const transactions = useQuery(api.transactions.getTransactions, {
    userId: userId ?? '',
    yearAndMonth,
  });

  if (!transactions) {
    return <LoadingScreen />;
  }

  const data = transactions?.transactions?.map((transaction) => ({
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
