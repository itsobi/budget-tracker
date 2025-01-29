import { Doc } from '@/convex/_generated/dataModel';
import { useTransactionSheetStore } from '@/store/useTransactionSheetStore';

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

interface TransactionProps {
  transaction: Doc<'transactions'>;
  emoji: string;
}

export function Transaction({ transaction, emoji }: TransactionProps) {
  const { open } = useTransactionSheetStore();
  return (
    <div
      key={transaction._id}
      onClick={() => open(transaction._id)}
      className="flex justify-between items-center p-4 cursor-pointer hover:bg-accent rounded-md"
    >
      <div className="flex items-center gap-6">
        <span className="text-xl lg:text-2xl">{emoji}</span>
        <div>
          <p className="capitalize font-semibold">{transaction.title}</p>
          <p className="text-xs text-muted-foreground">{transaction.type}</p>
        </div>
      </div>

      <p className="font-bold">{formatCurrency(transaction.amount)}</p>
    </div>
  );
}
