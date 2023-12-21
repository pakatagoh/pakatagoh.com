/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  corePlugins: {
    aspectRatio: false,
  },
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
              ".dark pre": {
                borderWidth: theme("borderWidth.DEFAULT"),
                borderColor: theme("colors.neutral.700"),
              },
              pre: {
                boxShadow: theme("boxShadow.md"),
                borderRadius: theme("borderRadius.lg"),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
