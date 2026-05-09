'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

// ─── Icebreaker data ──────────────────────────────────────────────────────────
const ICEBREAKERS = {
  fun: [
    "If you could only eat one food for the rest of your life, what would it be?",
    "What's the weirdest thing you've ever eaten?",
    "If you were a superhero, what would your power be?",
    "What's the most unusual talent you have?",
    "If your life had a theme song, what would it be?",
    "What's the last thing that made you laugh out loud?",
    "Would you rather explore space or the deep ocean?",
    "What's a conspiracy theory you find weirdly entertaining?",
  ],
  deep: [
    "What's something you believe that most people disagree with?",
    "When was the last time you changed your mind about something important?",
    "What's the best advice you've ever received?",
    "If you could go back and change one decision, would you?",
    "What does success actually mean to you?",
    "What's a skill you wish you had started learning earlier?",
    "Do you think most people are fundamentally good?",
    "What's one thing you'd tell your younger self?",
  ],
  random: [
    "Cats or dogs?",
    "What's a random fact you know that most people don't?",
    "What's the last thing that genuinely surprised you?",
    "Morning person or night owl?",
    "What country would you live in if you could pick anywhere?",
    "What's your unpopular opinion about something popular?",
    "What's the most interesting thing that happened to you this week?",
    "What's a skill you're currently trying to learn?",
  ],
} as const;
type IceCategory = keyof typeof ICEBREAKERS;

// ─── Username data ────────────────────────────────────────────────────────────
const ADJS = ['Silent', 'Rapid', 'Cosmic', 'Neon', 'Digital', 'Arctic', 'Solar', 'Crystal', 'Shadow', 'Turbo', 'Quantum', 'Nebula', 'Velvet', 'Onyx', 'Hyper', 'Lunar', 'Thunder', 'Stealth', 'Vivid', 'Iron'];
const NOUNS = ['Fox', 'Tiger', 'Panda', 'Hawk', 'Wolf', 'Raven', 'Lynx', 'Panther', 'Falcon', 'Viper', 'Cobra', 'Manta', 'Phoenix', 'Jaguar', 'Badger', 'Otter', 'Coyote', 'Eagle', 'Drake', 'Shark'];
const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randNum = () => Math.floor(Math.random() * 900) + 100;
const makeUsername = () => `${rand(ADJS)}${rand(NOUNS)}${randNum()}`;

// ─── Compatibility Test data ──────────────────────────────────────────────────
const COMPAT_QUESTIONS = [
  { q: "How long do you usually chat with a stranger?", opts: ["Quick — 5 min max", "Medium — 10–20 min", "Long — 30+ min", "As long as it's good"] },
  { q: "Do you prefer video or text chat?", opts: ["Video only", "Text only", "Both equally", "Depends on mood"] },
  { q: "How important is choosing who you match with?", opts: ["Very — I need filters", "Somewhat — nice to have", "Not much — random is fine", "Totally random please"] },
  { q: "Do you mind creating an account?", opts: ["Fine with it", "Prefer not to", "Definitely no account", "Already have one"] },
  { q: "Where do you mostly chat from?", opts: ["Mobile only", "Desktop only", "Both equally", "Wherever I am"] },
  { q: "What's your main reason for chatting?", opts: ["Just for fun", "Language practice", "Making real friends", "Meeting someone special"] },
  { q: "How important is content moderation?", opts: ["Very — safety first", "Somewhat important", "Not very important", "I can handle myself"] },
  { q: "What age group do you want to meet?", opts: ["Teens & early 20s", "Mid 20s to 40s", "Any age", "Close to my own age"] },
  { q: "Do you want to match by country?", opts: ["Yes, specifically", "Sometimes", "Totally random", "No preference"] },
  { q: "What kind of interface do you prefer?", opts: ["Minimal & simple", "Feature-rich", "Swipe-based", "Classic webcam grid"] },
];

// Score mapping: [callmechat, azar, monkey, chatroulette, chatspin]
const COMPAT_SCORES: number[][][] = [
  [[2,1,0,1,1],[1,1,1,2,2],[0,0,2,2,0],[0,0,1,1,1]],
  [[2,0,0,2,1],[0,0,1,0,2],[1,2,1,1,1],[1,1,1,1,1]],
  [[0,2,0,0,2],[1,1,1,0,1],[0,0,2,2,0],[2,0,0,0,0]],
  [[1,0,2,2,0],[2,1,0,0,1],[0,2,0,0,0],[1,1,1,1,1]],
  [[1,2,1,0,1],[0,0,2,2,0],[1,1,1,1,1],[1,1,1,1,1]],
  [[1,0,2,1,0],[0,0,1,0,1],[0,1,0,1,2],[0,2,0,0,0]],
  [[2,1,0,0,2],[1,1,1,1,1],[0,0,2,2,0],[0,0,1,1,1]],
  [[0,2,2,0,0],[1,1,1,0,2],[0,0,1,2,0],[1,1,1,1,1]],
  [[0,2,0,0,2],[1,1,1,1,1],[2,0,0,0,0],[1,1,2,2,0]],
  [[2,0,2,0,0],[0,0,1,2,0],[0,2,0,0,1],[1,1,0,0,2]],
];

const COMPAT_RESULTS = [
  { name: 'CallMeChat', emoji: '💬', desc: 'Clean, filter-friendly, and requires no account. Perfect for your chat style.' },
  { name: 'Azar', emoji: '🌍', desc: 'Location-aware, swipe-based, and great on mobile. Matches your vibe.' },
  { name: 'Monkey', emoji: '🐒', desc: "Young, fast-paced, and all about fun. Exactly what you're looking for." },
  { name: 'Chatroulette', emoji: '🎲', desc: 'The classic random webcam experience. Simple and spontaneous.' },
  { name: 'ChatSpin', emoji: '🔄', desc: 'Feature-rich with gender and country filters. Matches your preferences.' },
];

// ─── Chat Style Quiz data ─────────────────────────────────────────────────────
const STYLE_QUESTIONS = [
  { q: "When meeting someone new online, you tend to…", opts: ["Ask lots of questions", "Share your own stories", "Challenge their views", "Make jokes first"] },
  { q: "A great chat means…", opts: ["Learning something new", "Feeling genuinely understood", "Having a deep debate", "Laughing together"] },
  { q: "If a chat gets boring, you…", opts: ["Dig deeper with a new topic", "Try to understand them better", "Introduce a controversial topic", "Say something funny"] },
  { q: "How do you usually start a conversation?", opts: ["With a curious question", "With 'how are you?' and listen", "With your opinion on something", "With a meme or joke"] },
  { q: "You most remember chats where…", opts: ["You discovered something new", "You felt a real connection", "You were intellectually challenged", "You laughed a lot"] },
  { q: "After a great chat, you feel…", opts: ["Intellectually stimulated", "Emotionally connected", "Mentally sharpened", "Happy and entertained"] },
  { q: "You prefer conversations that are…", opts: ["Wide-ranging across topics", "Personal and meaningful", "Focused on one debate", "Light and funny"] },
  { q: "When someone disagrees with you, you…", opts: ["Get curious about why", "Try to find common ground", "Love the challenge", "Turn it into a joke"] },
];

const STYLE_RESULTS = [
  { key: 'explorer', emoji: '🧭', title: 'The Explorer', desc: 'You love discovering new ideas and people. Every conversation is an adventure into the unknown.' },
  { key: 'connector', emoji: '🤝', title: 'The Connector', desc: 'You create real emotional bonds fast. People feel genuinely heard after talking to you.' },
  { key: 'debater', emoji: '⚡', title: 'The Debater', desc: 'You love intellectual discourse. You challenge ideas and push conversations deeper than most.' },
  { key: 'entertainer', emoji: '🎭', title: 'The Entertainer', desc: 'You make any chat memorable. Your energy is contagious and people always leave smiling.' },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────
function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-colors"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

// ─── Tool: Icebreaker ─────────────────────────────────────────────────────────
function IcebreakerTool() {
  const t = useTranslations('tools');
  const [cat, setCat] = useState<IceCategory>('fun');
  const [idx, setIdx] = useState(0);

  const cats: { key: IceCategory; label: string }[] = [
    { key: 'fun', label: t('icebreakerFun') },
    { key: 'deep', label: t('icebreakerDeep') },
    { key: 'random', label: t('icebreakerRandom') },
  ];

  const next = () => setIdx((i) => (i + 1) % ICEBREAKERS[cat].length);
  const question = ICEBREAKERS[cat][idx];

  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-2xl mb-2">💬</div>
          <h3 className="font-black text-lg text-white">{t('icebreakerTitle')}</h3>
          <p className="text-muted text-sm mt-1">{t('icebreakerSub')}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {cats.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setCat(key); setIdx(0); }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${cat === key ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/[0.04] border-white/[0.08] text-muted hover:border-purple-500/40'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="bg-white/[0.04] rounded-xl p-5 min-h-[80px] flex items-center">
        <p className="text-white text-[0.95rem] leading-relaxed font-medium">{question}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={next} className="flex-1 bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          {t('icebreakerGenerate')}
        </button>
        <CopyButton text={question} label={t('icebreakerCopy')} copiedLabel={t('icebreakerCopied')} />
      </div>
    </div>
  );
}

// ─── Tool: Camera & Mic Tester ────────────────────────────────────────────────
function CameraTool() {
  const t = useTranslations('tools');
  const [status, setStatus] = useState<'idle' | 'testing' | 'ok' | 'error'>('idle');
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [hasMic, setHasMic] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus('idle');
    setHasCamera(null);
    setHasMic(null);
  }, []);

  useEffect(() => () => { streamRef.current?.getTracks().forEach((t) => t.stop()); }, []);

  const test = async () => {
    setStatus('testing');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setHasCamera(stream.getVideoTracks().length > 0);
      setHasMic(stream.getAudioTracks().length > 0);
      setStatus('ok');
    } catch {
      try {
        const s2 = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = s2;
        if (videoRef.current) { videoRef.current.srcObject = s2; videoRef.current.play(); }
        setHasCamera(true); setHasMic(false); setStatus('ok');
      } catch { setHasCamera(false); setHasMic(false); setStatus('error'); }
    }
  };

  const StatusPill = ({ ok }: { ok: boolean | null }) => (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ok === null ? 'bg-white/[0.06] text-muted' : ok ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-red-500/15 text-red-400 border border-red-500/25'}`}>
      {ok === null ? '—' : ok ? `✓ ${t('cameraOk')}` : `✗ ${t('cameraFail')}`}
    </span>
  );

  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div>
        <div className="text-2xl mb-2">📷</div>
        <h3 className="font-black text-lg text-white">{t('cameraTitle')}</h3>
        <p className="text-muted text-sm mt-1">{t('cameraSub')}</p>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">{t('cameraCamera')}</span>
          <StatusPill ok={hasCamera} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">{t('cameraMic')}</span>
          <StatusPill ok={hasMic} />
        </div>
      </div>
      {status === 'ok' && (
        <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
          <video ref={videoRef} muted autoPlay playsInline className="w-full h-full object-cover" />
        </div>
      )}
      {status === 'idle' && (
        <p className="text-xs text-muted">{t('cameraNote')}</p>
      )}
      {status === 'idle' || status === 'error' ? (
        <button onClick={test} className="w-full bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          {t('cameraStart')}
        </button>
      ) : status === 'ok' ? (
        <button onClick={stop} className="w-full bg-white/[0.06] border border-white/[0.1] text-muted font-semibold text-sm py-2.5 rounded-xl hover:bg-white/[0.09] transition-colors">
          {t('cameraStop')}
        </button>
      ) : (
        <div className="w-full text-center text-sm text-muted py-2.5 animate-pulse">Checking…</div>
      )}
    </div>
  );
}

// ─── Tool: VPN Detector ───────────────────────────────────────────────────────
const VPN_KEYWORDS = ['vpn', 'proxy', 'nordvpn', 'expressvpn', 'surfshark', 'tunnel', 'tor ', 'mullvad', 'proton', 'cyberghost', 'private internet', 'hosting', 'datacenter', 'data center', 'server'];

function VpnTool() {
  const t = useTranslations('tools');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'err'>('idle');
  const [info, setInfo] = useState<{ ip: string; country: string; city: string; org: string; flag: string } | null>(null);

  const check = async () => {
    setStatus('loading');
    try {
      const r = await fetch('https://ipapi.co/json/');
      const d = await r.json();
      setInfo({ ip: d.ip ?? '—', country: d.country_name ?? '—', city: d.city ?? '—', org: d.org ?? '—', flag: d.country_code ? `https://flagcdn.com/24x18/${d.country_code.toLowerCase()}.png` : '' });
      setStatus('done');
    } catch { setStatus('err'); }
  };

  const isVpn = info ? VPN_KEYWORDS.some((k) => info.org.toLowerCase().includes(k)) : false;

  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div>
        <div className="text-2xl mb-2">🛡️</div>
        <h3 className="font-black text-lg text-white">{t('vpnTitle')}</h3>
        <p className="text-muted text-sm mt-1">{t('vpnSub')}</p>
      </div>
      {status === 'done' && info && (
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-3 py-2 border-b border-white/[0.05]">
            <span className="text-muted w-20">{t('vpnIp')}</span>
            <span className="font-mono text-white font-semibold">{info.ip}</span>
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-white/[0.05]">
            <span className="text-muted w-20">{t('vpnCountry')}</span>
            <span className="flex items-center gap-2 text-white">{info.flag && <img src={info.flag} alt="" className="w-6 h-4 object-cover rounded-[2px]" />}{info.country}</span>
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-white/[0.05]">
            <span className="text-muted w-20">{t('vpnCity')}</span>
            <span className="text-white">{info.city}</span>
          </div>
          <div className="flex items-center gap-3 py-2">
            <span className="text-muted w-20">{t('vpnIsp')}</span>
            <span className="text-white text-xs">{info.org}</span>
          </div>
          <div className={`mt-1 text-xs font-semibold px-3 py-2 rounded-lg ${isVpn ? 'bg-amber-500/10 border border-amber-500/25 text-amber-400' : 'bg-green-500/10 border border-green-500/25 text-green-400'}`}>
            {isVpn ? t('vpnDetected') : t('vpnClean')}
          </div>
          {isVpn && <p className="text-xs text-muted">{t('vpnNote')}</p>}
        </div>
      )}
      {status === 'err' && <p className="text-sm text-red-400">Could not fetch IP info. Try again.</p>}
      {(status === 'idle' || status === 'err') && (
        <button onClick={check} className="w-full bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          {t('vpnCheck')}
        </button>
      )}
      {status === 'loading' && (
        <div className="w-full text-center text-sm text-muted py-2.5 animate-pulse">{t('vpnChecking')}</div>
      )}
      {status === 'done' && (
        <button onClick={() => { setStatus('idle'); setInfo(null); }} className="w-full bg-white/[0.06] border border-white/[0.1] text-muted font-semibold text-sm py-2.5 rounded-xl hover:bg-white/[0.09] transition-colors">
          {t('vpnCheck')}
        </button>
      )}
    </div>
  );
}

// ─── Tool: Username Generator ─────────────────────────────────────────────────
function UsernameTool() {
  const t = useTranslations('tools');
  const [username, setUsername] = useState(makeUsername());

  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div>
        <div className="text-2xl mb-2">🎭</div>
        <h3 className="font-black text-lg text-white">{t('usernameTitle')}</h3>
        <p className="text-muted text-sm mt-1">{t('usernameSub')}</p>
      </div>
      <div className="bg-white/[0.04] rounded-xl px-5 py-4 text-center">
        <span className="text-2xl font-black text-white tracking-tight">{username}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setUsername(makeUsername())} className="flex-1 bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          {t('usernameGenerate')}
        </button>
        <CopyButton text={username} label={t('usernameCopy')} copiedLabel={t('usernameCopied')} />
      </div>
    </div>
  );
}

// ─── Tool: Compatibility Test ─────────────────────────────────────────────────
function CompatibilityTool() {
  const t = useTranslations('tools');
  const [step, setStep] = useState<'intro' | number | 'result'>('intro');
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  const reset = () => { setStep('intro'); setScores([0, 0, 0, 0, 0]); };

  const answer = (qIdx: number, aIdx: number) => {
    const sc = COMPAT_SCORES[qIdx]?.[aIdx] ?? [0, 0, 0, 0, 0];
    const newScores = scores.map((s, i) => s + sc[i]);
    setScores(newScores);
    const next = qIdx + 1;
    setStep(next < COMPAT_QUESTIONS.length ? next : 'result');
  };

  const bestIdx = scores.indexOf(Math.max(...scores));
  const result = COMPAT_RESULTS[bestIdx];

  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl mb-2">💘</div>
          <h3 className="font-black text-lg text-white">{t('compatTitle')}</h3>
          <p className="text-muted text-sm mt-1">{t('compatSub')}</p>
        </div>
        <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 flex-shrink-0">Popular</span>
      </div>

      {step === 'intro' && (
        <button onClick={() => setStep(0)} className="w-full bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          {t('compatStart')}
        </button>
      )}

      {typeof step === 'number' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/[0.05] rounded-full h-1.5">
              <div className="bg-brand h-1.5 rounded-full transition-all" style={{ width: `${((step + 1) / COMPAT_QUESTIONS.length) * 100}%` }} />
            </div>
            <span className="text-xs text-muted flex-shrink-0">{t('compatQuestion', { n: step + 1 })}</span>
          </div>
          <p className="font-semibold text-white text-[0.95rem]">{COMPAT_QUESTIONS[step].q}</p>
          <div className="flex flex-col gap-2">
            {COMPAT_QUESTIONS[step].opts.map((opt, i) => (
              <button key={i} onClick={() => answer(step, i)} className="text-left text-sm text-muted px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-purple-500/40 hover:text-white transition-all">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && result && (
        <div className="flex flex-col gap-3">
          <div className="bg-gradient-to-br from-purple-600/15 to-pink-500/10 border border-purple-500/25 rounded-xl p-5 text-center">
            <div className="text-4xl mb-2">{result.emoji}</div>
            <p className="text-xs text-muted mb-1">{t('compatResultSub')}</p>
            <p className="font-black text-xl text-white">{result.name}</p>
            <p className="text-sm text-muted mt-2">{result.desc}</p>
          </div>
          <button onClick={reset} className="w-full bg-white/[0.06] border border-white/[0.1] text-muted font-semibold text-sm py-2.5 rounded-xl hover:bg-white/[0.09] transition-colors">
            {t('compatRestart')}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Tool: Chat Style Quiz ────────────────────────────────────────────────────
function ChatStyleTool() {
  const t = useTranslations('tools');
  const [step, setStep] = useState<'intro' | number | 'result'>('intro');
  const [counts, setCounts] = useState([0, 0, 0, 0]); // A B C D

  const reset = () => { setStep('intro'); setCounts([0, 0, 0, 0]); };

  const answer = (qIdx: number, aIdx: number) => {
    const newCounts = counts.map((c, i) => (i === aIdx ? c + 1 : c));
    setCounts(newCounts);
    const next = qIdx + 1;
    setStep(next < STYLE_QUESTIONS.length ? next : 'result');
  };

  const bestIdx = counts.indexOf(Math.max(...counts));
  const result = STYLE_RESULTS[bestIdx];

  return (
    <div className="card-glass p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl mb-2">🎭</div>
          <h3 className="font-black text-lg text-white">{t('styleTitle')}</h3>
          <p className="text-muted text-sm mt-1">{t('styleSub')}</p>
        </div>
        <span className="text-[0.6rem] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex-shrink-0">New</span>
      </div>

      {step === 'intro' && (
        <button onClick={() => setStep(0)} className="w-full bg-brand text-white font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          {t('styleStart')}
        </button>
      )}

      {typeof step === 'number' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/[0.05] rounded-full h-1.5">
              <div className="bg-cyan-500 h-1.5 rounded-full transition-all" style={{ width: `${((step + 1) / STYLE_QUESTIONS.length) * 100}%` }} />
            </div>
            <span className="text-xs text-muted flex-shrink-0">{t('styleQuestion', { n: step + 1 })}</span>
          </div>
          <p className="font-semibold text-white text-[0.95rem]">{STYLE_QUESTIONS[step].q}</p>
          <div className="flex flex-col gap-2">
            {STYLE_QUESTIONS[step].opts.map((opt, i) => (
              <button key={i} onClick={() => answer(step, i)} className="text-left text-sm text-muted px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-cyan-500/40 hover:text-white transition-all">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && result && (
        <div className="flex flex-col gap-3">
          <div className="bg-gradient-to-br from-cyan-600/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-5 text-center">
            <div className="text-4xl mb-2">{result.emoji}</div>
            <p className="text-xs text-muted mb-1">{t('styleResultHeading')}</p>
            <p className="font-black text-xl text-white">{result.title}</p>
            <p className="text-sm text-muted mt-2">{result.desc}</p>
          </div>
          <button onClick={reset} className="w-full bg-white/[0.06] border border-white/[0.1] text-muted font-semibold text-sm py-2.5 rounded-xl hover:bg-white/[0.09] transition-colors">
            {t('styleRestart')}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ToolsClient() {
  const t = useTranslations('tools');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">{t('label')}</p>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
          {t('heading1')} <span className="gradient-text">{t('heading2')}</span>
        </h1>
        <p className="text-muted text-[0.95rem] max-w-lg mx-auto">{t('sub')}</p>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <IcebreakerTool />
        <CompatibilityTool />
        <ChatStyleTool />
        <CameraTool />
        <VpnTool />
        <UsernameTool />
      </div>
    </div>
  );
}
