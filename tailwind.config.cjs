/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      mono: ["Iosevka", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "marquee": 'marquee 25s linear infinite'
      },
      keyframes: {
        "marquee": {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
