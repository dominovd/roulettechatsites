import type { Metadata } from 'next';
import { reviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';

export const metadata: Metadata = {
  title: 'Best Random Video Chat Sites – Reviews & Ratings 2025',
  description:
    'Unbiased reviews of the best random video chat sites: Omegle, Chatroulette, Azar, Monkey and more. Compare features, safety, and user ratings.',
  alternates: { canonical: 'https://roulettechatsites.com/reviews' },
};

const sorted = [...reviews].sort((a, b) => b.rating - a.rating);

export default function ReviewsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Expert Reviews</p>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight mb-4">
            Best Random Video<br />
            <span className="gradient-text">Chat Sites 2025</span>
          </h1>
          <p className="text-muted max-w-xl mx-auto text-[0.95rem] leading-relaxed">
            We tested every major platform so you don&apos;t have to. Honest ratings based on video quality,
            safety, features, and real user experience.
          </p>
        </div>

        {/* Top pick banner */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-600/15 to-pink-500/10 border border-purple-500/25 rounded-2xl p-5 mb-10">
          <div className="text-3xl">🏆</div>
          <div>
            <p className="text-xs text-purple-light font-semibold uppercase tracking-wider mb-0.5">Our Top Pick</p>
            <p className="font-bold text-white">
              Looking for the best Omegle alternative? Try{' '}
              <a href="/#chat" className="text-purple-light underline underline-offset-2">
                RouletteChat
              </a>{' '}
              — fast, free, and safe.
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
