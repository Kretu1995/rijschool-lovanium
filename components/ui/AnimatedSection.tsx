'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  stagger?: boolean;
}

export function AnimatedSection({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  const selectedVariants = stagger ? containerVariants : variants[variant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger ? containerVariants : variants[variant]}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
