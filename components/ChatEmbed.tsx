'use client';

import { useState, useRef } from 'react';

interface ChatEmbedProps {
  /** Translation strings — pass from the server page */
  t: {
    splashHeadline: string;
    splashSub: string;
    splashCta: string;
    splashNote: string;
  };
}

export function ChatEmbed({ t }: ChatEmbedProps) {
  const [started, setStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleStart = () => setStarted(true);
  const handleLoad = () => setLoaded(true);

  return (
    <div className="relative w-full h-[580px] md:h-[650px] rounded-2xl overflow-hidden bg-[#0d0d14]">

      {/* ── IFRAME ─────────────────────────────────────────── */}
      {started && (
        <iframe
          ref={iframeRef}
          src="https://callmechat.com"
          allow="camera; microphone; autoplay; fullscreen"
          allowFullScreen
          title="Live random video chat powered by CallMeChat"
          onLoad={handleLoad}
          className="absolute inset-0 w-full h-full border-0"
        />
      )}

      {/* ── SPLASH OVERLAY ──────────────────────────────────
          Visible until user clicks OR until iframe has loaded after click.
          Fades out smoothly once `loaded` becomes true.
      ──────────────────────────────────────────────────── */}
      <div
        className={[
          'absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10',
          'transition-opacity duration-700',
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
        ].join(' ')}
        aria-hidden={loaded}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-[#0d0d14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(124,58,237,.22)_0%,transparent_70%)]" />

        {/* Live badge */}
        <div className="relative inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25 rounded-full px-4 py-1.5 text-xs font-semibold text-green-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot" />
          Live now
        </div>

        {/* Icon */}
        <div className="relative w-20 h-20 rounded-[22px] bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-4xl mb-6 shadow-glow">
          🎲
        </div>

        {/* Headline */}
        <h3 className="relative text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
          {t.splashHeadline}
        </h3>
        <p className="relative text-muted text-sm max-w-xs mb-8 leading-relaxed">
          {t.splashSub}
        </p>

        {/* CTA */}
        {!started ? (
          <button
            onClick={handleStart}
            className="relative inline-flex items-center gap-2.5 bg-brand text-white font-bold text-base px-8 py-4 rounded-[14px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.27A1 1 0 0121 8.62V15.4a1 1 0 01-1.45.89L15 14M4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
            </svg>
            {t.splashCta}
          </button>
        ) : (
          /* Spinner shown while iframe is loading after click */
          <div className="relative flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
            <span className="text-xs text-muted">Connecting…</span>
          </div>
        )}

        {/* Note */}
        {!started && (
          <p className="relative text-xs text-muted/60 mt-4">{t.splashNote}</p>
        )}

        {/* Feature pills */}
        {!started && (
          <div className="relative flex flex-wrap justify-center gap-2 mt-6">
            {['No sign-up', '180+ countries', 'HD video', 'Free forever'].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[0.7rem] text-muted"
              >
                ✓ {pill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
