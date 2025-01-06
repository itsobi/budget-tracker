'use client';

import { Switch } from '@/components/ui/switch';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { toast } from 'sonner';

interface DashboardPreferencesProps {
  userId: string;
}

export function DashboardPreferences({ userId }: DashboardPreferencesProps) {
  const settings = useQuery(api.settings.getSettings, { userId });
  const updateSettings = useMutation(api.settings.updateSettings);

  const handleChange = async (checked: boolean, name: string) => {
    try {
      await updateSettings({
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
          <h4 className="font-semibold">Budget Breakdown</h4>
          <p className="text-sm text-muted-foreground">
            Displays your budget allocation across different categories.
          </p>
        </div>
        <Switch
          name="budgetBreakdown"
          checked={settings?.budgetBreakdown || false}
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
          checked={settings?.savings || false}
          onCheckedChange={(checked) => handleChange(checked, 'savings')}
        />
      </div>
    </div>
  );
}
