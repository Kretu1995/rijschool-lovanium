'use client';

import { useLocale } from 'next-intl';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PakkettenBanner() {
  const locale = useLocale();

  return (
    <section className="bg-navy py-16 px-6 relative overflow-hidden">
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/8 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">Rijlespakketten</p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Kies het pakket dat bij jou past
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              {[
                { name: 'Starter', price: '€510', hours: '6u' },
                { name: 'Comfort', price: '€1.020', hours: '12u' },
                { name: 'Master', price: '€1.700', hours: '20u' },
              ].map((pkg) => (
                <div key={pkg.name} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-gold flex-shrink-0" />
                  <span className="text-white/70 text-sm">
                    <span className="text-white font-semibold">{pkg.name}</span>
                    {' '}— {pkg.hours} · {pkg.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href={`/${locale}/pakketten`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-white font-bold text-sm whitespace-nowrap hover:shadow-[0_0_30px_rgba(200,150,62,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Bekijk alle pakketten
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
