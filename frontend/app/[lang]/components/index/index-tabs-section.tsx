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
    let color       = "text-[#00000080]";
    let bg          = "bg-[#00000080]";
    let hover_text  = "text-[#00000080]";
    if(page.color=="green")
        {
            if(selectedPage==index)
            {
                color = "text-[#8BD823]"
                bg = "bg-[#8BD823]"
            }
            
            hover_text = "hover:text-[#8BD823]"
            
        }
        else if(page.color=="cyan")
        {
            if(selectedPage==index)
            {
                color = "text-[#7AC8CC]"
                bg = "bg-[#7AC8CC]"
            }
            hover_text = "hover:text-[#7AC8CC]"
        }
        else if(page.color=="orange")
        {
            if(selectedPage==index)
            {
                color = "text-[#f3a83e]"
                bg = "bg-[#f3a83e]"
            }
            hover_text = "hover:text-[#f3a83e]"
        }
        else if(page.color=="purple")
        {
            if(selectedPage==index)
            {
                color = "text-[#8E6ECF]"
                bg = "bg-[#8E6ECF]"
            }
            hover_text = "hover:text-[#8E6ECF]"
        }
    return {color:color, bg:bg, hover_text: hover_text}
}

export default function IndexTabsSection({ pathname, items } : IndexTabsSectionProps) {
    const [selected, setSelected]       = useState<number>(0);
    const sectionRef = useRef<HTMLElement | null>(null);
    const isVisibleNow = useIsVisible(sectionRef, 0.3);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isVisibleNow && !isVisible) {
            setIsVisible(true); // 只更新一次
        }
    }, [isVisibleNow, isVisible]);
    
    return (
        <section 
            className={`mt-[20px] w-full ${isVisible ? "opacity-100 translate-y-[0]" : "opacity-0 translate-y-[3vw] xl:translate-y-[20px]"}
             delay-[0.1s] transition duration-[1s] ease-in-out `} 
            key={`tabs-section-section`} 
            ref={sectionRef}
        >
            <ul className={'flex flex-row flex-wrap border-b-[1px] bg-[#f8fafd] xl:bg-transparent'} key={`tabs-section-ul`}>
            {items && items.length>0 && items[0].pages &&
                items[0].pages.map((page, index) => {
                    const { color, bg, hover_text } = getpageColorClasses(page, selected, index);

                    return  <li 
                                className={`cursor-pointer h-[41px] xl:shadow-[3px_-2px_10px_-2px_rgba(0,0,0,0.15)] rounded-tl-[7px] rounded-tr-[7px] xl:rounded-tl-[3px] xl:rounded-tr-[3px] relative 
                                ${selected==index? "bg-white" : "bg-[#f5f8fc]"} ${notoSansHK.className} flex 
                                justify-center content-center border-[#e0e3e6] border-t-[1px] xl:border-t-[0px] border-l-[1px] xl:border-l-[0px] border-r-[1px] border-l-[1px] xl:border-l-[1px] last:xl:border-r-[0px]`}
                                onClick={()=>{setSelected(index)}}
                                key={`${index}`}
                            >
                                <div className={`rounded-tl-[3px] rounded-tr-[3px] absolute w-full h-[7px] hidden ${selected==index? `xl:flex ${bg}` : "hidden"}`}>

                                </div>
                                <span className={`z-20 leading-[44px] whitespace-nowrap mx-[20px] font-[500] ${color} ${hover_text} tracking-[0.1em]`}>
                                    {page.name}
                                </span>
                            </li>
                })
            }
            </ul>
            {items && items.length>0 && items[0].pages && items[0].pages &&
                items[0].pages.map((page, index) => {
                    return  <div className={`shadow-[0px_0px_9px_-1px_rgba(0,0,0,0.2)]`} key={`tabs-section-ul-page-${index}`}>
                                <div className={`transition-opacity transition-discrete duration-300 ease-in-out 
                                    ${index == selected ? "opacity-100 flex xl:grid" : "opacity-0 invisible absolute pointer-events-none"} 
                                    flex-col xl:grid-cols-2 auto-rows-[1fr]`}>

                                    {page.items && page.items.length<=0 &&
                                        <div className={"h-[20px]"}> </div>
                                    }
                                    <div className={`border-[#e0e3e6] border-r-[1px]`}>
                                    {page.items &&
                                        page.items.filter((u) => u.position=="left").map((item, index_j) => {
                                            if(index_j>0) return <></>

                                            //@ts-ignore
                                            const { color, bg } = getpageColorClasses(items[0].pages[selected], selected, index);

                                            return  <div className="flex flex-col items-start py-[20px] px-[12px]" key={`tabs-section-ul-page-left-${index_j}`}>
                                                        <div className={`w-full flex justify-center`}>
                                                            {item.image &&
                                                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} />
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
                                                                <p className={`text-[0.93rem] text-black ${notoSansHK.className} font-[300] tracking-[0.1em] max-h-[50px] overflow-hidden text-ellipsis line-clamp-2`}>
                                                                {item.short_content}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                        })
                                    }
                                    </div>
                                    <div className={`flex flex-col xl:grid xl:grid-rows-4`}>
                                    {page.items &&
                                        page.items.filter((u) => u.position=="right").map((item, index_j) => {
                                            if(index_j>3) return <></>


                                            return  <div 
                                                        className={`border-[#e0e3e6] first:border-t-[1px] first:xl:border-t-[0px] py-[12px]
                                                         last:py-[20px] last:xl:py-[0px] xl:py-[0px] px-[12px] border-[#e0e3e6] border-b-[1px]
                                                          grid grid-cols-[minmax(auto,16%)_1fr] content-center`}
                                                        key={`tabs-section-ul-page-right-${index_j}`}
                                                    >
                                                        <div className={``}>
                                                            {item.image &&
                                                                <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.image.url}`} />
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
                            </div>
                
                })
            }
        </section>
    )
}