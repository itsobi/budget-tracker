import { DashboardExpenses } from './_components/DashboardExpenses';
import { AddExpenseButton } from './_components/AddExpenseButton';
import MonthlyBudgetCap from './_components/MonthlyBudgetCap';
import { api } from '@/convex/_generated/api';
import { SavingsCard } from './_components/SavingsCard';
import PageHeader from '@/components/PageHeader';
import { UploadReceiptButton } from '@/components/UploadReceiptButton';
import { MonthlyOverviewChart } from './_components/MonthlyOverviewChart';
import { TransactionsCard } from './_components/TransactionsCard';
import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';
import { auth } from '@/auth';
import { getConvexClient } from '@/lib/convexClient';
import { ShowSummaryButton } from './_components/ShowSummaryButton';
import { preloadQuery } from 'convex/nextjs';

export default async function DashboardPage() {
  const session = await auth();
  const authId = session?.user?.id;

  const convexClient = getConvexClient();

  const user = authId
    ? await convexClient.query(api.users.getUserByAuthId, { authId })
    : null;

  const isMember = user?.isMember ?? false;

  // ... existing code ...
  const [preloadedExpenses, preloadedSavings] = await Promise.all([
    preloadQuery(api.expenses.getExpenses, {
      authId: authId ?? '',
    }),
    preloadQuery(api.savings.getSavingsGoals, {
      authId: authId ?? '',
    }),
  ]);
  // ... existing code ...

  return (
    <div>
      <PageHeader
        title="Dashboard"
        middleButton={
          <div className="hidden md:block">
            {!isMember && (
              <AnimatedCTAButton text="Become a Member" href="/membership" />
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
        <MonthlyBudgetCap authId={authId} />
        <ShowSummaryButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DashboardExpenses
          authId={authId}
          preloadedExpenses={preloadedExpenses}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TransactionsCard authId={authId} />
        <MonthlyOverviewChart authId={authId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SavingsCard authId={authId} preloadedSavings={preloadedSavings} />
      </div>
    </div>
  );
}
