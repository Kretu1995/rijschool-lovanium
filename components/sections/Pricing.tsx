'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Check, ArrowRight, Zap } from 'lucide-react';
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

export default function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const plans = t.raw('packages') as PricePlan[];

  const scrollToBooking = () =>
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="section-padding bg-white relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">{t('eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-navy max-w-sm">{t('headline')}</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            plan.highlight ? (
              /* Featured card — white, stands out */
              <div key={i} className="relative md:-mt-4 md:mb-4">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 bg-gold text-white text-[11px] font-bold px-4 py-1.5 rounded-full">
                    <Zap size={9} className="fill-white" />
                    {t('popular')}
                  </span>
                </div>
                <div className="bg-white rounded-3xl p-8 h-full flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  <div className="mb-6">
                    <p className="text-navy font-black text-sm uppercase tracking-widest mb-1">{plan.name}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-6xl font-black text-navy tracking-tight">€{plan.price}</span>
                  </div>
                  <p className="text-slate-400 text-xs mb-7">per {plan.unit} · incl. btw</p>
                  <div className="h-px bg-slate-100 mb-6" />
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <div className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-gold" />
                        </div>
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/inschrijven`}
                    className="w-full py-4 rounded-2xl bg-navy text-white font-bold text-sm flex items-center justify-center gap-2 group hover:bg-navy-light transition-all duration-200"
                  >
                    {t('cta')}
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              /* Regular cards */
              <div key={i} className="bg-surface border border-surface-border rounded-3xl p-8 flex flex-col hover:border-navy/20 hover:shadow-card-hover transition-all duration-300">
                <div className="mb-6">
                  <p className="text-navy font-black text-sm uppercase tracking-widest mb-1">{plan.name}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-6xl font-black text-navy tracking-tight">€{plan.price}</span>
                </div>
                <p className="text-slate-400 text-xs mb-7">per {plan.unit} · incl. btw</p>
                <div className="h-px bg-surface-border mb-6" />
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-navy" />
                      </div>
                      <span className="text-slate-600">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToBooking}
                  className="w-full py-3.5 rounded-2xl border-2 border-navy/15 text-navy font-semibold text-sm flex items-center justify-center gap-2 group hover:bg-navy hover:text-white hover:border-navy transition-all duration-200"
                >
                  {t('cta')}
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )
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
