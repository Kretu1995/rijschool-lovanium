'use client';

import { useTranslations } from 'next-intl';
import { BookOpen, Car, RefreshCw, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Car,
  RefreshCw,
};

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  badge: string;
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const Icon = iconMap[item.icon] || Car;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group border-gradient rounded-2xl p-8 hover:shadow-gold transition-all duration-500 cursor-default"
    >
      {/* Badge */}
      <span className="inline-block mb-6 text-[11px] font-semibold tracking-widest uppercase text-gold bg-gold-muted px-3 py-1 rounded-full">
        {item.badge}
      </span>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-ink-hover border border-ink-border flex items-center justify-center mb-6 group-hover:border-gold/30 group-hover:bg-gold-muted transition-all duration-300">
        <Icon size={24} className="text-gold" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-zinc-100 mb-3">{item.title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">{item.description}</p>

      {/* Hover arrow */}
      <div className="flex items-center gap-2 mt-6 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Meer info</span>
        <ArrowRight size={14} />
      </div>

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as ServiceItem[];

  return (
    <section id="services" className="section-padding bg-ink">
      <div className="container-wide">
        {/* Header */}
        <AnimatedSection className="max-w-2xl mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg text-zinc-50 mb-5">{t('headline')}</h2>
          <p className="text-muted text-lg">{t('subtitle')}</p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-base px-8 py-4"
          >
            {t('cta')}
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}
