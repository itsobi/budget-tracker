'use client';

import { motion } from 'motion/react';
import dashboardImage from '../../public/images/dashboard.png';
import monthlySummaryImage from '../../public/images/monthly-summary.png';
import transactions from '../../public/images/transactions.png';
import uploadReceipt from '../../public/images/upload-receipt.png';
import Image from 'next/image';

export function ImageCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-center items-center mx-auto py-20 w-full max-w-7xl overflow-hidden">
        <div className="flex overflow-hidden">
          <div className="flex space-x-16 animate-scroll">
            <Image
              src={dashboardImage}
              alt="Dashboard"
              width={600}
              height={400}
              className="object-contain rounded"
            />
            <Image
              src={monthlySummaryImage}
              alt="Monthly Summary"
              width={600}
              height={400}
              className="object-contain rounded"
            />
            <Image
              src={transactions}
              alt="Transactions"
              width={600}
              height={400}
              className="object-contain rounded"
            />
            <Image
              src={uploadReceipt}
              alt="Upload Receipt"
              width={600}
              height={400}
              className="object-contain rounded"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
