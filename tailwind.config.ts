import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

// Define only color objects for theme generation.
const baseColors = {
  gray: colors.gray,
  red: colors.red,
  yellow: colors.yellow,
  green: colors.green,
  blue: colors.blue,
  indigo: colors.indigo,
  purple: colors.purple,
  pink: colors.pink,
};

const shadeMapping: Record<number, number> = Object.fromEntries(
  Object.entries({
    50: 900,
    100: 800,
    200: 700,
    300: 600,
    400: 500,
    500: 400,
    600: 300,
    700: 200,
    800: 100,
    900: 50,
  }).map(([k, v]) => [Number(k), v])
);

const generateThemes = (invert = false) => {
  const themes: Record<string, Record<number, string>> = {};

  Object.keys(baseColors).forEach((color) => {
    themes[color] = {};
    Object.entries(shadeMapping).forEach(([lightShade, darkShade]) => {
      const key = parseInt(lightShade, 10);
      const mappedShade = invert ? darkShade : key;
      themes[color][key] = (baseColors[color as keyof typeof baseColors] as Record<number, string>)[mappedShade];
    });
  });

  return themes;
};

const lightThemes = generateThemes();
const darkThemes = generateThemes(true);

export default {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        ...lightThemes,
        white: "#ffffff",
      },
      dark: {
        ...darkThemes,
        white: colors.gray[950],
        black: colors.gray[50],
      },
    }),
  ],
} satisfies Config;
