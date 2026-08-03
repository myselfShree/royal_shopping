/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#8B0000',
        'brand-accent': '#D4AF37',
      },
      boxShadow: {
        luxe: '0 25px 60px -25px rgba(17, 17, 17, 0.2)',
      },
    },
  },
  plugins: [],
}

