import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SubscribeTab() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
