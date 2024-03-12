/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-purple': '#8047F8',
        'purple-light': '#EBE5F9',
        'purple-dark': '#4B2995',
        'base-yellow': '#DBAC2C',
        'yellow-light': '#F1E9C9',
        'yellow-dark': '#C47F17',
        'base-title': '#272221',
        'base-subtitle': '#403937',
        'base-label': '#8D8686',
        'base-text': '#574F4D',
        'base-card': '#F3F2F2',
        'base-button': '#E6E5E5',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        baloo2: ['"Baloo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
