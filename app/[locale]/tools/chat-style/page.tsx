export const runtime = 'edge';

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { ChatStyleTool } from '@/components/ToolsClient';

export default async function ChatStylePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'tools' });

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-lg mx-auto">
        <Link href="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-8">
          ← {t('backToTools')}
        </Link>
        <div className="mb-8">
          <div className="flex items-start gap-3">
            <div className="text-4xl">🎭</div>
            <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 mt-1">
              New
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 mt-3">{t('styleTitle')}</h1>
          <p className="text-muted">{t('styleSub')}</p>
        </div>
        <div className="card-glass p-6">
          <ChatStyleTool />
        </div>
      </div>
    </div>
  );
}
