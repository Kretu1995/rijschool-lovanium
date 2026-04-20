'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Check, X, AlertTriangle, ClipboardList, Car, RotateCcw, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const packages = [
  {
    name: 'Pakket Starter',
    hours: '6u',
    price: '510',
    color: 'bg-surface border-surface-border',
    textColor: 'text-navy',
    skills: [
      'Zithouding',
      'Stuurtechniek',
      'Kijktechniek',
      'Vertrekken & stoppen',
      'Schakelen',
      'Remtechniek',
    ],
    missing: ['Kruispunten', 'Manoeuvres', 'Rotondes', 'Rijstrookkeuze', 'Inhalen', 'Snelweg'],
    highlight: false,
    badge: null,
  },
  {
    name: 'Pakket Comfort',
    hours: '12u',
    price: '1.020',
    color: 'bg-surface border-surface-border',
    textColor: 'text-navy',
    skills: [
      'Zithouding',
      'Stuurtechniek',
      'Kijktechniek',
      'Vertrekken & stoppen',
      'Schakelen',
      'Remtechniek',
      'Kruispunten',
      'Manoeuvres',
    ],
    missing: ['Rotondes', 'Rijstrookkeuze', 'Inhalen', 'Snelweg'],
    highlight: false,
    badge: null,
  },
  {
    name: 'Pakket Master',
    hours: '20u',
    price: '1.700',
    color: 'bg-navy border-navy',
    textColor: 'text-white',
    skills: [
      'Zithouding',
      'Stuurtechniek',
      'Kijktechniek',
      'Vertrekken & stoppen',
      'Schakelen',
      'Remtechniek',
      'Kruispunten',
      'Manoeuvres',
      'Rotondes',
      'Rijstrookkeuze',
      'Inhalen',
      'Snelweg',
    ],
    missing: [],
    highlight: true,
    badge: 'Meest volledig',
  },
];

const extraServices = [
  {
    icon: AlertTriangle,
    title: 'Verplichte rijlessen',
    subtitle: 'Na 2x niet geslaagd',
    description:
      'Ben je tweemaal niet geslaagd voor het rijexamen dan ben je verplicht om rijlessen te volgen. Onze lesgevers zorgen ervoor dat je met de correcte technieken leert rijden en de juiste keuzes maakt in het verkeer zodat je snel je definitief rijbewijs op zak hebt!',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
  {
    icon: Target,
    title: 'Proefexamen',
    subtitle: 'Minstens 1 maand voor je examen',
    description:
      'Tijdens deze rijles scannen onze lesgevers jouw rijstijl en gaan ze na of je klaar bent voor het praktijkexamen. Dankzij hun feedback en tips ben je optimaal voorbereid. Plan een proefexamen minstens een maand voor je praktijkexamen zodat je nadien voldoende tijd hebt om aan de slag te gaan met de feedback.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    icon: ClipboardList,
    title: 'Examen met leswagen',
    subtitle: 'Inclusief proefexamen & examenbegeleiding',
    description:
      'Je kan ervoor kiezen om het praktisch examen af te leggen met onze leswagen en jouw rijlesgever als begeleider. Enkel mogelijk wanneer je vooraf minstens 6u rijles hebt gevolgd. Inbegrepen: proefexamen (2u), rijles net voor het praktijkexamen (1u), examenbegeleiding en retributie voor het examencentrum.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
  },
  {
    icon: RotateCcw,
    title: 'Vervallen voorlopig rijbewijs',
    subtitle: 'Verplicht 6u rijles',
    description:
      'Is je voorlopig rijbewijs vervallen? Dan moet je vanuit de overheid verplicht 6u rijles volgen. Let er goed op dat je je rijlessen pas volgt NADAT je voorlopig rijbewijs is vervallen. Nadien kan je een nieuw voorlopig rijbewijs (model 12 maanden) aanvragen dat 1 jaar geldig is.',
    color: 'bg-red-50 border-red-100',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-100',
  },
  {
    icon: Car,
    title: 'Losse rijles',
    subtitle: 'Oefen wat jij wil',
    description:
      'Wil je eindelijk alle parkeermanoeuvres onder de knie krijgen of ga je misschien liever de eerste keer de snelweg op met een ervaren rijlesgever naast je? Kies dan voor een losse rijles en oefen specifiek op wat jij graag wil.',
    color: 'bg-surface border-surface-border',
    iconColor: 'text-navy',
    iconBg: 'bg-navy-50',
  },
];

export default function PakkettenPage() {
  const locale = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 text-sm text-white/30 mb-8">
              <Link href={`/${locale}`} className="hover:text-white/60 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/60 font-medium">Pakketten</span>
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-4">Rijlespakketten</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] max-w-3xl mb-6">
              Kwaliteitsopleiding op<br />
              <span className="text-gold">jouw tempo</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-10">
              Bij Rijschool Lovanium geniet je een kwaliteitsopleiding waarbij er naast rijtechniek ook aandacht besteed wordt aan verkeersinzicht, het milieu en de juiste attitude in het verkeer. Kies een pakket als voorbereiding of aanvulling op je opleiding, of kies voor <strong className="text-white/80">Pakket Master (20u)</strong> om ook zonder begeleider verder te kunnen oefenen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/inschrijven`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-white font-bold text-sm hover:bg-gold-light hover:shadow-gold transition-all duration-200"
              >
                Inschrijven <ArrowRight size={15} />
              </Link>
              <a
                href="#pakketten"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-all duration-200"
              >
                Onze pakketten
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages comparison */}
      <section id="pakketten" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Pakketten</p>
            <h2 className="heading-lg">Kies jouw pakket</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative border rounded-3xl overflow-hidden ${pkg.highlight ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {pkg.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      <Zap size={8} className="fill-white" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className={`p-8 ${pkg.highlight ? 'bg-navy' : 'bg-white'}`}>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${pkg.highlight ? 'text-gold' : 'text-navy'}`}>
                    {pkg.name}
                  </p>
                  <div className="flex items-end gap-2 my-4">
                    <span className={`text-5xl font-black tracking-tight ${pkg.highlight ? 'text-white' : 'text-navy'}`}>
                      €{pkg.price}
                    </span>
                    <span className={`mb-1.5 text-xs ${pkg.highlight ? 'text-white/40' : 'text-slate-400'}`}>
                      / {pkg.hours}
                    </span>
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
                  <Link
                    href={`/${locale}/inschrijven`}
                    className={`w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 group transition-all duration-200 ${
                      pkg.highlight
                        ? 'bg-gold text-white hover:bg-gold-light'
                        : 'border-2 border-navy/15 text-navy hover:bg-navy hover:text-white hover:border-navy'
                    }`}
                  >
                    Inschrijven
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-xs text-center mt-8">
            Alle prijzen zijn inclusief btw · €85/uur · Inschrijvingskosten (€35) zijn eenmalig en niet inbegrepen
          </p>
        </div>
      </section>

      {/* Extra services */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <p className="eyebrow mb-3">Individuele lessen</p>
            <h2 className="heading-lg">Specifieke rijlessen</h2>
          </div>

          <div className="space-y-5">

            {/* Verplichte rijlessen */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle size={22} className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-navy font-black text-lg">Verplichte rijlessen</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Na 2× niet geslaagd</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-black text-navy">€85</span>
                      <span className="text-slate-400 text-xs ml-1">/ uur</span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Ben je tweemaal niet geslaagd voor het rijexamen dan ben je verplicht om rijlessen te volgen. Onze lesgevers zorgen ervoor dat je met de correcte technieken leert rijden en de juiste keuzes maakt in het verkeer zodat je snel je definitief rijbewijs op zak hebt!
                  </p>
                </div>
              </div>
            </div>

            {/* Proefexamen */}
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target size={22} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-navy font-black text-lg">Proefexamen</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">Minstens 1 maand voor je examen</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-black text-navy">€85</span>
                      <span className="text-slate-400 text-xs ml-1">/ uur</span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Tijdens deze rijles scannen onze lesgevers jouw rijstijl en gaan ze na of je klaar bent voor het praktijkexamen. Dankzij hun feedback en tips ben je optimaal voorbereid voor het praktijkexamen. Plan een proefexamen minstens een maand voor je praktijkexamen zodanig dat je nadien voldoende tijd hebt om aan de slag te gaan met de feedback van je lesgever.
                  </p>
                </div>
              </div>
            </div>

            {/* Examen met leswagen */}
            <div className="bg-navy rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ClipboardList size={22} className="text-gold" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-white font-black text-lg">Examen met leswagen</h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full">Min. 6u rijles vereist</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-black text-gold">Op aanvraag</span>
                    </div>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Je kan ervoor kiezen om het praktisch examen af te leggen met onze leswagen en jouw rijlesgever als begeleider. Dit is enkel mogelijk wanneer je ook vooraf minstens 6u rijles hebt gevolgd met onze leswagen.
                  </p>
                  <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Inbegrepen in het pakket</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Proefexamen (2u)',
                        'Rijles net voor het praktijkexamen (1u)',
                        'Examenbegeleiding',
                        'Retributie voor het examencentrum',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                            <Check size={9} className="text-gold" />
                          </div>
                          <span className="text-white/70 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Vervallen rijbewijs */}
              <div className="bg-red-50 border border-red-100 rounded-3xl p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                    <RotateCcw size={22} className="text-red-500" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-navy">€510</span>
                    <span className="text-slate-400 text-xs block">6u · incl. btw</span>
                  </div>
                </div>
                <h3 className="text-navy font-black text-lg mb-1">Vervallen voorlopig rijbewijs</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block mb-4">Verplicht 6u rijles</span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Is je voorlopig rijbewijs vervallen? Dan moet je vanuit de overheid verplicht 6u rijles volgen. Let er goed op dat je je rijlessen pas volgt <strong>NADAT</strong> je voorlopig rijbewijs is vervallen. Nadien kan je een nieuw voorlopig rijbewijs (model 12 maanden) aanvragen dat 1 jaar geldig is en waarmee je steeds met begeleider moet oefenen.
                </p>
              </div>

              {/* Losse rijles */}
              <div className="bg-surface border border-surface-border rounded-3xl p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center">
                    <Car size={22} className="text-navy" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-navy">€85</span>
                    <span className="text-slate-400 text-xs block">/ uur · incl. btw</span>
                  </div>
                </div>
                <h3 className="text-navy font-black text-lg mb-1">Losse rijles</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-navy bg-navy-50 px-3 py-1 rounded-full inline-block mb-4">Oefen wat jij wil</span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Wil je eindelijk alle parkeermanoeuvres onder de knie krijgen of ga je misschien liever de eerste keer de snelweg op met een ervaren rijlesgever naast je? Kies dan voor een losse rijles en oefen specifiek op wat jij graag wil.
                </p>
                <Link
                  href={`/${locale}/inschrijven`}
                  className="inline-flex items-center gap-2 mt-6 text-navy font-semibold text-sm hover:text-gold transition-colors group"
                >
                  Boek je rijles
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,150,62,0.08)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Rijschool Lovanium · Leuven</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Klaar om te starten?
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            Schrijf je vandaag in en start al binnen de week met je rijlessen.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/inschrijven`} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-white font-bold text-sm hover:bg-gold-light hover:shadow-gold transition-all duration-200">
              Schrijf je in <ArrowRight size={16} />
            </Link>
            <a href="tel:+32492482853" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/8 transition-all duration-200">
              Bel ons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
