'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone, MapPin, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: 'easeOut', delay: 0.8 });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

export default function Hero() {
  const t = useTranslations('hero');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden pt-20">
      {/* Subtle background shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-50/60 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-8 w-[500px] h-[500px] rounded-full bg-gold-bg/70 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-navy-50/50 blur-[60px] pointer-events-none" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#0B2D5E 1px, transparent 1px), linear-gradient(90deg, #0B2D5E 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="tag">{t('eyebrow')}</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-navy">
                {t('headline1')}
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-gradient-gold">
                {t('headline2')}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <button
                onClick={() => scrollTo('booking')}
                className="btn-primary group text-base px-8 py-4"
              >
                {t('cta1')}
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollTo('pricing')}
                className="btn-outline text-base px-8 py-4"
              >
                {t('cta2')}
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              {[
                'Erkend door de overheid #2863',
                'Manueel & automaat',
                'WhatsApp bereikbaar',
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CheckCircle size={14} className="text-gold flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </motion.div>

            {/* Contact strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-surface-border"
            >
              <a href="tel:+32492482853" className="flex items-center gap-2 text-sm text-slate-500 hover:text-navy transition-colors">
                <Phone size={15} className="text-gold" />
                +32 492 48 28 53
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={15} className="text-gold" />
                Martelarenplein 20E, Leuven
              </div>
            </motion.div>
          </div>

          {/* Right: visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden bg-navy aspect-[4/5] shadow-navy">
              {/* Audi photo or gradient fallback */}
              <Image
                src="/audi-lovanium.jpg"
                alt="Rijschool Lovanium lesvoertuig"
                fill
                className="object-cover opacity-60"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />

              {/* Content on card */}
              <div className="absolute inset-0 flex flex-col justify-between p-10">
                <div>
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Rijschool Lovanium</p>
                  <p className="text-white/90 text-sm">Leuven · België</p>
                </div>

                {/* Animated stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-white/60 text-sm">{t('stat1Label')}</span>
                    <span className="text-white font-black text-xl"><AnimatedCounter to={97} suffix="%" /></span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-white/60 text-sm">{t('stat2Label')}</span>
                    <span className="text-white font-black text-xl"><AnimatedCounter to={10} suffix="+" /></span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="text-white/60 text-sm">{t('stat3Label')}</span>
                    <span className="text-white font-black text-xl"><AnimatedCounter to={500} suffix="+" /></span>
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  onClick={() => scrollTo('booking')}
                  className="w-full py-4 rounded-2xl bg-gold text-white font-bold text-sm tracking-wide hover:bg-gold-light transition-colors duration-200"
                >
                  {t('cta1')} →
                </button>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card px-5 py-4 border border-surface-border">
              <p className="text-2xl font-black text-navy">4.9 ★</p>
              <p className="text-slate-400 text-xs">Google Reviews</p>
            </div>

            {/* Floating bottom badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-5 py-3 border border-surface-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-bg flex items-center justify-center">
                <CheckCircle size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-navy font-bold text-sm">Erkenning #2863</p>
                <p className="text-slate-400 text-xs">Federale Overheid</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => scrollTo('proof')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-navy transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">{t('scrollHint')}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
