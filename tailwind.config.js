/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#7FB069',
        'brand-bone': '#F5F5DC',
      },
      fontSize: {
        'h4': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
