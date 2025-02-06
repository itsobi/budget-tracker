'use client';

import { Bar, BarChart, CartesianGrid, LabelList } from 'recharts';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useMediaQuery, useYearAndMonth } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartTooltip,
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Id } from '@/convex/_generated/dataModel';

const formatDollar = (
  value: string | number | (string | number)[],
  name: string | number // Allow both string and number for name parameter
) => {
  const val = Array.isArray(value) ? value[0] : value;
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(val));

  return (
    <>
      <div className="flex flex-1 justify-between leading-none items-center">
        <span className="text-muted-foreground">{String(name)}</span>
        <span className="font-mono font-medium tabular-nums text-foreground">
          {formattedValue}
        </span>
      </div>
    </>
  );
};

const chartConfig = {
  bills: {
    label: 'Bills',
    color: '#FF6B6B',
  },
  entertainment: {
    label: 'Entertainment',
    color: '#4ECDC4',
  },
  groceries: {
    label: 'Groceries',
    color: '#45B7D1',
  },
  other: {
    label: 'Other',
    color: '#96CEB4',
  },
  restaurant: {
    label: 'Restaurant',
    color: '#FFEEAD',
  },
  shopping: {
    label: 'Shopping',
    color: '#D4A5A5',
  },
  transportation: {
    label: 'Transportation',
    color: '#9B59B6',
  },
} satisfies ChartConfig;

export function MonthlyOverviewChart({
  userId,
}: {
  userId: Id<'users'> | null | undefined;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const yearAndMonth = useYearAndMonth();
  const transactions = useQuery(api.transactions.getTransactions, {
    userId: userId ?? '',
    yearAndMonth: yearAndMonth,
  });
  const preferences = useQuery(api.preferences.getPreferences, {
    userId: userId ?? '',
  });
  const chartData = Object.entries(
    transactions?.transactions?.reduce(
      (acc, transaction) => {
        const type = transaction.type;
        acc[type] = (acc[type] || 0) + transaction.amount;
        return acc;
      },
      {} as Record<string, number>
    ) ?? {}
  ).map(([type, amount]) => ({
    type,
    amount,
    fill: chartConfig[type as keyof typeof chartConfig].color,
  }));

  if (!preferences || preferences?.monthlyOverview) {
    return (
      <Card className="rounded-md shadow-md dark:border-white/60">
        <CardHeader>
          <CardTitle className="mb-2 lg:mb-0">Monthly Overview</CardTitle>
          <div className="flex items-start gap-2 text-xs text-muted-foreground flex-wrap">
            {chartData.map((item) => (
              <div key={item.type} className="flex items-center gap-0.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <p className="capitalize">{item.type}</p>
              </div>
            ))}
          </div>
        </CardHeader>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="flex-1 min-h-[200px]">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ bottom: 10 }}
            >
              <CartesianGrid vertical={false} />
              {/* <XAxis
                dataKey="type"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              /> */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent formatter={formatDollar} />}
              />
              <Bar dataKey="amount" radius={8} fill="var(--color-amount)">
                {isMobile && (
                  <LabelList
                    position="insideTop"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                    formatter={(value: number) =>
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(value)
                    }
                  />
                )}
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <CardContent>
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                No transactions found
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  return null;
}
