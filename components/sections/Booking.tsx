'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const inputClass = 'w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-navy text-sm placeholder:text-slate-300 focus:outline-none focus:border-navy/40 focus:ring-2 focus:ring-navy/10 transition-all duration-200';

export default function Booking() {
  const t = useTranslations('booking');
  const f = useTranslations('booking.form');
  const c = useTranslations('booking.contactInfo');

  const [formState, setFormState] = useState<FormState>('idle');
  const [data, setData] = useState<FormData>({ name: '', phone: '', email: '', service: '', message: '' });

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setFormState(res.ok ? 'success' : 'error');
    } catch {
      setFormState('error');
    }
  };

  const serviceOptions = f.raw('serviceOptions') as string[];

  return (
    <section id="booking" className="section-padding bg-white">
      <div className="container-wide">
        <AnimatedSection className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg mb-4">{t('headline')}</h2>
          <p className="text-slate-500">{t('subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 card-light rounded-3xl p-8"
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{f('successTitle')}</h3>
                  <p className="text-slate-500 text-sm">{f('successText')}</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f('name')}</label>
                      <input type="text" required placeholder={f('namePlaceholder')} value={data.name} onChange={set('name')} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f('phone')}</label>
                      <input type="tel" required placeholder={f('phonePlaceholder')} value={data.phone} onChange={set('phone')} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f('email')}</label>
                    <input type="email" required placeholder={f('emailPlaceholder')} value={data.email} onChange={set('email')} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f('service')}</label>
                    <select
                      value={data.service}
                      onChange={set('service')}
                      className={cn(inputClass, 'cursor-pointer appearance-none')}
                      style={{ color: data.service ? '#0F172A' : '#CBD5E1' }}
                    >
                      <option value="" disabled>{f('serviceDefault')}</option>
                      {serviceOptions.map((opt, i) => (
                        <option key={i} value={opt} className="text-navy">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f('message')}</label>
                    <textarea rows={4} placeholder={f('messagePlaceholder')} value={data.message} onChange={set('message')} className={cn(inputClass, 'resize-none')} />
                  </div>

                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                      <AlertCircle size={15} />
                      {f('errorText')}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all duration-300',
                      formState === 'submitting' ? 'bg-navy/60 text-white cursor-not-allowed' : 'bg-navy text-white hover:bg-navy-light hover:shadow-navy'
                    )}
                  >
                    {formState === 'submitting' ? f('submitting') : f('submit')}
                    {formState !== 'submitting' && <Send size={14} />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="font-bold text-navy text-lg mb-5">{c('title')}</h3>

            {[
              { icon: Phone, label: c('phone'), sub: c('whatsapp'), href: `tel:${c('phone')}`, highlight: true },
              { icon: Mail, label: c('email'), sub: undefined, href: `mailto:${c('email')}`, highlight: false },
              { icon: MapPin, label: c('address'), sub: c('addressNote'), href: undefined, highlight: false },
              { icon: Clock, label: c('hours'), sub: c('hoursNote'), href: undefined, highlight: false },
            ].map(({ icon: Icon, label, sub, href, highlight }, i) => (
              <div key={i} className={cn(
                'flex items-start gap-4 p-4 rounded-2xl border transition-colors duration-200',
                highlight ? 'border-gold/30 bg-gold-bg' : 'border-surface-border bg-surface'
              )}>
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  highlight ? 'bg-gold' : 'bg-navy-50'
                )}>
                  <Icon size={16} className={highlight ? 'text-white' : 'text-navy'} />
                </div>
                <div>
                  {href ? (
                    <a href={href} className="text-navy font-semibold text-sm hover:text-gold transition-colors">{label}</a>
                  ) : (
                    <p className="text-navy font-semibold text-sm">{label}</p>
                  )}
                  {sub && <p className="text-slate-400 text-xs mt-0.5">{sub}</p>}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <a
              href="https://maps.google.com/?q=Martelarenplein+20E,+3000+Leuven"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 rounded-2xl bg-navy-50 border border-surface-border overflow-hidden aspect-video hover:border-navy/30 transition-colors duration-200 relative group"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <MapPin size={28} className="text-navy mb-2" />
                <p className="text-navy font-semibold text-sm">Martelarenplein 20E</p>
                <p className="text-slate-400 text-xs">3000 Leuven · Open in Maps</p>
              </div>
              <div className="absolute inset-0 bg-navy/5 group-hover:bg-navy/10 transition-colors duration-200" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
