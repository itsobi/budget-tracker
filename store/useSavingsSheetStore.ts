import { Id } from '@/convex/_generated/dataModel';
import { create } from 'zustand';

type SavingsSheetStore = {
  isOpen: boolean;
  savingsId: Id<'savings'> | undefined;
  open: (id?: Id<'savings'>) => void;
  close: () => void;
};

export const useSavingsSheetStore = create<SavingsSheetStore>()((set) => ({
  isOpen: false,
  savingsId: undefined,
  open: (id) => set({ isOpen: true, savingsId: id }),
  close: () => set({ isOpen: false, savingsId: undefined }),
}));
