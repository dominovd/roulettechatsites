export const runtime = 'edge';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { UsernameTool } from '@/components/ToolsClient';
import { locales } from '@/i18n';

const BASE_URL = 'https://roulettechatsites.com';
const lp = (l: string) => (l === 'en' ? '' : `/${l}`);

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const canonical = `${BASE_URL}${lp(locale)}/tools/username`;
  const languages: Record<string, string> = { 'x-default': `${BASE_URL}/tools/username` };
  for (const loc of locales) languages[loc] = `${BASE_URL}${lp(loc)}/tools/username`;
  return { title: t('usernameMetaTitle'), description: t('usernameMetaDesc'), alternates: { canonical, languages } };
}

export default async function UsernamePage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const faq = [
    { q: t('usernameFaqQ1'), a: t('usernameFaqA1') },
    { q: t('usernameFaqQ2'), a: t('usernameFaqA2') },
    { q: t('usernameFaqQ3'), a: t('usernameFaqA3') },
  ];
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="px-5 pt-28 pb-20">
        <div className="max-w-lg mx-auto">
          <Link href={locale === 'en' ? '/tools' : `/${locale}/tools`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-8">← {t('backToTools')}</Link>
          <div className="mb-8">
            <div className="text-4xl mb-3">🎲</div>
            <h1 className="text-3xl font-black text-white mb-2">{t('usernameTitle')}</h1>
            <p className="text-muted mb-4">{t('usernameSub')}</p>
            <p className="text-sm text-muted/80 leading-relaxed">{t('usernameIntro')}</p>
          </div>
          <div className="card-glass p-6 mb-10"><UsernameTool /></div>
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
