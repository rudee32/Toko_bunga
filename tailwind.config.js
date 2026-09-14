/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ad8e70",
        "primary-light": "#c4a98c",
        "primary-dark": "#8a6f52",
        cream: "#faf6f1",
        forest: "#2f4f3f",
        gold: "#d4af37",
        dark: "#010101",
        "dark-soft": "#12100d",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        glow: "0 0 40px 0 rgba(173, 142, 112, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      perspective: {
        none: "none",
        1000: "1000px",
        2000: "2000px",
      },
    },
  },
  plugins: [],
};
