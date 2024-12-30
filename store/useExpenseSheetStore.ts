import { create } from 'zustand';

type ExpenseSheetStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useExpenseSheetStore = create<ExpenseSheetStore>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
