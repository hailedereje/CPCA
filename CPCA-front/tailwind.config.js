/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        green: {
          1: "#008080",
          2: "#20B2AA",
        },
      },
      transitionProperty: {
        slide: "transform, opacity",
      },
      transitionDuration: {
        500: "500ms",
      },
      transitionTimingFunction: {
        "ease-in-out": "ease-in-out",
      },
      animation: {
        bounce: "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tw-elements-react/dist/plugin.cjs"),
  ],
  daisyui: {
    themes: ["dracula", "light", "cupcake"],
  },
};
