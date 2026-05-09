import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact RouletteChat – Get in Touch',
  description: 'Contact the RouletteChat team for support, safety reports, business inquiries, or press questions.',
  alternates: { canonical: 'https://roulettechatsites.com/contact' },
};

const TOPICS = [
  { icon: '🛟', title: 'General Support', desc: 'Technical issues, account help, or general questions.', email: 'support@roulettechatsites.com' },
  { icon: '🚨', title: 'Safety & Abuse', desc: 'Report abusive behavior, harmful content, or policy violations.', email: 'support@roulettechatsites.com' },
  { icon: '💼', title: 'Business & Partnerships', desc: 'Advertising, partnerships, or business development inquiries.', email: 'support@roulettechatsites.com' },
  { icon: '📰', title: 'Press & Media', desc: 'Media inquiries, press kit requests, or interview opportunities.', email: 'support@roulettechatsites.com' },
];

export default function ContactPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Get in Touch</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
            Contact <span className="gradient-text">RouletteChat</span>
          </h1>
          <p className="text-muted text-[0.95rem] leading-relaxed">
            We read every message. Choose the right topic below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact cards */}
        <div className="flex flex-col gap-4 mb-12">
          {TOPICS.map(({ icon, title, desc, email }) => (
            <div key={title} className="card-glass rounded-2xl p-6 flex items-start gap-5">
              <div className="text-2xl flex-shrink-0">{icon}</div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[0.95rem] mb-1">{title}</h2>
                <p className="text-muted text-sm mb-3 leading-relaxed">{desc}</p>
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(title)}`}
                  className="text-sm font-semibold text-purple-light hover:text-white transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Response time */}
        <div className="text-center bg-gradient-to-br from-purple-600/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
          <p className="text-2xl mb-3">⏱️</p>
          <h2 className="font-bold text-base mb-2">Response Time</h2>
          <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
            We typically respond within <strong className="text-white">24–48 hours</strong> on business days.
            Safety-related reports are prioritized and reviewed within a few hours.
          </p>
        </div>
      </div>
    </div>
  );
}
