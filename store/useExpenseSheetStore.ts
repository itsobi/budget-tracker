import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';

type ExpenseSheetStore = {
  isOpen: boolean;
  expenseId: Id<'expenses'> | undefined;
  open: (id?: Id<'expenses'>) => void;
  close: () => void;
};

export const useExpenseSheetStore = create<ExpenseSheetStore>()((set) => ({
  isOpen: false,
  expenseId: undefined,
  open: (id) => set({ isOpen: true, expenseId: id }),
  close: () => set({ isOpen: false, expenseId: undefined }),
}));
