import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chat Tools – Compatibility Test & Chat Style Quiz',
  description:
    'Free interactive tools: find your video chat compatibility score, discover your chat personality type, and match with the right platform.',
};

const TOOLS = [
  {
    href: '/tools/compatibility-test',
    icon: '💘',
    title: 'Compatibility Test',
    desc: 'Answer 10 quick questions and discover your ideal chat match. Are you more of a Monkey or an Azar person?',
    badge: 'Popular',
    color: 'from-purple-600/20 to-pink-500/15',
    border: 'border-purple-500/30',
  },
  {
    href: '/tools/chat-style-quiz',
    icon: '🎭',
    title: 'Chat Style Quiz',
    desc: 'Find out your unique conversation personality — are you The Explorer, The Connector, or The Debater?',
    badge: 'New',
    color: 'from-cyan-500/15 to-purple-600/15',
    border: 'border-cyan-500/25',
  },
];

export default function ToolsPage({ params: { locale } }: { params: { locale: string } }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Interactive Tools</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
            <span className="gradient-text">Discover Your</span> Chat Style
          </h1>
          <p className="text-muted text-[0.95rem] max-w-md mx-auto">
            Fun tools to help you find the right platform, understand your conversation style, and connect better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={`${prefix}${tool.href}`}
              className={`block bg-gradient-to-br ${tool.color} border ${tool.border} rounded-2xl p-8 hover:-translate-y-1 transition-all duration-200 hover:shadow-[0_0_40px_rgba(124,58,237,.2)]`}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-4xl">{tool.icon}</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {tool.badge}
                </span>
              </div>
              <h2 className="font-black text-xl mb-2">{tool.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-5">{tool.desc}</p>
              <span className="text-purple-light font-semibold text-sm">Take the quiz →</span>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-8 card-glass p-6 text-center">
          <p className="text-muted text-sm">🚧 More tools coming soon — Platform Ranker, Chat Safety Score, and more.</p>
        </div>
      </div>
    </div>
  );
}
