'use client';

import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader } from './ui/card';
import CustomTooltip from './CustomTooltip';
import { useSavingsSheetStore } from '@/store/useSavingsSheetStore';
import { api } from '@/convex/_generated/api';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { SavingsGoal } from '@/app/(app)/dashboard/_components/SavingsGoal';

interface SavingsCardProps {
  preloadedSavings: Preloaded<typeof api.savings.getSavingsGoals>;
  preloadedPreferences: Preloaded<typeof api.preferences.getPreferences>;
}

export function SavingsCard({
  preloadedSavings,
  preloadedPreferences,
}: SavingsCardProps) {
  const { open } = useSavingsSheetStore();
  const savings = usePreloadedQuery(preloadedSavings);
  const preferences = usePreloadedQuery(preloadedPreferences);

  console.log(preferences);

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
          {savings.map((savings) => (
            <SavingsGoal key={savings._id} savings={savings} />
          ))}
        </div>
      </Card>
    );
  }

  return null;
}
