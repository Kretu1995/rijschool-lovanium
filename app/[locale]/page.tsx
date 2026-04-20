import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import SocialProof from '@/components/sections/SocialProof';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import Pricing from '@/components/sections/Pricing';
import Booking from '@/components/sections/Booking';

const locales = ['nl', 'en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <WhyUs />
      <Pricing />
      <Booking />
    </>
  );
}
