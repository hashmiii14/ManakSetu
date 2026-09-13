/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#b8d6ec',
          300: '#8ebfe2',
          400: '#4895ce',
          500: '#1b6ca8',
          600: '#135485',
          700: '#0d3b66', // Deep Institutional Blue
          800: '#0a2d4e',
          900: '#072644', // Dark Navy
          950: '#041628',
        },
        saffron: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        bisgreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov-sm': '0 1px 2px 0 rgba(13, 59, 102, 0.05)',
        'gov': '0 1px 3px 0 rgba(13, 59, 102, 0.08), 0 1px 2px -1px rgba(13, 59, 102, 0.06)',
        'gov-md': '0 4px 6px -1px rgba(13, 59, 102, 0.1), 0 2px 4px -2px rgba(13, 59, 102, 0.08)',
        'gov-modal': '0 20px 25px -5px rgba(13, 59, 102, 0.15), 0 8px 10px -6px rgba(13, 59, 102, 0.1)',
      }
    },
  },
  plugins: [],
}
