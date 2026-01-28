/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DaVinci Resolve inspired dark theme
        'sf-dark': {
          950: '#0a0a0b',
          900: '#111113',
          800: '#1a1a1d',
          700: '#242428',
          600: '#2e2e33',
          500: '#3d3d44',
          400: '#52525c',
        },
        'sf-accent': {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          muted: '#1d4ed8',
        },
        'sf-success': '#22c55e',
        'sf-warning': '#eab308',
        'sf-error': '#ef4444',
        'sf-text': {
          primary: '#f4f4f5',
          secondary: '#a1a1aa',
          muted: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
