'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";

export function useIsVisible(ref:any) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting)
    } 
    );
    
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

interface IndexGridCategoryListProps {
    pathname: string,
    items:components["schemas"]["IndexIndexGridCategoryListerComponent"][] | undefined
}

export default function IndexGridCategoryList({ pathname, items } : IndexGridCategoryListProps) {
  

    const ref1 = useRef(null);
    const isVisible1 = useIsVisible(ref1);

  
    return (
            <section className={"w-full mt-[20px] grid grid-cols-3 gap-4"}>
                {items &&
                items.map((item) => {
                    return  <div 
                    ref={ref1}
                            style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image?.url}")`}} 
                            className={`h-[170px] flex text-[#00a0e9] font-Noto_Sans_HK font-[400] text-[36px]`}
                            >
                            <div className={"self-end mb-[12px] ml-[30px] h-[80px] w-[60%] flex"}>
                                <span className={`transition duration-[1s] ease-in-out flex self-center ${isVisible1 ? "opacity-100 translate-x-[0]" : "opacity-0 -translate-x-[20px]"}`}>
                                {item.title}
                                </span>
                            </div>
                            </div>
                })
                }
            </section>
    
    );
}