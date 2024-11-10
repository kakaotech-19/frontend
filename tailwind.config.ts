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
      keyframes: {
        slowPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        slowPulse: "slowPulse 10s ease-in-out infinite", // 3초로 설정
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
