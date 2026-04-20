'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const b = useTranslations('booking');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: t('links.items.0'), id: 'services' },
    { label: t('links.items.1'), id: 'why-us' },
    { label: t('links.items.2'), id: 'pricing' },
    { label: t('links.items.3'), id: 'booking' },
  ];

  return (
    <footer id="contact" className="bg-ink-surface border-t border-ink-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-ink font-black">L</span>
              </div>
              <span className="font-bold text-xl text-zinc-100">Rijschool Lovanium</span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-xs mb-6">{t('description')}</p>
            <p className="text-gold font-semibold italic">"{t('tagline')}"</p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-ink-border flex items-center justify-center text-zinc-500 hover:text-gold hover:border-gold-dark transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-ink-border flex items-center justify-center text-zinc-500 hover:text-gold hover:border-gold-dark transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-widest mb-5">
              {t('links.title')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-zinc-400 hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-widest mb-5">
              {t('contact.title')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${b('contactInfo.phone')}`}
                  className="flex items-start gap-3 text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-200"
                >
                  <Phone size={15} className="mt-0.5 text-gold flex-shrink-0" />
                  {b('contactInfo.phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${b('contactInfo.email')}`}
                  className="flex items-start gap-3 text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-200"
                >
                  <Mail size={15} className="mt-0.5 text-gold flex-shrink-0" />
                  {b('contactInfo.email')}
                </a>
              </li>
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin size={15} className="mt-0.5 text-gold flex-shrink-0" />
                {b('contactInfo.address')}
              </li>
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <Clock size={15} className="mt-0.5 text-gold flex-shrink-0" />
                {b('contactInfo.hours')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ink-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">{t('copyright')}</p>
          <p className="text-zinc-700 text-xs">{t('vat')}</p>
          <div className="flex items-center gap-6">
            {['privacy', 'terms', 'cookies'].map((key) => (
              <button
                key={key}
                className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors duration-200"
              >
                {t(`legal.${key}` as any)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
