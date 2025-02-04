'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

function FeatureCard({
  title,
  description,
  emoji,
}: {
  title: string;
  description: string;
  emoji: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-card p-6 rounded-lg shadow-md relative"
    >
      <span className="absolute top-1 right-2">{emoji}</span>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export function CardSection() {
  const letters = 'Why Choose TracKiT?'.split('');
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <div ref={titleRef} className="container mx-auto">
      <div className="text-3xl font-bold mb-12 text-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="text-3xl font-bold mb-12 text-center"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="Simple Interface"
          description="No complicated menus or confusing charts. Upload your receipts, savings goals, and fixed expenses and we'll do the rest."
          emoji="😌"
        />
        <FeatureCard
          title="Quick Setup"
          description="Ger started in minutes. No lengthy onboarding process or complex configurations."
          emoji="🚀"
        />
        <FeatureCard
          title="Focus on Results"
          description="See your financial progress at a glance. We highlight what matters most."
          emoji="🎯"
        />
      </div>
    </div>
  );
}
