/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-background": "#191919",
        "card-background": "#1f1f1f",
        "score-background": "#2c2c2c",

        "primary-text": "#e1e1e1",
        "secondary-text": "#9a9a9a",

        "accent-color-900": "#f33f3f",
        "accent-color-500": "#f88c8c",
      },
      fontFamily: {
        iran: ["IRANSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
