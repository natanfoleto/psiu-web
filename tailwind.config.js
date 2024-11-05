/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'sign-in': "url('./assets/bg-sign-in.jpg')",
      },
    },
  },
  plugins: [],
}
