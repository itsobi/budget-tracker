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
          <h4 className="font-semibold">Monthly Overview</h4>
          <p className="text-sm text-muted-foreground">
            Displays your spending across different categories.
          </p>
        </div>
        <Switch
          name="monthlyOverview"
          checked={preferences?.monthlyOverview ?? true}
          onCheckedChange={(checked) =>
            handleChange(checked, 'monthlyOverview')
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
          checked={preferences?.savings ?? true}
          onCheckedChange={(checked) => handleChange(checked, 'savings')}
        />
      </div>
    </div>
  );
}
