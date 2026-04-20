'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

interface PricePlan {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  highlight: boolean;
}

function PriceCard({ plan, index, onBook }: { plan: PricePlan; index: number; onBook: () => void }) {
  const t = useTranslations('pricing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative flex flex-col rounded-3xl p-8 transition-all duration-300',
        plan.highlight
          ? 'bg-navy shadow-navy border border-navy'
          : 'card-light-hover'
      )}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-gold">
            <Star size={10} className="fill-white" />
            {t('popular')}
          </span>
        </div>
      )}

      <h3 className={cn('text-lg font-bold mb-1', plan.highlight ? 'text-gold' : 'text-navy')}>
        {plan.name}
      </h3>
      <p className={cn('text-sm mb-5', plan.highlight ? 'text-white/60' : 'text-slate-400')}>
        {plan.description}
      </p>

      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className={cn('text-5xl font-black tracking-tight', plan.highlight ? 'text-white' : 'text-navy')}>
            €{plan.price}
          </span>
          <span className={cn('text-sm mb-2', plan.highlight ? 'text-white/50' : 'text-slate-400')}>
            / {plan.unit}
          </span>
        </div>
      </div>

      <div className={cn('h-px mb-6', plan.highlight ? 'bg-white/10' : 'bg-surface-border')} />

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <div className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
              plan.highlight ? 'bg-gold/20' : 'bg-navy-50'
            )}>
              <Check size={11} className={plan.highlight ? 'text-gold' : 'text-navy'} />
            </div>
            <span className={plan.highlight ? 'text-white/80' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onBook}
        className={cn(
          'w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 group transition-all duration-300',
          plan.highlight
            ? 'bg-gold text-white hover:bg-gold-light'
            : 'border-2 border-navy text-navy hover:bg-navy hover:text-white'
        )}
      >
        {t('cta')}
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const plans = t.raw('packages') as PricePlan[];

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-surface">
      <div className="container-wide">
        <AnimatedSection className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg mb-4">{t('headline')}</h2>
          <p className="text-slate-500">{t('subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <PriceCard key={i} plan={plan} index={i} onBook={scrollToBooking} />
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <p className="text-slate-400 text-sm max-w-lg mx-auto">{t('note')}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
