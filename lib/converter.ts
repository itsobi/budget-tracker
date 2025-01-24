import { createWorker } from 'tesseract.js';

export const convertReceiptToText = async (
  imageUrl: string
): Promise<{ storeName: string | null; total: number | null }> => {
  const worker = await createWorker('eng');
  const response = await worker.recognize(imageUrl);
  const text = response.data.text;
  await worker.terminate();

  // Store name patterns - typically found at the top of receipts
  const storeNamePatterns = [
    // Pattern: Large text/logo style store names at the very top
    /^[\s\n]*([A-Z][A-Z\s&']+(?:\s+WHOLESALE)?)/m,

    // Common pattern: Store name in all caps at start of receipt
    /^[\s\n]*([A-Z][A-Z\s&']+(?:INC|LLC|LTD)?\.?)[\s\n]/m,

    // Pattern: "Welcome to" or "Thank you for shopping at"
    /(?:Welcome to|Thank you for shopping at)\s+([A-Za-z0-9\s&']+?)(?:\n|\s{2,})/i,

    // Pattern: Store name followed by address
    /^[\s\n]*([A-Za-z0-9\s&']+?)[\s\n]+\d+\s+[A-Za-z\s]+,?\s+[A-Z]{2}\s+\d{5}/m,
  ];

  // Try to find store name
  let storeName = null;
  for (const pattern of storeNamePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      storeName = match[1].trim();
      break;
    }
  }

  // Common patterns for totals in receipts, ordered by reliability
  const amountPatterns = [
    // Pattern: "TOTAL" on a line without "SUB" or "TAX" before it
    /(?<!SUB|TAX\s)TOTAL\s*[\$]?\s*(\d+[.,]\d{2})/i,

    // Pattern: "AMOUNT" specifically in payment/card section
    /AMOUNT\s*:\s*[\$]?\s*(\d+[.,]\d{2})/i,

    // Pattern: "Grand Total" followed by numbers
    /Grand Total\s*[\$]?\s*(\d+[.,]\d{2})/i,

    // Pattern: "Balance Due" followed by numbers
    /Balance Due\s*[\$]?\s*(\d+[.,]\d{2})/i,

    // Pattern: "To Pay" or "To be paid" followed by numbers
    /To\s*(be\s*)?Pay\s*[\$]?\s*(\d+[.,]\d{2})/i,

    // Pattern: Numbers at the end of a line with $ symbol
    // (but not if preceded by "SUB" or "TAX")
    /(?<!SUB|TAX).{0,10}\$\s*(\d+[.,]\d{2})\s*$/im,
  ];

  let total = null;

  // Try each pattern until we find a match
  for (const pattern of amountPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      // Get the last capture group (some patterns have multiple groups)
      const matchValue = matches[matches.length - 1];
      // Clean up the matched number
      const cleanNumber = matchValue.replace(',', '.');
      const amount = parseFloat(cleanNumber);
      if (!isNaN(amount)) {
        total = amount;
        break;
      }
    }
  }

  // If no patterns matched, try to find the final total by looking for
  // the last number after "TOTAL" that isn't a "TAX TOTAL"
  if (total === null) {
    const allTotals = Array.from(
      text.matchAll(/(?<!TAX\s)TOTAL\s*[\$]?\s*(\d+[.,]\d{2})/gi)
    );
    if (allTotals.length > 0) {
      const lastTotal = allTotals[allTotals.length - 1][1].replace(',', '.');
      total = parseFloat(lastTotal);
    }
  }

  return { storeName, total };
};
