/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        'body-dark': '#121212', // You can adjust this color as needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // This enables dark mode
};
