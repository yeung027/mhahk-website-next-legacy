'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";
import { useState, useEffect } from "react";
import { Noto_Sans_HK } from 'next/font/google'
import Link from "next/link";

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

interface AboutClientProps {
    locale:Locale,
    slug:string,
    dict:any,
    about:components["schemas"]["About"],
    list:components["schemas"]["About"][]
    
}

export default function AboutPageClient({ locale, slug, dict, about, list }: AboutClientProps) 
{


    return  <div
                className={``}
            >
                <AboutDesktop locale={locale} slug={slug} dict={dict} about={about} list={list} />
                <AboutMobile />
            </div>

}

interface AboutDesktopProps {
    locale:Locale,
    dict:any,
    slug:string,
    about:components["schemas"]["About"] | undefined,
    list:components["schemas"]["About"][]
}

export function AboutDesktop({ locale, dict, slug, about, list }: AboutDesktopProps) 
{
    return <div
                className={`hidden xl:grid grid-cols-[220px_1fr] gap-[25px]
                            ${notoSansHK.className}
                          `}
            >
                <ul
                    className={`
                        w-[220px] 
                        shadow-[0_1px_6px_rgba(0,0,0,0.1)] rounded-[5px]
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
                                        {list &&
                                            list.map((item, index) => {
                                                return  <li
                                                            className={`border-b last:border-0 border-[#e8e8e8] pt-[7px] first:pt-[0] pb-[7px] last:pb-[2px]
                                                                ${item.slug===slug? 'text-[#bf4a23]' : ''}
                                                            `}
                                                        >
                                                            <Link href={`/${locale}/about/${item.slug}`}>
                                                                {item.title}
                                                            </Link>
                                                        </li>

                                            })
                                        }
                                    </ul>
                    </li>
                </ul>

                <div
                    className={`border-4 border-purple-300`}
                >
                    2
                </div>
            </div>
}










const tabs = [
  { id: "intro", label: "機構簡介", content: "這是機構簡介內容..." },
  { id: "mission", label: "願景、使命及價值", content: "這是願景、使命及價值內容..." },
  { id: "structure", label: "機構架構", content: "這是機構架構內容..." },
  { id: "history", label: "大事年表", content: "這是大事年表內容..." },
  { id: "report", label: "財務報告", content: "這是財務報告內容..." },
];

export function AboutMobile() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      setIsFooterVisible(footerTop <= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex xl:hidden flex-col">
      {/* 內容區 */}
      <div className="flex-grow p-4 border rounded-lg bg-white shadow-md">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>

      {/* 固定在底部的 `button`，如果 `footer` 出現則顯示全部 `tabs` */}
      <div
        className={`w-full bg-white shadow-lg transition-all ${
          isFooterVisible ? "static bg-gray-100 py-4" : "fixed bottom-0 left-0"
        }`}
      >
        <div className="flex flex-col w-full">
          {tabs.slice(0, isFooterVisible ? tabs.length : 2).map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-4 py-3 text-sm transition text-white ${
                activeTab === tab.id ? "bg-blue-600" : "bg-green-500"
              } ${index === 0 ? "rounded-t-md" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
