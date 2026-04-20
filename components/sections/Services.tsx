'use client';

import { useTranslations, useLocale } from 'next-intl';
import { BookOpen, Car, RefreshCw, ArrowRight, Check, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import Link from 'next/link';

const iconMap: Record<string, LucideIcon> = { BookOpen, Car, RefreshCw };

interface ServiceItem {
  icon: string;
  title: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  badge: string;
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const Icon = iconMap[item.icon] || Car;
  const isMiddle = index === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
        isMiddle
          ? 'bg-navy text-white shadow-navy'
          : 'card-light-hover'
      }`}
    >
      {/* Badge */}
      <span className={`tag mb-6 self-start ${isMiddle ? 'bg-white/10 text-gold border-0' : ''}`}>
        {item.badge}
      </span>

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
        isMiddle ? 'bg-white/10' : 'bg-navy-50'
      }`}>
        <Icon size={24} className={isMiddle ? 'text-gold' : 'text-navy'} />
      </div>

      {/* Title + price */}
      <h3 className={`text-xl font-bold mb-1 ${isMiddle ? 'text-white' : 'text-navy'}`}>
        {item.title}
      </h3>
      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-2xl font-black ${isMiddle ? 'text-gold' : 'text-navy'}`}>
          {item.price}
        </span>
        <span className={`text-xs ${isMiddle ? 'text-white/50' : 'text-slate-400'}`}>
          {item.priceNote}
        </span>
      </div>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-6 ${isMiddle ? 'text-white/70' : 'text-slate-500'}`}>
        {item.description}
      </p>

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-6">
        {item.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
              isMiddle ? 'bg-gold/20' : 'bg-navy-50'
            }`}>
              <Check size={10} className={isMiddle ? 'text-gold' : 'text-navy'} />
            </div>
            <span className={isMiddle ? 'text-white/80' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const items = t.raw('items') as ServiceItem[];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-wide">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="eyebrow mb-3">{t('eyebrow')}</p>
            <h2 className="heading-lg">{t('headline')}</h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed">{t('subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link
            href={`/${locale}/diensten`}
            className="btn-outline inline-flex items-center gap-2"
          >
            {t('learnMore')}
            <ArrowRight size={15} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
