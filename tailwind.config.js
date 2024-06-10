/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        orange: colors.orange,
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp", "@tailwindcss/forms", "@tailwindcss/aspect-ratio", "tailwindcss/colors"),
  ],
};
