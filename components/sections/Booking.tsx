'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  phone: string;
  email: string;
  packageChoice: string;
  message: string;
}

export default function Booking() {
  const t = useTranslations('booking');
  const f = useTranslations('booking.form');
  const c = useTranslations('booking.contactInfo');

  const [formState, setFormState] = useState<FormState>('idle');
  const [data, setData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    packageChoice: '',
    message: '',
  });

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setData((prev) => ({ ...prev, [field]: e.target.value }));

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

  const packageOptions = f.raw('packageOptions') as string[];

  const contactItems = [
    { icon: Phone, label: c('phone'), href: `tel:${c('phone')}` },
    { icon: Mail, label: c('email'), href: `mailto:${c('email')}` },
    { icon: MapPin, label: c('address'), href: undefined },
    { icon: Clock, label: c('hours'), href: undefined },
  ];

  return (
    <section id="booking" className="section-padding bg-ink-surface relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg text-zinc-50 mb-5">{t('headline')}</h2>
          <p className="text-muted">{t('subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 card-dark rounded-2xl p-8"
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <CheckCircle size={56} className="text-green-400 mb-5" />
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">{f('successTitle')}</h3>
                  <p className="text-zinc-400">{f('successText')}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        {f('name')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={f('namePlaceholder')}
                        value={data.name}
                        onChange={set('name')}
                        className="w-full bg-ink border border-ink-border rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                        {f('phone')}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={f('phonePlaceholder')}
                        value={data.phone}
                        onChange={set('phone')}
                        className="w-full bg-ink border border-ink-border rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      {f('email')}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={f('emailPlaceholder')}
                      value={data.email}
                      onChange={set('email')}
                      className="w-full bg-ink border border-ink-border rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200"
                    />
                  </div>

                  {/* Package */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      {f('package')}
                    </label>
                    <select
                      value={data.packageChoice}
                      onChange={set('packageChoice')}
                      className="w-full bg-ink border border-ink-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200 appearance-none cursor-pointer"
                      style={{ color: data.packageChoice ? '#E4E4E7' : '#3F3F46' }}
                    >
                      <option value="" disabled>{f('packageDefault')}</option>
                      {packageOptions.map((opt, i) => (
                        <option key={i} value={opt} className="text-zinc-200 bg-ink-card">{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      {f('message')}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={f('messagePlaceholder')}
                      value={data.message}
                      onChange={set('message')}
                      className="w-full bg-ink border border-ink-border rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder:text-zinc-700 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-4 py-3">
                      <AlertCircle size={15} />
                      {f('errorText')}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300',
                      formState === 'submitting'
                        ? 'bg-gold/60 text-ink cursor-not-allowed'
                        : 'bg-gold text-ink hover:bg-gold-light hover:shadow-gold'
                    )}
                  >
                    {formState === 'submitting' ? f('submitting') : f('submit')}
                    {formState !== 'submitting' && <Send size={15} />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="font-bold text-zinc-200 text-lg">{c('title')}</h3>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, href }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-muted flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-zinc-300 text-sm pt-2.5 hover:text-gold transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ) : (
                    <p className="text-zinc-400 text-sm pt-2.5">{label}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl bg-ink-card border border-ink-border overflow-hidden aspect-video flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-gold mx-auto mb-2 opacity-60" />
                <p className="text-zinc-600 text-xs">Bondgenotenlaan 1, Leuven</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
