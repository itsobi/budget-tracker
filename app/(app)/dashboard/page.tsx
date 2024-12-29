import { DashboardCard } from '@/components/DashboardCard';
import { CalendarSync, CreditCard, DollarSign, PiggyBank } from 'lucide-react';

// Monthly Budget
// Monthly Expenses
// Savings
// Recurring Expenses

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
}
