import { SignIn } from '@clerk/nextjs';
import { ChartLine } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 justify-center">
          <ChartLine />
          <h1 className="text-2xl font-bold">BudgetTracker</h1>
        </div>
        <SignIn />;
      </div>
    </div>
  );
}
