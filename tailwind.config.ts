import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        spot: "#334155",
        player: {
          none: "#a8a29e",
          "1": "#dc2626",
          "2": "#15803d",
          "3": "#1e3a8a",
          "4": "#eab308",
        },
        white: "#f5f5f5",
      },
      boxShadow: {
        "sm-bold": "0 1px 2px 0 rgb(0 0 0 / 0.3)",
        bold: "0 1px 3px 0 rgb(0 0 0 / 0.6), 0 1px 2px -1px rgb(0 0 0 / 0.6)",
        "md-bold":
          "0 4px 6px -1px rgb(0 0 0 / 0.6), 0 2px 4px -2px rgb(0 0 0 / 0.6)",
        "lg-bold":
          "0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6)",
        "xl-bold":
          "0 20px 25px -5px rgb(0 0 0 / 0.6), 0 8px 10px -6px rgb(0 0 0 / 0.6)",
        "2xl-bold": "0 25px 50px -12px rgb(0 0 0 / 0.7)",
        "inner-bold": "inset 0 2px 4px 0 rgb(0 0 0 / 0.6)",
        "emboss-bold": "0 4px 6px -1px rgb(0 0 0 / 0.6), 0 2px 4px -2px rgb(0 0 0 / 0.6), inset 0 2px 4px 0 rgb(255 255 255 / 0.3)",
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};

export default config;
