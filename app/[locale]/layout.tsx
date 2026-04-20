import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import StickyMobileCTA from '@/components/ui/StickyMobileCTA';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ChatBot from '@/components/ui/ChatBot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const locales = ['nl', 'en', 'fr'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const descriptions: Record<string, string> = {
    nl: 'Rijschool Lovanium in Leuven — moderne rijopleidingen met ervaren instructeurs. 97% slaagpercentage. Start vandaag!',
    en: 'Rijschool Lovanium in Leuven — modern driving lessons with experienced instructors. 97% pass rate. Start today!',
    fr: "Rijschool Lovanium à Louvain — cours de conduite modernes avec moniteurs expérimentés. 97% de réussite. Commencez aujourd'hui !",
  };

  return {
    title: {
      template: '%s | Rijschool Lovanium',
      default: 'Rijschool Lovanium — Jouw rijbewijs in Leuven',
    },
    description: descriptions[locale] || descriptions.nl,
    keywords: ['rijschool', 'leuven', 'rijbewijs', 'lovanium', 'driving school', 'auto-école'],
    openGraph: {
      title: 'Rijschool Lovanium',
      description: descriptions[locale] || descriptions.nl,
      locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="bg-ink text-zinc-100 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
