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
import { DownloadButton } from './_components/DownloadButton';
import PageHeader from '@/components/PageHeader';

export default async function DashboardPage() {
  const { userId } = await auth();

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

  const preloadedTransactions = await preloadQuery(
    api.transactions.getTransactions,
    {
      userId,
    }
  );

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
            <DownloadButton />
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
          preloadedTransactions={preloadedTransactions}
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
