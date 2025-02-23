'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/app/util";
import { Noto_Sans_HK } from 'next/font/google'

interface IndexGridCategoryListProps {
    pathname: string,
    items:components["schemas"]["IndexIndexGridCategoryListerComponent"][] | undefined
}

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

export default function IndexGridCategoryList({ pathname, items } : IndexGridCategoryListProps) {
  
    const divsRef = useRef<HTMLDivElement[]>([]);

    const [isVisible, setIsVisible] = useState<boolean[]>([]);
    
    useEffect(() => {
        if(items) setIsVisible(new Array(items.length).fill(false));
      }, [items]);

    const handleVisibilityChange = (index: number, visible: boolean) => {
        if(visible && !isVisible[index])
            setIsVisible((prev) => {
            const updated = [...prev];
            updated[index] = visible;
            return updated;
        });
    };

    return (
            <section className={"flex flex-col w-full mt-[20px] xl:grid xl:grid-cols-3 gap-[3vw] xl:gap-4"}>

                {items &&
                items.map((item, index) => {
                    const isDivVisible = useIsVisible({ current: divsRef.current[index] }, 0.5);
                    const outter_class      = `bg-cover bg-[image:var(--bgm)] w-full aspect-7_69_1 font-[500] text-[20px]`
                    const inner_class       = `px-[6vw]`
                    const span_class        = ``
                    const xl_outter_class   = `xl:bg-[image:var(--bg)] ${notoSansHK.className} ${isVisible[index] ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.9]"} delay-[0] transition duration-[0.8s] ease-in-out xl:h-[170px] flex text-[#00a0e9] xl:font-[500] xl:text-[36px]`
                    const xl_inner_class    = `xl:px-0 xl:self-end xl:mb-[12px] xl:ml-[30px] xl:h-[80px] xl:w-[60%] flex`
                    const xl_span_class     = `delay-[0.6s] transition duration-[1.5s] ease-in-out flex self-center ${isVisible[index] ? "opacity-100 translate-x-[0]" : "opacity-0 -translate-x-[20px]"}`

                    useEffect(() => {
                        handleVisibilityChange(index, isDivVisible);
                    }, [isDivVisible, index]);
                    return  <div 
                                ref={(el) => {
                                    divsRef.current[index] = el!;
                                }}
                                className={`${outter_class} ${xl_outter_class}`}
                                style={{
                                    //@ts-ignore
                                    '--bg': `url(${item.bg_image? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image.url}` : ""})`,
                                    '--bgm': `url(${item.bg_image_mobile? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image_mobile.url}` : ""})`,
                                  }}
                            >
                            <div className={`${inner_class} ${xl_inner_class}`}>
                                <span className={`${span_class} ${xl_span_class}`}>
                                 {item.title}
                                </span>
                            </div>
                            </div>
                            
                })
                }
            </section>
    
    );
}