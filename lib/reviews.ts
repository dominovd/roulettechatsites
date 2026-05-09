export interface Review {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  rating: number;       // 1–5
  ratingCount: number;
  pros: string[];
  cons: string[];
  features: { label: string; value: string | boolean }[];
  category: 'video' | 'text' | 'hybrid';
  founded: number;
  users: string;        // e.g. "10M+"
  website: string;
  image?: string;       // og image or logo
}

export const reviews: Review[] = [
  {
    slug: 'omegle',
    name: 'Omegle',
    tagline: 'The original stranger chat — now shut down',
    description:
      'Omegle was the pioneer of random text and video chatting, founded in 2009. It officially shut down in November 2023 after facing legal pressure over moderation issues. It sparked an entire genre of chat apps.',
    rating: 3.2,
    ratingCount: 4821,
    pros: ['Pioneered the genre', 'Simple interface', 'No account needed'],
    cons: ['Shut down in 2023', 'Moderation problems', 'Outdated UX'],
    features: [
      { label: 'Video chat', value: true },
      { label: 'Text chat', value: true },
      { label: 'Mobile app', value: false },
      { label: 'Gender filter', value: false },
      { label: 'Country filter', value: false },
      { label: 'Free', value: true },
      { label: 'Registration', value: false },
      { label: 'Status', value: 'Shut down' },
    ],
    category: 'hybrid',
    founded: 2009,
    users: 'N/A',
    website: 'omegle.com',
  },
  {
    slug: 'chatroulette',
    name: 'Chatroulette',
    tagline: 'The classic video roulette chat',
    description:
      'Chatroulette launched in 2009 and became an internet phenomenon. It pioneered random video chat pairing. After years of moderation issues it made a comeback with AI-powered face detection and improved safety.',
    rating: 3.5,
    ratingCount: 3102,
    pros: ['Iconic platform', 'No sign-up', 'AI face detection', 'Free'],
    cons: ['Reputation from early days', 'Fewer active users', 'Basic UI'],
    features: [
      { label: 'Video chat', value: true },
      { label: 'Text chat', value: true },
      { label: 'Mobile app', value: false },
      { label: 'Gender filter', value: false },
      { label: 'Country filter', value: false },
      { label: 'Free', value: true },
      { label: 'Registration', value: false },
      { label: 'Status', value: 'Active' },
    ],
    category: 'video',
    founded: 2009,
    users: '1M+',
    website: 'chatroulette.com',
  },
  {
    slug: 'monkey',
    name: 'Monkey',
    tagline: 'Fast random video chat for Gen Z',
    description:
      'Monkey is a mobile-first random video chat app with a strong Gen Z audience. Known for its 15-second random match timer and social features including friend lists and live streaming.',
    rating: 4.1,
    ratingCount: 5640,
    pros: ['Mobile-first', 'Young active user base', 'Social features', 'Fast matching'],
    cons: ['Mobile only', 'Some premium features behind paywall', 'Can feel chaotic'],
    features: [
      { label: 'Video chat', value: true },
      { label: 'Text chat', value: true },
      { label: 'Mobile app', value: true },
      { label: 'Gender filter', value: true },
      { label: 'Country filter', value: false },
      { label: 'Free', value: true },
      { label: 'Registration', value: true },
      { label: 'Status', value: 'Active' },
    ],
    category: 'video',
    founded: 2016,
    users: '5M+',
    website: 'monkey.app',
  },
  {
    slug: 'azar',
    name: 'Azar',
    tagline: 'Premium random video chat with filters',
    description:
      'Azar by Hyperconnect (acquired by Match Group) is a polished video chat app with strong filter options — gender, country, and interests. Popular across Asia and growing globally. Known for its high match quality.',
    rating: 4.3,
    ratingCount: 8902,
    pros: ['Excellent filters', 'High quality video', 'Large user base', 'Global reach'],
    cons: ['Premium features cost money', 'Account required', 'Ads in free version'],
    features: [
      { label: 'Video chat', value: true },
      { label: 'Text chat', value: true },
      { label: 'Mobile app', value: true },
      { label: 'Gender filter', value: true },
      { label: 'Country filter', value: true },
      { label: 'Free', value: true },
      { label: 'Registration', value: true },
      { label: 'Status', value: 'Active' },
    ],
    category: 'video',
    founded: 2014,
    users: '30M+',
    website: 'azarlive.com',
  },
  {
    slug: 'chatspin',
    name: 'ChatSpin',
    tagline: 'Feature-rich video chat with AR filters',
    description:
      'ChatSpin is a modern random video chat with AR face masks, gender and country filters, and a clean interface. Works well on both desktop and mobile browser without app install.',
    rating: 3.9,
    ratingCount: 2104,
    pros: ['AR filters', 'Works in browser', 'Gender/country filter', 'Clean UI'],
    cons: ['Filters require premium', 'Smaller user base', 'Some fake profiles'],
    features: [
      { label: 'Video chat', value: true },
      { label: 'Text chat', value: true },
      { label: 'Mobile app', value: true },
      { label: 'Gender filter', value: true },
      { label: 'Country filter', value: true },
      { label: 'Free', value: true },
      { label: 'Registration', value: false },
      { label: 'Status', value: 'Active' },
    ],
    category: 'video',
    founded: 2015,
    users: '3M+',
    website: 'chatspin.com',
  },
  {
    slug: 'emeraldchat',
    name: 'Emerald Chat',
    tagline: 'Interest-based random chat community',
    description:
      'Emerald Chat focuses on quality over quantity with an interest-matching system, group chat, and a karma/reputation system. Built for people who want more than just random pairings.',
    rating: 4.0,
    ratingCount: 1540,
    pros: ['Interest matching', 'Group chat', 'Karma system', 'Free'],
    cons: ['Smaller user base', 'Sometimes slow to match', 'Occasional outages'],
    features: [
      { label: 'Video chat', value: true },
      { label: 'Text chat', value: true },
      { label: 'Mobile app', value: false },
      { label: 'Gender filter', value: true },
      { label: 'Country filter', value: false },
      { label: 'Free', value: true },
      { label: 'Registration', value: true },
      { label: 'Status', value: 'Active' },
    ],
    category: 'hybrid',
    founded: 2018,
    users: '500K+',
    website: 'emeraldchat.com',
  },
];

export function getReview(slug: string): Review | undefined {
  return reviews.find((r) => r.slug === slug);
}

export function getRelatedReviews(slug: string, count = 3): Review[] {
  return reviews.filter((r) => r.slug !== slug).slice(0, count);
}
