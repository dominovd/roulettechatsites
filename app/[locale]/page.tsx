import type { Metadata } from 'next';
import Link from 'next/link';
import { OnlineCounter } from '@/components/OnlineCounter';
import { locales } from '@/i18n';
import { getTranslations } from 'next-intl/server';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const canonical = `${BASE}${lp(locale)}`;
  const languages: Record<string, string> = { 'x-default': BASE };
  for (const loc of locales) {
    languages[loc] = `${BASE}${lp(loc)}`;
  }
  return {
    title: 'RouletteChat – Meet Random People via Free Video Chat',
    description:
      'Instant random video chat with real people from 180+ countries. No sign-up required. Connect face-to-face in seconds.',
    alternates: { canonical, languages },
  };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });

  const FEATURES = [
    { icon: '⚡', title: t('features.f1title'), desc: t('features.f1desc') },
    { icon: '🌍', title: t('features.f2title'), desc: t('features.f2desc') },
    { icon: '🎯', title: t('features.f3title'), desc: t('features.f3desc') },
    { icon: '🛡️', title: t('features.f4title'), desc: t('features.f4desc') },
    { icon: '📱', title: t('features.f5title'), desc: t('features.f5desc') },
    { icon: '🎲', title: t('features.f6title'), desc: t('features.f6desc') },
  ];

  const STATS = [
    { value: '2M+', label: t('statsSection.s1label') },
    { value: '180+', label: t('statsSection.s2label') },
    { value: '50M+', label: t('statsSection.s3label') },
    { value: '<3s', label: t('statsSection.s4label') },
  ];

  const HOW_STEPS = [
    { step: '1', title: t('how.s1title'), desc: t('how.s1desc') },
    { step: '2', title: t('how.s2title'), desc: t('how.s2desc') },
    { step: '3', title: t('how.s3title'), desc: t('how.s3desc') },
  ];

  const WHY_ITEMS = [
    { icon: '🎲', title: t('why.i1title'), desc: t('why.i1desc') },
    { icon: '🌐', title: t('why.i2title'), desc: t('why.i2desc') },
    { icon: '💬', title: t('why.i3title'), desc: t('why.i3desc') },
    { icon: '🔒', title: t('why.i4title'), desc: t('why.i4desc') },
  ];

  const TESTIMONIALS = [
    { quote: t('testimonials.t1quote'), name: 'Sophie T.', city: 'Amsterdam' },
    { quote: t('testimonials.t2quote'), name: 'Ethan R.', city: 'Toronto' },
    { quote: t('testimonials.t3quote'), name: 'Lucia M.', city: 'Lisbon' },
    { quote: t('testimonials.t4quote'), name: 'Aisha K.', city: 'Dubai' },
    { quote: t('testimonials.t5quote'), name: 'Noah W.', city: 'Cape Town' },
    { quote: t('testimonials.t6quote'), name: 'Diana P.', city: 'Warsaw' },
  ];

  const FAQ = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-28 pb-16">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,.18)_0%,transparent_70%)] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-600/15 border border-purple-500/35 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-300 mb-7 animate-fadeUp">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot" />
          <OnlineCounter base={8241} /> {t('hero.badge')}
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[1.07] tracking-[-2px] mb-5 animate-fadeUp [animation-delay:100ms]">
          {t('hero.headline1')}<br />
          <span className="gradient-text">{t('hero.headline2')}</span>
        </h1>

        <p className="max-w-lg text-lg text-muted font-normal mb-9 animate-fadeUp [animation-delay:200ms]">
          {t('hero.sub')}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14 animate-fadeUp [animation-delay:300ms]">
          <Link
            href="#chat"
            className="inline-flex items-center gap-2.5 bg-brand text-white font-bold text-base px-8 py-4 rounded-[14px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.27A1 1 0 0121 8.62V15.4a1 1 0 01-1.45.89L15 14M4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
            </svg>
            {t('hero.cta')}
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white font-semibold text-[0.95rem] px-7 py-4 rounded-[14px] hover:bg-white/[0.07] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z" /></svg>
            {t('hero.howItWorks')}
          </Link>
        </div>

        {/* Hero stats */}
        <div className="flex flex-wrap justify-center gap-10 animate-fadeUp [animation-delay:400ms]">
          {[
            { value: '180+', label: t('stats.countries') },
            { value: '2M+', label: t('stats.users') },
            { value: '100%', label: t('stats.free') },
            { value: '<3s', label: t('stats.speed') },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <strong className="block text-[1.6rem] font-black text-white">{value}</strong>
              <span className="text-[0.8rem] text-muted font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE CHAT ── */}
      <section id="chat" className="px-5 pb-20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-7">
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-tight">
              {t('chat.heading')}
              <span className="inline-flex items-center gap-1.5 ml-3 bg-green-400/10 border border-green-400/25 rounded-full px-3 py-1 text-xs font-semibold text-green-400 align-middle">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot" /> Live
              </span>
            </h2>
            <p className="text-muted text-[0.95rem] mt-2">
              {t('chat.sub')}
            </p>
          </div>

          {/* Registration banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-purple-600/20 to-pink-500/15 border border-purple-500/30 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[11px] bg-brand flex items-center justify-center text-lg flex-shrink-0">⚡</div>
              <div>
                <strong className="block text-sm font-bold">{t('chat.bannerTitle')}</strong>
                <span className="text-xs text-muted">{t('chat.bannerSub')}</span>
              </div>
            </div>
            <Link
              href="#chat"
              className="bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-px transition-all shadow-glow whitespace-nowrap"
            >
              {t('chat.bannerCta')}
            </Link>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[t('chat.chip1'), t('chat.chip2'), t('chat.chip3')].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Iframe */}
          <div className="iframe-shell">
            <iframe
              src="https://callmechat.com"
              allow="camera; microphone; autoplay; fullscreen"
              allowFullScreen
              title="Live random video chat powered by CallMeChat"
              className="w-full h-[580px] md:h-[650px] block border-0 bg-[#111]"
              loading="lazy"
            />
          </div>

          {/* Post-iframe nudge */}
          <p className="text-center text-sm text-muted mt-5">
            💬 {t('chat.nudgePre')}{' '}
            <Link
              href="#chat"
              className="text-purple-light font-semibold hover:text-white transition-colors"
            >
              {t('chat.nudgeStart')}
            </Link>{' '}
            {t('chat.nudgePost')}
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-5 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 bg-gradient-to-r from-purple-600/10 to-pink-500/[0.08] border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <strong className="block text-[clamp(1.8rem,4vw,2.8rem)] font-black gradient-text">{value}</strong>
              <span className="text-xs text-muted font-medium mt-1 block">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL: WHY RANDOM CHAT ── */}
      <section className="px-5 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('why.label')}</p>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black tracking-tight mb-5">
                {t('why.heading')}
              </h2>
              <p className="text-muted text-[0.95rem] leading-relaxed mb-5">
                {t('why.p1')}
              </p>
              <p className="text-muted text-[0.95rem] leading-relaxed mb-5">
                {t('why.p2')}
              </p>
              <p className="text-muted text-[0.95rem] leading-relaxed">
                {t('why.p3')}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {WHY_ITEMS.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-purple-600/20 border border-purple-500/25 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-bold text-[0.9rem] mb-1">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-5 py-20">
        <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('features.label')}</p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-3">{t('features.heading')}</h2>
        <p className="text-center text-muted text-[0.95rem] max-w-md mx-auto mb-14">
          {t('features.sub')}
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-glass p-7 transition-all duration-200 hover:-translate-y-1">
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[1rem] mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="px-5 py-20 scroll-mt-20">
        <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('how.label')}</p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-3">{t('how.heading')}</h2>
        <p className="text-center text-muted text-[0.95rem] max-w-md mx-auto mb-14">
          {t('how.sub')}
        </p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {HOW_STEPS.map(({ step, title, desc }) => (
            <div key={step} className="px-4">
              <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-xl font-black mx-auto mb-5 shadow-glow">
                {step}
              </div>
              <h3 className="font-bold text-[1rem] mb-2">{title}</h3>
              <p className="text-muted text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-5 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('testimonials.label')}</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-12">
            {t('testimonials.heading')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, city }) => (
              <div key={name} className="card-glass rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-muted text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{name}</p>
                    <p className="text-muted text-xs">{city}</p>
                  </div>
                  <div className="ml-auto text-amber-400 text-xs">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('faq.label')}</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-12">
            {t('faq.heading')}
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group card-glass rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[0.95rem] select-none list-none">
                  {q}
                  <span className="text-purple-light flex-shrink-0 transition-transform duration-200 group-open:rotate-45">＋</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-5 pb-20">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-3xl p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-tight mb-3">
            {t('cta.heading1')}<br />
            <span className="gradient-text">{t('cta.heading2')}</span>
          </h2>
          <p className="text-muted text-[0.95rem] mb-8">
            {t('cta.sub')}
          </p>
          <Link
            href="#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold text-base px-8 py-4 rounded-[14px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all"
          >
            {t('cta.button')}
          </Link>
          <p className="text-xs text-muted mt-4">{t('cta.note')}</p>
        </div>
      </section>

      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'RouletteChat',
            url: 'https://roulettechatsites.com',
            description: 'Free random video chat with people from 180+ countries.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://roulettechatsites.com/reviews?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />
    </>
  );
}
