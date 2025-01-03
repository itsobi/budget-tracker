'use client';

import { Button } from '@/components/ui/button';
import { useExpenseSheetStore } from '@/store/useExpenseSheetStore';
import { PlusCircle } from 'lucide-react';

export function AddExpenseButton() {
  const { open } = useExpenseSheetStore();
  return (
    <Button onClick={() => open(undefined)}>
      <PlusCircle />
      Add Expense
    </Button>
  );
}
