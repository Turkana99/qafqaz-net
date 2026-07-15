/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: 'var(--color-navy)',
          blue: 'var(--color-blue)',
        },
        accent: {
          cyan: 'var(--color-cyan)',
          green: 'var(--color-green)',
        },
        text: {
          main: 'var(--color-text-main)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          card: 'var(--color-surface-card)',
          light: 'var(--color-surface-light)',
        },
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        black: 'var(--color-black)',
        'hero-description': 'var(--color-hero-description)',
        white: 'var(--color-white)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        bdo: ['"BDO Grotesk"', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-main': 'var(--gradient-main)',
        'gradient-main-reverse': 'var(--gradient-primary-reverse)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
