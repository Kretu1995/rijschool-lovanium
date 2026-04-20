'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const c = useTranslations('booking.contactInfo');
  const locale = useLocale();

  const navLinks = [
    { label: t('navLinks.0'), href: `/${locale}` },
    { label: t('navLinks.1'), href: `/${locale}/diensten` },
    { label: t('navLinks.2'), href: `/${locale}/team` },
    { label: t('navLinks.3'), href: `/${locale}#pricing` },
    { label: t('navLinks.4'), href: `/${locale}#booking` },
  ];

  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo.svg"
                alt="Rijschool Lovanium"
                width={160}
                height={44}
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">{t('description')}</p>
            <p className="text-gold font-semibold text-sm italic mb-6">"{t('tagline')}"</p>

            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200" aria-label="Facebook">
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">{t('navTitle')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-5">{t('contactTitle')}</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${c('phone')}`} className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200">
                  <Phone size={14} className="mt-0.5 text-gold flex-shrink-0" />
                  <div>
                    <p>{c('phone')}</p>
                    <p className="text-white/30 text-xs">WhatsApp beschikbaar</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${c('email')}`} className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors duration-200">
                  <Mail size={14} className="mt-0.5 text-gold flex-shrink-0" />
                  {c('email')}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={14} className="mt-0.5 text-gold flex-shrink-0" />
                <div>
                  <p>{c('address')}</p>
                  <p className="text-white/30 text-xs">{c('addressNote')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <Clock size={14} className="mt-0.5 text-gold flex-shrink-0" />
                <div>
                  <p>{c('hours')}</p>
                  <p className="text-white/30 text-xs">{c('hoursNote')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">{t('copyright')}</p>
          <p className="text-white/20 text-xs">{t('recognition')}</p>
          <div className="flex items-center gap-5">
            <button className="text-white/30 hover:text-white/60 text-xs transition-colors">{t('legal.privacy')}</button>
            <button className="text-white/30 hover:text-white/60 text-xs transition-colors">{t('legal.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
