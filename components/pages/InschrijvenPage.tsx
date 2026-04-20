'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, Mail, MapPin, CheckCircle, AlertCircle,
  ChevronRight, ChevronLeft, Car, BookOpen, MessageCircle, Send
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const inputClass = 'w-full bg-white border border-surface-border rounded-xl px-4 py-3 text-navy text-sm placeholder:text-slate-300 focus:outline-none focus:border-navy/40 focus:ring-2 focus:ring-navy/10 transition-all duration-200';
const labelClass = 'block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2';
const selectClass = cn(inputClass, 'cursor-pointer appearance-none bg-white');

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  firstName: string;
  lastName: string;
  birthdate: string;
  nationality: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  preferredContact: string;
  licenseType: string;
  transmission: string;
  theoryDone: string;
  previousLessons: string;
  startDate: string;
  specialNeeds: string;
  hearAbout: string;
  remarks: string;
  privacy: boolean;
}

const TOTAL_STEPS = 4;

const stepIcons = [User, Phone, Car, BookOpen];

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
    licenseType: '', transmission: '', theoryDone: '', previousLessons: '', startDate: '',
    specialNeeds: '', hearAbout: '', remarks: '', privacy: false,
  });

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [field]: (e.target as HTMLInputElement).type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

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
    <div className="min-h-screen bg-surface pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-10">
          <Link href={`/${locale}`} className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-navy font-semibold">{t('headline')}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <p className="eyebrow mb-3">{t('eyebrow')}</p>
          <h1 className="heading-lg mb-3">{t('headline')}</h1>
          <p className="text-slate-500 max-w-xl">{t('subtitle')}</p>
        </div>

        {formState === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-surface-border shadow-card p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-navy mb-3">{t('successTitle')}</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">{t('successText')}</p>
            <a
              href="https://wa.me/32492482853"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

            {/* Step sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-surface-border shadow-card p-6 space-y-3 sticky top-28">
                {stepLabels.map((label, i) => {
                  const StepIcon = stepIcons[i];
                  const stepNum = i + 1;
                  const isActive = step === stepNum;
                  const isDone = step > stepNum;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                        isActive ? 'bg-navy text-white' : isDone ? 'bg-green-50 text-green-600' : 'text-slate-400'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black',
                        isActive ? 'bg-white/20' : isDone ? 'bg-green-100' : 'bg-surface'
                      )}>
                        {isDone ? <CheckCircle size={16} /> : <StepIcon size={15} />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Stap {stepNum}</p>
                        <p className="text-xs font-semibold leading-tight">{label}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Contact info */}
                <div className="mt-4 pt-4 border-t border-surface-border space-y-2">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Hulp nodig?</p>
                  <a href="tel:+32492482853" className="flex items-center gap-2 text-xs text-navy font-semibold hover:text-gold transition-colors">
                    <Phone size={12} className="text-gold" />
                    +32 492 48 28 53
                  </a>
                  <a href="mailto:info@rijschoollovanium.be" className="flex items-center gap-2 text-xs text-navy font-semibold hover:text-gold transition-colors">
                    <Mail size={12} className="text-gold" />
                    info@rijschoollovanium.be
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Stap {step} van {TOTAL_STEPS}</span>
                  <span>{Math.round((step / TOTAL_STEPS) * 100)}% voltooid</span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-navy rounded-full"
                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-3xl border border-surface-border shadow-card p-8">
                  <AnimatePresence mode="wait">

                    {/* Step 1: Personal */}
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <h2 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                          <User size={18} className="text-gold" />
                          {t('step1')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>{f('firstName')} *</label>
                            <input type="text" required placeholder="Jan" value={data.firstName} onChange={set('firstName')} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>{f('lastName')} *</label>
                            <input type="text" required placeholder="Janssen" value={data.lastName} onChange={set('lastName')} className={inputClass} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>{f('birthdate')} *</label>
                            <input type="date" required value={data.birthdate} onChange={set('birthdate')} className={inputClass} />
                          </div>
                          <div>
                            <label className={labelClass}>{f('nationality')}</label>
                            <input type="text" placeholder={f('nationalityPlaceholder')} value={data.nationality} onChange={set('nationality')} className={inputClass} />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>{f('street')} *</label>
                          <input type="text" required placeholder={f('streetPlaceholder')} value={data.street} onChange={set('street')} className={inputClass} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <label className={labelClass}>{f('postalCode')} *</label>
                            <input type="text" required placeholder={f('postalCodePlaceholder')} value={data.postalCode} onChange={set('postalCode')} className={inputClass} />
                          </div>
                          <div className="col-span-1 sm:col-span-2">
                            <label className={labelClass}>{f('city')} *</label>
                            <input type="text" required placeholder={f('cityPlaceholder')} value={data.city} onChange={set('city')} className={inputClass} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Contact */}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <h2 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                          <Phone size={18} className="text-gold" />
                          {t('step2')}
                        </h2>
                        <div>
                          <label className={labelClass}>{f('phone')} *</label>
                          <input type="tel" required placeholder={f('phonePlaceholder')} value={data.phone} onChange={set('phone')} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{f('email')} *</label>
                          <input type="email" required placeholder={f('emailPlaceholder')} value={data.email} onChange={set('email')} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{f('preferredContact')} *</label>
                          <div className="flex flex-wrap gap-3 mt-1">
                            {contactOptions.map((opt) => (
                              <label key={opt} className={cn(
                                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200',
                                data.preferredContact === opt
                                  ? 'bg-navy text-white border-navy'
                                  : 'bg-white border-surface-border text-slate-600 hover:border-navy/30'
                              )}>
                                <input type="radio" name="preferredContact" value={opt} checked={data.preferredContact === opt} onChange={set('preferredContact')} className="sr-only" />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Training */}
                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <h2 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                          <Car size={18} className="text-gold" />
                          {t('step3')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>{f('licenseType')} *</label>
                            <select required value={data.licenseType} onChange={set('licenseType')} className={selectClass} style={{ color: data.licenseType ? '#0F172A' : '#CBD5E1' }}>
                              <option value="" disabled>Kies categorie</option>
                              {licenseOptions.map(opt => <option key={opt} value={opt} className="text-navy">{opt}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>{f('transmission')} *</label>
                            <select required value={data.transmission} onChange={set('transmission')} className={selectClass} style={{ color: data.transmission ? '#0F172A' : '#CBD5E1' }}>
                              <option value="" disabled>Kies type</option>
                              {transmissionOptions.map(opt => <option key={opt} value={opt} className="text-navy">{opt}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>{f('theoryDone')} *</label>
                          <div className="flex flex-col gap-2 mt-1">
                            {theoryOptions.map((opt) => (
                              <label key={opt} className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200',
                                data.theoryDone === opt ? 'bg-navy text-white border-navy' : 'bg-white border-surface-border text-slate-600 hover:border-navy/30'
                              )}>
                                <input type="radio" name="theoryDone" value={opt} checked={data.theoryDone === opt} onChange={set('theoryDone')} className="sr-only" />
                                <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0', data.theoryDone === opt ? 'border-white' : 'border-slate-300')}>
                                  {data.theoryDone === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>{f('previousLessons')} *</label>
                          <div className="flex flex-col gap-2 mt-1">
                            {previousOptions.map((opt) => (
                              <label key={opt} className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200',
                                data.previousLessons === opt ? 'bg-navy text-white border-navy' : 'bg-white border-surface-border text-slate-600 hover:border-navy/30'
                              )}>
                                <input type="radio" name="previousLessons" value={opt} checked={data.previousLessons === opt} onChange={set('previousLessons')} className="sr-only" />
                                <div className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0', data.previousLessons === opt ? 'border-white' : 'border-slate-300')}>
                                  {data.previousLessons === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>{f('startDate')} *</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {startOptions.map((opt) => (
                              <label key={opt} className={cn(
                                'px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-200',
                                data.startDate === opt ? 'bg-navy text-white border-navy' : 'bg-white border-surface-border text-slate-600 hover:border-navy/30'
                              )}>
                                <input type="radio" name="startDate" value={opt} checked={data.startDate === opt} onChange={set('startDate')} className="sr-only" />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Extra */}
                    {step === 4 && (
                      <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                        <h2 className="text-lg font-bold text-navy mb-6 flex items-center gap-2">
                          <BookOpen size={18} className="text-gold" />
                          {t('step4')}
                        </h2>
                        <div>
                          <label className={labelClass}>{f('specialNeeds')}</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {specialOptions.map((opt) => (
                              <label key={opt} className={cn(
                                'px-3 py-2 rounded-full border text-xs font-medium cursor-pointer transition-all duration-200',
                                data.specialNeeds === opt ? 'bg-navy text-white border-navy' : 'bg-white border-surface-border text-slate-600 hover:border-navy/30'
                              )}>
                                <input type="radio" name="specialNeeds" value={opt} checked={data.specialNeeds === opt} onChange={set('specialNeeds')} className="sr-only" />
                                {opt}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>{f('hearAbout')}</label>
                          <select value={data.hearAbout} onChange={set('hearAbout')} className={selectClass} style={{ color: data.hearAbout ? '#0F172A' : '#CBD5E1' }}>
                            <option value="" disabled>Kies optie</option>
                            {hearOptions.map(opt => <option key={opt} value={opt} className="text-navy">{opt}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>{f('remarks')}</label>
                          <textarea rows={4} placeholder={f('remarksPlaceholder')} value={data.remarks} onChange={set('remarks')} className={cn(inputClass, 'resize-none')} />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className={cn(
                            'mt-0.5 w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-all duration-200',
                            data.privacy ? 'bg-navy border-navy' : 'border-slate-300 group-hover:border-navy/50'
                          )}>
                            {data.privacy && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <input type="checkbox" required checked={data.privacy} onChange={set('privacy')} className="sr-only" />
                          <span className="text-sm text-slate-500 leading-relaxed">{f('privacy')} *</span>
                        </label>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3 border border-red-100 mt-5">
                      <AlertCircle size={15} />
                      Er ging iets mis. Probeer opnieuw of neem contact op via WhatsApp.
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-border">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface-border text-slate-500 text-sm font-medium hover:border-navy/30 hover:text-navy transition-all duration-200"
                      >
                        <ChevronLeft size={16} />
                        {t('prev')}
                      </button>
                    ) : <div />}

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className={cn(
                        'flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200',
                        formState === 'submitting'
                          ? 'bg-navy/60 text-white cursor-not-allowed'
                          : 'bg-navy text-white hover:bg-navy-light hover:shadow-navy'
                      )}
                    >
                      {step < TOTAL_STEPS ? (
                        <>
                          {t('next')}
                          <ChevronRight size={16} />
                        </>
                      ) : formState === 'submitting' ? (
                        t('submitting')
                      ) : (
                        <>
                          {t('submit')}
                          <Send size={14} />
                        </>
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
