'use client';

import { useTranslations } from 'next-intl';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

interface Plan {
  name: string;
  price: string;
  lessons: string;
  description: string;
  features: string[];
}

function PricingCard({
  plan,
  isPopular,
  index,
  onBook,
}: {
  plan: Plan;
  isPopular: boolean;
  index: number;
  onBook: () => void;
}) {
  const t = useTranslations('pricing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative flex flex-col rounded-2xl p-8 transition-all duration-300',
        isPopular
          ? 'bg-gradient-to-b from-ink-card to-ink-hover border border-gold/30 shadow-gold scale-[1.02]'
          : 'card-dark hover:border-zinc-700'
      )}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 bg-gold text-ink text-xs font-bold px-4 py-1.5 rounded-full">
            <Sparkles size={11} />
            {t('popular')}
          </span>
        </div>
      )}

      {/* Plan name */}
      <div className="mb-6">
        <h3 className={cn('text-xl font-bold mb-1', isPopular ? 'text-gold' : 'text-zinc-200')}>
          {plan.name}
        </h3>
        <p className="text-zinc-500 text-sm">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black text-zinc-50 tracking-tight">€{plan.price}</span>
          <span className="text-zinc-500 text-sm mb-2">/{t('perLesson')}</span>
        </div>
        <p className="text-zinc-400 text-sm mt-1">
          {plan.lessons} lessen · €{(parseInt(plan.price) * parseInt(plan.lessons)).toLocaleString()}
        </p>
      </div>

      {/* Divider */}
      <div className={cn('h-px mb-6', isPopular ? 'bg-gold/20' : 'bg-ink-border')} />

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <div className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
              isPopular ? 'bg-gold/20' : 'bg-ink-hover'
            )}>
              <Check size={11} className={isPopular ? 'text-gold' : 'text-zinc-400'} />
            </div>
            <span className="text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onBook}
        className={cn(
          'w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group',
          isPopular
            ? 'bg-gold text-ink hover:bg-gold-light hover:shadow-gold'
            : 'border border-ink-border text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 hover:bg-ink-hover'
        )}
      >
        {t('bookPackage')}
        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const plans = t.raw('plans') as Plan[];

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-ink">
      <div className="container-wide">
        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-20">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg text-zinc-50 mb-5">{t('headline')}</h2>
          <p className="text-muted text-lg">{t('subtitle')}</p>
        </AnimatedSection>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start mb-12">
          {plans.map((plan, i) => (
            <PricingCard
              key={i}
              plan={plan}
              isPopular={i === 1}
              index={i}
              onBook={scrollToBooking}
            />
          ))}
        </div>

        {/* Note */}
        <AnimatedSection className="text-center">
          <p className="text-zinc-600 text-sm max-w-lg mx-auto mb-12">{t('note')}</p>

          {/* Custom offer */}
          <div className="border border-ink-border rounded-2xl p-8 max-w-lg mx-auto bg-ink-card">
            <h4 className="font-bold text-zinc-200 mb-2">{t('customTitle')}</h4>
            <p className="text-zinc-500 text-sm mb-5">{t('customText')}</p>
            <button
              onClick={scrollToBooking}
              className="btn-outline text-sm"
            >
              {t('customCta')}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
