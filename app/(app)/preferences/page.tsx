import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardPreferences } from './_components/DashboardPreferences';
import PageHeader from '@/components/PageHeader';

export default async function PreferencesPage() {
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
          <DashboardPreferences />
        </CardContent>
      </Card>
    </div>
  );
}
