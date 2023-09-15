/** @type {import('tailwindcss').Config} */
const FormKitVariants = require("@formkit/themes/tailwindcss");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./tailwind-theme.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [FormKitVariants],
};
