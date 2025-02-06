'use client';

import { Bar, XAxis } from 'recharts';
import { BarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../../components/ui/chart';
import { Card, CardHeader, CardTitle } from '../../../../components/ui/card';

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

const chartData = [
  { month: 'January', desktop: 186.0, mobile: 80 },
  //   { month: 'February', desktop: 305, mobile: 200 },
  //   { month: 'March', desktop: 237, mobile: 120 },
  //   { month: 'April', desktop: 73, mobile: 190 },
  //   { month: 'May', desktop: 209, mobile: 130 },
  //   { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function ExpenseBreakdownChart({}) {
  return (
    <Card className="rounded-md shadow-md dark:border-white/60">
      <CardHeader>
        <CardTitle>Expenses Breakdown</CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            content={<ChartTooltipContent formatter={formatDollar} />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
