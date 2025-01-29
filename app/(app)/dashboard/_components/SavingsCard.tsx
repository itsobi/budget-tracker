'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import CustomTooltip from '@/components/CustomTooltip';
import { useSavingsSheetStore } from '@/store/useSavingsSheetStore';
import { api } from '@/convex/_generated/api';
import { SavingsGoal } from '@/app/(app)/dashboard/_components/SavingsGoal';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

export function SavingsCard({
  userId,
}: {
  userId: Id<'users'> | null | undefined;
}) {
  const { open } = useSavingsSheetStore();
  const savings = useQuery(api.savings.getSavingsGoals, {
    userId: userId ?? '',
  });

  const preferences = useQuery(api.preferences.getPreferences, {
    userId: userId ?? '',
  });

  if (!preferences || preferences?.savings) {
    return (
      <Card className="shadow-md dark:border-white/60">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Savings</h2>
            <CustomTooltip description="Add savings goal">
              <Button variant={'ghost'} onClick={() => open()}>
                <Plus size={18} />
              </Button>
            </CustomTooltip>
          </div>
          <CardDescription>Your savings at a glance</CardDescription>
        </CardHeader>

        <div className="p-4 flex flex-col gap-4">
          {savings?.map((savings) => (
            <SavingsGoal key={savings._id} savings={savings} />
          ))}
        </div>
      </Card>
    );
  }

  return null;
}
