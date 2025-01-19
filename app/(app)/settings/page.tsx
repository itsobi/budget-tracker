import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardPreferences } from './_components/DashboardPreferences';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { preloadQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const preloadedSettings = await preloadQuery(api.settings.getSettings, {
    userId,
  });

  return (
    <form className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Preferences</CardTitle>
          <CardDescription>
            Select which charts you'd like to see in your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <DashboardPreferences
            userId={userId}
            preloadedSettings={preloadedSettings}
          />
        </CardContent>
      </Card>
    </form>
  );
}
