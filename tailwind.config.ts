import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Spec: white #FFF7EF (warm cream), green #00D875 (vivid leaf).
        cream: {
          DEFAULT: "#FFF7EF",
          50: "#FFFBF6",
          100: "#FFF7EF",
          200: "#F7EDDF",
          300: "#EEE0CE",
        },
        forest: {
          DEFAULT: "#0B241A",
          900: "#0B241A",
          800: "#13362A",
          700: "#1C4A39",
          600: "#2F5E45",
        },
        leaf: {
          DEFAULT: "#00D875",
          600: "#00D875",
          500: "#22E086",
          400: "#3CE799",
        },
        mint: {
          50: "#EFFBF4",
          100: "#DCF7E7",
          200: "#C3F0D4",
          300: "#A6E7BE",
          400: "#7ED9A0",
          500: "#57CB82",
          600: "#32C16C",
        },
        coral: {
          DEFAULT: "#E46F4D",
          400: "#FB826A",
          300: "#FDAB9B",
          100: "#FEEAE6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        xl2: "28px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11, 36, 26, 0.04), 0 8px 24px -12px rgba(11, 36, 26, 0.12)",
        focus: "0 0 0 3px rgba(29, 147, 77, 0.25)",
      },
      transitionTimingFunction: {
        "ease-out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
