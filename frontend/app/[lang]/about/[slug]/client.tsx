'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";


interface AboutClientProps {
    locale:Locale,
    slug:string,
    dict:any,
    about:components["schemas"]["About"]
}

export default function AboutPageClient({ locale, slug, dict, about }: AboutClientProps) 
{


    // return  <div
    //             className={`
    //                         flex flex-col-reverse xl:grid xl:grid-cols-[220px_1fr]
    //                         gap-0 xl:gap-[25px]
    //                         `}
    //         >
    //             <div
    //                 className={`border-4 border-sky-300`}
    //             >
    //                 1
    //             </div>
    //             <div
    //                 className={`border-4 border-purple-300`}
    //             >
    //                 2
    //             </div>
    //         </div>
    return <>
    <Tabs />
    </>
}

interface SidebarProps {
    dict:any,
    about:components["schemas"]["About"] | undefined
}

export function Sidebar({ dict, about }: SidebarProps) 
{
    return <></>
}







import { useState, useEffect } from "react";

const tabs = [
  { id: "intro", label: "機構簡介", content: "這是機構簡介內容..." },
  { id: "mission", label: "願景、使命及價值", content: "這是願景、使命及價值內容..." },
  { id: "structure", label: "機構架構", content: "這是機構架構內容..." },
  { id: "history", label: "大事年表", content: "這是大事年表內容..." },
  { id: "report", label: "財務報告", content: "這是財務報告內容..." },
];

export function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer"); // ✅ 直接選擇 `layout.tsx` 內的 Footer
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top; // Footer 距離視窗頂部的距離
      const viewportHeight = window.innerHeight; // 視窗高度

      // ✅ 修正：當 Footer 任何部分進入視野時，讓 `button` 變 `static`
      setIsFooterVisible(footerTop <= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* 內容區 */}
      <div className="flex-grow p-4 border rounded-lg bg-white shadow-md">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>

      {/* 固定在底部的 `button`，如果 footer 出現則不固定 */}
      <div
        className={`w-full bg-white p-2 shadow-lg transition-all ${
          isFooterVisible ? "static bg-gray-100 py-4" : "fixed bottom-0 left-0"
        }`}
      >
        <div className="flex justify-center space-x-2">
          {tabs.slice(0, 2).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-md transition ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

