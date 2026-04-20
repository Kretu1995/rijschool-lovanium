'use client';

import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variant?: string;
  delay?: number;
  stagger?: boolean;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>;
}

export function AnimatedItem({ children, className }: AnimatedSectionProps) {
  return <div className={className}>{children}</div>;
}
