'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Phone, MapPin, Star, Shield, CheckCircle, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);
  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: 'easeOut', delay: 0.9 });
    return controls.stop;
  }, [count, to]);
  return <motion.span>{rounded}</motion.span>;
}

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const statLabels = t.raw('statLabels') as string[];

  return (
    <section className="relative bg-white overflow-hidden">

      {/* Subtle top teal accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent z-10" />

      {/* Background: right half tinted */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-surface hidden lg:block" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-0 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="relative z-10 pb-12 lg:pb-20">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold-dark border border-gold/20 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
                <Shield size={11} />
                {t('eyebrow')}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-green-700 text-[11px] font-semibold">{t('available')}</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5"
            >
              <h1 className="text-5xl md:text-6xl xl:text-[68px] font-black tracking-tight leading-[1.05] text-navy">
                {t('headline1')}
              </h1>
              <h1 className="text-5xl md:text-6xl xl:text-[68px] font-black tracking-tight leading-[1.05] text-gold">
                {t('headline2')}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            >
              {t('subtitle')}
            </motion.p>

            {/* Trust bullets */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-9"
            >
              {(t.raw('trustBullets') as string[]).map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 bg-navy/5 border border-navy/10 rounded-full px-3.5 py-1.5"
                >
                  <CheckCircle size={12} className="text-gold flex-shrink-0" />
                  <span className="text-navy/70 text-xs font-semibold">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href={`/${locale}/inschrijven`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-bold text-sm shadow-[0_4px_20px_rgba(3,193,179,0.35)] hover:shadow-[0_6px_28px_rgba(3,193,179,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
              >
                {t('cta1')}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button
                onClick={() => scrollTo('pricing')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-navy/15 text-navy font-bold text-sm hover:border-navy/30 hover:bg-navy/5 transition-all duration-200"
              >
                {t('cta2')}
              </button>
            </motion.div>

            {/* Google strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap items-center gap-5 pt-6 border-t border-slate-100"
            >
              {/* Google rating inline */}
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-navy font-black text-sm">4.9</span>
                <span className="text-slate-400 text-xs">Google Reviews</span>
              </div>

              <a href="tel:+32492482853" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-navy transition-colors">
                <Phone size={12} className="text-gold" />
                +32 492 48 28 53
              </a>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <MapPin size={12} className="text-gold" />
                Leuven
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Photo Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-6 bg-gold/10 rounded-3xl blur-2xl pointer-events-none" />

            {/* Main photo card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '520px' }}>
              <Image
                src="/audi-lovanium.jpg"
                alt="Rijschool Lovanium Audi A3"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

              {/* Bottom text overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Rijschool Lovanium</p>
                <p className="text-white font-bold text-lg">Audi A3 · Leuven</p>
              </div>
            </div>

            {/* Floating: Google card (top-left) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -left-6 bg-white rounded-2xl shadow-xl px-5 py-3.5 flex items-center gap-3 border border-slate-100 z-20"
            >
              <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Award size={18} className="text-gold" />
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-navy font-black text-sm leading-none">4.9 <span className="font-normal text-slate-400 text-xs">Google</span></p>
              </div>
            </motion.div>

            {/* Floating: 97% card (top-right) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 -right-5 bg-navy rounded-2xl shadow-xl px-5 py-3.5 z-20"
            >
              <p className="text-gold font-black text-2xl leading-none">97%</p>
              <p className="text-white/50 text-[10px] mt-0.5 whitespace-nowrap">{statLabels[0]}</p>
            </motion.div>

            {/* Floating: badge bottom-right */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -right-5 bg-white rounded-2xl shadow-xl px-4 py-3 border border-slate-100 z-20"
            >
              <div className="flex items-center gap-2">
                <Shield size={15} className="text-gold" />
                <div>
                  <p className="text-navy font-bold text-xs leading-none">Erkend</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">#2863</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative mt-12 border-t border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { value: 97, suffix: '%' },
              { value: 10, suffix: '+' },
              { value: 7, suffix: '' },
              { value: 500, suffix: '+' },
            ].map((stat, i) => (
              <div key={i} className="px-6 py-8 text-center">
                <p className="text-3xl font-black text-navy leading-none mb-1">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-slate-400 text-xs font-medium">{statLabels[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
