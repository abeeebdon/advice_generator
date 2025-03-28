import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enables class-based dark mode,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        primary: "hsl(193, 38%, 86%)",
        secondary: "hsl(150, 100%, 66%)",
        blue: {
          grayish: "hsl(217, 19%, 38%)",
          darkg: "hsl(217, 19%, 24%)",
          dark: "hsl(218, 23%, 16%)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
