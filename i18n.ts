import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es', 'pt', 'pl', 'de', 'fr', 'ja', 'ar', 'it', 'tr', 'ko'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
