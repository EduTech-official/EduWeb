/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tourney: ['"Tourney"', ...defaultTheme.fontFamily.sans],
        IBMplex: ['"IBM Plex Sans"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        clamp: "clamp(0.5rem, 3vw, 3rem)",
      },
    },
    screens: {
      "2xl": { min: "1535px" },
      xl: { min: "1279px" },
      lg: { min: "1023px" },
      md: { min: "767px" },
      sm: { min: "639px" },
      // this Are Default Tailwind Breakpoints

      // these are custom breakpoints for the project responsive design
      // => @media (max-width: 1535px) { ... }
      min2xl: { max: "1535px" },

      // => @media (max-width: 1279px) { ... }
      minxl: { max: "1279px" },

      // => @media (max-width: 1023px) { ... }
      minlg: { max: "1023px" },

      // => @media (max-width: 767px) { ... }
      minmd: { max: "767px" },

      // => @media (max-width: 639px) { ... }
      minsm: { max: "639px" },
    },
  },
  plugins: [],
};
