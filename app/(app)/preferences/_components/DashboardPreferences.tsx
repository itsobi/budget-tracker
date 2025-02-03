'use client';

import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { toast } from 'sonner';

export function DashboardPreferences() {
  const userId = useQuery(api.helpers.getUserId);
  const preferences = useQuery(api.preferences.getPreferences, {
    userId: userId ?? '',
  });
  const isMember = useQuery(api.helpers.isMember);
  console.log(isMember);

  const updatePreferences = useMutation(api.preferences.updatePreferences);

  const handleChange = async (checked: boolean, name: string) => {
    try {
      await updatePreferences({
        userId: userId ?? '',
        [name]: checked,
      });
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  if (isMember) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Dashboard Preferences</CardTitle>
          <CardDescription>
            Select which charts you'd like to see in your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
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
        </CardContent>
      </Card>
    );
  } else {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <AnimatedCTAButton text="Upgrade to Pro" href="/pro" />
        </div>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Dashboard Preferences</CardTitle>
            <CardDescription>
              Upgrade to Pro to unlock widget customization!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-semibold">Monthly Overview</h4>
                  <p className="text-sm text-muted-foreground">
                    Displays your spending across different categories.
                  </p>
                </div>
                <Switch disabled />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="font-semibold">Savings Goals</h4>
                  <p className="text-sm text-muted-foreground">
                    Displays your savings progress.
                  </p>
                </div>
                <Switch disabled />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
