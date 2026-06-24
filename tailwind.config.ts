import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark / premium palette
        ink: {
          DEFAULT: "#0a0e1a",
          50: "#f4f6fb",
          900: "#0a0e1a",
          950: "#060912",
        },
        surface: {
          DEFAULT: "#111726",
          light: "#1a2236",
          border: "#27314a",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#e8c766",
          dark: "#b08d1f",
        },
        accent: {
          DEFAULT: "#2dd4bf",
          light: "#5eead4",
          dark: "#14b8a6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(45, 212, 191, 0.35)",
        gold: "0 0 40px -12px rgba(212, 175, 55, 0.45)",
        card: "0 20px 50px -20px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(45,212,191,0.12) 0%, rgba(10,14,26,0) 70%)",
        "gold-gradient": "linear-gradient(135deg, #e8c766 0%, #d4af37 50%, #b08d1f 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
