import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://roulettechatsites.com'),
  verification: {
    google: 'A9b_e0NLvrPSFKTm6mOipwnem5yfcY3GEJqoxAZQIDY',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
