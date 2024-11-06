import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./domain/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        gamja: ["Gamja", "sans-serif"], // 커스텀 폰트 추가
      },
    },
  },
  plugins: [flowbite.plugin(), require("flowbite-typography")],
  darkMode: "class",
};
export default config;
