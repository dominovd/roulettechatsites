// Locale-aware navigation helpers for next-intl
// Compatible with both next-intl v2 and v3
import { locales } from './i18n';

export type Locale = (typeof locales)[number];

/**
 * Strip any locale prefix from a pathname and prepend the target locale prefix.
 * Works regardless of whether usePathname() returns the path with or without locale.
 * Always returns a non-empty string starting with '/'.
 */
export function switchLocale(pathname: string, targetLocale: Locale | string): string {
  // Strip any existing locale prefix
  const localePattern = locales.join('|');
  const stripped = pathname.replace(new RegExp(`^/(${localePattern})(?=/|$)`), '') || '/';
  const prefix = targetLocale === 'en' ? '' : `/${targetLocale}`;
  const result = `${prefix}${stripped}`;
  // Ensure result is never empty
  return result || '/';
}
