/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spinColor: {
          '0%': { transform: 'rotate(0deg)', color: 'blue' },
          '50%': { transform: 'rotate(180deg)', color: 'purple' },
          '100%': { transform: 'rotate(360deg)', color: 'blue' },
        }
      },
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        'bounce-s': 'bounce 4s infinite linear',
        'spin-color': "spinColor 0.6s infinite linear"
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".hidden-left": {
          transform: "translateX(-50%)",
          opacity: "0",
        },
        ".hidden-right": {
          transform: "translateX(50%)",
          opacity: "0",
        },
        ".hidden-bottom": {
          transform: "translateY(50%)",
          opacity: "0",
        },
        ".show": {
          transform: "translate3d(0, 0, 0)!important",
          opacity: " 1!important",
        },
      });
    }),
  ],
};
