import type { Metadata } from 'next';
import Link from 'next/link';
import { locales } from '@/i18n';

const BASE = 'https://roulettechatsites.com';
const lp = (locale: string) => (locale === 'en' ? '' : `/${locale}`);

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const languages: Record<string, string> = { 'x-default': `${BASE}/safety` };
  for (const loc of locales) languages[loc] = `${BASE}${lp(loc)}/safety`;
  return {
    title: 'Safety Center – RouletteChat',
    description: 'Learn how RouletteChat keeps you safe with AI moderation, instant reporting, and community guidelines. Your safety is our top priority.',
    alternates: { canonical: `${BASE}${lp(locale)}/safety`, languages },
  };
}

const TIPS = [
  { icon: '🚫', title: 'Never share personal information', desc: 'Do not share your full name, address, phone number, school, or workplace with strangers in chat.' },
  { icon: '📷', title: 'Guard your screen', desc: 'Be aware of what is visible in your background. Remove or hide anything that could identify your location.' },
  { icon: '⛔', title: 'Skip freely', desc: 'If a conversation makes you uncomfortable for any reason, click Next immediately. You owe strangers nothing.' },
  { icon: '🚨', title: 'Report bad behavior', desc: 'Use the report button inside the chat to flag inappropriate users. Our moderation team reviews every report.' },
  { icon: '👨‍👩‍👧', title: 'Minors should not use this platform', desc: 'RouletteChat is intended for users aged 18 and over. If you are under 18, please do not use this service.' },
  { icon: '🔐', title: 'Use a strong password', desc: 'If you create an account, use a unique password and never reuse it across other services.' },
];

export default function SafetyPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Safety Center</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-5">
            Your Safety Is Our<br />
            <span className="gradient-text">Top Priority</span>
          </h1>
          <p className="text-muted text-[0.95rem] leading-relaxed max-w-xl mx-auto">
            RouletteChat is built with safety in mind. Here is how we protect you — and how you can protect yourself.
          </p>
        </div>

        {/* Platform safety */}
        <div className="card-glass rounded-2xl p-8 mb-8">
          <h2 className="font-black text-lg mb-5">How We Keep the Platform Safe</h2>
          <div className="flex flex-col gap-4 text-sm text-muted leading-relaxed">
            <p>
              <strong className="text-white">AI-powered moderation</strong> — Our automated system scans video streams in real time to detect and block inappropriate content before it reaches you.
            </p>
            <p>
              <strong className="text-white">Instant skip & block</strong> — You can skip any chat partner in one click, no reason required. Blocked users cannot reconnect with you.
            </p>
            <p>
              <strong className="text-white">Human review team</strong> — Every user report is reviewed by a real person. Accounts that violate our rules are permanently banned.
            </p>
            <p>
              <strong className="text-white">No chat logs stored</strong> — We do not record or store your conversations. Privacy is built into the core of our platform.
            </p>
          </div>
        </div>

        {/* User tips */}
        <h2 className="font-black text-lg mb-6">Tips for Staying Safe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {TIPS.map(({ icon, title, desc }) => (
            <div key={title} className="card-glass rounded-2xl p-5">
              <div className="text-xl mb-2">{icon}</div>
              <h3 className="font-bold text-sm mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Community guidelines summary */}
        <div className="card-glass rounded-2xl p-8 mb-10">
          <h2 className="font-black text-lg mb-4">Community Guidelines</h2>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            {[
              'Be respectful. Treat every person you chat with the way you want to be treated.',
              'No nudity or sexual content of any kind.',
              'No harassment, threats, or hate speech.',
              'No sharing of illegal content.',
              'No impersonation of other users or public figures.',
              'Users under 18 are not permitted to use this platform.',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Report contact */}
        <div className="text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-2xl p-8">
          <h2 className="font-black text-lg mb-3">Need to Report Something?</h2>
          <p className="text-muted text-sm mb-4">
            Use the in-chat report button for real-time issues. For anything else, contact our safety team directly.
          </p>
          <a
            href="mailto:support@roulettechatsites.com"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-7 py-3 rounded-xl shadow-glow hover:opacity-90 transition-opacity text-sm"
          >
            support@roulettechatsites.com
          </a>
        </div>
      </div>
    </div>
  );
}
