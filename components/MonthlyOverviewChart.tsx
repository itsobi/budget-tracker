'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useMediaQuery } from '@/lib/hooks';

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

interface MonthlyOverviewChartProps {
  preloadedTransactions: Preloaded<typeof api.transactions.getTransactions>;
}

export function MonthlyOverviewChart({
  preloadedTransactions,
}: MonthlyOverviewChartProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const transactions = usePreloadedQuery(preloadedTransactions);

  const chartData = transactions.map((transaction) => ({
    type: transaction.type,
    amount: transaction.amount,
    fill: chartConfig[transaction.type as keyof typeof chartConfig].color,
  }));

  return (
    <Card className="rounded-md shadow-md dark:border-white/60">
      <CardHeader className="flex items-center">
        <CardTitle className="mb-2 lg:mb-0">Monthly Overview</CardTitle>
        <div className="lg:hidden flex items-start gap-2 text-xs text-muted-foreground flex-wrap">
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
      <div className="flex items-center">
        <ChartContainer config={chartConfig} className="flex-1 min-h-[200px]">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value.length > 6 ? value.slice(0, 3) + '.' : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent formatter={formatDollar} />}
            />
            <Bar dataKey="amount" radius={8} fill="var(--color-amount)">
              {isMobile && (
                <LabelList
                  position="top"
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
        <div className="hidden lg:block p-2 text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            {chartData.map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="capitalize">{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
