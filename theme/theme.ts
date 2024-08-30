import { Inter } from "next/font/google";

export const appFont = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const modeVariable = {
  light: 'light',
  system: 'system',
  dark: 'dark',
}

export const modeLocalVariable = 'curr-mode';
