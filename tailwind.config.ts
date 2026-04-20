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
        navy: {
          DEFAULT: '#0B2D5E',
          light: '#1A4080',
          dark: '#071D3D',
          50: '#EFF4FF',
          100: '#D6E4FF',
          200: '#AECBFF',
        },
        gold: {
          DEFAULT: '#C8963E',
          light: '#E5B668',
          dark: '#A37830',
          muted: 'rgba(200,150,62,0.12)',
          bg: '#FEF7EC',
        },
        surface: {
          DEFAULT: '#F5F7FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        // Keep ink for dark sections (footer, navy blocks)
        ink: {
          DEFAULT: '#08080A',
          surface: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          hover: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-light': 'linear-gradient(135deg, #FFFFFF 55%, #EFF4FF 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.1)',
        'navy': '0 8px 32px rgba(11,45,94,0.2)',
        'gold': '0 8px 32px rgba(200,150,62,0.25)',
        'nav': '0 1px 0 rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
