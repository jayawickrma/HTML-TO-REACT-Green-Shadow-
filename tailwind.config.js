/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discordGray: '#2c2f33', // Custom name for color
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'], // Optional: Customizes scrollbar styles
  },
}

