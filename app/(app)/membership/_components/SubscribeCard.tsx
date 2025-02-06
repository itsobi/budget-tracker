'use client';

import { Check } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const features = [
  {
    text: '☑️ Unlimited Fixed Expenses, Transactions, and Savings',
  },
  {
    text: '☑️ Data exports directly to your downloads folder',
  },
  {
    text: '☑️ Show/hide dashboard widgets',
  },
  {
    text: '☑️ Feature requests via email',
  },
  {
    text: '☑️ 24/7 Priority support via email',
  },
];

export function SubscribeCard({ isMember }: { isMember: boolean | undefined }) {
  const userId = useQuery(api.helpers.getUserId);

  return (
    <Card className="w-[350px] shadow-md dark:border-2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-1">⭐ Member</div>

          <div className="flex justify-center items-center border rounded-full p-1 bg-gradient-to-r from-blue-600 to-cyan-500">
            <Check className="w-4 h-4 text-white" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-4xl font-bold">
            $10
            <span className="text-sm font-thin text-muted-foreground ml-0.5">
              one-time payment
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {features.map((feature) => (
            <div key={feature.text}>{feature.text}</div>
          ))}
        </div>
      </CardContent>

      {!isMember && (
        <CardFooter className="flex justify-center">
          <form action="/api/checkout" method="POST" className="w-full">
            <input type="hidden" name="userId" value={userId ?? ''} />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold transition-all duration-500 hover:scale-105"
            >
              Upgrade
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  );
}
