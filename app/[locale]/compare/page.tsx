import type { Metadata } from 'next';
import Link from 'next/link';
import { reviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'Compare Random Video Chat Sites – Side by Side',
  description:
    'Compare Omegle, Chatroulette, Azar, Monkey and more side by side. Features, safety, user count, and ratings at a glance.',
};

export default function ComparePage({ params: { locale } }: { params: { locale: string } }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const cols = reviews.slice(0, 5); // top 5 in compare table

  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Side by Side</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-4">
            Compare <span className="gradient-text">Video Chat Sites</span>
          </h1>
          <p className="text-muted text-[0.95rem] max-w-lg mx-auto">
            See all features side by side. Find the platform that fits your needs in seconds.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-xs text-muted font-semibold uppercase tracking-wider py-4 pr-4 min-w-[140px]">Feature</th>
                {cols.map((r) => (
                  <th key={r.slug} className="text-center py-4 px-3 min-w-[130px]">
                    <Link href={`${prefix}/reviews/${r.slug}`} className="font-black text-sm hover:text-purple-light transition-colors">
                      {r.name}
                    </Link>
                    <div className="text-amber-400 text-xs mt-1">{'★'.repeat(Math.round(r.rating))} {r.rating.toFixed(1)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Users */}
              <tr className="border-t border-white/[0.06]">
                <td className="text-sm text-muted py-3.5 pr-4">👥 Monthly Users</td>
                {cols.map((r) => (
                  <td key={r.slug} className="text-center text-sm font-semibold py-3.5 px-3">{r.users}</td>
                ))}
              </tr>
              {/* Founded */}
              <tr className="border-t border-white/[0.06]">
                <td className="text-sm text-muted py-3.5 pr-4">📅 Founded</td>
                {cols.map((r) => (
                  <td key={r.slug} className="text-center text-sm py-3.5 px-3">{r.founded}</td>
                ))}
              </tr>
              {/* Dynamic feature rows */}
              {['Video chat', 'Text chat', 'Mobile app', 'Gender filter', 'Country filter', 'Free', 'Registration'].map((feat) => (
                <tr key={feat} className="border-t border-white/[0.06]">
                  <td className="text-sm text-muted py-3.5 pr-4">{feat}</td>
                  {cols.map((r) => {
                    const f = r.features.find((x) => x.label === feat);
                    return (
                      <td key={r.slug} className="text-center py-3.5 px-3">
                        {f?.value === true
                          ? <span className="text-green-400 font-bold">✓</span>
                          : f?.value === false
                          ? <span className="text-red-400">✗</span>
                          : <span className="text-muted text-xs">{String(f?.value ?? '—')}</span>
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-2xl p-10">
          <h2 className="font-black text-2xl mb-3">Best of all? Try RouletteChat free</h2>
          <p className="text-muted mb-6">Fast matching, global reach, zero cost to start.</p>
          <a
            href="https://callmechat.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold px-8 py-3.5 rounded-xl shadow-glow hover:opacity-90 transition-opacity"
          >
            Start Chatting Free →
          </a>
        </div>
      </div>
    </div>
  );
}
