import { TransactionData } from '@/app/(app)/dashboard/_components/DownloadReportButton';
import * as XLSX from 'xlsx';

export const downloadReport = async (
  format: string,
  data: TransactionData[]
) => {
  if (!data) {
    return {
      success: false,
      message: 'Data is required',
    };
  }

  // Remove id column from data before generating report
  const dataWithoutId = data.map(({ id, ...rest }) => rest); // eslint-disable-line @typescript-eslint/no-unused-vars

  try {
    const worksheet = XLSX.utils.json_to_sheet(dataWithoutId);
    if (format === 'csv') {
      const csv = XLSX.utils.sheet_to_csv(worksheet, {
        forceQuotes: true,
      });
      return {
        success: true,
        message: 'Report downloaded',
        data: csv,
      };
    } else if (format === 'xlsx') {
      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      const buf = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'buffer',
      });

      return {
        success: true,
        message: 'Report downloaded',
        data: buf,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error downloading report',
    };
  }
};
