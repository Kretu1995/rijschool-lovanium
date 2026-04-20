'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Video background (place /public/hero-bg.mp4 to activate) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster="/hero-poster.jpg"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/30" />

      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] animate-glow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gold/8 blur-[100px] animate-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />

      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.03] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          {t('eyebrow')}
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl text-zinc-50 max-w-3xl"
          >
            {t('headline1')}
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="heading-xl gradient-text max-w-3xl"
          >
            {t('headline2')}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap items-center gap-4 mb-20"
        >
          <button
            onClick={() => scrollTo('booking')}
            className="btn-primary group text-base px-8 py-4"
          >
            {t('cta1')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="btn-outline text-base px-8 py-4"
          >
            {t('cta2')}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap gap-8 md:gap-16"
        >
          {(['1', '2', '3'] as const).map((n) => (
            <div key={n} className="group">
              <p className="text-4xl md:text-5xl font-black text-zinc-50 tracking-tight mb-1 group-hover:text-gold transition-colors duration-300">
                {t(`stat${n}Value`)}
              </p>
              <p className="text-sm text-zinc-500 uppercase tracking-widest">
                {t(`stat${n}Label`)}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={() => scrollTo('proof')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
      >
        <span className="text-xs tracking-widest uppercase">{t('scrollHint')}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
