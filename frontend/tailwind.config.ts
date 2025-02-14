import { Istok_Web } from "next/font/google";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Istok_Web: ['"Istok Web"', 'Helvetica'],
      Noto_Sans: ['"Noto Sans"', 'Helvetica']
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
      }
    },
  },
  plugins: [],
} satisfies Config;
