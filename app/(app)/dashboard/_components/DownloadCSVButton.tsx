import CustomTooltip from '@/components/CustomTooltip';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function DownloadCSVButton() {
  return (
    <CustomTooltip description="Download CSV">
      <Button variant={'ghost'}>
        <Download />
      </Button>
    </CustomTooltip>
  );
}
