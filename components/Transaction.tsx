import { Doc } from '@/convex/_generated/dataModel';
import { useTransactionSheetStore } from '@/store/useTransactionSheetStore';
import { LucideIcon } from 'lucide-react';

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

interface TransactionProps {
  transaction: Doc<'transactions'>;
  Icon: LucideIcon;
}

export function Transaction({ transaction, Icon }: TransactionProps) {
  const { open } = useTransactionSheetStore();
  return (
    <div
      key={transaction._id}
      onClick={() => open(transaction._id)}
      className="flex justify-between items-center p-4 cursor-pointer hover:bg-accent rounded-md"
    >
      <div className="flex items-center gap-6">
        <Icon className="w-4 h-4" />
        <div>
          <p className="capitalize font-semibold">{transaction.type}</p>
          <p className="text-xs text-muted-foreground">{transaction.title}</p>
        </div>
      </div>

      <p className="font-bold">{formatCurrency(transaction.amount)}</p>
    </div>
  );
}
