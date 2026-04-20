'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection';

interface Testimonial {
  name: string;
  age: number;
  text: string;
  rating: number;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card-dark p-6 rounded-2xl flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-300 group"
    >
      <Quote size={20} className="text-gold opacity-60" />
      <p className="text-zinc-300 text-sm leading-relaxed flex-1">"{testimonial.text}"</p>
      <div className="flex items-center justify-between pt-2 border-t border-ink-border">
        <div>
          <p className="text-zinc-200 font-semibold text-sm">{testimonial.name}</p>
          <p className="text-zinc-600 text-xs">{testimonial.age} jaar</p>
        </div>
        <StarRating count={testimonial.rating} />
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  const t = useTranslations('proof');
  const testimonials = t.raw('testimonials') as Testimonial[];

  return (
    <section id="proof" className="section-padding bg-ink-surface">
      <div className="container-wide">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg text-zinc-50 mb-6">{t('headline')}</h2>

          {/* Google rating badge */}
          <div className="inline-flex items-center gap-4 bg-ink-card border border-ink-border rounded-2xl px-6 py-4 mt-2">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-black text-zinc-50">4.9</span>
                <StarRating />
              </div>
              <span className="text-zinc-500 text-xs">{t('ratingLabel')}</span>
            </div>
            <div className="w-px h-10 bg-ink-border" />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black text-zinc-50">600+</span>
              <span className="text-zinc-500 text-xs">{t('reviewsLabel')}</span>
            </div>
            <div className="w-px h-10 bg-ink-border" />
            <div className="flex items-center gap-2">
              {/* Google G logo */}
              <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-70">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-zinc-500 text-xs font-medium">Google</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>

        {/* Second row — 2 centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 lg:mx-16">
          {testimonials.slice(3, 5).map((t, i) => (
            <TestimonialCard key={i + 3} testimonial={t} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
