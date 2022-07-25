/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': '#192841',
        'secondary': '#8c9ea3',
        'button-bg': '#1e3f66',
        'button-bg-hover': '#1c2e4a',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
