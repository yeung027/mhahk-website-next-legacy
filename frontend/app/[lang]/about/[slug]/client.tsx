'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";
import { useState, useRef, useEffect } from "react";
import { Noto_Sans_HK } from 'next/font/google'
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

interface AboutClientProps {
    locale:Locale,
    slug:string,
    dict:any,
    abouts:components["schemas"]["About"][],
    
}

export default function AboutPageClient({ locale, slug, dict, abouts }: AboutClientProps) 
{


    return  <div
                className={``}
            >
                <AboutDesktop locale={locale} slug={slug} dict={dict} abouts={abouts} />
                <AboutMobile locale={locale} slug={slug} dict={dict} abouts={abouts} />
            </div>

}

interface AboutDesktopProps {
    locale:Locale,
    dict:any,
    slug:string,
    abouts:components["schemas"]["About"][],
}

export function AboutDesktop({ locale, dict, slug, abouts }: AboutDesktopProps) 
{
    const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(!abouts) return;
        // 找到 `slug` 在 `abouts` 陣列中的 `index`
        const index = abouts.findIndex((about) => about.slug === slug);
        if (index !== -1) {
        setCurrentIndex(index);
        console.log(abouts[index])
        }
    }, [slug, abouts]); // ✅ 當 `slug` 或 `abouts` 變更時重新計算


    return <div
                className={`hidden xl:grid grid-cols-[220px_1fr] gap-[25px]
                            ${notoSansHK.className}
                          `}
            >
                <ul
                    className={`
                        w-[220px] 
                        h-fit /* ✅ 讓 Sidebar 高度根據內容自適應 */
                        min-h-[100px] /* ✅ 確保 Sidebar 不會太短 */
                        shadow-[0_1px_6px_rgba(0,0,0,0.1)] 
                        rounded-[5px]
                        `}
                >
                    <li className={`bg-[#3e5062]
                                        rounded-tl-[5px] rounded-tr-[5px]
                                        px-[10px] py-[10px]
                                        text-white text-[1rem] font-[500]
                                    `}>
                                    {dict && 
                                        dict?.about?.title
                                    }
                    </li>
                    <li className={`
                                        
                                        px-[10px] py-[10px]
                                        text-[#3e5062] text-[0.875rem] font-[500]
                                        
                                    `}>
                                    <ul className={``}>
                                        {abouts &&
                                            abouts.map((about, index) => {
                                                return  <li
                                                            key={index} /* ✅ 確保 key 避免 React 錯誤 */
                                                            className={`border-b last:border-0 border-[#e8e8e8] pt-[7px] first:pt-[0] pb-[7px] last:pb-[2px]
                                                                ${about.slug===slug? 'text-[#bf4a23]' : ''}
                                                            `}
                                                        >
                                                            <Link href={`/${locale}/about/${about.slug}`}>
                                                                {about.title}
                                                            </Link>
                                                        </li>

                                            })
                                        }
                                    </ul>
                    </li>
                </ul>

                <div
                    className={`px-[20px]`}
                >
                    {abouts && typeof currentIndex === "number" && abouts[currentIndex]?.content &&
                        <ReactMarkdown
                            children={abouts[currentIndex].content}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        />
                    }
                </div>
            </div>
}






export function useIsFooterVisible() {
    const [isIntersecting, setIntersecting] = useState(false);
    const [animating, setAnimating] = useState(false); // ✅ 控制動畫狀態
    const selector = "footer";
  
    useEffect(() => {
      const target = document.querySelector(selector);
      if (!target) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!animating) {
            setAnimating(true); // ✅ 當 `isFooterVisible` 變化時，設為 `animating`
            setIntersecting(entry.isIntersecting);
            setTimeout(() => setAnimating(false), 500); // ✅ 300ms 後允許變更
          }
        },
        { threshold: 0.1 }
      );
  
      observer.observe(target);
  
      return () => observer.disconnect();
    }, [selector, animating]);
  
    return isIntersecting;
  }




interface AboutMobileProps {
  locale: Locale;
  dict: any;
  slug: string;
  abouts: components["schemas"]["About"][];
}

  
export function AboutMobile({ locale, dict, slug, abouts }: AboutMobileProps) 
{
    const isFooterVisible = useIsFooterVisible(); // ✅ 監測 `layout.tsx` 內的 `footer`
    const [currentIndex, setCurrentIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(!abouts) return;
        // 找到 `slug` 在 `abouts` 陣列中的 `index`
        const index = abouts.findIndex((about) => about.slug === slug);
        if (index !== -1) {
        setCurrentIndex(index);
        }
    }, [slug, abouts]); // ✅ 當 `slug` 或 `abouts` 變更時重新計算

    return (
        <div className="relative w-full min-h-screen flex xl:hidden flex-col">
        {/* 內容區 */}
        <div className="flex-grow p-4 border rounded-lg bg-white shadow-md overflow-hidden z-0">
        {abouts && typeof currentIndex === "number" && abouts[currentIndex]?.content &&
            <ReactMarkdown
                children={abouts[currentIndex].content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            />
        }
        </div>

        {/* 固定在底部的 `button`，如果 `footer` 出現則顯示全部 `tabs` */}
        <div
            className={`w-full bg-white shadow-lg  transition-all duration-300 ease-in-out
                z-[20]
                ${
            isFooterVisible ? "static bg-gray-100 py-4" : "fixed bottom-0 left-0"
            }`}
        >
            <div className="flex flex-col w-full">
            {abouts.slice(0, isFooterVisible ? abouts.length : 2).map((about, index) => (
                <button
                key={about.slug}
                onClick={() => setCurrentIndex(index)}
                className={`w-full px-4 py-3 text-sm text-white ${
                    currentIndex === index ? "bg-blue-600" : "bg-green-500"
                } ${index === 0 ? "rounded-t-md" : ""}
                
                `}
                >
                {about.title}
                </button>
            ))}
            </div>
        </div>
        </div>
    );
}