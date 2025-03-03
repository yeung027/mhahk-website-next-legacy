'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";
import { useState, useRef, useEffect } from "react";
import { Noto_Sans_HK } from 'next/font/google'
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useIsAtTop, useIsVisible } from "@/helpers/util";

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
                    className={`
                        px-[20px] 
                        markdown-content-Noto-Sans-HK
                        `}
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











interface AboutMobileProps {
  locale: Locale;
  dict: any;
  slug: string;
  abouts: components["schemas"]["About"][];
}

  
export function AboutMobile({ locale, dict, slug, abouts }: AboutMobileProps) {
    const bg_colors = ['bg-[#3e5062]', 'bg-[#8a5252]', 'bg-[#4a7c59]', 'bg-[#f4a261]', 'bg-[#264653]'];

    return (
        <div className="flex xl:hidden flex-col">
            {abouts &&
                abouts.map((about, index) => {
                    const sectionRef = useRef(null);
                    const bannerRef = useRef(null);
                    
                    const isAtTop = useIsAtTop(bannerRef);
                    const isSectionVisible = useIsVisible(sectionRef, undefined);

                    const bgColor = bg_colors[index % bg_colors.length];

                    return (
                        <section ref={sectionRef} key={`about-${index}`} className="relative">
                            {/* Banner */}
                            <div 
                                ref={bannerRef}
                                className={`
                                    ${bgColor} p-4 text-white ${notoSansHK.className} text-[1rem] font-[400]
                                    transition-all duration-300
                                    ${isAtTop && isSectionVisible ? "fixed top-0 left-0 w-full shadow-md z-50" : ""}
                                `}
                            >
                                {about.title}
                            </div>

                            {/* 內容區塊 */}
                            <div
                                className={`
                                    markdown-content-Noto-Sans-HK
                                    w-full py-[2vw] px-[2vw] mt-[2vw] mb-[5vw] 
                                    border-t-[7px] border-[#00A98F]
                                    rounded-[2vw] bg-white shadow-md overflow-hidden 
                                    z-0
                                `}
                            >
                                <ReactMarkdown
                                    children={about.content}
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                />
                            </div>
                        </section>
                    );
                })}
        </div>
    );
}

