'use client';

import { useTransactionSheetStore } from '@/store/useTransactionSheetStore';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function AddTransactionButton() {
  const { open } = useTransactionSheetStore();
  return (
    <Button variant={'ghost'} onClick={() => open(undefined)}>
      <Plus />
    </Button>
  );
}
