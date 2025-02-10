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
import { useSession } from 'next-auth/react';

export default function TransactionsPage() {
  const { data: session } = useSession();
  const authId = session?.user?.id;
  const user = useQuery(api.users.getUserByAuthId, {
    authId: authId ?? '',
  });
  const isMember = user?.isMember ?? false;
  const yearAndMonth = useYearAndMonth();

  const transactions = useQuery(api.transactions.getTransactions, {
    authId: authId ?? '',
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
    authId: transaction.authId,
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
            text="Become a member to download reports"
            href="/membership"
          />
        </div>
      )}
      <TransactionsTable columns={columns} data={data} />
    </div>
  );
}
