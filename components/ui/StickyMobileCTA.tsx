'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function StickyMobileCTA() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden"
        >
          <div className="bg-white/95 backdrop-blur-lg border border-surface-border rounded-2xl p-1.5 shadow-card-hover">
            <Link
              href={`/${locale}/inschrijven`}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-navy text-white font-semibold text-sm"
            >
              {t('bookCta')}
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
