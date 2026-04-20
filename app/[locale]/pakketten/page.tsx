import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PakkettenPage from '@/components/pages/PakkettenPage';

const locales = ['nl', 'en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Pakketten & Rijlessen',
  description: 'Bekijk onze rijlespakketten en individuele lessen bij Rijschool Lovanium in Leuven.',
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PakkettenPage />;
}
