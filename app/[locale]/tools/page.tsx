export const runtime = 'edge';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { locales } from '@/i18n';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const canonical = `${BASE}${lp(locale)}/tools`;
  const languages: Record<string, string> = { 'x-default': `${BASE}/tools` };
  for (const loc of locales) languages[loc] = `${BASE}${lp(loc)}/tools`;

  return {
    title: 'Free Video Chat Tools – Camera Tester, Icebreaker Generator & More',
    description:
      'Free tools for random video chat: test your camera and microphone, generate icebreaker questions, check your VPN status, get a random username, find your chat style, and discover your ideal platform.',
    alternates: { canonical, languages },
  };
}

const TOOLS = [
  {
    slug: 'icebreaker',
    emoji: '💬',
    titleKey: 'icebreakerTitle',
    subKey: 'icebreakerSub',
    badge: null,
  },
  {
    slug: 'compatibility',
    emoji: '💘',
    titleKey: 'compatTitle',
    subKey: 'compatSub',
    badge: 'popular',
  },
  {
    slug: 'chat-style',
    emoji: '🎭',
    titleKey: 'styleTitle',
    subKey: 'styleSub',
    badge: 'new',
  },
  {
    slug: 'camera',
    emoji: '📷',
    titleKey: 'cameraTitle',
    subKey: 'cameraSub',
    badge: null,
  },
  {
    slug: 'vpn',
    emoji: '🛡️',
    titleKey: 'vpnTitle',
    subKey: 'vpnSub',
    badge: null,
  },
  {
    slug: 'username',
    emoji: '🎭',
    titleKey: 'usernameTitle',
    subKey: 'usernameSub',
    badge: null,
  },
] as const;

export default async function ToolsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'tools' });
  const base = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('label')}</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
            {t('heading1')} <span className="gradient-text">{t('heading2')}</span>
          </h1>
          <p className="text-muted text-[0.95rem] max-w-lg mx-auto">{t('sub')}</p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map(({ slug, emoji, titleKey, subKey, badge }) => (
            <Link
              key={slug}
              href={`${base}/tools/${slug}`}
              className="card-glass p-6 flex flex-col gap-4 group hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{emoji}</div>
                {badge === 'popular' && (
                  <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300">
                    Popular
                  </span>
                )}
                {badge === 'new' && (
                  <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
                    New
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-black text-lg text-white group-hover:text-purple-300 transition-colors">
                  {t(titleKey as any)}
                </h2>
                <p className="text-muted text-sm mt-1">{t(subKey as any)}</p>
              </div>
              <div className="mt-auto pt-2">
                <span className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                  {t('tryTool')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
