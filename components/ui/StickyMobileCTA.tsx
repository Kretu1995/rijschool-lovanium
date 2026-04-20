'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyMobileCTA() {
  const t = useTranslations('nav');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <div className="bg-ink-card/80 backdrop-blur-lg border border-ink-border rounded-2xl p-1 shadow-2xl">
            <button
              onClick={scrollToBooking}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold text-ink font-semibold text-sm tracking-wide"
            >
              {t('bookCta')}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
