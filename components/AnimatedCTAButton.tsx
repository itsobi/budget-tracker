'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

interface AnimatedCTAButtonProps {
  text: string;
  href: string;
}

export function AnimatedCTAButton({ text, href }: AnimatedCTAButtonProps) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={() => router.push(href)}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <span className="font-semibold">{text}</span>
        <motion.span
          className="inline-block ml-2"
          initial={{ x: 0 }}
          animate={{ x: 5 }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 0.8,
            repeatType: 'reverse',
          }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.span>
      </Button>
    </motion.div>
  );
}
