import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';

type TransactionSheetStore = {
  isOpen: boolean;
  transactionId: Id<'transactions'> | undefined;
  open: (id?: Id<'transactions'>) => void;
  close: () => void;
};

export const useTransactionSheetStore = create<TransactionSheetStore>()(
  (set) => ({
    isOpen: false,
    transactionId: undefined,
    open: (id) => set({ isOpen: true, transactionId: id }),
    close: () => set({ isOpen: false, transactionId: undefined }),
  })
);
