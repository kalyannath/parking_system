import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "purple-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#000000",
            secondaryBackground: "#0d0d0d",
            tertiaryBackground: "#424242",
            foreground: "#FFFFFF",
            secondaryForeground: "#FFFFFF",
            tertiaryForeground: "#D1CFCF",
            primaryBorderColor: "#FFFFFF",
            primary: {
              DEFAULT: "#424242",
              foreground: "#ffffff",
              green: "#154608",
              red: "#600a0a",
              yellow: "#FF9800"
            }
          },
        },

        "light": {
          extend: "light", // <- inherit default values from dark theme
          colors: {
            background: "#FFFFFF",
            secondaryBackground: "#FFFFFF",
            tertiaryBackground: "#424242",
            foreground: "#000000",
            secondaryForeground: "#0d0d0d",
            tertiaryForeground: "#475467",
            primaryBorderColor: "#0d0d0d",
            primary: {
              DEFAULT: "#0d0d0d",
              foreground: "#ffffff",
              green: "#1e7506",
              red: "#9e0303",
              yellow: "#FF9800"
            }
          },
        },
      },
    }),
  ],
};
export default config;
