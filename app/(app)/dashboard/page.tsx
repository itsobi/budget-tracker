import { TransactionsCard } from '@/components/TransactionsCard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download, Plus } from 'lucide-react';
import { DashboardExpenses } from './_components/DashboardExpenses';
import { AddExpenseButton } from './_components/AddExpenseButton';
import { auth } from '@clerk/nextjs/server';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import CustomTooltip from '@/components/CustomTooltip';

export default async function DashboardPage() {
  const { userId } = await auth();
  const preloadedExpensesCount = await preloadQuery(
    api.expenses.getExpensesCount,
    {
      userId: userId!,
    }
  );

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DashboardExpenses />
      </div>

      <div className="mb-4">
        <TransactionsCard />
      </div>
    </div>
  );
}
