import { Istok_Web } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    ...Array.from({ length: 50 }, (_, i) => `peer/g${String(i + 1).padStart(3, "0")}`),
    ...Array.from({ length: 50 }, (_, i) => `peer-hover/g${String(i + 1).padStart(3, "0")}:xl:opacity-100`),
    ...Array.from({ length: 50 }, (_, i) => `peer-hover/g${String(i + 1).padStart(3, "0")}:xl:scale-[1]`),
    ...Array.from({ length: 50 }, (_, i) => `max-h-[${i*10}px]`),
  ],
  theme: {
    fontFamily: {
      Istok_Web: ['"Istok Web"', 'Helvetica'],
      Noto_Sans: ['"Noto Sans"', 'Helvetica'],
      Noto_Sans_HK: ['"Noto Sans HK"', 'serif'],
    },
    extend: {
      colors: {
        mainGreen:'#39a787',
        green2:'#e8fccf',
        hoverBlue:'#12414f'
      },
      padding: {
        'pageX':'7vw',
        'pageXLX':'40px'
      },
      margin:{
        'negative_pageX':'-7vw',
        'negative_pageXLX':'-40px'
      },
      aspectRatio: {
        '7_69_1': '7.69 / 1',
      },
      zIndex: {
        'nav': '96',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
