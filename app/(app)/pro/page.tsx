import PageHeader from '@/components/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { AnimatedCTAButton } from '@/components/AnimatedCTAButton';

const features = [
  {
    text: '- Unlimited Fixed Expenses, Transactions, and Savings',
  },
  {
    text: '- CSV dashboard exports',
  },
  {
    text: '- Feature requests via email',
  },
  {
    text: '- 24/7 Priority support via email',
  },
];

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
          <Card className="w-[350px] shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Sparkles />
                  Pro
                </div>

                <div className="flex justify-center items-center border rounded-full p-1 bg-gradient-to-r from-blue-600 to-cyan-500">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-4xl font-bold">
                  $7
                  <span className="text-sm font-thin text-muted-foreground">
                    one-time payment
                  </span>
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {features.map((feature) => (
                  <div key={feature.text}>{feature.text}</div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-center">
              <AnimatedCTAButton text="Upgrade to Pro" href="/pro" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
