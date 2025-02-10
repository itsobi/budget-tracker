'use client';

import { Button } from '@/components/ui/button';
import { useSummaryDialog } from '@/store/useSumaryDialog';

export function ShowSummaryButton() {
  const { open } = useSummaryDialog();
  return (
    <Button className="font-bold" onClick={() => open()}>
      Show Summary
    </Button>
  );
}
