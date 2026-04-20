'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { cn } from '@/lib/utils';

const navIds = ['services', 'whyUs', 'pricing', 'booking', 'contact'] as const;

export default function Navigation() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-ink/90 backdrop-blur-xl border-b border-ink-border shadow-2xl'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="text-ink font-black text-sm">L</span>
            </div>
            <span className="font-bold text-zinc-100 tracking-tight">
              Lovanium
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['services', 'whyUs', 'pricing', 'booking'].map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key === 'whyUs' ? 'why-us' : key)}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              >
                {t(key as keyof typeof t)}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => scrollTo('booking')}
              className="btn-primary text-sm"
            >
              {t('bookCta')}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-2xl pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-2 pt-4">
              {['services', 'whyUs', 'pricing', 'booking'].map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(key === 'whyUs' ? 'why-us' : key)}
                  className="text-left py-4 text-2xl font-bold text-zinc-300 hover:text-gold border-b border-ink-border transition-colors duration-200"
                >
                  {t(key as keyof typeof t)}
                </button>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={() => scrollTo('booking')}
                className="btn-primary justify-center"
              >
                {t('bookCta')}
              </button>
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
