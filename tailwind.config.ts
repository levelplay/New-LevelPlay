import type { Config } from 'tailwindcss'
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [
    nextui({
      themes: {
        dark: {
          extend: 'dark',
          colors: {
            background: "#141414",
            foreground: "#ffffff",
            primary: {
              DEFAULT: "#ffffff",
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#000000",
              foreground: "#ffffff",
            },
            focus: "#ffffff",
          },
        },
      },
    })
  ],
};
export default config;
