/* eslint-disable no-undef */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./content/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
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
