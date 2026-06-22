import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "#733706",
          "brown-dark": "#3f1f03",
          beige: "#f7dba7",
          cream: "#fffcf6",
          teal: "#041f1e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        rubik: ["var(--font-rubik-mono-one)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        body: {
          fontFamily: theme("fontFamily.dmsans"),
        },
        h1: {
          fontFamily: theme("fontFamily.rubik"),
        },
        h2: {
          fontFamily: theme("fontFamily.syne"),
        },
        h3: {
          fontFamily: theme("fontFamily.syne"),
        },
        h4: {
          fontFamily: theme("fontFamily.syne"),
        },
      });
    }),
  ],
};

export default config;
