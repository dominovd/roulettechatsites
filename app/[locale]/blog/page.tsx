import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog – Random Chat Tips, Reviews & News | RouletteChat',
  description: 'Tips for better random video chats, platform reviews, safety guides, and the latest news from the RouletteChat team.',
  alternates: { canonical: 'https://roulettechatsites.com/blog' },
};

const POSTS = [
  {
    slug: 'omegle-alternatives-2026',
    category: 'Guides',
    date: 'April 12, 2026',
    title: 'Best Omegle Alternatives in 2026 (Tested & Ranked)',
    excerpt: 'Omegle shut down in 2023, but the world of random video chat is alive and well. We tested 12 alternatives so you can find the best one for you.',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-stay-safe-random-video-chat',
    category: 'Safety',
    date: 'March 28, 2026',
    title: 'How to Stay Safe on Random Video Chat Sites',
    excerpt: 'Random video chat is exciting — but it comes with risks. Here are the essential safety tips every user should know before their first chat.',
    readTime: '5 min read',
  },
  {
    slug: 'chatroulette-vs-azar',
    category: 'Reviews',
    date: 'March 5, 2026',
    title: 'Chatroulette vs Azar: Which Is Better in 2026?',
    excerpt: 'Two giants of random video chat go head-to-head. We compare features, user base, moderation, and overall experience.',
    readTime: '7 min read',
  },
  {
    slug: 'random-chat-conversation-tips',
    category: 'Tips',
    date: 'February 18, 2026',
    title: '10 Tips for Having Great Conversations with Strangers',
    excerpt: 'Meeting random people online can feel awkward. These proven conversation starters and techniques will help you have better chats every time.',
    readTime: '4 min read',
  },
  {
    slug: 'video-chat-history',
    category: 'Deep Dive',
    date: 'January 30, 2026',
    title: 'The History of Random Video Chat: From Omegle to Today',
    excerpt: 'How did random chat go from a teenager\'s experiment to a global phenomenon? We trace the full story from 2009 to the present.',
    readTime: '8 min read',
  },
  {
    slug: 'best-random-chat-for-language-learning',
    category: 'Guides',
    date: 'January 10, 2026',
    title: 'Using Random Video Chat to Learn a Language Faster',
    excerpt: 'Native speakers are the best teachers. Here is how to use random video chat platforms to supercharge your language learning.',
    readTime: '5 min read',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Guides: 'text-purple-light bg-purple-600/15 border-purple-500/25',
  Safety: 'text-green-400 bg-green-400/10 border-green-400/20',
  Reviews: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Tips: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'Deep Dive': 'text-pink-400 bg-pink-400/10 border-pink-400/20',
};

export default function BlogPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Blog</p>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight mb-4">
            Tips, Reviews &<br />
            <span className="gradient-text">Chat Guides</span>
          </h1>
          <p className="text-muted text-[0.95rem] max-w-lg mx-auto">
            Everything you need to know about random video chat — from platform reviews to safety advice and conversation tips.
          </p>
        </div>

        {/* Featured post */}
        <div className="card-glass rounded-2xl p-8 mb-6 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_COLORS[POSTS[0].category]}`}>
              {POSTS[0].category}
            </span>
            <span className="text-xs text-muted">★ Featured</span>
          </div>
          <h2 className="font-black text-xl mb-3">{POSTS[0].title}</h2>
          <p className="text-muted text-sm leading-relaxed mb-5">{POSTS[0].excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">{POSTS[0].date} · {POSTS[0].readTime}</span>
            <Link
              href={`/blog/${POSTS[0].slug}`}
              className="text-sm font-semibold text-purple-light hover:text-white transition-colors"
            >
              Read article →
            </Link>
          </div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {POSTS.slice(1).map((post) => (
            <div key={post.slug} className="card-glass rounded-2xl p-6 flex flex-col">
              <span className={`self-start text-xs font-bold px-3 py-1 rounded-full border mb-4 ${CATEGORY_COLORS[post.category] ?? 'text-muted bg-white/5 border-white/10'}`}>
                {post.category}
              </span>
              <h2 className="font-bold text-[0.95rem] mb-2 flex-1">{post.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-muted">{post.date} · {post.readTime}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-purple-light hover:text-white transition-colors"
                >
                  Read →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
