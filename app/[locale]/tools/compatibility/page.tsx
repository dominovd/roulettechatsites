export const runtime = 'edge';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { CompatibilityTool } from '@/components/ToolsClient';
import { locales } from '@/i18n';

const BASE_URL = 'https://roulettechatsites.com';
const lp = (l: string) => (l === 'en' ? '' : `/${l}`);

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const canonical = `${BASE_URL}${lp(locale)}/tools/compatibility`;
  const languages: Record<string, string> = { 'x-default': `${BASE_URL}/tools/compatibility` };
  for (const loc of locales) languages[loc] = `${BASE_URL}${lp(loc)}/tools/compatibility`;
  return { title: t('compatMetaTitle'), description: t('compatMetaDesc'), alternates: { canonical, languages } };
}

export default async function CompatibilityPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const faq = [
    { q: t('compatFaqQ1'), a: t('compatFaqA1') },
    { q: t('compatFaqQ2'), a: t('compatFaqA2') },
    { q: t('compatFaqQ3'), a: t('compatFaqA3') },
  ];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="px-5 pt-28 pb-20">
        <div className="max-w-lg mx-auto">
          <Link href={locale === 'en' ? '/tools' : `/${locale}/tools`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-8">← {t('backToTools')}</Link>
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-4xl">💘</div>
              <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 mt-1">Popular</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">{t('compatTitle')}</h1>
            <p className="text-muted mb-4">{t('compatSub')}</p>
            <p className="text-sm text-muted/80 leading-relaxed">{t('compatIntro')}</p>
          </div>
          <div className="card-glass p-6 mb-10"><CompatibilityTool /></div>
          <div>
            <h2 className="text-xl font-black text-white mb-5">FAQ</h2>
            <div className="flex flex-col gap-4">
              {faq.map(({ q, a }) => (
                <div key={q} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-5">
                  <p className="font-semibold text-white text-sm mb-2">{q}</p>
                  <p className="text-sm text-muted leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
