// Locale-aware navigation helpers for next-intl
// Compatible with both next-intl v2 and v3
import { locales } from './i18n';

export type Locale = (typeof locales)[number];

/**
 * Strip any locale prefix from a pathname and prepend the target locale prefix.
 * Works regardless of whether usePathname() returns the path with or without locale.
 */
export function switchLocale(pathname: string, targetLocale: Locale | string): string {
  // Build a regex that matches any locale prefix at the start
  const localePattern = locales.map((l) => l).join('|');
  const stripped = pathname.replace(new RegExp(`^/(${localePattern})(?=/|$)`), '') || '/';
  const prefix = targetLocale === 'en' ? '' : `/${targetLocale}`;
  return `${prefix}${stripped}`;
}
