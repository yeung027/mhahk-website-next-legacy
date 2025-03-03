'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/helpers/util";
import { Noto_Sans_HK } from 'next/font/google'

interface IndexGridCategoryListProps {
    items:components["schemas"]["IndexIndexGridCategoryListerComponent"][] | undefined
}

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

export default function IndexGridCategoryList({ items } : IndexGridCategoryListProps) {
  
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
            <section className=" 
                flex flex-col w-full mt-[20px]
                xl:grid xl:grid-cols-3 gap-[3vw] xl:gap-4
            ">
                {items &&
                    items.map((item, index) => {
                        const isDivVisible = useIsVisible({ current: divsRef.current[index] }, 0.5);
                        
                        useEffect(() => {
                            handleVisibilityChange(index, isDivVisible);
                        }, [isDivVisible, index]);
            
                        return (
                            <div 
                                ref={(el) => {
                                    divsRef.current[index] = el!;
                                }}
                                className={`
                                    bg-cover bg-[image:var(--bgm)] w-full aspect-7_69_1 
                                    font-[500] text-[1.25rem] leading-[1.25rem] 
                                    ${item.title2? 'xl:text-[1.8rem] xl:font-[500] xl:leading-[37px]' : 'xl:text-[2.25rem] xl:font-[500] xl:leading-[80px]'}
                                    xl:bg-[image:var(--bg)] ${notoSansHK.className}
                                    ${isVisible[index] ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.9]"}
                                    delay-[0] transition duration-[0.8s] ease-in-out xl:h-[170px] flex text-[#00a0e9]
                                    
                                `}
                                style={{
                                    //@ts-ignore
                                    '--bg': `url(${item.bg_image ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image.url}` : ""})`,
                                    '--bgm': `url(${item.bg_image_mobile ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image_mobile.url}` : ""})`,
                                }}
                                key={`grid-category-item-${index}`}
                            >
                                <div className={` 
                                        px-[2vw] xl:px-0
                                        ml-[4vw]
                                        xl:self-end 
                                        ${item.title2? 'xl:ml-[30px] xl:mb-[8px] ' : 'xl:ml-[30px] xl:mb-[12px] '} 
                                        xl:h-[80px] xl:w-[60%] 
                                        flex flex-row xl:flex-col
                                    `}
                                >
                                    <span className={` 
                                        delay-[0.6s] transition duration-[1.5s] ease-in-out flex self-center xl:self-start
                                        ${isVisible[index] ? "opacity-100 translate-x-[0]" : "opacity-0 -translate-x-[20px]"}
                                    `}>
                                        {item.title}
                                    </span>
                                    {item.title2 &&
                                        <span className={` xl:ml-[10px]
                                            delay-[0.6s] transition duration-[1.5s] ease-in-out flex self-center xl:self-start
                                            ${isVisible[index] ? "opacity-100 translate-x-[0]" : "opacity-0 -translate-x-[20px]"}
                                        `}>
                                            {item.title2}
                                        </span>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </section>
            );
}