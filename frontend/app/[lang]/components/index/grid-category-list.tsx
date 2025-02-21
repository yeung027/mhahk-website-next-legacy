'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/app/util";

interface IndexGridCategoryListProps {
    pathname: string,
    items:components["schemas"]["IndexIndexGridCategoryListerComponent"][] | undefined
}

export default function IndexGridCategoryList({ pathname, items } : IndexGridCategoryListProps) {
  

    const itemRef = useRef(null);
    const isVisible1 = items && items.length>0? useIsVisible(itemRef, 0.8): false;

  
    return (
            <section className={"w-full mt-[20px] grid grid-cols-3 gap-4"}>

                {items &&
                items.map((item) => {
                    return  <div 
                            ref={itemRef}
                            style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image?.url}")`}} 
                            className={`h-[170px] flex text-[#00a0e9] font-Noto_Sans_HK font-[400] text-[36px]`}
                            >
                            <div className={"self-end mb-[12px] ml-[30px] h-[80px] w-[60%] flex"}>
                                <span className={`delay-150 transition duration-[1s] ease-in-out flex self-center ${isVisible1 ? "opacity-100 translate-x-[0]" : "opacity-0 -translate-x-[20px]"}`}>
                                {item.title}
                                </span>
                            </div>
                            </div>
                })
                }
            </section>
    
    );
}