'use client';

import { type ReactNode, type HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  initial?: Record<string, number | string>;
  whileInView?: Record<string, number | string>;
  viewport?: { once?: boolean; margin?: string };
  transition?: object;
  children: ReactNode;
}

export function MotionInView({ initial, whileInView, viewport, transition, ...props }: Props) {
  return <div {...props} />;
}
