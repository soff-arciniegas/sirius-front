/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors :{
        primary: '#1E2329',
        secondary: '#06E98A',
        textPrimary: '#FFFFFF',
        textSecondary: '#9CA3AF'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};