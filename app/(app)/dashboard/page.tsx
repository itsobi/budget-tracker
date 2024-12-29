import { DashboardCard } from '@/components/DashboardCard';
import { TransactionsCard } from '@/components/TransactionsCard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  CalendarSync,
  CreditCard,
  DollarSign,
  Download,
  PiggyBank,
  PlusCircle,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle />
            Add Expense
          </Button>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={'ghost'}>
                  <Download />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DashboardCard
          title="Monthly Budget"
          amount={1000}
          Icon={DollarSign}
          subtitle="+20.1% from last month"
        />
        <DashboardCard
          title="Monthly Expenses"
          amount={1000}
          Icon={CreditCard}
          subtitle="+20.1% from last month"
        />
        <DashboardCard
          title="Savings"
          amount={1000}
          Icon={PiggyBank}
          subtitle="+20.1% from last month"
        />
        <DashboardCard
          title="Recurring Expenses"
          amount={1000}
          Icon={CalendarSync}
          subtitle="+20.1% from last month"
        />
      </div>
      <div className="mb-4">
        <TransactionsCard />
      </div>
    </div>
  );
}
