import type { Metadata } from 'next';
import { locales } from '@/i18n';
import ToolsClient from '@/components/ToolsClient';

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

export default function ToolsPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <ToolsClient />
    </div>
  );
}
