import { TransactionsCard } from '@/components/TransactionsCard';
import { DashboardExpenses } from './_components/DashboardExpenses';
import { AddExpenseButton } from './_components/AddExpenseButton';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import MonthlyBudgetCap from './_components/MonthlyBudgetCap';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { SavingsCard } from '@/components/SavingsCard';
import { MonthlyOverviewChart } from '@/components/MonthlyOverviewChart';
import PageHeader from '@/components/PageHeader';
import { UploadReceiptButton } from '@/components/UploadReceiptButton';
import { useYearAndMonth } from '@/lib/hooks';

export default async function DashboardPage() {
  const { userId } = await auth();
  const yearAndMonth = new Date().toISOString().split('T')[0].slice(0, 7);

  if (!userId) {
    return redirect('/sign-in');
  }

  const preloadedBudgetCap = await preloadQuery(api.budgetCap.getBudgetCap, {
    userId,
  });

  const preloadedExpenses = await preloadQuery(api.expenses.getExpenses, {
    userId,
  });

  const preloadedSavings = await preloadQuery(api.savings.getSavingsGoals, {
    userId,
  });

  const preloadedPreferences = await preloadQuery(
    api.preferences.getPreferences,
    {
      userId,
    }
  );

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
        <MonthlyBudgetCap
          userId={userId}
          preloadedBudgetCap={preloadedBudgetCap}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DashboardExpenses
          userId={userId}
          preloadedExpenses={preloadedExpenses}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <TransactionsCard userId={userId} />
        <MonthlyOverviewChart
          userId={userId}
          preloadedPreferences={preloadedPreferences}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SavingsCard
          preloadedSavings={preloadedSavings}
          preloadedPreferences={preloadedPreferences}
        />
      </div>
    </div>
  );
}
