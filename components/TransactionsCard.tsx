import {
  Car,
  CreditCard,
  LucideIcon,
  MoveUpRight,
  Popcorn,
  ShoppingBag,
  ShoppingCart,
  Utensils,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

const transactionTypes: { type: string; icon: LucideIcon }[] = [
  { type: 'bill', icon: CreditCard },
  { type: 'groceries', icon: ShoppingCart },
  { type: 'entertainment', icon: Popcorn },
  { type: 'shopping', icon: ShoppingBag },
  { type: 'transport', icon: Car },
  { type: 'restaurant', icon: Utensils },
  { type: 'other', icon: MoveUpRight },
];

const transactions = [
  {
    id: 1,
    date: '2024-01-01',
    amount: 100,
    type: 'groceries',
    place: 'Walmart',
  },
  {
    id: 2,
    date: '2024-01-02',
    amount: 200,
    type: 'entertainment',
    place: 'Cocktail Bar',
  },
];

export function TransactionsCard() {
  return (
    <Card className="shadow-md dark:border-white/60">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
        </CardTitle>
        <CardDescription>You made 10 transactions this month.</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction) => {
          const transactionType = transactionTypes.find(
            (type) => type.type === transaction.type
          );
          const Icon = transactionType?.icon || MoveUpRight;
          return (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-4"
            >
              <div className="flex items-center gap-6">
                <Icon className="w-4 h-4" />
                <div>
                  <p className="capitalize font-semibold">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.place}
                  </p>
                </div>
              </div>

              <p className="font-bold">{formatCurrency(transaction.amount)}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
