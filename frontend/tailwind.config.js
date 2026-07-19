/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        // Cinematic blacks
        void:  '#040404',
        ink:   '#080808',
        pitch: '#0d0d0d',
        onyx:  '#111111',
        coal:  '#161616',
        ash:   '#1c1c1c',
        iron:  '#242424',
        smoke: '#2e2e2e',
        // Crimson reds
        crimson: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        // Text
        ghost: '#f8f8f8',
        mist:  '#a0a0a0',
        fog:   '#606060',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-sm':  '0 0 12px rgba(225, 29, 72, 0.25)',
        'glow':     '0 0 24px rgba(225, 29, 72, 0.3)',
        'glow-lg':  '0 0 48px rgba(225, 29, 72, 0.2)',
        'card':     '0 4px 24px rgba(0,0,0,0.6)',
        'modal':    '0 8px 64px rgba(0,0,0,0.9)',
        'inner-red':'inset 0 0 0 1px rgba(225,29,72,0.3)',
      },
      backgroundImage: {
        'cinematic': 'radial-gradient(ellipse at 20% 50%, rgba(225,29,72,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(225,29,72,0.05) 0%, transparent 50%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
        'red-gradient': 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
        'dark-gradient': 'linear-gradient(180deg, #111111 0%, #080808 100%)',
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in':   'fade-in 0.3s ease-out',
        'slide-up':  'slide-up 0.4s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(225,29,72,0)' },
          '50%':       { boxShadow: '0 0 0 6px rgba(225,29,72,0.15)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
