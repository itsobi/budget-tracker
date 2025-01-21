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
import PageHeader from '@/components/PageHeader';

export default async function PreferencesPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  const preloadedPreferences = await preloadQuery(
    api.preferences.getPreferences,
    {
      userId,
    }
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Preferences" />
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Dashboard Preferences</CardTitle>
          <CardDescription>
            Select which charts you'd like to see in your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <DashboardPreferences
            userId={userId}
            preloadedPreferences={preloadedPreferences}
          />
        </CardContent>
      </Card>
    </div>
  );
}
