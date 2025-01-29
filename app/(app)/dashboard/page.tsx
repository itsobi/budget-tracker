'use client';

import { DashboardExpenses } from './_components/DashboardExpenses';
import { AddExpenseButton } from './_components/AddExpenseButton';
import MonthlyBudgetCap from './_components/MonthlyBudgetCap';
import { api } from '@/convex/_generated/api';
import { SavingsCard } from './_components/SavingsCard';

import PageHeader from '@/components/PageHeader';
import { UploadReceiptButton } from '@/components/UploadReceiptButton';
import { MonthlyOverviewChart } from './_components/MonthlyOverviewChart';
import { TransactionsCard } from './_components/TransactionsCard';
import { useQuery } from 'convex/react';

export default function DashboardPage() {
  const userId = useQuery(api.helpers.getUserId);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        actions={
          <>
            <AddExpenseButton />
            <UploadReceiptButton />
          </>
        }
      />

      <div className="mb-4">
        <MonthlyBudgetCap userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DashboardExpenses userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TransactionsCard userId={userId} />
        <MonthlyOverviewChart userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SavingsCard userId={userId} />
      </div>
    </div>
  );
}
