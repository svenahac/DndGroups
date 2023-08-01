/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#205cf4",
        secondary: "#FFFFFF",
        primaryGreen: "#20F44E",
        secondaryBlue: "#20C6F4",
        secondaryGreen: "#0AB12F",
      },
      spacing: {
        85: "22rem",
        100: "25rem",
        130: "30rem",
      },
    },
  },
  plugins: [],
};
