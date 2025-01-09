import { TransactionsCard } from '@/components/TransactionsCard';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DashboardExpenses } from './_components/DashboardExpenses';
import { AddExpenseButton } from './_components/AddExpenseButton';
import { auth } from '@clerk/nextjs/server';
import CustomTooltip from '@/components/CustomTooltip';
import { redirect } from 'next/navigation';
import MonthlyBudgetCap from './_components/MonthlyBudgetCap';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <AddExpenseButton />
          <CustomTooltip description="Download">
            <Button variant={'ghost'}>
              <Download />
            </Button>
          </CustomTooltip>
        </div>
      </div>

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

      <div className="mb-4">
        <TransactionsCard userId={userId} />
      </div>
    </div>
  );
}
