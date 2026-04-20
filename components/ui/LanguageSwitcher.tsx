'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'nl', label: 'NL', full: 'Nederlands' },
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'fr', label: 'FR', full: 'Français' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === locale) || languages[0];

  const switchLocale = (code: string) => {
    const segments = pathname.split('/');
    segments[1] = code;
    router.push(segments.join('/'));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border hover:border-navy/30 text-slate-500 hover:text-navy text-sm font-medium transition-all duration-200"
      >
        <span>{current.label}</span>
        <ChevronDown size={12} className={cn('transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-surface-border rounded-xl shadow-card-hover overflow-hidden min-w-[130px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150',
                  lang.code === locale
                    ? 'text-navy bg-navy-50 font-semibold'
                    : 'text-slate-500 hover:text-navy hover:bg-surface'
                )}
              >
                <span className="font-bold text-xs tracking-wider w-6">{lang.label}</span>
                <span>{lang.full}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
