'use client';

import { motion, type Transition, type Variants } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';
import { type ReactNode, type HTMLAttributes } from 'react';

const fadeOnly = { opacity: 0 };
const fadeVisible = { opacity: 1 };

interface Props extends HTMLAttributes<HTMLDivElement> {
  initial?: Record<string, number | string>;
  whileInView?: Record<string, number | string>;
  variants?: Variants;
  viewport?: { once?: boolean; margin?: string };
  transition?: Transition;
  children: ReactNode;
}

export function MotionInView({ initial, whileInView, variants, viewport, transition, ...props }: Props) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div {...props} />;
  }

  return (
    <motion.div
      initial={fadeOnly}
      whileInView={fadeVisible}
      variants={variants}
      viewport={viewport ?? { once: true, margin: '-60px' }}
      transition={transition ?? { duration: 0.6 }}
      {...(props as object)}
    />
  );
}
