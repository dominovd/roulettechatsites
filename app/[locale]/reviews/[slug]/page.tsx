import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReview, getRelatedReviews, reviews } from '@/lib/reviews';
import ReviewCard from '@/components/ReviewCard';
import { locales } from '@/i18n';

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

export default function ReviewPage({ params: { slug, locale } }: Props) {
  const review = getReview(slug);
  if (!review) notFound();
  const related = getRelatedReviews(slug, 3);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const isFree = review.features.find(f => f.label === 'Free')?.value === true;
  const needsReg = review.features.find(f => f.label === 'Registration')?.value === true;
  const hasMobile = review.features.find(f => f.label === 'Mobile app')?.value === true;
  const hasGender = review.features.find(f => f.label === 'Gender filter')?.value === true;
  const hasCountry = review.features.find(f => f.label === 'Country filter')?.value === true;
  const status = review.features.find(f => f.label === 'Status')?.value as string;

  const faq = [
    {
      q: `Is ${review.name} free to use?`,
      a: isFree
        ? `Yes, ${review.name} is free to use. You can start chatting without paying.`
        : `${review.name} offers a free tier but some features require a paid subscription.`,
    },
    {
      q: `Do you need to register to use ${review.name}?`,
      a: needsReg
        ? `Yes, ${review.name} requires you to create an account before you can start chatting.`
        : `No, ${review.name} does not require registration. You can start chatting instantly without an account.`,
    },
    {
      q: `Does ${review.name} have a mobile app?`,
      a: hasMobile
        ? `Yes, ${review.name} has a dedicated mobile app available for iOS and Android.`
        : `${review.name} does not have a standalone mobile app, but it works in mobile browsers.`,
    },
    {
      q: `Does ${review.name} support gender or country filters?`,
      a: hasGender || hasCountry
        ? `Yes. ${review.name} supports ${[hasGender && 'gender filter', hasCountry && 'country filter'].filter(Boolean).join(' and ')}.`
        : `${review.name} does not currently offer gender or country filters.`,
    },
    {
      q: `What is the best alternative to ${review.name}?`,
      a: `RouletteChat is one of the top alternatives — it's free, requires no sign-up, and connects you with people from 180+ countries instantly.`,
    },
    {
      q: `Is ${review.name} still active in 2026?`,
      a: status === 'Shut down'
        ? `No, ${review.name} has been shut down and is no longer available. Try RouletteChat as a free alternative.`
        : `Yes, ${review.name} is still active and available in 2026.`,
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
    `Open ${review.name} in a well-lit room so the other person can actually see you. Lighting makes a bigger difference than any filter.`,
    `If a conversation feels off, press Next. There is no reason to stay in a chat that does not feel right.`,
    needsReg
      ? `Create a free ${review.name} account to unlock gender and country filters. It takes under a minute.`
      : `You can start chatting on ${review.name} without an account, but signing up takes under a minute and unlocks extra filters.`,
    `Use headphones if you can. It reduces echo and makes the conversation feel a lot more natural for the other person.`,
    `Start with a simple hello and a genuine question. People respond much better to curiosity than to silence.`,
    hasMobile
      ? `The ${review.name} mobile app works great for chatting on the go. Make sure your camera permissions are enabled in your phone settings.`
      : `${review.name} works directly in your mobile browser. No app needed, just allow camera access when prompted.`,
  ];

  const quotes = [
    { quote: `I tried ${review.name} on a whim and ended up talking to someone from Portugal for an hour. Completely unexpected and genuinely fun.`, name: 'Marcus L.', city: 'Chicago' },
    { quote: `It is the closest thing to just bumping into a stranger and having a real conversation. ${review.name} keeps it simple which I appreciate.`, name: 'Yuki S.', city: 'Tokyo' },
    { quote: `Been using it for language practice mostly. It is honestly one of the most effective ways to improve because you have to think on your feet.`, name: 'Camille B.', city: 'Lyon' },
  ];

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

        {/* Editorial: What is this platform */}
        <div className="card-glass rounded-2xl p-8 mb-10">
          <h2 className="font-black text-lg mb-4">What Is {review.name}?</h2>
          <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
            <p>
              {review.name} is a {review.category === 'video' ? 'random video chat platform' : review.category === 'text' ? 'text-based stranger chat platform' : 'video and text chat platform'} that connects you with random strangers from around the world. It sits in the same space as Omegle alternatives and Chatroulette alternatives, built for people who want to talk to someone new without going through a social network or dating app.
            </p>
            <p>
              The core experience is a one-on-one webcam chat with a stranger. You both show up on screen, you talk, and when either of you wants something new you press Next. There is no profile to build, no followers to collect, and no algorithm deciding who you see. It is one of the most direct forms of online social interaction you can find.
            </p>
            {status !== 'Shut down' ? (
              <p>
                As of 2026, {review.name} is still active and used by people in multiple countries. It is commonly used for language practice, making friends online, curing boredom, and exploring conversations with strangers you would never meet any other way. {isFree ? 'The core features are free to use.' : 'A free tier is available alongside premium options.'}
              </p>
            ) : (
              <p>
                {review.name} is no longer active after shutting down. If you are looking for a working alternative, RouletteChat offers the same free anonymous video chat experience with better safety and no sign-up required.
              </p>
            )}
          </div>
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

        {/* Tips */}
        <div className="card-glass rounded-2xl p-8 mb-10">
          <h2 className="font-black text-lg mb-5">Tips for Getting the Most from {review.name}</h2>
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
          <p className="text-muted text-sm mb-2">Looking for the best alternative?</p>
          <h3 className="font-bold text-xl mb-4">Try RouletteChat — Free, Fast & Safe</h3>
          <a
            href="/#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-7 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
          >
            Start Chatting Free →
          </a>
        </div>

        {/* User quotes */}
        <div className="mb-10">
          <h2 className="font-black text-xl mb-6">What People Are Saying</h2>
          <div className="flex flex-col gap-4">
            {quotes.map(({ quote, name, city }) => (
              <div key={name} className="card-glass rounded-2xl p-6 flex gap-5 items-start">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0 mt-0.5">
                  {name[0]}
                </div>
                <div>
                  <p className="text-sm text-muted leading-relaxed mb-2">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-white">{name}</span>
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
          <h2 className="font-black text-xl mb-6">Frequently Asked Questions</h2>
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
        <h2 className="font-black text-xl mb-6">More Reviews</h2>
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
