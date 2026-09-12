/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bis: {
          blue: '#0B2545',
          navy: '#134074',
          accent: '#0066CC',
          gold: '#EE964B',
          saffron: '#F95738',
          light: '#EEF4F8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
