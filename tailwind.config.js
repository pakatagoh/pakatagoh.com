/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./content/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              "blockquote p:first-of-type::before": {
                content: "",
              },
              "blockquote p:last-of-type::after": {
                content: "",
              },
              "code::before": {
                content: '""',
              },
              "code::after": {
                content: '""',
              },
              pre: {
                padding: 0,
                boxShadow: theme("boxShadow.md"),
                borderRadius: theme("borderRadius.lg"),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
