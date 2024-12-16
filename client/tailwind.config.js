/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFCE1A",
        secondary: "#0D0842",
        blackBG: "#F3F3F3",
        Favorite: "#FF5841",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-inner-spin-button': {
          "-webkit-appearance": "none",
          margin: "0",
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          "-webkit-appearance": "none",
          margin: "0",
        },
        'input[type="number"]': {
          "-moz-appearance": "textfield",
        },
      });
    },
  ],
};
