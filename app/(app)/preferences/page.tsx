import { DashboardPreferences } from './_components/DashboardPreferences';
import PageHeader from '@/components/PageHeader';

export default async function PreferencesPage() {
  return (
    <div>
      <PageHeader title="Preferences" />
      <div>
        <DashboardPreferences />
      </div>
    </div>
  );
}
