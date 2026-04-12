/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#60A5FA',
        accent: '#14B8A6',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #4F46E5, #60A5FA)',
        'gradient-soft': 'linear-gradient(135deg, #3B82F6, #14B8A6)',
        'gradient-light': 'linear-gradient(135deg, #FFFFFF, #EFF6FF)',
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
}
