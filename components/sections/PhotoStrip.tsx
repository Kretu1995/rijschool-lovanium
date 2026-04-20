'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const photos = [
  {
    src: '/audi-lovanium.jpg',
    alt: 'Rijschool Lovanium Audi A3',
    caption: 'Onze Audi A3',
  },
  {
    src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop',
    alt: 'Theorieles',
    caption: 'Theorieopleiding',
  },
  {
    src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80&fit=crop',
    alt: 'Rijden in Leuven',
    caption: 'Rijles in Leuven',
  },
  {
    src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&fit=crop',
    alt: 'Online theorie',
    caption: 'Online leermateriaal',
  },
];

export default function PhotoStrip() {
  return (
    <div className="bg-white py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white text-xs font-bold drop-shadow">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
