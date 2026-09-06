/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#05070a',
          900: '#0a0e14',
          800: '#10141c',
          700: '#171c26',
          600: '#232a38',
          500: '#333c4e',
        },
        electric: {
          DEFAULT: '#00c2ff',
          50: '#e6faff',
          100: '#ccf4ff',
          200: '#99e9ff',
          300: '#5ddbff',
          400: '#20c9ff',
          500: '#00b4ff',
          600: '#0090d6',
          700: '#0071ab',
          800: '#065786',
          900: '#0b4569',
        },
        ember: {
          DEFAULT: '#ff7a1a',
          50: '#fff4ec',
          100: '#ffe4cc',
          200: '#ffc494',
          300: '#ff9f5c',
          400: '#ff8736',
          500: '#ff7a1a',
          600: '#f05c05',
          700: '#c74506',
          800: '#9e360c',
          900: '#7f2e0d',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        sans: ['"Rajdhani"', '"Segoe UI"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0,194,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.06) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(0,194,255,0.18), transparent 60%)',
        'ember-glow':
          'radial-gradient(circle at 50% 100%, rgba(255,122,26,0.18), transparent 60%)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0,194,255,0.35), 0 0 60px rgba(0,194,255,0.12)',
        'glow-orange': '0 0 20px rgba(255,122,26,0.35), 0 0 60px rgba(255,122,26,0.12)',
        'glow-blue-lg': '0 0 40px rgba(0,194,255,0.45), 0 0 100px rgba(0,194,255,0.18)',
        glass: '0 8px 32px rgba(0,0,0,0.45)',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'diagnostic-in': 'diagnostic-in 0.2s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', filter: 'blur(40px)' },
          '50%': { opacity: '1', filter: 'blur(60px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'diagnostic-in': {
          '0%': { opacity: '0.6', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
