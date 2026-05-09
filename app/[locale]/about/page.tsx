import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About RouletteChat – Our Mission & Story',
  description: 'Learn about RouletteChat — a free random video chat platform built to connect real people from 180+ countries instantly and safely.',
  alternates: { canonical: 'https://roulettechatsites.com/about' },
};

const VALUES = [
  { icon: '🌍', title: 'Global Connection', desc: 'We believe borders should never limit human connection. Every chat is a window into someone else\'s world.' },
  { icon: '🛡️', title: 'Safety First', desc: 'AI-powered moderation, instant reporting, and a zero-tolerance policy for harmful content keeps our community safe.' },
  { icon: '⚡', title: 'Radical Simplicity', desc: 'No sign-up walls, no complicated profiles. One click and you\'re talking to someone new anywhere on earth.' },
  { icon: '🔒', title: 'Privacy by Default', desc: 'We don\'t store chat logs. We don\'t sell your data. What happens in your chat stays in your chat.' },
];

const STATS = [
  { value: '2M+', label: 'Monthly users' },
  { value: '180+', label: 'Countries' },
  { value: '50M+', label: 'Chats completed' },
  { value: '2020', label: 'Founded' },
];

export default function AboutPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Our Story</p>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight mb-5">
            Built to Connect<br />
            <span className="gradient-text">Real People</span>
          </h1>
          <p className="text-muted text-[1rem] leading-relaxed max-w-xl mx-auto">
            RouletteChat was created with a simple idea: the best conversations happen by surprise.
            We built a platform that removes every barrier between you and a genuine human connection.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ value, label }) => (
            <div key={label} className="card-glass rounded-2xl p-6 text-center">
              <strong className="block text-2xl font-black gradient-text">{value}</strong>
              <span className="text-xs text-muted mt-1 block">{label}</span>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="card-glass rounded-2xl p-8 mb-10">
          <h2 className="font-black text-xl mb-4">Our Mission</h2>
          <p className="text-muted leading-relaxed text-[0.95rem]">
            We live in a world that&apos;s more connected than ever — yet loneliness is at an all-time high.
            Social media has replaced real conversation with curated personas and endless scrolling.
            RouletteChat is our answer: a space where you can have an honest, unscripted conversation
            with a real person, right now, no matter where they are in the world.
          </p>
        </div>

        {/* Values */}
        <h2 className="font-black text-xl mb-6">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {VALUES.map(({ icon, title, desc }) => (
            <div key={title} className="card-glass rounded-2xl p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-bold text-[0.95rem] mb-2">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-2xl p-10">
          <h2 className="font-black text-xl mb-3">Ready to meet someone new?</h2>
          <p className="text-muted text-sm mb-6">Jump into the chat — it&apos;s free and takes one click.</p>
          <Link
            href="/#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-7 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
          >
            Start Chatting Free →
          </Link>
          <p className="text-xs text-muted mt-4">
            Questions?{' '}
            <a href="mailto:support@roulettechatsites.com" className="text-purple-light hover:text-white transition-colors">
              support@roulettechatsites.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
