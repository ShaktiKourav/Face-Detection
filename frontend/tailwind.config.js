/** @type {import('tailwindcss').Config} */

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {

    extend: {

      fontFamily: {

        outfit: ["Outfit", "sans-serif"],

      },

      colors: {

        background: "#050816",

        glass: "rgba(255,255,255,.08)",

        primary: "#7c3aed",

        secondary: "#06b6d4",

        accent: "#8b5cf6",

      },

      boxShadow: {

        glass:
          "0 10px 45px rgba(124,58,237,.18)",

        glow:
          "0 0 45px rgba(124,58,237,.35)",

      },

      borderRadius: {

        xl2: "22px",

        xl3: "30px",

      },

      backdropBlur: {

        glass: "18px",

      },

      animation: {

        float: "float 6s ease-in-out infinite",

        fade: "fade .7s ease",

        pulseSlow: "pulse 5s infinite",

      },

      keyframes: {

        float: {

          "0%,100%": {

            transform: "translateY(0)",

          },

          "50%": {

            transform: "translateY(-18px)",

          },

        },

        fade: {

          from: {

            opacity: "0",

            transform: "translateY(25px)",

          },

          to: {

            opacity: "1",

            transform: "translateY(0)",

          },

        },

      },

    },

  },

  plugins: [],

};
