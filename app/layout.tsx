import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://roulettechatsites.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
