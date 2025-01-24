'use client';

import CustomTooltip from './CustomTooltip';
import { Button } from './ui/button';

import { Receipt } from 'lucide-react';
import { useReceiptDialogStore } from '@/store/useReceiptDialogStore';

export function UploadReceiptButton() {
  const { open } = useReceiptDialogStore();
  return (
    <CustomTooltip description="Upload receipt">
      <Button variant={'ghost'} onClick={open}>
        <Receipt size={18} />
      </Button>
    </CustomTooltip>
  );
}
