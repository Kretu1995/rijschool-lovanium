'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('services'), href: `/${locale}/diensten` },
    { label: t('team'), href: `/${locale}/team` },
    { label: t('pricing'), href: `/${locale}#pricing` },
    { label: t('contact'), href: `/${locale}#booking` },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-lg border-b border-surface-border shadow-nav'
            : 'bg-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-navy flex items-center justify-center group-hover:bg-navy-light transition-colors duration-200">
              <span className="text-white font-black text-sm">L</span>
            </div>
            <div>
              <span className="font-black text-navy text-base tracking-tight">Lovanium</span>
              <span className="hidden sm:block text-[10px] text-slate-400 tracking-widest uppercase -mt-0.5">Rijschool · Leuven</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 hover:text-navy font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={`/${locale}#booking`}
              className="btn-primary text-sm"
            >
              {t('bookCta')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-500 hover:text-navy transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-xl font-bold text-navy border-b border-surface-border hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href={`/${locale}#booking`}
                onClick={() => setMobileOpen(false)}
                className="btn-primary justify-center text-center"
              >
                {t('bookCta')}
              </Link>
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>

            <div className="mt-10 p-5 bg-surface rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Contact</p>
              <a href="tel:+32492482853" className="text-navy font-semibold">+32 492 48 28 53</a>
              <p className="text-slate-400 text-sm mt-1">Ma–Vr 10:00–17:00</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
