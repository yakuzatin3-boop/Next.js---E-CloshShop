import type { Config } from 'tailwindcss'

/**
 * Design tokens for E-Closh Shop.
 *
 * Tailwind v4 is CSS-first, but a JS config is wired in via `@config` in
 * `src/app/globals.css` so the whole theme lives in one discoverable place.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Single accent colour: a warm clay used sparingly for CTAs, links and
      // badges. Neutrals use Tailwind's stone scale (warm, fashion-forward).
      colors: {
        accent: {
          50: '#fdf6f3',
          100: '#fbe9e3',
          200: '#f7d6ca',
          300: '#f0b8a4',
          400: '#e69173',
          500: '#db6f4a',
          600: '#c95a34',
          700: '#a74628',
          800: '#863a26',
          900: '#6d3222',
          950: '#3a180f',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1400px',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(28 25 23 / 0.05)',
        soft: '0 4px 24px -8px rgb(28 25 23 / 0.14)',
        raised: '0 12px 40px -12px rgb(28 25 23 / 0.22)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.25s ease-out',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-in-left': 'slide-in-left 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

export default config