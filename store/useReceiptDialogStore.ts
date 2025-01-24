import { create } from 'zustand';

type ReceiptDialogStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useReceiptDialogStore = create<ReceiptDialogStore>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
