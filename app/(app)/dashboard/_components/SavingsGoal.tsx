'use client;';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useSavingsSheetStore } from '@/store/useSavingsSheetStore';

const savingsTypeToEmoji: Record<string, string> = {
  home: '🏠',
  car: '🚗',
  retirement: '🏦',
  emergency: '🚑',
  vacation: '🛫',
  other: '💡',
};

type Savings = {
  _id: Id<'savings'>;
  _creationTime: number;
  title: string;
  type: string;
  authId: string;
  currentAmount: number;
  goalAmount: number;
};

interface SavingsGoalProps {
  savings: Savings;
}

export function SavingsGoal({ savings }: SavingsGoalProps) {
  const { open } = useSavingsSheetStore();

  const deleteSavingsGoalMutation = useMutation(api.savings.deleteSavingsGoal);

  const emoji = savingsTypeToEmoji[savings.type];
  const progressPercentage = Math.min(
    (savings.currentAmount / savings.goalAmount) * 100,
    100
  );

  const handleDeleteSavingsGoal = async () => {
    const response = await deleteSavingsGoalMutation({
      id: savings._id,
      authId: savings.authId,
      savingsAuthId: savings.authId,
    });
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      onClick={() => open(savings._id)}
      className="flex flex-col gap-1 cursor-pointer hover:bg-accent rounded-md p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-xl lg:text-2xl">{emoji}</span>
          <p className="font-semibold truncate">{savings.title}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm">
            <span className="text-muted-foreground">
              ${savings.currentAmount.toLocaleString()}
            </span>{' '}
            / ${savings.goalAmount.toLocaleString()}
          </p>
          <div onClick={(e) => e.stopPropagation()}>
            <ConfirmDialog
              triggerComponent={
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-500 hover:text-white"
                >
                  <Trash />
                </Button>
              }
              title="Delete Savings Goal"
              description="Are you sure you want to delete this savings goal?"
              confirmText="Delete"
              onConfirm={handleDeleteSavingsGoal}
            />
          </div>
        </div>
      </div>
      <Progress value={progressPercentage} />
    </div>
  );
}
