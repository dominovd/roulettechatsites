import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReview, getRelatedReviews, reviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';
import { locales } from '@/i18n';
import { getTranslations } from 'next-intl/server';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

interface Props {
  params: { slug: string; locale: string };
}

export async function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const review = getReview(params.slug);
  if (!review) return {};

  const path = `/reviews/${params.slug}`;
  const canonical = `${BASE}${lp(params.locale)}${path}`;

  const languages: Record<string, string> = { 'x-default': `${BASE}${path}` };
  for (const locale of locales) {
    languages[locale] = `${BASE}${lp(locale)}${path}`;
  }

  return {
    title: `${review.name} Review 2026 – Honest Rating & Alternatives`,
    description: `Is ${review.name} worth it in 2026? Our honest review covers safety, features, video quality, and the best alternatives. Rating: ${review.rating}/5.`,
    alternates: { canonical, languages },
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

export default async function ReviewPage({ params: { slug, locale } }: Props) {
  const review = getReview(slug);
  if (!review) notFound();
  const related = getRelatedReviews(slug, 3);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale });

  const isFree = review.features.find(f => f.label === 'Free')?.value === true;
  const needsReg = review.features.find(f => f.label === 'Registration')?.value === true;
  const hasMobile = review.features.find(f => f.label === 'Mobile app')?.value === true;
  const hasGender = review.features.find(f => f.label === 'Gender filter')?.value === true;
  const hasCountry = review.features.find(f => f.label === 'Country filter')?.value === true;
  const status = review.features.find(f => f.label === 'Status')?.value as string;

  const name = review.name;

  const faq = [
    {
      q: t('reviewSlug.faqQ1', { name }),
      a: isFree
        ? t('reviewSlug.faqA1Free', { name })
        : t('reviewSlug.faqA1Paid', { name }),
    },
    {
      q: t('reviewSlug.faqQ2', { name }),
      a: needsReg
        ? t('reviewSlug.faqA2Reg', { name })
        : t('reviewSlug.faqA2NoReg', { name }),
    },
    {
      q: t('reviewSlug.faqQ3', { name }),
      a: hasMobile
        ? t('reviewSlug.faqA3Mobile', { name })
        : t('reviewSlug.faqA3NoMobile', { name }),
    },
    {
      q: t('reviewSlug.faqQ4', { name }),
      a: hasGender && hasCountry
        ? t('reviewSlug.faqA4Both', { name })
        : hasGender
        ? t('reviewSlug.faqA4GenderOnly', { name })
        : hasCountry
        ? t('reviewSlug.faqA4CountryOnly', { name })
        : t('reviewSlug.faqA4None', { name }),
    },
    {
      q: t('reviewSlug.faqQ5', { name }),
      a: t('reviewSlug.faqA5'),
    },
    {
      q: t('reviewSlug.faqQ6', { name }),
      a: status === 'Shut down'
        ? t('reviewSlug.faqA6Shutdown', { name })
        : t('reviewSlug.faqA6Active', { name }),
    },
  ];

  const reviewJsonLd = {
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

  const tips = [
    t('reviewSlug.tip1', { name }),
    t('reviewSlug.tip2'),
    needsReg
      ? t('reviewSlug.tip3Reg', { name })
      : t('reviewSlug.tip3NoReg', { name }),
    t('reviewSlug.tip4'),
    t('reviewSlug.tip5'),
    hasMobile
      ? t('reviewSlug.tip6Mobile', { name })
      : t('reviewSlug.tip6NoMobile', { name }),
  ];

  const quotes = [
    { quote: t('reviewSlug.q1', { name }), author: t('reviewSlug.q1name'), city: t('reviewSlug.q1city') },
    { quote: t('reviewSlug.q2', { name }), author: t('reviewSlug.q2name'), city: t('reviewSlug.q2city') },
    { quote: t('reviewSlug.q3'), author: t('reviewSlug.q3name'), city: t('reviewSlug.q3city') },
  ];

  const categoryKey = review.category === 'video'
    ? 'reviewSlug.whatIsCategoryVideo'
    : review.category === 'text'
    ? 'reviewSlug.whatIsCategoryText'
    : 'reviewSlug.whatIsCategoryHybrid';

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href={`${prefix}/reviews`} className="hover:text-white transition-colors">{t('reviewSlug.breadcrumbReviews')}</Link>
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
              <p className="text-xs text-muted mt-1">{review.ratingCount.toLocaleString()} {t('reviewSlug.userReviews')}</p>
            </div>
          </div>

          {/* Key facts row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: t('reviewSlug.factUsers'), value: review.users },
              { label: t('reviewSlug.factFounded'), value: String(review.founded) },
              { label: t('reviewSlug.factStatus'), value: review.features.find(f => f.label === 'Status')?.value as string },
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

        {/* Editorial: What is this platform */}
        <div className="card-glass rounded-2xl p-8 mb-10">
          <h2 className="font-black text-lg mb-4">{t('reviewSlug.whatIsHeading', { name })}</h2>
          <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
            <p>{t('reviewSlug.whatIsP1', { name, category: t(categoryKey as any) })}</p>
            <p>{t('reviewSlug.whatIsP2')}</p>
            {status !== 'Shut down' ? (
              <p>{t('reviewSlug.whatIsP3Active', { name, freeNote: isFree ? t('reviewSlug.whatIsFreeNote') : t('reviewSlug.whatIsPaidNote') })}</p>
            ) : (
              <p>{t('reviewSlug.whatIsP3Shutdown', { name })}</p>
            )}
          </div>
        </div>

        {/* Pros / Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="card-glass p-6">
            <h2 className="font-bold text-green-400 mb-4 flex items-center gap-2"><span>✅</span> {t('reviewSlug.pros')}</h2>
            <ul className="flex flex-col gap-2.5">
              {review.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-[#ccc]">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>{pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glass p-6">
            <h2 className="font-bold text-red-400 mb-4 flex items-center gap-2"><span>❌</span> {t('reviewSlug.cons')}</h2>
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
          <h2 className="font-bold text-lg mb-5">{t('reviewSlug.featureOverview')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {review.features.map((f) => (
              <div key={f.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
                <span className="text-sm text-muted">{f.label}</span>
                <span className={`text-sm font-semibold ${
                  f.value === true ? 'text-green-400' :
                  f.value === false ? 'text-red-400' :
                  'text-white'
                }`}>
                  {f.value === true ? t('reviewSlug.featureYes') : f.value === false ? t('reviewSlug.featureNo') : String(f.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="card-glass rounded-2xl p-8 mb-10">
          <h2 className="font-black text-lg mb-5">{t('reviewSlug.tipsHeading', { name })}</h2>
          <ul className="flex flex-col gap-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                <span className="w-6 h-6 rounded-full bg-purple-600/25 border border-purple-500/30 flex items-center justify-center text-purple-light font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-2xl p-8 mb-10">
          <p className="text-muted text-sm mb-2">{t('reviewSlug.ctaSub')}</p>
          <h3 className="font-bold text-xl mb-4">{t('reviewSlug.ctaHeading')}</h3>
          <a
            href="/#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-7 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
          >
            {t('reviewSlug.ctaButton')}
          </a>
        </div>

        {/* User quotes */}
        <div className="mb-10">
          <h2 className="font-black text-xl mb-6">{t('reviewSlug.quotesHeading')}</h2>
          <div className="flex flex-col gap-4">
            {quotes.map(({ quote, author, city }) => (
              <div key={author} className="card-glass rounded-2xl p-6 flex gap-5 items-start">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5">
                  {author[0]}
                </div>
                <div>
                  <p className="text-sm text-muted leading-relaxed mb-2">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-white">{author}</span>
                    <span className="text-xs text-muted">{city}</span>
                    <span className="text-amber-400 text-xs ml-auto">★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-14">
          <h2 className="font-black text-xl mb-6">{t('reviewSlug.faqHeading')}</h2>
          <div className="flex flex-col gap-3">
            {faq.map(({ q, a }) => (
              <details key={q} className="group card-glass rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[0.95rem] select-none list-none">
                  {q}
                  <span className="text-purple-light flex-shrink-0 transition-transform duration-200 group-open:rotate-45">＋</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Related */}
        <h2 className="font-black text-xl mb-6">{t('reviewSlug.relatedHeading')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r) => (
            <ReviewCard key={r.slug} review={r} locale={locale} />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
