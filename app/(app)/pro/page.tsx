import PageHeader from '@/components/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscribeCard } from './_components/SubscribeCard';

export default function PropPage() {
  return (
    <main className="w-full">
      <PageHeader title="Pro" />
      <div className="flex flex-col items-center mt-10 md:mt-0">
        <div className="text-4xl lg:text-6xl font-bold">
          Upgrade to TracKiT Pro
        </div>

        <p className="text-lg text-muted-foreground mt-1">
          Get access to all the features of TracKiT.
        </p>

        <div className="mt-4">
          <Tabs defaultValue="one-time">
            <TabsList>
              <TabsTrigger value="one-time">One-Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-4">
          <SubscribeCard />
        </div>
      </div>
    </main>
  );
}
