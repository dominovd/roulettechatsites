export const runtime = 'edge';

import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { IcebreakerTool } from '@/components/ToolsClient';

export default async function IcebreakerPage({
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
          <div className="text-4xl mb-3">💬</div>
          <h1 className="text-3xl font-black text-white mb-2">{t('icebreakerTitle')}</h1>
          <p className="text-muted">{t('icebreakerSub')}</p>
        </div>
        <div className="card-glass p-6">
          <IcebreakerTool />
        </div>
      </div>
    </div>
  );
}
