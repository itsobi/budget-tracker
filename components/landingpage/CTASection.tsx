'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { AnimatedCTAButton } from '../AnimatedCTAButton';

export function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-6">
        Ready to Take Control of Your Finances?
      </h2>
      <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
        Simplify your budgeting process and achieve your financial goals!
      </p>
      <AnimatedCTAButton text="Create Your Free Account" href="/auth" />
    </motion.div>
  );
}
