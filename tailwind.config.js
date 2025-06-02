/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A3A2E0',
        secondary: '#9998E3',
        accent: '#A2C8E0',
        purple: '#CCA2E0',
        blue: '#A2B4E0'
      },
    },
  },
  plugins: [],
}
