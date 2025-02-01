import { DashboardPreferences } from './_components/DashboardPreferences';
import PageHeader from '@/components/PageHeader';

export default async function PreferencesPage() {
  return (
    <div>
      <PageHeader title="Preferences" />
      <div className="pt-10 lg:pt-0">
        <DashboardPreferences />
      </div>
    </div>
  );
}
