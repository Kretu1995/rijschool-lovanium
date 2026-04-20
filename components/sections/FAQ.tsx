'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface FAQItem {
  question: string;
  answer: string;
}

function AccordionItem({ item, index, isOpen, onToggle }: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-navy/20 shadow-card bg-white'
          : 'border-surface-border bg-white hover:border-navy/15'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className={`font-semibold text-sm md:text-base transition-colors duration-200 ${
          isOpen ? 'text-navy' : 'text-slate-700'
        }`}>
          {item.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-navy text-white' : 'bg-surface text-slate-400'
        }`}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-surface-border pt-4">
              <p className="text-slate-500 text-sm leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <section id="faq" className="section-padding bg-surface">
      <div className="container-wide">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="eyebrow mb-3">{t('eyebrow')}</p>
            <h2 className="heading-lg">{t('headline')}</h2>
          </div>
          <a
            href="https://wa.me/32492482853"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebe5d] transition-colors duration-200 shadow-sm"
          >
            <MessageCircle size={16} />
            {t('subtitle')}
          </a>
        </AnimatedSection>

        {/* Two-column accordion on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-3">
            {left.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
          {/* Right column */}
          <div className="space-y-3">
            {right.map((item, i) => (
              <AccordionItem
                key={i + half}
                item={item}
                index={i + half}
                isOpen={openIndex === i + half}
                onToggle={() => toggle(i + half)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
