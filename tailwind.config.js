module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill-72': 'repeat(auto-fill, 18rem)',
      },
      outlineStyle: {
        'doen-none': 'none'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
