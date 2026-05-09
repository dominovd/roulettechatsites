import Link from 'next/link';
import { Review } from '@/lib/reviews';
import { cn } from '@/lib/cn';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-amber-400 text-sm">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={rating >= star ? 'opacity-100' : rating >= star - 0.5 ? 'opacity-60' : 'opacity-20'}>
            ★
          </span>
        ))}
      </div>
      <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  video:  'bg-purple-500/10 text-purple-300 border-purple-500/20',
  text:   'bg-cyan-500/10  text-cyan-300  border-cyan-500/20',
  hybrid: 'bg-pink-500/10  text-pink-300  border-pink-500/20',
};

export default function ReviewCard({ review, locale }: { review: Review; locale: string }) {
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Link
      href={`${prefix}/reviews/${review.slug}`}
      className={cn(
        'card-glass block p-6 transition-all duration-200 hover:-translate-y-1',
        'hover:shadow-[0_0_40px_rgba(124,58,237,.15)]'
      )}
    >
      {/* Header: name + category */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-bold text-lg text-white leading-tight">{review.name}</h3>
        <span className={cn('text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0', CATEGORY_COLORS[review.category])}>
          {review.category}
        </span>
      </div>

      {/* Rating row */}
      <div className="flex items-center gap-2 mb-1">
        <StarRating rating={review.rating} />
        <span className="text-xs text-muted">{review.ratingCount.toLocaleString()} reviews</span>
      </div>

      {/* Tagline */}
      <p className="text-muted text-sm mb-4 leading-relaxed">{review.tagline}</p>

      {/* Quick feature pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {review.features
          .filter((f) => f.value === true)
          .slice(0, 4)
          .map((f) => (
            <span
              key={f.label}
              className="text-[0.68rem] font-medium px-2 py-0.5 rounded-md bg-white/[0.05] text-muted border border-white/[0.06]"
            >
              ✓ {f.label}
            </span>
          ))}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs text-muted border-t border-white/[0.06] pt-3">
        <span>👥 {review.users} users</span>
        <span>📅 Since {review.founded}</span>
        <span className="text-purple-light font-semibold">Read review →</span>
      </div>
    </Link>
  );
}
