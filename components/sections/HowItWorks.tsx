'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { MotionInView } from '@/components/ui/MotionInView';

interface Step {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <AnimatedSection className="text-center max-w-xl mx-auto mb-16">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>
          <h2 className="heading-lg mb-4">{t('headline')}</h2>
          <p className="text-slate-500">{t('subtitle')}</p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <MotionInView
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center shadow-navy mb-0 z-10 relative">
                    <span className="text-white font-black text-xl">{step.number}</span>
                  </div>
                  {/* Arrow between steps (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-12 text-slate-200">
                      <ArrowRight size={20} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.description}</p>

                {/* Price/detail badge */}
                <span className="inline-block tag-navy text-[11px]">{step.detail}</span>
              </MotionInView>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <MotionInView
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-base px-8 py-4 group"
          >
            Start vandaag
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </MotionInView>
      </div>
    </section>
  );
}
