export const runtime = 'edge';

import type { MetadataRoute } from 'next';
import { reviews } from '@/lib/reviews';
import { locales } from '@/i18n';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

const STATIC_PAGES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '',          priority: 1.0, freq: 'daily'   },
  { path: '/reviews',  priority: 0.9, freq: 'weekly'  },
  { path: '/compare',  priority: 0.8, freq: 'weekly'  },
  { path: '/blog',     priority: 0.7, freq: 'weekly'  },
  { path: '/about',    priority: 0.6, freq: 'monthly' },
  { path: '/safety',   priority: 0.6, freq: 'monthly' },
  { path: '/tools',    priority: 0.6, freq: 'monthly' },
  { path: '/contact',  priority: 0.5, freq: 'yearly'  },
  { path: '/privacy',  priority: 0.3, freq: 'yearly'  },
  { path: '/terms',    priority: 0.3, freq: 'yearly'  },
  { path: '/cookies',  priority: 0.3, freq: 'yearly'  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Static pages with hreflang alternates
  for (const { path, priority, freq } of STATIC_PAGES) {
    const langs: Record<string, string> = {};
    for (const locale of locales) langs[locale] = `${BASE}${lp(locale)}${path}`;

    for (const locale of locales) {
      entries.push({
        url: `${BASE}${lp(locale)}${path}`,
        lastModified: now,
        changeFrequency: freq,
        priority: locale === 'en' ? priority : +(priority * 0.9).toFixed(2),
        alternates: { languages: langs },
      });
    }
  }

  // Review pages with hreflang alternates
  for (const review of reviews) {
    const langs: Record<string, string> = {};
    for (const locale of locales) langs[locale] = `${BASE}${lp(locale)}/reviews/${review.slug}`;

    for (const locale of locales) {
      entries.push({
        url: `${BASE}${lp(locale)}/reviews/${review.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.75 : 0.65,
        alternates: { languages: langs },
      });
    }
  }

  return entries;
}
