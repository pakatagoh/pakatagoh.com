/* eslint-disable no-undef */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./content/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
