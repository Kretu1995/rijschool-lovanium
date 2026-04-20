'use client';

import { useTranslations } from 'next-intl';
import { Shield, Star, Car, MapPin, MessageCircle, Zap, Award, Clock } from 'lucide-react';

const icons = [Award, Star, Car, MapPin, MessageCircle, Zap, Shield, Clock];

export default function TrustBar() {
  const t = useTranslations('trustBar');
  const items = t.raw('items') as string[];

  return (
    <div className="bg-navy py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((text, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <div key={i} className="flex items-center gap-2 text-white/75 text-sm font-medium">
                <Icon size={14} className="text-gold flex-shrink-0" />
                <span>{text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
