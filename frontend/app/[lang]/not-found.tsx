"use client"; // ✅ 404 Page 需要 `usePathname()`，所以要是 Client Component

import { usePathname } from "next/navigation";
import { Noto_Sans_HK } from 'next/font/google'


const notoSansHK = Noto_Sans_HK({
  subsets: ['latin'],
  display: 'swap',
})

export default function NotFoundPage() {
  const pathname = usePathname(); // ✅ 取得當前 URL
  const isZH_HK = pathname.startsWith("/zh-HK");
  const isZH_CN = pathname.startsWith("/zh-CN");

    return (
      <main className={`${notoSansHK.className} w-full flex flex-col items-center justify-center h-[30vh]`}>
        <h1 className="text-[1.25rem] font-bold text-red-500">{isZH_CN? '抱歉，找不到该页面。' : '抱歉，找不到該頁面。'}</h1>
        <a href="/" className="mt-4 px-4 py-2 bg-white border border-black text-white rounded-[5px]">
          {isZH_CN? '回到首页' : '回到首頁'}
        </a>
      </main>
    );
  }