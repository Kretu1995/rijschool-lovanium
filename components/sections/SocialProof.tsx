'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
  date: string;
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card-light-hover p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <Quote size={20} className="text-gold/40" />
        <StarRating count={item.rating} />
      </div>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">"{item.text}"</p>
      <div className="flex items-center justify-between pt-3 border-t border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
            {item.name.charAt(0)}
          </div>
          <p className="text-navy font-semibold text-sm">{item.name}</p>
        </div>
        <p className="text-slate-400 text-xs">{item.date}</p>
      </div>
    </motion.div>
  );
}

export default function SocialProof() {
  const t = useTranslations('proof');
  const testimonials = t.raw('testimonials') as Testimonial[];

  return (
    <section id="proof" className="section-padding bg-surface">
      <div className="container-wide">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="eyebrow mb-3">{t('eyebrow')}</p>
            <h2 className="heading-lg">{t('headline')}</h2>
          </div>

          {/* Google rating */}
          <div className="flex-shrink-0 card-light px-6 py-5 flex items-center gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-black text-navy">4.9</span>
                <StarRating />
              </div>
              <p className="text-slate-400 text-xs">{t('ratingLabel')}</p>
            </div>
            <div className="w-px h-10 bg-surface-border" />
            <div>
              <p className="text-xl font-black text-navy">7+</p>
              <p className="text-slate-400 text-xs">{t('reviewsLabel')}</p>
            </div>
            <div className="w-px h-10 bg-surface-border" />
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 6).map((item, i) => (
            <TestimonialCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Last one full-width highlight */}
        {testimonials[6] && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-5 card-light p-8 border-l-4 border-l-gold"
          >
            <div className="flex items-start gap-4">
              <Quote size={24} className="text-gold flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-slate-600 leading-relaxed mb-4">"{testimonials[6].text}"</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                      {testimonials[6].name.charAt(0)}
                    </div>
                    <p className="text-navy font-semibold text-sm">{testimonials[6].name}</p>
                  </div>
                  <StarRating count={testimonials[6].rating} />
                  <p className="text-slate-400 text-xs">{testimonials[6].date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
