'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Brain, Car, Shield, Clock, MessageCircle, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const iconMap: Record<string, LucideIcon> = { MapPin, Brain, Car, Shield, Clock, MessageCircle };

interface WhyItem {
  icon: string;
  title: string;
  description: string;
}

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const items = t.raw('items') as WhyItem[];

  return (
    <section id="why-us" className="section-padding bg-navy relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-[80px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text */}
          <AnimatedSection className="lg:sticky lg:top-32">
            <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-4">{t('eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-5">
              {t('headline')}
            </h2>
            <p className="text-white/60 leading-relaxed text-lg mb-10">
              {t('subtitle')}
            </p>

            {/* Recognition badge */}
            <div className="inline-flex flex-col gap-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-5">
              <span className="text-gold text-xs font-bold tracking-widest uppercase">Federale erkenning</span>
              <span className="text-white text-3xl font-black">#2863</span>
              <span className="text-white/50 text-xs">Rijschool Lovanium · Leuven</span>
            </div>
          </AnimatedSection>

          {/* Right: features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] || Car;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
