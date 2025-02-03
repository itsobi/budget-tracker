'use client';

import CustomTooltip from '@/components/CustomTooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import CSVLogo from '@/svg/csv-logo';
import XLSXLogo from '@/svg/xlsx-logo';
import { TransactionType } from '../../transactions/_components/columns';
import { Id } from '@/convex/_generated/dataModel';
import { downloadReport } from '@/lib/actions/downloadReport';
import { toast } from 'sonner';

export type TransactionData = {
  id: Id<'transactions'>;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
};

export function DownloadReportButton({ data }: { data: TransactionData[] }) {
  const abbreviatedMonth = new Date()
    .toLocaleString('default', {
      month: 'short',
    })
    .toLocaleLowerCase();
  const year = new Date().getFullYear();

  const handleDownload = async (format: string) => {
    try {
      const reportData = await downloadReport(format, data);

      // Create a Blob from the CSV string
      if (!reportData?.data) throw new Error('No data received');
      const blob = new Blob([reportData.data], {
        type:
          format === 'csv'
            ? 'text/csv'
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        format === 'csv'
          ? `${abbreviatedMonth}-transactions-${year}.csv`
          : `${abbreviatedMonth}-transactions-${year}.xlsx`
      );

      // Append to document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <CustomTooltip description="Download Report">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Download />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28 cursor-pointer">
            <DropdownMenuItem
              onClick={() =>
                toast.promise(handleDownload('csv'), {
                  loading: 'Downloading report... 📥',
                  success: 'Report downloaded 💪',
                  error: 'Error downloading report ❌',
                })
              }
              className="cursor-pointer"
            >
              <CSVLogo />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                toast.promise(handleDownload('xlsx'), {
                  loading: 'Downloading report... 📥',
                  success: 'Report downloaded 💪',
                  error: 'Error downloading report ❌',
                })
              }
              className="cursor-pointer"
            >
              <XLSXLogo />
              XLSX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CustomTooltip>
  );
}
