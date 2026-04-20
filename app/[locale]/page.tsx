import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import HowItWorks from '@/components/sections/HowItWorks';
import SocialProof from '@/components/sections/SocialProof';
import Services from '@/components/sections/Services';
import WhyUs from '@/components/sections/WhyUs';
import FAQ from '@/components/sections/FAQ';
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
      <TrustBar />
      <HowItWorks />
      <SocialProof />
      <Services />
      <WhyUs />
      <FAQ />
      <Pricing />
      <Booking />
    </>
  );
}
