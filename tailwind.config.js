/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        grey: {
          100: "#E1E1E6",
          300: "#8D8D99",
          500: "#505059",
          600: "#323238",
          700: "#29292E",
          800: "#202024",
        },
        brand: {
          light: "#00B37E",
          mid: "#00875F",
        },
        warning: "#FBA94C",
        danger: "#F75A68",
        label: "#A6A1B2",
      },
      fontFamily: {
        regular: "Roboto_400Regular",
        bold: "Roboto_700Bold",
      },
    },
  },
  plugins: [],
};
