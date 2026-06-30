'use client';

import { useState } from 'react';

// 20 smallest videos from Hulk_Videos (copy to public/videos/)
const VIDEOS = [
  '/videos/edfe7be1a1401aee0d8a65b14381c381_4232175077_0.mp4',
  '/videos/7123fcdb-84d2-4f04-ac34-c5be9f54f9dc.mp4',
  '/videos/523308db-7f9e-40c3-883f-7dbe05d23767.mp4',
  '/videos/4b693d66124cd4b92da1e99fb7a595e8_2802748323_0.mp4',
  '/videos/83b3f83c-b110-4f64-acd5-5a8b8c90257a.mp4',
  '/videos/b6e68932e74efb432174aca36a5f5a7b_1787680606_0.mp4',
  '/videos/af8bed93-deb1-4920-ad87-f8e9d4602ed7.mp4',
  '/videos/cf1a3a027d48743ce70698a64db8f4b5_2695100147_0.mp4',
  '/videos/34bb8f98-7842-463f-88e7-fef13e4cdac5.mp4',
  '/videos/449642be-9ab6-4dd9-bea6-4f5028cfd8ec.mp4',
  '/videos/ce70e0bc-0476-4a1c-8c15-fcb94f9d56ea.mp4',
  '/videos/4b62f3ae-7e2b-48f4-bd2c-5666a75bba00.mp4',
  '/videos/4fa4adfb-5ed8-40a2-8e49-3bee46c3ed93.mp4',
  '/videos/48b71bd0-cc86-42e5-a0fc-249b0db702ac.mp4',
  '/videos/abd979ac-0dce-4bed-8eec-d197a1caf7a4.mp4',
  '/videos/856cb6f2-5554-4831-a2c5-4315111bf7c0.mp4',
  '/videos/e2783a5f-3724-44e3-b948-4cafe041af96.mp4',
  '/videos/f4eb5171-2cae-47f6-aa83-993f8e91e3fe.mp4',
  '/videos/35d54eee-ed68-48bd-9389-00b29ec04932.mp4',
  '/videos/420d6e54-1b69-4ae7-9eee-cf3561bcb8fb.mp4',
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

function pickDifferent<T extends { name: string }>(arr: T[], current: T): T {
  const others = arr.filter((p) => p.name !== current.name);
  return others[Math.floor(Math.random() * others.length)];
}

interface FakeChatProps {
  onStartReal: () => void;
}

// User sees 3 videos (refresh × 2 to cycle, refresh × 1 more → real iframe)
const VIDEOS_BEFORE_REAL = 3;

export function FakeChat({ onStartReal }: FakeChatProps) {
  const [videoIdx, setVideoIdx]   = useState(0);
  const [profile, setProfile]     = useState(PROFILES[0]);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = () => {
    const next = refreshCount + 1;
    if (next >= VIDEOS_BEFORE_REAL) {
      onStartReal();
      return;
    }
    setRefreshCount(next);
    setVideoIdx((i) => (i + 1) % VIDEOS.length);
    setProfile((p) => pickDifferent(PROFILES, p));
  };

  return (
    <div className="relative w-full h-[580px] md:h-[650px] rounded-2xl overflow-hidden bg-black">

      {/* ── Video ── */}
      <video
        key={videoIdx}
        src={VIDEOS[videoIdx]}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Top gradient for readability */}
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
          <span className="text-white/55 text-xs">{profile.age} лет</span>
        </div>

        {/* Report user */}
        <button className="ml-auto flex items-center gap-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-all flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
          </svg>
          Report user
        </button>
      </div>

      {/* ── Bottom controls ── */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6 z-10">
        <p className="text-white/55 text-sm mb-5 select-none">
          Нажмите «refresh», чтобы найти следующего
        </p>

        <div className="flex items-center justify-center gap-5">
          {/* Refresh — red, cycles videos → iframe after 3 */}
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

          {/* Chat — white, go to real iframe */}
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

          {/* Camera flip — white, go to real iframe */}
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
