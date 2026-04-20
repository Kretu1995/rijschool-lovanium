import { setRequestLocale } from 'next-intl/server';
import InschrijvenPage from '@/components/pages/InschrijvenPage';

const locales = ['nl', 'en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Inschrijven({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InschrijvenPage />;
}
