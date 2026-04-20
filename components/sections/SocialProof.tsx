'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  date: string;
}

const avatarColors = [
  '#0B2D5E', '#C8963E', '#1a4a8a', '#7B3F00',
  '#6B21A8', '#065F46', '#9D174D', '#1E3A5F',
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const color = avatarColors[index % avatarColors.length];
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-2xl border border-surface-border shadow-card p-5 flex flex-col gap-3 mx-2">
      <div className="flex items-center justify-between">
        <StarRating count={item.rating} />
        {/* Google G */}
        <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-40">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed flex-1 line-clamp-4">"{item.text}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-surface-border">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="text-navy font-bold text-xs">{item.name}</p>
          <p className="text-slate-400 text-[10px]">{item.date}</p>
        </div>
      </div>
    </div>
  );
}

function ScrollRow({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex py-3"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={i} item={item} index={i % items.length} />
        ))}
      </motion.div>
    </div>
  );
}

export default function SocialProof() {
  const t = useTranslations('proof');
  const testimonials = t.raw('testimonials') as Testimonial[];

  const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const row2 = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section id="proof" className="section-padding bg-surface overflow-hidden">
      <div className="container-wide">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="eyebrow mb-3">{t('eyebrow')}</p>
            <h2 className="heading-lg">{t('headline')}</h2>
          </div>

          {/* Google rating badge */}
          <div className="flex-shrink-0 bg-white rounded-2xl border border-surface-border shadow-card px-6 py-5 flex items-center gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-black text-navy">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <p className="text-slate-400 text-xs">{t('ratingLabel')}</p>
            </div>
            <div className="w-px h-10 bg-surface-border" />
            <div>
              <p className="text-xl font-black text-navy">50+</p>
              <p className="text-slate-400 text-xs">{t('reviewsLabel')}</p>
            </div>
            <div className="w-px h-10 bg-surface-border" />
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </div>
        </AnimatedSection>
      </div>

      {/* Full-width scrolling rows */}
      <div className="space-y-4">
        <ScrollRow items={row1} />
        <ScrollRow items={row2.length > 0 ? row2 : row1} reverse />
      </div>
    </section>
  );
}
