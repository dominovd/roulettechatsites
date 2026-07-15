'use client';

import { useState, useCallback } from 'react';

// Videos from public/videos/ (auto-generated list)
const VIDEOS = [
  '/videos/0097dfab-4d47-4d45-8696-93fa4f6b3d4e.mp4',
  '/videos/055cf4be-adae-41fe-9dc7-432034eec4bb.mp4',
  '/videos/22ff4c2d-f86c-4fe9-91f6-c772215c27fa.mp4',
  '/videos/2be25d9e-43e2-4905-ab42-a9582c445dd5.mp4',
  '/videos/2d9320ad-92c3-4193-8033-26db06188f04.mp4',
  '/videos/4278898b-53a4-457f-b0b0-aedf35213d6c.mp4',
  '/videos/447fd23f-e47e-4179-b64a-14f13de00cd1.mp4',
  '/videos/532d07a5-55bd-495f-abeb-3dddb9779a81.mp4',
  '/videos/59f7b9ad-7ef3-429f-8bac-c0b13ef25bb1.mp4',
  '/videos/5c655929-2f33-4ee8-993e-b91e3e545b78.mp4',
  '/videos/6f2df231-cb3f-4021-9e0d-1a73d4cca729.mp4',
  '/videos/88644ed7-0438-411e-a93c-8e1ceeaa615a.mp4',
  '/videos/a00f69a4-0048-47bc-a5b5-d84e2c3bfa8d.mp4',
  '/videos/a43e84c2-e7cc-49dd-b664-2ab7f94cd440.mp4',
  '/videos/aa45f46c-6e64-40f4-b7d3-55e56eefffe4.mp4',
  '/videos/b927198a-80c0-4bc4-b137-c23edb97b622.mp4',
  '/videos/c1725ee6-4b01-46e6-8002-2b396fb371b4.mp4',
  '/videos/d5ef4be1-b238-4b5c-b81b-740079eda509.mp4',
  '/videos/e4f295a9-2073-4749-be8b-93065943d615.mp4',
  '/videos/f02e3362-6ebb-47c8-8a8e-6a82f264675c.mp4',
];

const PROFILES = [
  { name: 'Marie',     age: 27, flag: '🇫🇷', color: '#e879f9' },
  { name: 'Sophie',    age: 23, flag: '🇩🇪', color: '#818cf8' },
  { name: 'Emma',      age: 25, flag: '🇺🇸', color: '#34d399' },
  { name: 'Isabella',  age: 22, flag: '🇧🇷', color: '#fb923c' },
  { name: 'Giulia',    age: 24, flag: '🇮🇹', color: '#f472b6' },
  { name: 'Ana',       age: 26, flag: '🇪🇸', color: '#60a5fa' },
  { name: 'Laura',     age: 21, flag: '🇵🇱', color: '#a78bfa' },
  { name: 'Sara',      age: 29, flag: '🇸🇪', color: '#4ade80' },
  { name: 'Elena',     age: 23, flag: '🇷🇺', color: '#f87171' },
  { name: 'Mia',       age: 28, flag: '🇦🇺', color: '#fbbf24' },
  { name: 'Chloe',     age: 24, flag: '🇨🇦', color: '#38bdf8' },
  { name: 'Victoria',  age: 31, flag: '🇬🇧', color: '#e879f9' },
  { name: 'Olivia',    age: 22, flag: '🇳🇱', color: '#fb923c' },
  { name: 'Anna',      age: 26, flag: '🇩🇪', color: '#818cf8' },
  { name: 'Natalia',   age: 25, flag: '🇲🇽', color: '#34d399' },
  { name: 'Camille',   age: 23, flag: '🇫🇷', color: '#f472b6' },
  { name: 'Katarina',  age: 28, flag: '🇷🇸', color: '#60a5fa' },
  { name: 'Anya',      age: 24, flag: '🇺🇦', color: '#fbbf24' },
  { name: 'Valentina', age: 27, flag: '🇦🇷', color: '#4ade80' },
  { name: 'Priya',     age: 25, flag: '🇮🇳', color: '#f87171' },
];

function pickRandom<T>(arr: T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter(x => x !== exclude) : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

interface FakeChatProps {
  onStartReal: () => void;
}

// User sees this many videos before switching to real iframe
const VIDEOS_BEFORE_REAL = 3;

export function FakeChat({ onStartReal }: FakeChatProps) {
  // Start with a random video and profile, not always index 0
  const [videoSrc, setVideoSrc]     = useState(() => pickRandom(VIDEOS));
  const [profile, setProfile]       = useState(() => pickRandom(PROFILES));
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = useCallback(() => {
    const next = refreshCount + 1;
    if (next >= VIDEOS_BEFORE_REAL) {
      onStartReal();
      return;
    }
    setRefreshCount(next);
    // Pick a different random video and profile each time
    setVideoSrc(prev => pickRandom(VIDEOS, prev));
    setProfile(prev => pickRandom(PROFILES, prev));
  }, [refreshCount, onStartReal]);

  return (
    <div className="relative w-full h-[580px] md:h-[650px] rounded-2xl overflow-hidden bg-black">

      {/* ── Video ── */}
      <video
        key={videoSrc}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-2.5 px-3 pt-3 z-10">
        {/* Back chevron */}
        <button className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
          style={{ background: profile.color }}
        >
          {profile.name[0]}
        </div>

        {/* Name / age */}
        <div className="flex flex-col leading-tight">
          <span className="text-white font-semibold text-sm">
            {profile.name} {profile.flag}
          </span>
          <span className="text-white/55 text-xs">{profile.age} y.o.</span>
        </div>
      </div>

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6 z-10">
        <p className="text-white/55 text-sm mb-5 select-none">
          Press refresh to find the next person
        </p>

        <div className="flex items-center justify-center gap-5">
          {/* Refresh — red, cycles videos → real iframe after VIDEOS_BEFORE_REAL */}
          <button
            onClick={handleRefresh}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 flex items-center justify-center shadow-xl transition-all"
            aria-label="Next person"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* Chat → real iframe */}
          <button
            onClick={onStartReal}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 active:scale-95 flex items-center justify-center shadow-xl transition-all"
            aria-label="Open chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2.2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {/* Camera → real iframe */}
          <button
            onClick={onStartReal}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 active:scale-95 flex items-center justify-center shadow-xl transition-all"
            aria-label="Switch camera"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth={2.2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
