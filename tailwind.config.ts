import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBF9F5",
        ink: "#24232A",
        "ink-soft": "#5A5660",
        gold: "#A87B4F",
        line: "#E7E1D6",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-newsreader)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
