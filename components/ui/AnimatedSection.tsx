'use client';

import { motion, Variants, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

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

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  stagger?: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export function AnimatedSection({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  stagger = false,
}: AnimatedSectionProps) {
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const noAnimation = isMobile || prefersReduced;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={noAnimation ? staticVariants : (stagger ? containerVariants : variants[variant])}
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
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const noAnimation = isMobile || prefersReduced;

  return (
    <motion.div
      className={className}
      variants={noAnimation ? staticVariants : variants[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
