import type { Metadata } from 'next';
import Link from 'next/link';
import { OnlineCounter } from '@/components/OnlineCounter';

export const metadata: Metadata = {
  title: 'RouletteChat – Meet Random People via Free Video Chat',
  description:
    'Instant random video chat with real people from 180+ countries. No sign-up required. Connect face-to-face in seconds.',
  alternates: { canonical: 'https://roulettechatsites.com' },
};

const FEATURES = [
  { icon: '⚡', title: 'Instant Matching', desc: 'Connected to a real person in under 3 seconds. No waiting rooms, no loading screens.' },
  { icon: '🌍', title: '180+ Countries', desc: 'Chat with locals or explore the world. Filter by country or go totally random.' },
  { icon: '🎯', title: 'Smart Filters', desc: 'Filter by gender and location to find conversations that matter to you.' },
  { icon: '🛡️', title: 'Safe & Moderated', desc: 'AI-powered moderation runs 24/7. Report and skip any user instantly.' },
  { icon: '📱', title: 'Works on Any Device', desc: 'Full HD video chat right in your browser — desktop, tablet, or mobile.' },
  { icon: '🎲', title: 'True Randomness', desc: 'Every next chat is a surprise. Press Next and the world opens up again.' },
];

const STATS = [
  { value: '2M+', label: 'Monthly active users' },
  { value: '180+', label: 'Countries connected' },
  { value: '50M+', label: 'Chats completed' },
  { value: '<3s', label: 'Average match time' },
];

const HOW_STEPS = [
  { step: '1', title: 'Click Start', desc: 'Hit "Start Video Chat" and allow camera access. Ready in one tap.' },
  { step: '2', title: 'Get Matched', desc: 'Our engine pairs you with a real person from anywhere in the world.' },
  { step: '3', title: 'Chat or Skip', desc: "Love the match? Keep talking. Don't feel it? Hit Next instantly." },
];

const TESTIMONIALS = [
  { quote: 'I had no idea what to expect the first time. Within two minutes I was laughing with a guy from Brazil. That pretty much sums up the whole experience.', name: 'Sophie T.', city: 'Amsterdam' },
  { quote: 'I use it to practice Spanish and just to unwind. Way better than scrolling. You actually talk to a real person who talks back.', name: 'Ethan R.', city: 'Toronto' },
  { quote: 'Every session is different. That is honestly the best part. You never know if the next person will be a student, a musician or someone from a country you have never heard of.', name: 'Lucia M.', city: 'Lisbon' },
  { quote: 'I was sceptical about random video chat but the moderation is solid. I felt safe from the very first chat and that matters a lot.', name: 'Aisha K.', city: 'Dubai' },
  { quote: 'Perfect for when you are bored and want something real. Not just a feed of posts but an actual conversation.', name: 'Noah W.', city: 'Cape Town' },
  { quote: 'I have made two genuine friends through this. We still message each other outside the platform. I never expected that.', name: 'Diana P.', city: 'Warsaw' },
];

const FAQ = [
  {
    q: 'What is RouletteChat?',
    a: 'RouletteChat is a free random video chat platform that instantly connects you with real people from over 180 countries. No profiles, no swiping — just genuine face-to-face conversations.',
  },
  {
    q: 'Is RouletteChat completely free?',
    a: 'Yes. You can start video chatting right away at no cost. No credit card needed, no hidden fees. Creating an account unlocks extra features like gender and country filters.',
  },
  {
    q: 'Do I need to sign up to use RouletteChat?',
    a: 'No registration is required to start chatting. Simply open the site, click "Start Video Chat", and you are connected within seconds.',
  },
  {
    q: 'Is RouletteChat safe?',
    a: 'Safety is our top priority. The platform uses AI-powered moderation that runs 24/7 to detect and remove inappropriate content. You can also skip or report any user instantly with one click.',
  },
  {
    q: 'Which devices does RouletteChat work on?',
    a: 'RouletteChat works entirely in your browser — no app download required. It is fully compatible with desktop, tablet, and mobile devices on Chrome, Safari, Firefox, and Edge.',
  },
  {
    q: 'Can I filter chats by gender or country?',
    a: 'Yes. Gender and country filters are available to registered users. Sign up for free to unlock these options and find conversations that match your preferences.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 pt-28 pb-16">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(124,58,237,.18)_0%,transparent_70%)] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-purple-600/15 border border-purple-500/35 rounded-full px-4 py-1.5 text-xs font-semibold text-purple-300 mb-7 animate-fadeUp">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot" />
          <OnlineCounter base={8241} /> people online now
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[1.07] tracking-[-2px] mb-5 animate-fadeUp [animation-delay:100ms]">
          Meet Someone<br />
          <span className="gradient-text">Real. Right Now.</span>
        </h1>

        <p className="max-w-lg text-lg text-muted font-normal mb-9 animate-fadeUp [animation-delay:200ms]">
          Instant random video chat with real people from 180+ countries.
          No boring profiles — just genuine conversations, face to face.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14 animate-fadeUp [animation-delay:300ms]">
          <Link
            href="#chat"
            className="inline-flex items-center gap-2.5 bg-brand text-white font-bold text-base px-8 py-4 rounded-[14px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.27A1 1 0 0121 8.62V15.4a1 1 0 01-1.45.89L15 14M4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
            </svg>
            Start Video Chat — Free
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white font-semibold text-[0.95rem] px-7 py-4 rounded-[14px] hover:bg-white/[0.07] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z" /></svg>
            How it works
          </Link>
        </div>

        {/* Hero stats */}
        <div className="flex flex-wrap justify-center gap-10 animate-fadeUp [animation-delay:400ms]">
          {[
            { value: '180+', label: 'Countries' },
            { value: '2M+', label: 'Monthly users' },
            { value: '100%', label: 'Free to start' },
            { value: '<3s', label: 'Match speed' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <strong className="block text-[1.6rem] font-black text-white">{value}</strong>
              <span className="text-[0.8rem] text-muted font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE CHAT ── */}
      <section id="chat" className="px-5 pb-20 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-7">
            <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black tracking-tight">
              Jump In &amp; Start Meeting People
              <span className="inline-flex items-center gap-1.5 ml-3 bg-green-400/10 border border-green-400/25 rounded-full px-3 py-1 text-xs font-semibold text-green-400 align-middle">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot" /> Live
              </span>
            </h2>
            <p className="text-muted text-[0.95rem] mt-2">
              No sign-up required to try. Create a free account to unlock filters and save your matches.
            </p>
          </div>

          {/* Registration banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-purple-600/20 to-pink-500/15 border border-purple-500/30 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[11px] bg-brand flex items-center justify-center text-lg flex-shrink-0">⚡</div>
              <div>
                <strong className="block text-sm font-bold">Unlock Gender &amp; Country Filters</strong>
                <span className="text-xs text-muted">Start chatting free — no sign-up required.</span>
              </div>
            </div>
            <Link
              href="#chat"
              className="bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-px transition-all shadow-glow whitespace-nowrap"
            >
              Start Chatting →
            </Link>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['All genders', 'Worldwide', 'Safe & moderated'].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-3.5 py-1.5 text-xs font-medium text-muted"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Iframe */}
          <div className="iframe-shell">
            <iframe
              src="https://callmechat.com"
              allow="camera; microphone; autoplay; fullscreen"
              allowFullScreen
              title="Live random video chat powered by CallMeChat"
              className="w-full h-[580px] md:h-[650px] block border-0 bg-[#111]"
              loading="lazy"
            />
          </div>

          {/* Post-iframe nudge */}
          <p className="text-center text-sm text-muted mt-5">
            💬 Want filters &amp; more features?{' '}
            <Link
              href="#chat"
              className="text-purple-light font-semibold hover:text-white transition-colors"
            >
              Start chatting now
            </Link>{' '}
            — no sign-up required.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-5 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 bg-gradient-to-r from-purple-600/10 to-pink-500/[0.08] border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <strong className="block text-[clamp(1.8rem,4vw,2.8rem)] font-black gradient-text">{value}</strong>
              <span className="text-xs text-muted font-medium mt-1 block">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL: WHY RANDOM CHAT ── */}
      <section className="px-5 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Why It Feels Different</p>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black tracking-tight mb-5">
                Random Video Chat Is Not Like Anything Else Online
              </h2>
              <p className="text-muted text-[0.95rem] leading-relaxed mb-5">
                Social media gives you a feed of people you already know. Dating apps make you swipe through profiles for hours. Random video chat does the opposite. You click once and you are face to face with a real stranger from anywhere in the world. No profile. No small talk opener. Just two people figuring out if they click.
              </p>
              <p className="text-muted text-[0.95rem] leading-relaxed mb-5">
                That spontaneity is what makes free random video chat so hard to put down. After Omegle shut down in 2023, millions of people went looking for an Omegle alternative that kept the same energy but felt safer and more modern. RouletteChat was built exactly for that gap. Instant webcam chat, real people, zero friction.
              </p>
              <p className="text-muted text-[0.95rem] leading-relaxed">
                Whether you call it roulette chat, stranger chat, or anonymous video chat, the idea is the same. You show up, someone else shows up, and something real happens. Sometimes it lasts 30 seconds. Sometimes you talk for two hours. You never know, and that is kind of the point.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {[
                { icon: '🎲', title: 'No algorithm, no feed', desc: 'A random cam chat puts you in front of a live person right now. Not a post from three days ago. Not a curated highlight reel. A real human, live on camera.' },
                { icon: '🌐', title: 'The world shrinks fast', desc: 'You might talk to a teacher in Japan, a student in Brazil, or a musician in Nigeria, all in the same evening. Free video chat with strangers is the fastest way to see how small the world actually is.' },
                { icon: '💬', title: 'Conversation over content', desc: 'Cam to cam chat forces both people to actually talk. There is no content to hide behind. It is just two people having a real exchange, which is rarer online than it sounds.' },
                { icon: '🔒', title: 'Anonymous by default', desc: 'You do not have to use your real name, link a phone number, or let anyone follow you. Talk to strangers online without leaving a trace. Close the tab and the chat is gone.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-purple-600/20 border border-purple-500/25 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="font-bold text-[0.9rem] mb-1">{title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="px-5 py-20">
        <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Why RouletteChat</p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-3">Built for Real Connections</h2>
        <p className="text-center text-muted text-[0.95rem] max-w-md mx-auto mb-14">
          Everything you need to meet interesting people — nothing you don&apos;t.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-glass p-7 transition-all duration-200 hover:-translate-y-1">
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-[1rem] mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="px-5 py-20 scroll-mt-20">
        <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Simple as 1–2–3</p>
        <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-3">How RouletteChat Works</h2>
        <p className="text-center text-muted text-[0.95rem] max-w-md mx-auto mb-14">
          Start chatting in seconds — no sign-up, no setup, no nonsense.
        </p>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {HOW_STEPS.map(({ step, title, desc }) => (
            <div key={step} className="px-4">
              <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center text-xl font-black mx-auto mb-5 shadow-glow">
                {step}
              </div>
              <h3 className="font-bold text-[1rem] mb-2">{title}</h3>
              <p className="text-muted text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-5 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Real People, Real Chats</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, city }) => (
              <div key={name} className="card-glass rounded-2xl p-6 flex flex-col gap-4">
                <p className="text-muted text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-xs font-black text-white flex-shrink-0">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{name}</p>
                    <p className="text-muted text-xs">{city}</p>
                  </div>
                  <div className="ml-auto text-amber-400 text-xs">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-5 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">FAQ</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group card-glass rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[0.95rem] select-none list-none">
                  {q}
                  <span className="text-purple-light flex-shrink-0 transition-transform duration-200 group-open:rotate-45">＋</span>
                </summary>
                <p className="px-6 pb-5 text-sm text-muted leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-5 pb-20">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-purple-600/15 to-pink-500/12 border border-purple-500/25 rounded-3xl p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-black tracking-tight mb-3">
            Ready to Meet Your<br />
            <span className="gradient-text">Next Connection?</span>
          </h2>
          <p className="text-muted text-[0.95rem] mb-8">
            Jump into the chat — no sign-up, no credit card, instant connection.
          </p>
          <Link
            href="#chat"
            className="inline-flex items-center gap-2 bg-brand text-white font-bold text-base px-8 py-4 rounded-[14px] shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 transition-all"
          >
            Start Chatting Free →
          </Link>
          <p className="text-xs text-muted mt-4">100% free. No credit card. Start in seconds.</p>
        </div>
      </section>

      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'RouletteChat',
            url: 'https://roulettechatsites.com',
            description: 'Free random video chat with people from 180+ countries.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://roulettechatsites.com/reviews?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />
    </>
  );
}
