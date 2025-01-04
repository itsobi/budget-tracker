'use client';

import CustomTooltip from '@/components/CustomTooltip';
import { Button } from '@/components/ui/button';
import { useExpenseSheetStore } from '@/store/useExpenseSheetStore';
import { Plus } from 'lucide-react';

export function AddExpenseButton() {
  const { open } = useExpenseSheetStore();
  return (
    <CustomTooltip description="Add Expense">
      <Button variant={'ghost'} onClick={() => open(undefined)}>
        <Plus />
      </Button>
    </CustomTooltip>
  );
}
