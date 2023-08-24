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
        customGray: '#777E90',
        neutrals: '#23262F',
        neutrals2: '#FCFCFD'
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
        'sans': ['Poppins',  ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        pulseSize: {
          '0%': { width: '0.25rem' },
          '50%': { width: '0.5rem' },
          '100%': { width: '0.75rem' },
        }
      }

    },
  },
  plugins: [],
}
