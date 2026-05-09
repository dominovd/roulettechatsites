import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = await getTranslations({ locale, namespace: 'footer' });

  const FOOTER_LINKS = {
    [t('sectionProduct')]: [
      { label: t('linkStartChat'), href: '/#chat' },
      { label: t('linkReviews'), href: '/reviews' },
      { label: t('linkCompare'), href: '/compare' },
      { label: t('linkTools'), href: '/tools' },
    ],
    [t('sectionCompany')]: [
      { label: t('linkAbout'), href: '/about' },
      { label: t('linkSafety'), href: '/safety' },
      { label: t('linkBlog'), href: '/blog' },
      { label: t('linkContact'), href: '/contact' },
    ],
    [t('sectionLegal')]: [
      { label: t('linkPrivacy'), href: '/privacy' },
      { label: t('linkTerms'), href: '/terms' },
      { label: t('linkCookies'), href: '/cookies' },
    ],
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.07] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row gap-10 justify-between mb-12">
          {/* Brand */}
          <div>
            <Link href={`${prefix}/`} className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[9px] bg-brand flex items-center justify-center text-sm">🎲</div>
              <span className="font-black text-sm tracking-tight">
                <span className="gradient-text">Roulette</span>
                <span className="text-white">Chat</span>
              </span>
            </Link>
            <p className="text-muted text-sm max-w-[260px] leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">{title}</p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={`${prefix}${link.href}`}
                        className="text-sm text-[#9999b8] hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} RouletteChat. {t('copyright')}
          </span>
          <div className="flex gap-2">
            {[`🛡️ ${t('badgeSafe')}`, `🌐 ${t('badgeGlobal')}`, `⚡ ${t('badgeFree')}`].map((b) => (
              <span
                key={b}
                className="text-[0.7rem] font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-muted"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
