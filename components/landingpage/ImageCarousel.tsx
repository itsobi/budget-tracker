'use client';

import { motion } from 'motion/react';
import dashboardImage from '../../public/images/dashboard.png';
import monthlySummaryImage from '../../public/images/monthly-summary.png';
import transactions from '../../public/images/transactions.png';
import uploadReceipt from '../../public/images/upload-receipt.png';
import Image from 'next/image';

export function ImageCarousel() {
  const images = [
    { src: dashboardImage, alt: 'Dashboard' },
    { src: monthlySummaryImage, alt: 'Monthly Summary' },
    { src: transactions, alt: 'Transactions' },
    { src: uploadReceipt, alt: 'Upload Receipt' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative flex w-full overflow-x-hidden py-12">
          <div className="animate-scroll flex space-x-4 md:space-x-8">
            {images.map((image, idx) => (
              <div
                key={`${image.alt}-${idx}`}
                className="relative min-w-[280px] shrink-0 md:min-w-[400px] lg:min-w-[500px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="h-auto w-full rounded-lg shadow-lg md:h-[300px] object-cover"
                />
              </div>
            ))}
            {images.map((image, idx) => (
              <div
                key={`${image.alt}-duplicate-${idx}`}
                className="relative min-w-[280px] shrink-0 md:min-w-[400px] lg:min-w-[500px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="h-auto w-full rounded-lg shadow-lg md:h-[300px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
