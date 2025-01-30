import { create } from 'zustand';

type SummaryDialogProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useSummaryDialog = create<SummaryDialogProps>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
