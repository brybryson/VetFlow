/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}"], // Ensure this correctly points to your HTML files
  theme: {
    extend: {
      colors: {
        'olive-green': '#75A450',
        'dark-charcoal': '#343434',
        'light-goldenrod': '#E1D66D',
        'ghost-white': '#FDFDFD',
        'pastel-green': '#B4EA89',
        'medium-dark-green': '#5E8B3B',
        'active-green': '#3C8800',

      },
      fontFamily: {
        'inter': ['Inter Regular', 'sans-serif'], // Fallback to sans-serif if not available
        'inter-medium': ['Inter Medium', 'sans-serif'], // Fallback to sans-serif if not available
      },
      borderColor: {
        'medium-dark-green': '#5E8B3B',
      }
    },
  },
  plugins: [],
};
