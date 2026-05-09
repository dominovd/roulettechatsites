import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#08080f',
          2: '#0e0e1c',
          3: '#13132a',
        },
        purple: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
        },
        pink: {
          DEFAULT: '#ec4899',
          light: '#f472b6',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#38bdf8',
        },
        muted: '#8b8aa0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
        'grad-text': 'linear-gradient(90deg, #a78bfa, #f472b6, #38bdf8)',
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        blobFloat: 'blobFloat 14s ease-in-out infinite alternate',
        pulse2: 'pulse2 2s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '200%' },
        },
        blobFloat: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(30px,40px) scale(1.08)' },
        },
        pulse2: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(74,222,128,.5)' },
          '50%': { boxShadow: '0 0 0 6px rgba(74,222,128,0)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(124,58,237,.4)',
        'glow-lg': '0 0 80px rgba(124,58,237,.25)',
      },
    },
  },
  plugins: [],
};

export default config;
