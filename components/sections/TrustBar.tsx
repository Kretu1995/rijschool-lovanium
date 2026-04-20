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

// Duplicate for seamless loop
const allItems = [...items, ...items];

export default function TrustBar() {
  return (
    <div className="bg-navy py-4 overflow-hidden">
      <div className="flex">
        <div className="marquee-inner">
          {allItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 px-8 text-white/70 flex-shrink-0 text-sm font-medium"
              >
                <Icon size={14} className="text-gold flex-shrink-0" />
                <span>{item.text}</span>
                <span className="ml-8 text-white/20">·</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
