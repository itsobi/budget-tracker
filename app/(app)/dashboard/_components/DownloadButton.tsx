import CustomTooltip from '@/components/CustomTooltip';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function DownloadButton() {
  return (
    <CustomTooltip description="Download">
      <Button variant={'ghost'}>
        <Download />
      </Button>
    </CustomTooltip>
  );
}
