// const {
//   green,
// } = require("react-native-reanimated/lib/typescript/reanimated2/Colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["BreeSerif"],
        sub1: ["GowunBatang"],
        sub2: ["GowunBatang"],
      },
      colors: {
        primary: "#E3E3E1",
        green: "#6AAA64",
        yellow: "#D1B036",
      },
    },
  },
  plugins: [],
};
