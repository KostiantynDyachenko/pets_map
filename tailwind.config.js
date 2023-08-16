/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
        heading: '#27233A',
        subHeading: '#4A4658',
        customGreen: '#67BB8A33',
        customGreenDark: '#67BB8A',
      },
      spacing: {
        '7.5': '1.875rem',
        '30': '7.5rem',
        '35': '8.75rem',
        '84': '21rem',
        '90': '22.5rem',
        '175': '43.75rem',
      },
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}