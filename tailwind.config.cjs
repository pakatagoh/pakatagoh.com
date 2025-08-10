/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      typography: ({ theme }) => ({
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
                borderColor: "var(--color-neutral-700)",
              },
              pre: {
                borderRadius: "var(--radius-lg)",
                borderWidth: theme("borderWidth.DEFAULT"),
                borderColor: "var(--color-gray-300)",
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
