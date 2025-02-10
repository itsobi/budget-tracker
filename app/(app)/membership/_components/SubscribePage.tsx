'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { SubscribeCard } from './SubscribeCard';
import { useSession } from 'next-auth/react';

export function SubscribePage() {
  const { data: session } = useSession();
  const authId = session?.user?.id;
  const user = useQuery(api.users.getUserByAuthId, {
    authId: authId ?? '',
  });
  const isMember = user?.isMember ?? false;

  return (
    <div className="flex flex-col items-center mt-10 md:mt-0">
      <div className="text-4xl lg:text-6xl font-bold">
        {isMember ? 'TracKiT Member' : 'Become a TracKiT Member'}
      </div>

      <p className="text-lg text-muted-foreground mt-1">
        {isMember
          ? 'All TracKiT features that are available to you.'
          : 'Get access to all the features of TracKiT.'}
      </p>

      {!isMember && (
        <div className="mt-4">
          <Tabs defaultValue="one-time">
            <TabsList>
              <TabsTrigger value="one-time">One-Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      <div className="mt-4">
        <SubscribeCard isMember={isMember} />
      </div>
    </div>
  );
}
