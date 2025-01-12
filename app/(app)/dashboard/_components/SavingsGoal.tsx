'use client;';

import { Progress } from '@/components/ui/progress';
import { Id } from '@/convex/_generated/dataModel';
import {
  Home,
  Car,
  LucideIcon,
  HelpCircle,
  Plane,
  Heart,
  PiggyBank,
} from 'lucide-react';

const savingsTypeToIcon: Record<string, LucideIcon> = {
  home: Home,
  car: Car,
  retirement: PiggyBank,
  emergency: Heart,
  vacation: Plane,
  other: HelpCircle,
};

type Savings = {
  _id: Id<'savings'>;
  _creationTime: number;
  title: string;
  type: string;
  userId: string;
  currentAmount: number;
  goalAmount: number;
};

interface SavingsGoalProps {
  savings: Savings;
}

export function SavingsGoal({ savings }: SavingsGoalProps) {
  const Icon = savingsTypeToIcon[savings.type];

  const progressPercentage = Math.min(
    (savings.currentAmount / savings.goalAmount) * 100,
    100
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon size={18} />
          <p className="truncate">{savings.title}</p>
        </div>
        <p>
          ${savings.currentAmount.toLocaleString()} / $
          {savings.goalAmount.toLocaleString()}
        </p>
      </div>
      <Progress value={progressPercentage} />
    </div>
  );
}
