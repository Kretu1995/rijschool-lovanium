'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Phone, MapPin, Star, Shield, CheckCircle } from 'lucide-react';
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

  return (
    <section className="relative bg-navy overflow-hidden min-h-screen flex flex-col">

      {/* Mobile: full-bleed photo */}
      <div className="absolute inset-0 lg:hidden">
        <Image src="/audi-lovanium.jpg" alt="Rijschool Lovanium" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
      </div>

      {/* Desktop decorative elements */}
      {/* Large gold glow orb behind headline */}
      <div className="absolute hidden lg:block top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 hidden lg:block opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 pt-20">

        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">

              {/* Left */}
              <div className="py-10 lg:py-20 max-w-xl">

                {/* Live badge + eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-3 mb-8"
                >
                  {/* Pulsing availability dot */}
                  <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">Plaatsen beschikbaar</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3 py-2">
                    <Shield size={11} className="text-gold" />
                    <span className="text-white/60 text-[10px] font-semibold tracking-wider uppercase">{t('eyebrow')}</span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6"
                >
                  <h1 className="text-5xl md:text-6xl xl:text-[72px] font-black tracking-tight leading-[1.0] text-white">
                    {t('headline1')}
                  </h1>
                  <h1 className="text-5xl md:text-6xl xl:text-[72px] font-black tracking-tight leading-[1.0]"
                    style={{ WebkitTextStroke: '2px #C8963E', color: 'transparent' }}
                  >
                    {t('headline2')}
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-md"
                >
                  {t('subtitle')}
                </motion.p>

                {/* Trust bullets */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-x-5 gap-y-2 mb-9"
                >
                  {['97% slaagpercentage', 'Start binnen de week', 'Manueel & automaat'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-gold flex-shrink-0" />
                      <span className="text-white/60 text-xs font-medium">{item}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-3 mb-10"
                >
                  <Link
                    href={`/${locale}/inschrijven`}
                    className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-white font-bold text-sm overflow-hidden group transition-all duration-200 hover:shadow-[0_0_30px_rgba(200,150,62,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t('cta1')}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Link>
                  <button
                    onClick={() => scrollTo('pricing')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-bold text-sm hover:bg-white/8 hover:border-white/40 transition-all duration-200"
                  >
                    {t('cta2')}
                  </button>
                </motion.div>

                {/* Contact strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.75 }}
                  className="flex flex-wrap gap-5 pt-5 border-t border-white/8"
                >
                  <a href="tel:+32492482853" className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors">
                    <Phone size={13} className="text-gold" />
                    +32 492 48 28 53
                  </a>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <MapPin size={13} className="text-gold" />
                    Martelarenplein 20E, Leuven
                  </div>
                </motion.div>
              </div>

              {/* Right: Audi — desktop only */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:flex items-end justify-center"
                style={{ minHeight: '480px' }}
              >
                {/* Glow under car */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gold/20 blur-3xl rounded-full pointer-events-none" />

                {/* Google rating */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute top-10 right-4 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4 text-center z-10"
                >
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-white font-black text-2xl leading-none">4.9</p>
                  <p className="text-white/40 text-[10px] mt-1">Google Reviews</p>
                </motion.div>

                {/* Stat floating card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.35 }}
                  className="absolute bottom-28 left-0 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-3 z-10"
                >
                  <p className="text-gold font-black text-2xl leading-none">97%</p>
                  <p className="text-white/40 text-[10px] mt-0.5">Slaagpercentage</p>
                </motion.div>

                <Image
                  src="/shen_banner-removebg-preview.png"
                  alt="Rijschool Lovanium Audi A3"
                  width={720}
                  height={460}
                  className="object-contain object-bottom w-full drop-shadow-2xl relative z-10"
                  priority
                />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="border-t border-white/8">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
                {[
                  { value: 97, suffix: '%', label: 'Slaagpercentage' },
                  { value: 10, suffix: '+', label: 'Jaar ervaring' },
                  { value: 7, suffix: '', label: 'Instructeurs' },
                  { value: 500, suffix: '+', label: 'Tevreden leerlingen' },
                ].map((stat, i) => (
                  <div key={i} className="bg-navy px-6 py-5 text-center">
                    <p className="text-2xl font-black text-white leading-none mb-1">
                      <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/35 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
