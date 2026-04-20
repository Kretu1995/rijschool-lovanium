'use client';

import { Shield, Star, Car, MapPin, MessageCircle, Zap, Award, Clock } from 'lucide-react';

const items = [
  { icon: Award, text: 'Erkend rijschool #2863' },
  { icon: Star, text: '4.9/5 Google Reviews' },
  { icon: Car, text: 'Moderne Audi-lesvoertuigen' },
  { icon: MapPin, text: 'Naast station Leuven' },
  { icon: MessageCircle, text: 'WhatsApp bereikbaar' },
  { icon: Zap, text: 'Korte wachttijden' },
  { icon: Shield, text: 'Manueel & automaat' },
  { icon: Clock, text: 'Flexibele planning' },
];

export default function TrustBar() {
  return (
    <div className="bg-navy py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2 text-white/75 text-sm font-medium">
                <Icon size={14} className="text-gold flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
