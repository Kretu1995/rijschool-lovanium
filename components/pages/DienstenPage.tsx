'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, Car, RefreshCw, Check, ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

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

const serviceDetails: Record<number, { steps: string[]; ideal: string; duration: string }> = {
  0: {
    duration: '12 uur (meerdere sessies)',
    ideal: 'Iedereen die een rijexamen wil afleggen voor categorie B',
    steps: [
      'Verkeerstekens en -regels',
      'Voorrangsregels en bijzondere situaties',
      'Weggedrag en rijgedrag',
      'Eco-rijden en milieu',
      'Eerste hulp bij verkeersongevallen',
      'Examenoefeningen en simulaties',
    ],
  },
  1: {
    duration: '1 uur per les (gepland op jouw ritme)',
    ideal: 'Iedereen die wil leren rijden voor categorie B, manueel of automaat',
    steps: [
      'Kennismaking en intake rijervaring',
      'Basistechnieken (starten, stoppen, schakelen)',
      'Manoeuvres in de stad en op de baan',
      'Autosnelweg en complexe situaties',
      'Rijexamen voorbereiding',
      'Opfrislessen voor ervaren rijders',
    ],
  },
  2: {
    duration: 'Flexibel — 1 of meerdere sessies',
    ideal: 'Nieuwe rijbewijshouders die hun zelfvertrouwen willen opbouwen',
    steps: [
      'Evaluatie huidige rijvaardigheden',
      'Specifieke aandachtspunten bespreken',
      'Oefenen van moeilijke situaties',
      'Autosnelweg, rondpunten, parkeren',
      'Tips voor zelfstandig rijden',
      'Persoonlijk actieplan',
    ],
  },
};

function ServiceDetail({ item, index }: { item: ServiceItem; index: number }) {
  const Icon = iconMap[item.icon] || Car;
  const detail = serviceDetails[index];
  const isEven = index % 2 === 0;

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        !isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Visual */}
      <div className={!isEven ? 'lg:order-2' : ''}>
        <div className="relative rounded-3xl bg-navy overflow-hidden aspect-[4/3]">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-gold/20" />
          <div className="absolute inset-0 flex flex-col justify-between p-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
              <Icon size={26} className="text-gold" />
            </div>
            <div>
              <span className="tag text-xs mb-3 block">{item.badge}</span>
              <h3 className="text-white text-3xl font-black mb-2">{item.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-gold text-2xl font-black">{item.price}</span>
                <span className="text-white/40 text-sm">{item.priceNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={!isEven ? 'lg:order-1' : ''}>
        <span className="tag mb-4 inline-block">{item.badge}</span>
        <h2 className="heading-md mb-4">{item.title}</h2>
        <p className="text-slate-500 leading-relaxed mb-6">{item.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Duur</p>
            <p className="text-navy font-semibold text-sm">{detail.duration}</p>
          </div>
          <div className="bg-surface rounded-2xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Ideaal voor</p>
            <p className="text-navy font-semibold text-sm">{detail.ideal}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Wat je leert</p>
          <ul className="space-y-2">
            {detail.steps.map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-navy-50 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-navy" />
                </div>
                <span className="text-slate-600">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-2xl font-black text-navy">{item.price}</div>
          <div className="text-slate-400 text-sm">{item.priceNote}</div>
        </div>
      </div>
    </div>
  );
}

export default function DienstenPage() {
  const t = useTranslations('services');
  const locale = useLocale();
  const items = t.raw('items') as ServiceItem[];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-50/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href={`/${locale}`} className="hover:text-navy transition-colors">Home</Link>
              <span>/</span>
              <span className="text-navy font-medium">{t('eyebrow')}</span>
            </div>
            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h1 className="heading-xl mb-5 max-w-2xl">{t('headline')}</h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Service details */}
      <section className="section-padding bg-white">
        <div className="container-wide space-y-24 lg:space-y-32">
          {items.map((item, i) => (
            <ServiceDetail key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Pricing strip */}
      <section className="section-padding bg-surface">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="eyebrow mb-4">Transparante tarieven</p>
            <h2 className="heading-md mb-6">Alles-in-prijs, geen verborgen kosten</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Inschrijving', price: '€35', sub: 'Eenmalig' },
                { label: 'Theorieopleiding', price: '€170', sub: '12 uur' },
                { label: 'Praktijkles', price: '€85', sub: 'Per uur · incl. btw' },
              ].map((p, i) => (
                <div key={i} className="card-light rounded-2xl p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">{p.label}</p>
                  <p className="text-4xl font-black text-navy">{p.price}</p>
                  <p className="text-slate-400 text-xs mt-1">{p.sub}</p>
                </div>
              ))}
            </div>
            <Link href={`/${locale}#booking`} className="btn-primary inline-flex items-center gap-2">
              Schrijf je in <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
