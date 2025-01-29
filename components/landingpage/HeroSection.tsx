'use client';

import { motion } from 'motion/react';
import { AnimatedCTAButton } from '../AnimatedCTAButton';

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
        <AnimatedCTAButton text="Start Tracking Now" href="/auth" />
      </motion.div>
    </section>
  );
}
