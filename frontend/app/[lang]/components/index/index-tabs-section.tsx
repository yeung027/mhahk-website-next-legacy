'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/app/util";
import { Noto_Sans_HK } from 'next/font/google'

interface IndexTabsSectionProps {
    pathname: string,
    items:components["schemas"]["IndexIndexTabsLayoutLeftAndRightComponent"][] | undefined
}

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

export default function IndexTabsSection({ pathname, items } : IndexTabsSectionProps) {
    const [selected, setSelected]       = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);


    return (
        <section className={"mt-[20px] w-full"}>
            <ul className={'flex flex-row flex-wrap border-b-[1px]'}>
            {items && items.length>0 && items[0].pages &&
                items[0].pages.map((page, index) => {
                    let color = "text-[#00000080]";
                    let bg    = "text-[#00000080]";
                    if(page.color=="green" && selected==index)
                    {
                        color = "text-[#7AC8CC]"
                        bg = "bg-[#7AC8CC]"
                    }
                    else if(page.color=="cyan" && selected==index)
                    {
                        color = "text-[#8BD823]"
                        bg = "bg-[#8BD823]"
                    }
                    else if(page.color=="orange" && selected==index)
                    {
                        color = "text-[#729E1A]"
                        bg = "bg-[#729E1A]"
                    }
                    else if(page.color=="purple" && selected==index)
                    {
                        color = "text-[#8E6ECF]"
                        bg = "bg-[#8E6ECF]"
                    }

                    return  <li className={`h-[41px] shadow-[3px_-2px_10px_-2px_rgba(0,0,0,0.15)] rounded-tl-[3px] rounded-tr-[3px] relative ${selected==index? "bg-white" : "bg-[#f5f8fc]"} ${notoSansHK.className} flex justify-center content-center border-[#e0e3e6] border-r-[1px] last:border-r-[0px]`}>
                                <div className={`rounded-tl-[3px] rounded-tr-[3px] absolute w-full h-[7px] bg-black ${selected==index? bg : "hidden"}`}>

                                </div>
                                <span className={`leading-[44px] whitespace-nowrap mx-[20px] font-[500] ${color} tracking-[0.1em]`}>
                                    {page.name}
                                </span>
                            </li>
                })
            }
            </ul>
            <div className={'flex flex-col xl:grid xl:grid-cols-2 border-emerald-300 shadow-[0px_0px_10px_-1px_rgba(0,0,0,0.2)]'}>
                <div className={`border-2`}>
                {items && items.length>0 && items[0].pages && items[0].pages.length > 0 && items[0].pages[0].items &&
                    items[0].pages[0].items.filter((u) => u.position=="left").map((item, index) => {
                        return <div className="border-2">{item.title}</div>
                    })
                }
                </div>
                <div className={`border-2 border-rose-300`}>
                    2
                </div>
            </div>
        </section>
    )
}