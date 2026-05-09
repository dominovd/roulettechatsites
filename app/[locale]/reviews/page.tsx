import type { Metadata } from 'next';
import { reviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';
import { locales } from '@/i18n';
import { getTranslations } from 'next-intl/server';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const canonical = `${BASE}${lp(locale)}/reviews`;
  const languages: Record<string, string> = { 'x-default': `${BASE}/reviews` };
  for (const loc of locales) languages[loc] = `${BASE}${lp(loc)}/reviews`;

  return {
    title: 'Best Random Video Chat Sites – Reviews & Ratings 2026',
    description:
      'Unbiased reviews of the best random video chat sites: Omegle, Chatroulette, Azar, Monkey and more. Compare features, safety, and user ratings.',
    alternates: { canonical, languages },
  };
}

const sorted = [...reviews].sort((a, b) => b.rating - a.rating);

export default async function ReviewsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('reviews.label')}</p>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight mb-4">
            {t('reviews.heading1')}<br />
            <span className="gradient-text">{t('reviews.heading2')}</span>
          </h1>
          <p className="text-muted max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            {t('reviews.sub')}
          </p>
        </div>

        {/* Top pick banner */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-600/15 to-pink-500/10 border border-purple-500/25 rounded-2xl p-5 mb-10">
          <div className="text-3xl">🏆</div>
          <div>
            <p className="text-xs text-purple-light font-semibold uppercase tracking-wider mb-0.5">{t('reviews.topPickLabel')}</p>
            <p className="font-bold text-white">
              {t('reviews.topPickPre')}{' '}
              <a href="/#chat" className="text-purple-light underline underline-offset-2">
                RouletteChat
              </a>{' '}
              {t('reviews.topPickPost')}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((review) => (
            <ReviewCard key={review.slug} review={review} locale={locale} />
          ))}
        </div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Best Random Video Chat Sites',
              itemListElement: sorted.map((r, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: r.name,
                url: `https://roulettechatsites.com/reviews/${r.slug}`,
                description: r.tagline,
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}
