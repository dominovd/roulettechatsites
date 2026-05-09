export const runtime = 'edge';

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { CompatibilityTool } from '@/components/ToolsClient';

export default async function CompatibilityPage({
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
            <div className="text-4xl">💘</div>
            <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 mt-1">
              Popular
            </span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 mt-3">{t('compatTitle')}</h1>
          <p className="text-muted">{t('compatSub')}</p>
        </div>
        <div className="card-glass p-6">
          <CompatibilityTool />
        </div>
      </div>
    </div>
  );
}
