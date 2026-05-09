export const runtime = 'edge';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RouletteChat – Meet Random People via Free Video Chat',
    template: '%s | RouletteChat',
  },
  description:
    'Instant random video chat with real people from 180+ countries. No sign-up needed. Meet new friends, explore cultures, have genuine conversations.',
  keywords: [
    'random video chat', 'roulette chat', 'stranger chat', 'omegle alternative',
    'chatroulette alternative', 'free video chat', 'meet random people',
  ],
  openGraph: {
    type: 'website',
    siteName: 'RouletteChat',
    title: 'RouletteChat – Meet Random People via Free Video Chat',
    description: 'Instant random video chat with real people from 180+ countries.',
    url: 'https://roulettechatsites.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RouletteChat – Free Random Video Chat',
    description: 'Instant random video chat with real people from 180+ countries.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://roulettechatsites.com',
    languages: {
      'en': 'https://roulettechatsites.com',
      'ru': 'https://roulettechatsites.com/ru',
      'es': 'https://roulettechatsites.com/es',
      'pt': 'https://roulettechatsites.com/pt',
    },
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {/* Background glow blobs */}
          <div aria-hidden className="blob w-[600px] h-[600px] bg-purple-600/20 -top-48 -left-36 animate-blob" />
          <div aria-hidden className="blob w-[500px] h-[500px] bg-pink-500/15 top-[20%] -right-48 animate-blob" style={{ animationDelay: '-6s' }} />
          <div aria-hidden className="blob w-[400px] h-[400px] bg-cyan-500/10 bottom-[10%] left-[20%] animate-blob" style={{ animationDelay: '-3s' }} />

          <Navbar locale={locale} />
          <main className="relative z-10">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
