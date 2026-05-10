'use client';

import { useState, useEffect } from 'react';

interface ChatEmbedProps {
  t: {
    splashHeadline: string;
    splashSub: string;
    splashCta: string;
    splashNote: string;
  };
}

export function ChatEmbed({ t }: ChatEmbedProps) {
  // overlay visible until user interacts with callmechat (clicks their button)
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // Load callmechat embed immediately on mount
    const container = document.getElementById('callmechat_container');
    if (!container) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://callmechat.net/js/iframe.js';

    script.onload = function () {
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.addedNodes.length) {
            const iframe = container.querySelector('iframe');
            if (iframe) {
              // mousedown fires at document level BEFORE the iframe captures the click
              const onMousedown = (e: MouseEvent) => {
                const rect = iframe.getBoundingClientRect();
                if (
                  e.clientX >= rect.left && e.clientX <= rect.right &&
                  e.clientY >= rect.top  && e.clientY <= rect.bottom
                ) {
                  setOverlayVisible(false);
                  document.removeEventListener('mousedown', onMousedown);
                }
              };
              document.addEventListener('mousedown', onMousedown);
              observer.disconnect();
            }
          }
        });
      });
      observer.observe(container, { childList: true, subtree: true });
    };

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode!.insertBefore(script, firstScript);
  }, []);

  return (
    <div className="relative w-full h-[580px] md:h-[650px] rounded-2xl overflow-hidden bg-[#0d0d14]">
      {/* Iframe — always loaded */}
      <div
        id="callmechat_container"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Branded overlay — pointer-events: none so clicks pass through to iframe */}
      <div
        className={[
          'absolute inset-0 z-10 transition-opacity duration-500',
          overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        style={{ pointerEvents: overlayVisible ? 'none' : 'none' }}
      >
        {/* Top branding — opaque, covers callmechat title + subtitle text */}
        <div
          className="absolute inset-x-0 top-0 flex flex-col items-center pt-10 pb-16 px-6 text-center"
          style={{
            background: 'linear-gradient(to bottom, #0d0d14 0%, #0d0d14 55%, rgba(13,13,20,0.85) 75%, transparent 100%)',
          }}
        >
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/25 rounded-full px-4 py-1.5 text-xs font-semibold text-green-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot" />
            Live now
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-3xl mb-4 shadow-glow">
            🎲
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
            {t.splashHeadline}
          </h3>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-20"
          style={{
            background: 'linear-gradient(to top, #0d0d14 0%, transparent 100%)',
          }}
        />

        {/* Feature pills at bottom */}
        <div className="absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-2 px-4">
          {['No sign-up', '180+ countries', 'HD video', 'Free forever'].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1 bg-white/[0.08] border border-white/[0.1] rounded-full px-3 py-1 text-[0.65rem] text-muted backdrop-blur-sm"
            >
              ✓ {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
