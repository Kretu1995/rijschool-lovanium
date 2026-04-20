'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, Mail, CheckCircle, AlertCircle,
  ChevronRight, ChevronLeft, Car, BookOpen, MessageCircle, Send,
  MapPin, Clock, Shield, Zap
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full bg-white border-2 border-slate-100 rounded-2xl px-4 py-3.5 text-navy text-sm placeholder:text-slate-300 focus:outline-none focus:border-navy/30 focus:ring-4 focus:ring-navy/5 transition-all duration-200 font-medium';
const labelClass = 'block text-xs font-bold text-slate-400 uppercase tracking-[0.12em] mb-2.5';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  firstName: string; lastName: string; birthdate: string; nationality: string;
  street: string; city: string; postalCode: string;
  phone: string; email: string; preferredContact: string;
  selectedPackage: string;
  licenseType: string; transmission: string; theoryDone: string; previousLessons: string; startDate: string;
  specialNeeds: string; hearAbout: string; remarks: string; privacy: boolean;
}

const PACKAGES = [
  { id: 'starter',    label: 'Pakket Starter',                        detail: '6u · €510',    desc: 'Kennismaking & basisvaardigheden' },
  { id: 'comfort',    label: 'Pakket Comfort',                        detail: '12u · €1.020', desc: 'Inclusief kruispunten & manoeuvres' },
  { id: 'master',     label: 'Pakket Master',                         detail: '20u · €1.700', desc: 'Volledig — ook snelweg & inhalen', highlight: true },
  { id: 'verplicht',  label: 'Verplichte rijlessen (2× niet geslaagd)', detail: '6u · €510',  desc: 'Verplicht na 2× niet geslaagd' },
  { id: 'proef',      label: 'Proefexamen',                           detail: '2u · €170',    desc: 'Klaar voor het praktijkexamen?' },
  { id: 'examen',     label: 'Pakket Examen met leswagen',            detail: '€475',         desc: 'Proefexamen + rijles + begeleiding' },
  { id: 'losse',      label: 'Losse rijles',                          detail: '2u · €170',    desc: 'Oefen specifiek wat jij wil' },
];

const TOTAL_STEPS = 4;
const stepIcons = [User, Phone, Car, BookOpen];

function PillChoice({ options, value, name, onChange }: {
  options: string[]; value: string; name: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5 mt-1">
      {options.map((opt) => (
        <label key={opt} className={cn(
          'px-4 py-2.5 rounded-full border-2 text-sm font-semibold cursor-pointer transition-all duration-200 select-none',
          value === opt
            ? 'bg-navy text-white border-navy shadow-sm'
            : 'bg-white border-slate-100 text-slate-500 hover:border-navy/30 hover:text-navy'
        )}>
          <input type="radio" name={name} value={opt} checked={value === opt}
            onChange={() => onChange(opt)} className="sr-only" />
          {opt}
        </label>
      ))}
    </div>
  );
}

function CardChoice({ options, value, name, onChange }: {
  options: string[]; value: string; name: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 mt-1">
      {options.map((opt) => (
        <label key={opt} className={cn(
          'flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none group',
          value === opt
            ? 'bg-navy border-navy shadow-sm'
            : 'bg-white border-slate-100 hover:border-navy/30'
        )}>
          <input type="radio" name={name} value={opt} checked={value === opt}
            onChange={() => onChange(opt)} className="sr-only" />
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
            value === opt ? 'border-white bg-white/20' : 'border-slate-300'
          )}>
            {value === opt && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
          </div>
          <span className={cn('text-sm font-semibold transition-colors duration-200',
            value === opt ? 'text-white' : 'text-slate-600 group-hover:text-navy'
          )}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default function InschrijvenPage() {
  const t = useTranslations('inschrijven');
  const f = useTranslations('inschrijven.fields');
  const locale = useLocale();

  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<FormState>('idle');
  const [data, setData] = useState<FormData>({
    firstName: '', lastName: '', birthdate: '', nationality: '',
    street: '', city: '', postalCode: '',
    phone: '', email: '', preferredContact: '',
    selectedPackage: '',
    licenseType: '', transmission: '', theoryDone: '', previousLessons: '', startDate: '',
    specialNeeds: '', hearAbout: '', remarks: '', privacy: false,
  });

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [field]: (e.target as HTMLInputElement).type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const setVal = (field: keyof FormData) => (v: string) =>
    setData(prev => ({ ...prev, [field]: v }));

  const stepLabels = [t('step1'), t('step2'), t('step3'), t('step4')];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) { setStep(s => s + 1); return; }
    setFormState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'inschrijving' }),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  const contactOptions = f.raw('contactOptions') as string[];
  const licenseOptions = f.raw('licenseOptions') as string[];
  const transmissionOptions = f.raw('transmissionOptions') as string[];
  const theoryOptions = f.raw('theoryOptions') as string[];
  const previousOptions = f.raw('previousOptions') as string[];
  const startOptions = f.raw('startOptions') as string[];
  const specialOptions = f.raw('specialOptions') as string[];
  const hearOptions = f.raw('hearOptions') as string[];

  return (
    <div className="min-h-screen bg-surface">

      {/* Navy hero header */}
      <div className="bg-navy pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-[80px]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-8">
            <Link href={`/${locale}`} className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">{t('headline')}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase mb-3">{t('eyebrow')}</p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t('headline')}</h1>
              <p className="text-white/50 max-w-lg text-sm leading-relaxed">{t('subtitle')}</p>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
              {[
                { icon: Shield, text: 'Erkend #2863' },
                { icon: Zap, text: 'Snel starten' },
                { icon: Clock, text: 'Reactie < 1 werkdag' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/50 text-xs font-medium">
                  <Icon size={13} className="text-gold" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 -mt-2 pb-24">

        {formState === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-card border border-surface-border p-12 md:p-16 text-center mt-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle size={44} className="text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-black text-navy mb-4">{t('successTitle')}</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">{t('successText')}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://wa.me/32492482853" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors shadow-sm">
                <MessageCircle size={16} />
                Stuur een WhatsApp
              </a>
              <Link href={`/${locale}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-slate-100 text-slate-500 font-semibold text-sm hover:border-navy/30 hover:text-navy transition-all duration-200">
                Terug naar home
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {/* Step navigator */}
              <div className="bg-white rounded-3xl border border-surface-border shadow-card p-6">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-5">Jouw voortgang</p>
                <div className="space-y-2">
                  {stepLabels.map((label, i) => {
                    const StepIcon = stepIcons[i];
                    const stepNum = i + 1;
                    const isActive = step === stepNum;
                    const isDone = step > stepNum;
                    return (
                      <div key={i} className={cn(
                        'flex items-center gap-4 p-4 rounded-2xl transition-all duration-300',
                        isActive ? 'bg-navy' : isDone ? 'bg-surface' : ''
                      )}>
                        <div className={cn(
                          'w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300',
                          isActive ? 'bg-white/15' : isDone ? 'bg-green-500' : 'bg-slate-100'
                        )}>
                          {isDone
                            ? <CheckCircle size={18} className="text-white" />
                            : <StepIcon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                          }
                        </div>
                        <div>
                          <p className={cn('text-[10px] font-bold uppercase tracking-widest',
                            isActive ? 'text-white/40' : isDone ? 'text-green-500/60' : 'text-slate-300'
                          )}>Stap {stepNum}</p>
                          <p className={cn('text-sm font-bold',
                            isActive ? 'text-white' : isDone ? 'text-green-600' : 'text-slate-300'
                          )}>{label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress */}
                <div className="mt-6 pt-5 border-t border-surface-border">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Voltooid</span>
                    <span className="font-bold text-navy">{Math.round(((step - 1) / TOTAL_STEPS) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-navy to-navy-light rounded-full"
                      animate={{ width: `${((step - 1) / TOTAL_STEPS) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Contact card */}
              <div className="bg-white rounded-3xl border border-surface-border shadow-card p-6">
                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4">Hulp nodig?</p>
                <div className="space-y-3">
                  <a href="tel:+32492482853" className="flex items-center gap-3 p-3.5 rounded-2xl bg-gold-bg border border-gold/20 hover:border-gold/40 transition-colors group">
                    <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-navy font-bold text-sm">+32 492 48 28 53</p>
                      <p className="text-slate-400 text-xs">Ook via WhatsApp</p>
                    </div>
                  </a>
                  <a href="mailto:info@rijschoollovanium.be" className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface hover:bg-slate-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-navy font-bold text-xs">info@rijschoollovanium.be</p>
                      <p className="text-slate-400 text-xs">Ma–Vr 10:00–17:00</p>
                    </div>
                  </a>
                  <a href="https://maps.google.com/?q=Martelarenplein+20E,+3000+Leuven" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface hover:bg-slate-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-slate-500" />
                    </div>
                    <div>
                      <p className="text-navy font-bold text-sm">Martelarenplein 20E</p>
                      <p className="text-slate-400 text-xs">3000 Leuven</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden">

                  {/* Step header bar */}
                  <div className="px-8 pt-8 pb-6 border-b border-surface-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-navy flex items-center justify-center flex-shrink-0">
                        {(() => { const Icon = stepIcons[step - 1]; return <Icon size={20} className="text-white" />; })()}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.15em]">Stap {step} van {TOTAL_STEPS}</p>
                        <h2 className="text-xl font-black text-navy">{stepLabels[step - 1]}</h2>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <AnimatePresence mode="wait">

                      {/* Step 1 */}
                      {step === 1 && (
                        <motion.div key="step1"
                          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>{f('firstName')} <span className="text-gold">*</span></label>
                              <input type="text" required placeholder="Jan" value={data.firstName} onChange={set('firstName')} className={inputClass} />
                            </div>
                            <div>
                              <label className={labelClass}>{f('lastName')} <span className="text-gold">*</span></label>
                              <input type="text" required placeholder="Janssen" value={data.lastName} onChange={set('lastName')} className={inputClass} />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>{f('birthdate')} <span className="text-gold">*</span></label>
                              <input type="date" required value={data.birthdate} onChange={set('birthdate')} className={inputClass} />
                            </div>
                            <div>
                              <label className={labelClass}>{f('nationality')}</label>
                              <input type="text" placeholder={f('nationalityPlaceholder')} value={data.nationality} onChange={set('nationality')} className={inputClass} />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>{f('street')} <span className="text-gold">*</span></label>
                            <input type="text" required placeholder={f('streetPlaceholder')} value={data.street} onChange={set('street')} className={inputClass} />
                          </div>
                          <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-2">
                              <label className={labelClass}>{f('postalCode')} <span className="text-gold">*</span></label>
                              <input type="text" required placeholder={f('postalCodePlaceholder')} value={data.postalCode} onChange={set('postalCode')} className={inputClass} />
                            </div>
                            <div className="col-span-3">
                              <label className={labelClass}>{f('city')} <span className="text-gold">*</span></label>
                              <input type="text" required placeholder={f('cityPlaceholder')} value={data.city} onChange={set('city')} className={inputClass} />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2 */}
                      {step === 2 && (
                        <motion.div key="step2"
                          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>{f('phone')} <span className="text-gold">*</span></label>
                              <input type="tel" required placeholder={f('phonePlaceholder')} value={data.phone} onChange={set('phone')} className={inputClass} />
                            </div>
                            <div>
                              <label className={labelClass}>{f('email')} <span className="text-gold">*</span></label>
                              <input type="email" required placeholder={f('emailPlaceholder')} value={data.email} onChange={set('email')} className={inputClass} />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>{f('preferredContact')} <span className="text-gold">*</span></label>
                            <PillChoice options={contactOptions} value={data.preferredContact} name="preferredContact" onChange={setVal('preferredContact')} />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 */}
                      {step === 3 && (
                        <motion.div key="step3"
                          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-6">

                          {/* Package selector */}
                          <div>
                            <label className={labelClass}>Gewenst pakket of les <span className="text-gold">*</span></label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                              {PACKAGES.map((pkg) => {
                                const active = data.selectedPackage === pkg.id;
                                return (
                                  <label key={pkg.id} className={cn(
                                    'flex flex-col gap-0.5 px-4 py-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 select-none',
                                    active
                                      ? pkg.highlight ? 'bg-navy border-navy' : 'bg-navy border-navy'
                                      : 'bg-white border-slate-100 hover:border-navy/30'
                                  )}>
                                    <input type="radio" name="selectedPackage" value={pkg.id}
                                      checked={active} onChange={() => setVal('selectedPackage')(pkg.id)} className="sr-only" />
                                    <div className="flex items-center justify-between gap-2">
                                      <span className={cn('text-sm font-bold leading-snug', active ? 'text-white' : 'text-navy')}>{pkg.label}</span>
                                      <span className={cn('text-xs font-black whitespace-nowrap flex-shrink-0', active ? 'text-gold' : 'text-navy')}>{pkg.detail}</span>
                                    </div>
                                    <span className={cn('text-xs', active ? 'text-white/50' : 'text-slate-400')}>{pkg.desc}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className={labelClass}>{f('licenseType')} <span className="text-gold">*</span></label>
                              <PillChoice options={licenseOptions} value={data.licenseType} name="licenseType" onChange={setVal('licenseType')} />
                            </div>
                            <div>
                              <label className={labelClass}>{f('transmission')} <span className="text-gold">*</span></label>
                              <PillChoice options={transmissionOptions} value={data.transmission} name="transmission" onChange={setVal('transmission')} />
                            </div>
                          </div>
                          <div>
                            <label className={labelClass}>{f('theoryDone')} <span className="text-gold">*</span></label>
                            <CardChoice options={theoryOptions} value={data.theoryDone} name="theoryDone" onChange={setVal('theoryDone')} />
                          </div>
                          <div>
                            <label className={labelClass}>{f('previousLessons')} <span className="text-gold">*</span></label>
                            <CardChoice options={previousOptions} value={data.previousLessons} name="previousLessons" onChange={setVal('previousLessons')} />
                          </div>
                          <div>
                            <label className={labelClass}>{f('startDate')} <span className="text-gold">*</span></label>
                            <PillChoice options={startOptions} value={data.startDate} name="startDate" onChange={setVal('startDate')} />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4 */}
                      {step === 4 && (
                        <motion.div key="step4"
                          initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-6">
                          <div>
                            <label className={labelClass}>{f('specialNeeds')}</label>
                            <PillChoice options={specialOptions} value={data.specialNeeds} name="specialNeeds" onChange={setVal('specialNeeds')} />
                          </div>
                          <div>
                            <label className={labelClass}>{f('hearAbout')}</label>
                            <PillChoice options={hearOptions} value={data.hearAbout} name="hearAbout" onChange={setVal('hearAbout')} />
                          </div>
                          <div>
                            <label className={labelClass}>{f('remarks')}</label>
                            <textarea rows={4} placeholder={f('remarksPlaceholder')} value={data.remarks} onChange={set('remarks')}
                              className={cn(inputClass, 'resize-none')} />
                          </div>

                          {/* Privacy */}
                          <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl bg-surface border-2 border-transparent hover:border-slate-100 transition-all duration-200">
                            <div className={cn(
                              'mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                              data.privacy ? 'bg-navy border-navy' : 'border-slate-200 group-hover:border-navy/40'
                            )}>
                              {data.privacy && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <input type="checkbox" required checked={data.privacy} onChange={set('privacy')} className="sr-only" />
                            <span className="text-sm text-slate-500 leading-relaxed pt-0.5">{f('privacy')} <span className="text-gold">*</span></span>
                          </label>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {formState === 'error' && (
                      <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 rounded-2xl px-5 py-4 border-2 border-red-100 mt-6">
                        <AlertCircle size={16} className="flex-shrink-0" />
                        Er ging iets mis. Probeer opnieuw of neem contact op via WhatsApp.
                      </div>
                    )}
                  </div>

                  {/* Footer nav */}
                  <div className="px-8 py-5 bg-surface border-t border-surface-border flex items-center justify-between">
                    {step > 1 ? (
                      <button type="button" onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-100 text-slate-500 text-sm font-semibold hover:border-navy/20 hover:text-navy transition-all duration-200">
                        <ChevronLeft size={16} />
                        {t('prev')}
                      </button>
                    ) : <div />}

                    <button type="submit" disabled={formState === 'submitting'}
                      className={cn(
                        'flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200',
                        formState === 'submitting'
                          ? 'bg-navy/50 text-white cursor-not-allowed'
                          : 'bg-navy text-white hover:bg-navy-light hover:shadow-navy hover:scale-[1.02] active:scale-[0.98]'
                      )}>
                      {step < TOTAL_STEPS ? (
                        <>{t('next')}<ChevronRight size={16} /></>
                      ) : formState === 'submitting' ? (
                        t('submitting')
                      ) : (
                        <>{t('submit')}<Send size={14} /></>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
