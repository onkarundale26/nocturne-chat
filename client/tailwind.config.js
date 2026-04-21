/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "surface": "#0d0d18",
        "surface-dim": "#0d0d18",
        "surface-container-lowest": "#000000",
        "surface-container-low": "#12121e",
        "surface-container": "#181826",
        "surface-container-high": "#1e1e2d",
        "surface-container-highest": "#242434",
        "surface-bright": "#2b2a3c",
        "surface-variant": "#242434",
        "on-surface": "#e9e6f7",
        "on-surface-variant": "#aba9b9",
        "primary": "#b6a0ff",
        "primary-dim": "#7e51ff",
        "primary-fixed": "#a98fff",
        "primary-fixed-dim": "#9c7eff",
        "on-primary": "#340090",
        "primary-container": "#a98fff",
        "on-primary-container": "#280072",
        "secondary": "#00affe",
        "secondary-dim": "#00a7f2",
        "on-secondary": "#002a42",
        "tertiary": "#ff716c",
        "tertiary-dim": "#ff716c",
        "on-tertiary": "#490006",
        "outline": "#757482",
        "outline-variant": "#474754",
        "error": "#ff6e84",
        "background": "#0d0d18",
        "on-background": "#e9e6f7",
        "inverse-surface": "#fcf8ff",
        "inverse-on-surface": "#555461",
        "surface-tint": "#b6a0ff"
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    }
  ],
}
