import Link from 'next/link';

const FOOTER_LINKS = {
  Product: [
    { label: 'Start Chat', href: '/#chat' },
    { label: 'Reviews Hub', href: '/reviews' },
    { label: 'Compare Chats', href: '/compare' },
    { label: 'Tools & Quizzes', href: '/tools' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Safety Center', href: '/safety' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export default function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

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
              The world&apos;s fastest random video chat. Meet real people, have real conversations.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
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
            © {new Date().getFullYear()} RouletteChat. All rights reserved.
          </span>
          <div className="flex gap-2">
            {['🛡️ Safe Chat', '🌐 Global', '⚡ Free'].map((b) => (
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
