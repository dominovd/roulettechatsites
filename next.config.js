const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for @cloudflare/next-on-pages
  // Pages/layouts that need server features use edge runtime
  // (set per-layout via export const runtime = 'edge')

  compress: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    // On Cloudflare Pages, image optimization runs on the edge
    remotePatterns: [
      { protocol: 'https', hostname: 'callmechat.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
