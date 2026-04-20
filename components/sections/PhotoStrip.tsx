import Image from 'next/image';

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
    <div className="bg-white py-4 overflow-hidden">
      <div className="flex gap-4 px-6 max-w-7xl mx-auto">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative flex-1 min-w-0 rounded-2xl overflow-hidden aspect-[4/3] group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3">
              <p className="text-white text-xs font-bold">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
