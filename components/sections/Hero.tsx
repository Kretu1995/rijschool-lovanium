'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Phone, MapPin, Star, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
  const locale = useLocale();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative bg-navy overflow-hidden min-h-screen flex flex-col">

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,150,62,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(11,45,94,0.6)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 pt-20">

        {/* Main content row */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">

              {/* Left: text */}
              <div className="py-10 lg:py-16 max-w-xl">

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3 mb-7"
                >
                  <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                    <Shield size={12} className="text-gold" />
                    <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">{t('eyebrow')}</span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6"
                >
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.02] text-white">
                    {t('headline1')}
                  </h1>
                  <h1 className="text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.02] text-gold">
                    {t('headline2')}
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-white/60 text-base md:text-lg leading-relaxed mb-9 max-w-md"
                >
                  {t('subtitle')}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <Link
                    href={`/${locale}/inschrijven`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-bold text-sm hover:bg-gold-light hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    {t('cta1')}
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={() => scrollTo('pricing')}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-200"
                  >
                    {t('cta2')}
                  </button>
                </motion.div>

                {/* Contact strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-wrap gap-5 pt-6 border-t border-white/10"
                >
                  <a href="tel:+32492482853" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <Phone size={13} className="text-gold" />
                    +32 492 48 28 53
                  </a>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <MapPin size={13} className="text-gold" />
                    Martelarenplein 20E, Leuven
                  </div>
                </motion.div>
              </div>

              {/* Right: Audi cut-out — desktop only */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:flex items-end justify-center"
                style={{ minHeight: '420px' }}
              >
                {/* Google rating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="absolute top-8 right-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 text-center z-10"
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-white font-black text-xl leading-none">4.9</p>
                  <p className="text-white/50 text-[10px] mt-0.5">Google Reviews</p>
                </motion.div>

                <Image
                  src="/shen_banner-removebg-preview.png"
                  alt="Rijschool Lovanium Audi A3"
                  width={680}
                  height={420}
                  className="object-contain object-bottom w-full drop-shadow-2xl"
                  priority
                />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Stats bar — in normal flow, never overlaps content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto px-6 pb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 97, suffix: '%', label: 'Slaagpercentage' },
                { value: 10, suffix: '+', label: 'Jaar ervaring' },
                { value: 7, suffix: '', label: 'Instructeurs' },
                { value: 500, suffix: '+', label: 'Tevreden leerlingen' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4 text-center"
                >
                  <p className="text-2xl font-black text-white leading-none mb-1">
                    <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
