import type { MetadataRoute } from 'next';
import { reviews } from '@/lib/reviews';
import { locales } from '@/i18n';

const BASE = 'https://roulettechatsites.com';

const STATIC_PAGES = ['', '/reviews', '/tools', '/compare', '/blog', '/about'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages × locales
  for (const page of STATIC_PAGES) {
    for (const locale of locales) {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      entries.push({
        url: `${BASE}${localePrefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  // Review pages × locales
  for (const review of reviews) {
    for (const locale of locales) {
      const localePrefix = locale === 'en' ? '' : `/${locale}`;
      entries.push({
        url: `${BASE}${localePrefix}/reviews/${review.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
