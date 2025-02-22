'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/app/util";

interface IndexGridCategoryListProps {
    pathname: string,
    items:components["schemas"]["IndexIndexGridCategoryListerComponent"][] | undefined
}

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
            <section className={"w-full mt-[20px] grid grid-cols-3 gap-4"}>

                {items &&
                items.map((item, index) => {
                    const isDivVisible = useIsVisible({ current: divsRef.current[index] }, 0.5);
        
                    // 每當可見性變化時更新 isVisible 陣列
                    useEffect(() => {
                        handleVisibilityChange(index, isDivVisible);
                    }, [isDivVisible, index]);
                    return  <div 
                            ref={(el) => {
                                divsRef.current[index] = el!;
                            }}

                            style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image?.url}")`}} 
                            className={`${isVisible[index] ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.9]"} delay-[0] transition duration-[0.8s] ease-in-out h-[170px] flex text-[#00a0e9] font-Noto_Sans_HK font-[400] text-[36px]`}
                            >
                            <div className={"self-end mb-[12px] ml-[30px] h-[80px] w-[60%] flex"}>
                                <span className={`delay-[0.6s] transition duration-[1.5s] ease-in-out flex self-center ${isVisible[index] ? "opacity-100 translate-x-[0]" : "opacity-0 -translate-x-[20px]"}`}>
                                 {item.title}
                                </span>
                            </div>
                            </div>
                })
                }
            </section>
    
    );
}