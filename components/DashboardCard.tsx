import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DashboardCardProps {
  title: string;
  amount: number;
  Icon: React.ElementType;
  subtitle: string;
}

export function DashboardCard({
  title,
  amount,
  Icon,
  subtitle,
}: DashboardCardProps) {
  return (
    <Card className="shadow-md dark:border-white/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h2 className="text-sm font-normal">{title}</h2>
          <Icon />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${amount}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
