'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { switchLocale } from '@/navigation';

const NAV_LINKS = [
  { href: '/reviews', label: 'Reviews' },
  { href: '/compare', label: 'Compare' },
  { href: '/tools', label: 'Tools' },
];

const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'pl', label: 'Polski',     flag: '🇵🇱' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
  { code: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { code: 'ar', label: 'العربية',    flag: '🇸🇦' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
  { code: 'ko', label: '한국어',      flag: '🇰🇷' },
];

export default function Navbar({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleLangSwitch(code: string) {
    setLangOpen(false);
    setOpen(false);
    const target = switchLocale(pathname, code);
    router.push(target);
    router.refresh();
  }

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

          {/* Language switcher */}
          <div className="relative ml-1" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="Select language"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="text-xs uppercase tracking-wide">{currentLang.code}</span>
              <svg className={cn('w-3 h-3 transition-transform', langOpen && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-[#0f0f1a] border border-white/[0.10] rounded-xl shadow-2xl overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangSwitch(lang.code)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left',
                      lang.code === locale
                        ? 'text-white bg-purple-600/20'
                        : 'text-muted hover:text-white hover:bg-white/[0.05]'
                    )}
                  >
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {lang.code === locale && (
                      <svg className="w-3 h-3 ml-auto text-purple-light" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

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

          {/* Mobile language grid */}
          <div className="border-t border-white/[0.06] pt-2 mt-1">
            <p className="text-xs text-muted px-3 mb-2 uppercase tracking-wider">Language</p>
            <div className="grid grid-cols-2 gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSwitch(lang.code)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors text-left',
                    lang.code === locale
                      ? 'text-white bg-purple-600/20'
                      : 'text-muted hover:text-white hover:bg-white/[0.05]'
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

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
