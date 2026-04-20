'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Check, X, AlertTriangle, ClipboardList, Car, RotateCcw, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PackageData {
  name: string; hours: string; price: string; badge: string | null; highlight: boolean;
  skills: string[]; missing: string[];
}
interface ServiceData {
  title: string; badge: string; description: string; price: string; priceNote: string | null;
  included: string[] | null;
}

const serviceIcons = [AlertTriangle, Target, ClipboardList, RotateCcw, Car];
const serviceColors = [
  { card: 'bg-amber-50 border-amber-200', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', badgeBg: 'text-amber-700 bg-amber-100' },
  { card: 'bg-blue-50 border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', badgeBg: 'text-blue-700 bg-blue-100' },
  { card: 'spotlight', iconBg: 'bg-white/10', iconColor: 'text-gold', badgeBg: 'text-gold bg-gold/15' },
  { card: 'bg-red-50 border-red-100', iconBg: 'bg-red-100', iconColor: 'text-red-500', badgeBg: 'text-red-600 bg-red-100' },
  { card: 'bg-surface border-surface-border', iconBg: 'bg-navy-50', iconColor: 'text-navy', badgeBg: 'text-navy bg-navy-50' },
];

export default function PakkettenPage() {
  const t = useTranslations('pakketten');
  const locale = useLocale();
  const packages = t.raw('packages') as PackageData[];
  const services = t.raw('services') as ServiceData[];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">{t('breadcrumbHome')}</Link>
              <span>/</span>
              <span className="text-white/60 font-medium">{t('breadcrumbCurrent')}</span>
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">{t('eyebrow')}</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] max-w-3xl mb-6">
              {t('headline1')}<br />
              <span className="text-gold">{t('headline2')}</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-10">{t('intro')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/inschrijven`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-bold text-sm hover:bg-gold-light hover:shadow-gold transition-all duration-200">
                {t('ctaEnroll')} <ArrowRight size={15} />
              </Link>
              <a href="#pakketten" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-all duration-200">
                {t('ctaPackages')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages comparison */}
      <section id="pakketten" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">{t('packagesEyebrow')}</p>
            <h2 className="heading-lg">{t('packagesHeading')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {packages.map((pkg, i) => (
              <div key={i} className={`relative border rounded-3xl overflow-hidden ${pkg.highlight ? 'md:-mt-4 md:mb-4' : ''}`}>
                {pkg.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      <Zap size={8} className="fill-white" />
                      {pkg.badge}
                    </span>
                  </div>
                )}
                <div className={`p-8 ${pkg.highlight ? 'bg-navy' : 'bg-white'}`}>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${pkg.highlight ? 'text-gold' : 'text-navy'}`}>{pkg.name}</p>
                  <div className="flex items-end gap-2 my-4">
                    <span className={`text-5xl font-black tracking-tight ${pkg.highlight ? 'text-white' : 'text-navy'}`}>€{pkg.price}</span>
                    <span className={`mb-1.5 text-xs ${pkg.highlight ? 'text-white/40' : 'text-slate-400'}`}>/ {pkg.hours}</span>
                  </div>
                  <div className={`h-px mb-6 ${pkg.highlight ? 'bg-white/10' : 'bg-surface-border'}`} />
                  <ul className="space-y-2.5 mb-4">
                    {pkg.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2.5 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.highlight ? 'bg-gold/20' : 'bg-navy-50'}`}>
                          <Check size={10} className={pkg.highlight ? 'text-gold' : 'text-navy'} />
                        </div>
                        <span className={pkg.highlight ? 'text-white/80' : 'text-slate-700'}>{skill}</span>
                      </li>
                    ))}
                    {pkg.missing.map((skill) => (
                      <li key={skill} className="flex items-center gap-2.5 text-sm opacity-30">
                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <X size={10} className="text-slate-400" />
                        </div>
                        <span className={pkg.highlight ? 'text-white/40' : 'text-slate-400 line-through'}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`px-8 pb-8 ${pkg.highlight ? 'bg-navy' : 'bg-white'}`}>
                  <Link href={`/${locale}/inschrijven`} className={`w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 group transition-all duration-200 ${pkg.highlight ? 'bg-gold text-white hover:bg-gold-light' : 'border-2 border-navy/15 text-navy hover:bg-navy hover:text-white hover:border-navy'}`}>
                    {t('enrollBtn')}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-xs text-center mt-8">{t('packageNote')}</p>
        </div>
      </section>

      {/* Extra services */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <p className="eyebrow mb-3">{t('servicesEyebrow')}</p>
            <h2 className="heading-lg">{t('servicesHeading')}</h2>
          </div>

          <div className="space-y-5">
            {services.map((svc, i) => {
              const Icon = serviceIcons[i] ?? Car;
              const col = serviceColors[i] ?? serviceColors[4];
              const isSpotlight = col.card === 'spotlight';

              if (isSpotlight) {
                return (
                  <div key={i} className="bg-navy rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={22} className="text-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-white font-black text-lg">{svc.title}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${col.badgeBg}`}>{svc.badge}</span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-2xl font-black text-gold">{svc.price}</span>
                          </div>
                        </div>
                        <p className="text-white/60 leading-relaxed mb-6">{svc.description}</p>
                        {svc.included && (
                          <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">{t('includedIn')}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {svc.included.map((item) => (
                                <div key={item} className="flex items-center gap-2.5">
                                  <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                                    <Check size={9} className="text-gold" />
                                  </div>
                                  <span className="text-white/70 text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              const isBottomRow = i >= 3;
              const cardJsx = (
                <div key={i} className={`border rounded-3xl p-8 ${col.card} ${isBottomRow ? '' : ''}`}>
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${col.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={22} className={col.iconColor} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-navy font-black text-lg">{svc.title}</h3>
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${col.badgeBg}`}>{svc.badge}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-2xl font-black text-navy">{svc.price}</span>
                          {svc.priceNote && <span className="text-slate-400 text-xs block">{svc.priceNote}</span>}
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{svc.description}</p>
                      {i === services.length - 1 && (
                        <Link href={`/${locale}/inschrijven`} className="inline-flex items-center gap-2 mt-6 text-navy font-semibold text-sm hover:text-gold transition-colors group">
                          {t('bookLesson')}
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );

              return cardJsx;
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.08)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{t('ctaEyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t('ctaHeading')}</h2>
          <p className="text-white/50 mb-8 leading-relaxed">{t('ctaSubtitle')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/inschrijven`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-white font-bold text-sm hover:bg-gold-light hover:shadow-gold transition-all duration-200">
              {t('ctaBtn')} <ArrowRight size={16} />
            </Link>
            <a href="tel:+32492482853" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-all duration-200">
              {t('ctaCall')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
