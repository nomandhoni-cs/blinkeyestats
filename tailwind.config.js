/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FE4C55',
          dark: '#e43038',
          light: '#ff6b73',
        }
      }
    },
  },
  plugins: [],
};