'use client';

import { useTranslations } from 'next-intl';
import { Trophy, Zap, Car, MapPin, User, Shield, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Zap,
  Car,
  MapPin,
  User,
  Shield,
};

interface WhyItem {
  icon: string;
  title: string;
  description: string;
}

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const items = t.raw('items') as WhyItem[];

  return (
    <section id="why-us" className="section-padding bg-ink-surface relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/3 to-transparent pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text */}
          <AnimatedSection className="lg:sticky lg:top-32">
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h2 className="heading-lg text-zinc-50 mb-6">{t('headline')}</h2>
            <p className="text-muted text-lg mb-10">{t('subtitle')}</p>

            {/* Large stat */}
            <div className="border-gradient rounded-2xl p-8 inline-block">
              <p className="text-7xl font-black text-zinc-50 tracking-tight">97<span className="text-gold">%</span></p>
              <p className="text-zinc-400 mt-2 text-sm uppercase tracking-widest">Slaagpercentage</p>
            </div>
          </AnimatedSection>

          {/* Right: feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item, i) => {
              const Icon = iconMap[item.icon] || Car;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="card-dark p-6 rounded-2xl group hover:border-zinc-700 hover:shadow-gold-sm transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-bold text-zinc-100 mb-2 text-base">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
