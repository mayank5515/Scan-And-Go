/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Arima: ["Arima", "sans-serif"], // Replace 'sans' if you want to use a different key
      },
    },
  },
  plugins: [],
};
