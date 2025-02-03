'use client';

import PageHeader from '@/components/PageHeader';
import { TransactionsTable } from './_components/transactions-table';
import { columns, TransactionType } from './_components/columns';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DownloadReportButton } from '../dashboard/_components/DownloadReportButton';
import { useYearAndMonth } from '@/lib/hooks';
import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';

export default function TransactionsPage() {
  const userId = useQuery(api.helpers.getUserId);
  const isMember = useQuery(api.helpers.isMember);
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
      <PageHeader
        title="Transactions"
        actions={isMember && <DownloadReportButton data={data} />}
      />
      {!isMember && (
        <div className="flex justify-center">
          <AnimatedCTAButton
            text="Upgrade to Pro to download reports"
            href="/pro"
          />
        </div>
      )}
      <TransactionsTable columns={columns} data={data} />
    </div>
  );
}
