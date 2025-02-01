'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Transaction } from './columns';
import { useTransactionSheetStore } from '@/store/useTransactionSheetStore';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { toast } from 'sonner';

interface ActionsProps {
  transaction: Transaction;
}

export function Actions({ transaction }: ActionsProps) {
  const { open } = useTransactionSheetStore();
  const deleteTransaction = useMutation(api.transactions.deleteTransaction);
  const userId = useQuery(api.helpers.currentUser);

  const handleDelete = async () => {
    const response = await deleteTransaction({
      id: transaction.id as Id<'transactions'>,
      userId: userId?._id ?? '',
    });
    if (response.success) {
      toast.success('Transaction deleted successfully!');
    } else {
      toast.error('Failed to delete transaction.');
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <Pencil
        onClick={() => open(transaction.id as Id<'transactions'>)}
        className="w-4 h-4 hover:cursor-pointer hover:text-green-500 transition-all duration-100 ease-in-out"
      />
      <ConfirmDialog
        title="Delete Transaction"
        triggerComponent={
          <Trash2 className="w-4 h-4 hover:cursor-pointer text-red-500 hover:text-red-600 transition-all duration-100 ease-in-out" />
        }
        confirmText="Delete"
        description="Are you sure you want to delete this transaction?"
        onConfirm={handleDelete}
      />
    </div>
  );
}
