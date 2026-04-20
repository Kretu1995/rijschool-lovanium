'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Check, ArrowRight, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PricePlan {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  highlight: boolean;
}

function PriceCard({ plan, index, onBook, locale }: { plan: PricePlan; index: number; onBook: () => void; locale: string }) {
  const t = useTranslations('pricing');

  if (plan.highlight) {
    return (
      <div className="relative">
        {/* Popular badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 bg-gold text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-gold">
            <Zap size={10} className="fill-white" />
            {t('popular')}
          </span>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-navy border border-white/10 shadow-[0_0_60px_rgba(200,150,62,0.15)]">
          {/* Gold glow top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-8 md:p-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-gold font-bold text-sm uppercase tracking-widest mb-1">{plan.name}</p>
                <p className="text-white/50 text-sm leading-relaxed max-w-xs">{plan.description}</p>
              </div>
              <div className="flex gap-0.5 flex-shrink-0 ml-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-gold text-gold" />)}
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-6xl md:text-7xl font-black text-white tracking-tight">€{plan.price}</span>
              <div className="mb-2">
                <span className="text-white/40 text-sm block">/ {plan.unit}</span>
                <span className="text-white/25 text-xs">incl. btw</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-gold" />
                  </div>
                  <span className="text-white/75">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/inschrijven`}
              className="w-full py-4 rounded-2xl bg-gold text-white font-bold text-sm flex items-center justify-center gap-2 group hover:bg-gold-light hover:shadow-gold transition-all duration-300"
            >
              {t('cta')}
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-surface-border p-8 flex flex-col hover:border-navy/20 hover:shadow-card-hover transition-all duration-300">
      <p className="text-navy font-bold text-sm uppercase tracking-widest mb-1">{plan.name}</p>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">{plan.description}</p>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-5xl font-black text-navy tracking-tight">€{plan.price}</span>
        <div className="mb-1.5">
          <span className="text-slate-400 text-sm block">/ {plan.unit}</span>
          <span className="text-slate-300 text-xs">incl. btw</span>
        </div>
      </div>

      <div className="h-px bg-surface-border mb-6" />

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0">
              <Check size={11} className="text-navy" />
            </div>
            <span className="text-slate-600">{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onBook}
        className="w-full py-3.5 rounded-2xl border-2 border-navy/20 text-navy font-semibold text-sm flex items-center justify-center gap-2 group hover:bg-navy hover:text-white hover:border-navy transition-all duration-300"
      >
        {t('cta')}
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const plans = t.raw('packages') as PricePlan[];

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-surface">
      <div className="container-wide">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="eyebrow mb-3">{t('eyebrow')}</p>
            <h2 className="heading-lg max-w-sm">{t('headline')}</h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Cards — full width, highlighted card larger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
          {plans.map((plan, i) => (
            <PriceCard key={i} plan={plan} index={i} onBook={scrollToBooking} locale={locale} />
          ))}
        </div>

        {/* Note */}
        <p className="text-slate-400 text-xs text-center max-w-2xl mx-auto mt-10 leading-relaxed">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
