'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

export default function Animate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: 'easeInOut', duration: 0.8 }}>
      {children}
    </motion.div>
  );
}
