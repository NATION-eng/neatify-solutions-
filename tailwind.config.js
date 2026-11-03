/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F5F7F2',
          100: '#E5EBDD', // PRD Soft sage
          200: '#D1DEC7',
          300: '#ADC4A1',
          400: '#7E9F71',
          500: '#526D55', // PRD Primary Sage
          600: '#425845',
          700: '#324234',
          800: '#233025',
          900: '#151D16',
        },
        brand: {
          leaf: '#72B743', // NS Monogram Vibrant Green
          forest: '#204632', // CleanSpace Button & Header Dark Green
          deep: '#142C1F',
          pine: '#193A27',
        },
        warm: {
          white: '#F8F7F1', // PRD Warm White
          cream: '#F4F5F0', // Neutral frame canvas
          beige: '#D8C8B2', // PRD Warm Beige
          card: '#FFFFFF',
        },
        charcoal: {
          DEFAULT: '#303B32', // PRD Charcoal
          900: '#141A15',
          800: '#222923',
          700: '#303B32',
          600: '#4D584F',
          muted: '#667067', // PRD Muted Text
          border: '#E2E7E2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 12px 36px -4px rgba(24, 31, 26, 0.08)',
        'float': '0 20px 48px -8px rgba(20, 44, 31, 0.14)',
        'subtle': '0 4px 20px -2px rgba(24, 31, 26, 0.04)',
      }
    },
  },
  plugins: [],
}
