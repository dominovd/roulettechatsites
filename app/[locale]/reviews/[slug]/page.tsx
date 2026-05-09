import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReview, getRelatedReviews, reviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';

interface Props {
  params: { slug: string; locale: string };
}

export async function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = getReview(params.slug);
  if (!review) return {};
  return {
    title: `${review.name} Review 2025 – Honest Rating & Alternatives`,
    description: `Is ${review.name} worth it in 2025? Our honest review covers safety, features, video quality, and the best alternatives. Rating: ${review.rating}/5.`,
    alternates: { canonical: `https://roulettechatsites.com/reviews/${params.slug}` },
  };
}

function StarBar({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-amber-400 text-xl">
        {[1,2,3,4,5].map((s) => (
          <span key={s} className={rating >= s ? '' : rating >= s - 0.5 ? 'opacity-50' : 'opacity-20'}>★</span>
        ))}
      </div>
      <span className="text-2xl font-black text-white">{rating.toFixed(1)}</span>
      <span className="text-muted text-sm">/ 5.0</span>
    </div>
  );
}

export default function ReviewPage({ params: { slug, locale } }: Props) {
  const review = getReview(slug);
  if (!review) notFound();
  const related = getRelatedReviews(slug, 3);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${review.name} Review`,
    reviewBody: review.description,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    author: { '@type': 'Organization', name: 'RouletteChat' },
    itemReviewed: {
      '@type': 'WebApplication',
      name: review.name,
      url: `https://${review.website}`,
    },
  };

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href={`${prefix}/reviews`} className="hover:text-white transition-colors">Reviews</Link>
          <span>/</span>
          <span className="text-white">{review.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex flex-wrap items-start gap-4 justify-between mb-5">
            <div>
              <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-2">{review.name}</h1>
              <p className="text-muted text-lg">{review.tagline}</p>
            </div>
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl px-6 py-4 text-center flex-shrink-0">
              <StarBar rating={review.rating} />
              <p className="text-xs text-muted mt-1">{review.ratingCount.toLocaleString()} user reviews</p>
            </div>
          </div>

          {/* Key facts row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Users', value: review.users },
              { label: 'Founded', value: String(review.founded) },
              { label: 'Status', value: review.features.find(f => f.label === 'Status')?.value as string },
            ].map(({ label, value }) => (
              <div key={label} className="card-glass p-4 text-center">
                <strong className="block text-base font-bold text-white">{value}</strong>
                <span className="text-xs text-muted">{label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-[#ccc] leading-relaxed text-[0.95rem]">{review.description}</p>
        </div>

        {/* Pros / Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="card-glass p-6">
            <h2 className="font-bold text-green-400 mb-4 flex items-center gap-2"><span>✅</span> Pros</h2>
            <ul className="flex flex-col gap-2.5">
              {review.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-[#ccc]">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>{pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glass p-6">
            <h2 className="font-bold text-red-400 mb-4 flex items-center gap-2"><span>❌</span> Cons</h2>
            <ul className="flex flex-col gap-2.5">
              {review.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-[#ccc]">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">−</span>{con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature table */}
        <div className="card-glass p-6 mb-10">
          <h2 className="font-bold text-lg mb-5">Feature Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {review.features.map((f) => (
              <div key={f.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                <span className="text-sm text-muted">{f.label}</span>
                <span className={`text-sm font-semibold ${
                  f.value === true ? 'text-green-400' :
                  f.value === false ? 'text-red-400' :
                  'text-white'
                }`}>
                  {f.value === true ? '✓ Yes' : f.value === false ? '✗ No' : String(f.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-2xl p-8 mb-14">
          <p className="text-muted text-sm mb-2">Looking for the best alternative?</p>
          <h3 className="font-bold text-xl mb-4">Try RouletteChat — Free, Fast & Safe</h3>
          <a
            href="/#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-7 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
          >
            Start Chatting Free →
          </a>
        </div>

        {/* Related */}
        <h2 className="font-black text-xl mb-6">More Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r) => (
            <ReviewCard key={r.slug} review={r} locale={locale} />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
