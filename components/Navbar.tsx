'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { href: '/reviews', label: 'Reviews' },
  { href: '/compare', label: 'Compare' },
  { href: '/tools', label: 'Tools' },
];

export default function Navbar({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'border-b border-white/[0.07]',
        scrolled ? 'bg-[#08080f]/95 backdrop-blur-xl' : 'bg-[#08080f]/70 backdrop-blur-lg'
      )}
    >
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`${prefix}/`} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-[10px] bg-brand flex items-center justify-center text-lg flex-shrink-0">
            🎲
          </div>
          <span className="font-black text-[1.05rem] tracking-tight">
            <span className="gradient-text">Roulette</span>
            <span className="text-white">Chat</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`${prefix}${link.href}`}
              className={cn(
                'text-sm font-medium px-4 py-2 rounded-lg transition-colors',
                pathname.includes(link.href)
                  ? 'text-white bg-white/[0.07]'
                  : 'text-muted hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${prefix}/#chat`}
            className="ml-2 bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-px transition-all shadow-glow"
          >
            Start Chatting →
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-muted hover:text-white transition-colors p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#08080f]/98 px-5 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={`${prefix}${link.href}`}
              onClick={() => setOpen(false)}
              className="text-sm font-medium px-3 py-2.5 rounded-lg text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${prefix}/#chat`}
            onClick={() => setOpen(false)}
            className="mt-1 bg-brand text-white text-sm font-bold px-4 py-3 rounded-xl text-center hover:opacity-90 transition-opacity"
          >
            Start Chatting →
          </Link>
        </div>
      )}
    </nav>
  );
}
