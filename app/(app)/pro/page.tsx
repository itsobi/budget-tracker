import PageHeader from '@/components/PageHeader';
import { SubscribePage } from './_components/SubscribePage';

export default function ProPage() {
  return (
    <main className="w-full">
      <PageHeader title="Pro" />
      <SubscribePage />
    </main>
  );
}
