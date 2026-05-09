export const runtime = 'edge';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://roulettechatsites.com/sitemap.xml',
    host: 'https://roulettechatsites.com',
  };
}
