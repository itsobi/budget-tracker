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
import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';
import { Button } from '@/components/ui/button';
import { useSummaryDialog } from '@/store/useSumaryDialog';

export default function DashboardPage() {
  const userId = useQuery(api.helpers.getUserId);
  const { open } = useSummaryDialog();
  const isMember = useQuery(api.helpers.isMember);
  return (
    <div>
      <PageHeader
        title="Dashboard"
        middleButton={
          <div className="hidden md:block">
            {!isMember && (
              <AnimatedCTAButton text="Upgrade to Pro" href="/pro" />
            )}
          </div>
        }
        actions={
          <>
            <AddExpenseButton />
            <UploadReceiptButton />
          </>
        }
      />

      <div className="flex items-center justify-between mb-4">
        <MonthlyBudgetCap userId={userId} />
        <Button className="font-bold" onClick={() => open()}>
          Show Summary
        </Button>
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
