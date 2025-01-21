'use client';

import { Switch } from '@/components/ui/switch';
import { api } from '@/convex/_generated/api';
import { Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { toast } from 'sonner';

interface DashboardPreferencesProps {
  userId: string;
  preloadedPreferences: Preloaded<typeof api.preferences.getPreferences>;
}

export function DashboardPreferences({
  userId,
  preloadedPreferences,
}: DashboardPreferencesProps) {
  const preferences = usePreloadedQuery(preloadedPreferences);
  const updatePreferences = useMutation(api.preferences.updatePreferences);

  const handleChange = async (checked: boolean, name: string) => {
    try {
      await updatePreferences({
        userId,
        [name]: checked,
      });
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="font-semibold">Fixed Expenses</h4>
          <p className="text-sm text-muted-foreground">
            Displays your fixed expenses.
          </p>
        </div>
        <Switch
          name="fixedExpenses"
          checked={preferences?.fixedExpenses || false}
          onCheckedChange={(checked) => handleChange(checked, 'fixedExpenses')}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="font-semibold">Budget Breakdown</h4>
          <p className="text-sm text-muted-foreground">
            Displays your budget allocation across different categories.
          </p>
        </div>
        <Switch
          name="budgetBreakdown"
          checked={preferences?.budgetBreakdown || false}
          onCheckedChange={(checked) =>
            handleChange(checked, 'budgetBreakdown')
          }
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="font-semibold">Savings Goals</h4>
          <p className="text-sm text-muted-foreground">
            Displays your savings progress.
          </p>
        </div>
        <Switch
          name="savings"
          checked={preferences?.savings || false}
          onCheckedChange={(checked) => handleChange(checked, 'savings')}
        />
      </div>
    </div>
  );
}
