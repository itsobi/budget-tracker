import { TransactionsCard } from '@/components/TransactionsCard';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download, PlusCircle } from 'lucide-react';
import { DashboardExpenses } from './_components/DashboardExpenses';

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
        <DashboardExpenses />
      </div>

      <div className="mb-4">
        <TransactionsCard />
      </div>
    </div>
  );
}
