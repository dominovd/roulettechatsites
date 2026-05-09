import type { Metadata } from 'next';
import Link from 'next/link';
import { reviews } from '@/lib/reviews';
import { locales } from '@/i18n';
import { getTranslations } from 'next-intl/server';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const canonical = `${BASE}${lp(locale)}/compare`;
  const languages: Record<string, string> = { 'x-default': `${BASE}/compare` };
  for (const loc of locales) languages[loc] = `${BASE}${lp(loc)}/compare`;

  return {
    title: 'Compare Random Video Chat Sites – Side by Side',
    description:
      'Compare CallMeChat, Chatroulette, Azar, Monkey, ChatSpin and Chatrandom side by side. Features, safety, user count, and ratings at a glance.',
    alternates: { canonical, languages },
  };
}

const COMPARE_SLUGS = ['callmechat', 'chatroulette', 'azar', 'monkey', 'chatspin', 'chatrandom'];

export default async function ComparePage({ params: { locale } }: { params: { locale: string } }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale });
  const cols = COMPARE_SLUGS.map((slug) => reviews.find((r) => r.slug === slug)!).filter(Boolean);

  // Feature rows: lookup key (English, matches reviews data) + translated display label
  const FEATURE_ROWS = [
    { key: 'Video chat',      label: t('compare.rowVideoChat') },
    { key: 'Text chat',       label: t('compare.rowTextChat') },
    { key: 'Mobile app',      label: t('compare.rowMobileApp') },
    { key: 'Gender filter',   label: t('compare.rowGenderFilter') },
    { key: 'Country filter',  label: t('compare.rowCountryFilter') },
    { key: 'Free',            label: t('compare.rowFree') },
    { key: 'Registration',    label: t('compare.rowRegistration') },
  ];

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('compare.label')}</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
            {t('compare.heading1')} <span className="gradient-text">{t('compare.heading2')}</span>
          </h1>
          <p className="text-muted text-[0.95rem] max-w-lg mx-auto">
            {t('compare.sub')}
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs text-muted font-semibold uppercase tracking-wider py-4 pr-4 min-w-[140px]">{t('compare.thFeature')}</th>
                {cols.map((r) => (
                  <th key={r.slug} className="text-center py-4 px-3 min-w-[130px]">
                    <Link href={`${prefix}/reviews/${r.slug}`} className="font-black text-sm hover:text-purple-light transition-colors">
                      {r.name}
                    </Link>
                    <div className="text-amber-400 text-xs mt-1">{'★'.repeat(Math.round(r.rating))} {r.rating.toFixed(1)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Users */}
              <tr className="border-t border-white/[0.06]">
                <td className="text-sm text-muted py-3.5 pr-4">👥 {t('compare.rowMonthlyUsers')}</td>
                {cols.map((r) => (
                  <td key={r.slug} className="text-center text-sm font-semibold py-3.5 px-3">{r.users}</td>
                ))}
              </tr>
              {/* Founded */}
              <tr className="border-t border-white/[0.06]">
                <td className="text-sm text-muted py-3.5 pr-4">📅 {t('compare.rowFounded')}</td>
                {cols.map((r) => (
                  <td key={r.slug} className="text-center text-sm py-3.5 px-3">{r.founded}</td>
                ))}
              </tr>
              {/* Dynamic feature rows */}
              {FEATURE_ROWS.map(({ key, label }) => (
                <tr key={key} className="border-t border-white/[0.06]">
                  <td className="text-sm text-muted py-3.5 pr-4">{label}</td>
                  {cols.map((r) => {
                    const f = r.features.find((x) => x.label === key);
                    return (
                      <td key={r.slug} className="text-center py-3.5 px-3">
                        {f?.value === true
                          ? <span className="text-green-400 font-bold">✓</span>
                          : f?.value === false
                          ? <span className="text-red-400">✗</span>
                          : <span className="text-muted text-xs">{String(f?.value ?? '—')}</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-2xl p-10">
          <h2 className="font-black text-2xl mb-3">{t('compare.ctaHeading')}</h2>
          <p className="text-muted mb-6">{t('compare.ctaSub')}</p>
          <a
            href="/#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-8 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
          >
            {t('compare.ctaButton')}
          </a>
        </div>
      </div>
    </div>
  );
}
