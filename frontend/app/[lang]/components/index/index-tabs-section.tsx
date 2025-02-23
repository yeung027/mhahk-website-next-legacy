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

const getpageColorClasses = (page:components["schemas"]["IndexIndexTabsPageLeftAndRightComponent"], selectedPage:number, index:number) => {
    let color = "text-[#00000080]";
    let bg    = "bg-[#00000080]";
    if(page.color=="green" && selectedPage==index)
        {
            color = "text-[#8BD823]"
            bg = "bg-[#8BD823]"
        }
        else if(page.color=="cyan" && selectedPage==index)
        {
            color = "text-[#7AC8CC]"
            bg = "bg-[#7AC8CC]"
        }
        else if(page.color=="orange" && selectedPage==index)
        {
            color = "text-[#729E1A]"
            bg = "bg-[#729E1A]"
        }
        else if(page.color=="purple" && selectedPage==index)
        {
            color = "text-[#8E6ECF]"
            bg = "bg-[#8E6ECF]"
        }
    return {color:color, bg:bg}
}

export default function IndexTabsSection({ pathname, items } : IndexTabsSectionProps) {
    const [selected, setSelected]       = useState<number>(0);


    return (
        <section className={"mt-[20px] w-full"}>
            <ul className={'flex flex-row flex-wrap border-b-[1px] bg-[#f8fafd] xl:bg-transparent'}>
            {items && items.length>0 && items[0].pages &&
                items[0].pages.map((page, index) => {
                    const { color, bg } = getpageColorClasses(page, selected, index);

                    return  <li className={`h-[41px] xl:shadow-[3px_-2px_10px_-2px_rgba(0,0,0,0.15)] rounded-tl-[7px] rounded-tr-[7px] xl:rounded-tl-[3px] xl:rounded-tr-[3px] relative 
                            ${selected==index? "bg-white" : "bg-[#f5f8fc]"} ${notoSansHK.className} flex 
                            justify-center content-center border-[#e0e3e6] border-t-[1px] xl:border-t-[0px] border-l-[1px] xl:border-l-[0px] border-r-[1px] border-l-[1px] xl:border-l-[1px] last:xl:border-r-[0px]`}>
                                <div className={`rounded-tl-[3px] rounded-tr-[3px] absolute w-full h-[7px] hidden ${selected==index? `xl:flex ${bg}` : "hidden"}`}>

                                </div>
                                <span className={`leading-[44px] whitespace-nowrap mx-[20px] font-[500] ${color} tracking-[0.1em]`}>
                                    {page.name}
                                </span>
                            </li>
                })
            }
            </ul>
            <div className={'flex flex-col xl:grid xl:grid-cols-2 auto-rows-[1fr] border-emerald-300 shadow-[0px_0px_10px_-1px_rgba(0,0,0,0.2)]'}>
                <div className={`border-[#e0e3e6] border-r-[1px]`}>
                    {items && items.length>0 && items[0].pages && items[0].pages[selected] && items[0].pages[selected].items &&
                        items[0].pages[selected].items.filter((u) => u.position=="left").map((item, index) => {
                            if(index>0) return <></>

                            //@ts-ignore
                            const { color, bg } = getpageColorClasses(items[0].pages[selected], selected, index);

                            return  <div className="flex flex-col items-start py-[20px] px-[12px]">
                                        <div className={`w-full flex justify-center`}>
                                            {item.image &&
                                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} key={`index-tabs-section-page-${index}-left-item`} />
                                            }
                                        </div>
                                        <div className={`w-fit pt-[10px]`}>
                                            {item.title &&
                                                <h3 className={`${color} ${notoSansHK.className} font-[500] tracking-[0.1em]`}>
                                                    {item.title}
                                                </h3>
                                            }
                                        </div>
                                        <div className={`w-full pt-[3px]`}>
                                            {item.short_content && (
                                                <p className={`text-black ${notoSansHK.className} font-[300] tracking-[0.1em] max-h-[50px] overflow-hidden text-ellipsis line-clamp-2`}>
                                                {item.short_content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                        })
                    }
                </div>
                <div className={`flex flex-col xl:grid xl:grid-rows-4`}>
                {items && items.length>0 && items[0].pages && items[0].pages[selected] && items[0].pages[selected].items &&
                        items[0].pages[selected].items.filter((u) => u.position=="right").map((item, index) => {
                            if(index>3) return <></>


                            return  <div className={`border-[#e0e3e6] first:border-t-[1px] first:xl:border-t-[0px] py-[12px] last:py-[20px] last:xl:py-[0px] xl:py-[0px] px-[12px] border-[#e0e3e6] border-b-[1px] grid grid-cols-[minmax(auto,16%)_1fr] content-center`}>
                                        <div className={``}>
                                            {item.image &&
                                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} key={`index-tabs-section-page-${index}-right-item-${index}`} />
                                            }
                                        </div>
                                        <div className={`self-center pl-[7px]`}>
                                            {item.title &&
                                                <h3 className={`${notoSansHK.className} font-[500] tracking-[0.1em] text-[1rem]`}>
                                                    {item.title}
                                                </h3>
                                            }
                                        </div>
                                    </div>
                    })
                }
                </div>
            </div>
        </section>
    )
}