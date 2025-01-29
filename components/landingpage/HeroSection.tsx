'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section className="py-40 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          No BS. No Extra Bells and Whistles. Just Simple, Effective Budgeting.
        </h1>
        <p className="text-xl sm:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto">
          Track your spending effortlessly and take control of your finances –
          no distractions, no fluff.
        </p>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size="lg">
            <Link href="/auth" className="font-semibold">
              Start Tracking Now
            </Link>
          </Button>
        </motion.button>
      </motion.div>
    </section>
  );
}
