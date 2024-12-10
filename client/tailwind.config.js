/** @type {import('tailwindcss').Config} */

import { themeColor } from "./src/components/themeColor";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["KoHo", "sans-serif"],
        content: ["Open Sans", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        roboto: ["Roboto Condensed", "sans-serif"],
        lora: ['Lora', 'serif'], 


      },
      colors: {
        "brand-blue": `#${themeColor}`,
        "ui-bg": "#f1f5f1",
        "customColor":"ffffff",
        "customC":"#F9E4BC",
      },
      boxShadow: {
        brand: "0 2px 5px",
      },
    },
  },
  plugins: [require("daisyui"),'prettier-plugin-tailwindcss'],
};
