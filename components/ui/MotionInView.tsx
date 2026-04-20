'use client';

import { motion, type Transition, type Variants } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';
import { type ReactNode, type HTMLAttributes } from 'react';

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
      initial={initial}
      whileInView={whileInView}
      variants={variants}
      viewport={viewport ?? { once: true, margin: '-60px' }}
      transition={transition}
      {...(props as object)}
    />
  );
}
