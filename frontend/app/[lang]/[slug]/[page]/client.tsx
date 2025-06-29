'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";
import { useState, useEffect, useRef, RefObject } from "react";
import { Noto_Sans_HK, Cactus_Classical_Serif } from 'next/font/google'
import Link from "next/link";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import { useIsVisible } from "@/helpers/util";
import { SimpleSection } from "@/app/[lang]/components/page/simple";
import Image from "next/image";
import { CollapsibleListSection } from "@/app/[lang]/components/page/collapsible-list";

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

const cactusClassicalSerif = Cactus_Classical_Serif({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
})

interface PageClientProps {
    locale:Locale,
    slug:string,
    page_slug:string,
    dict:any,
    page:components["schemas"]["Page"],
    list:components["schemas"]["Page"][],
}

export default function PageClient({ locale, slug, page_slug, dict, page, list }: PageClientProps) 
{
    const navRef = useRef<HTMLUListElement | null>(null);
    const navVisible = useIsVisible(navRef, 0.1);
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const bannerVisNow = useIsVisible(bannerRef, 0.3);                       
    const [bannerVis, setBannerVis] = useState<boolean>(false);

    useEffect(() => {
        if (bannerVisNow && !bannerVis) {
            setBannerVis(true); // 只更新一次
        }
    }, [bannerVisNow, bannerVis]);
    
    return  <div
                className={`
                    
                    flex flex-col-reverse xl:grid grid-cols-[220px_1fr] gap-[25px]
                    ${notoSansHK.className}

                    `}
            >
                <ul
                    ref={navRef}
                    className={`
                        w-full xl:w-[220px] 
                        h-fit 
                        shadow-[0_1px_6px_rgba(0,0,0,0.1)] 
                        rounded-[5px]
                    `}
                >
                    <li className={`bg-[#3e5062]
                                        rounded-tl-[5px] rounded-tr-[5px]
                                        px-[10px] py-[10px]
                                        text-white text-[1rem] font-[500]
                                    `}>
                                    {list && list[0] && list[0].group &&
                                        list[0].group.title
                                    }
                    </li>
                    <li className={`
                                        
                                        px-[10px] py-[10px]
                                        text-[#3e5062] text-[0.875rem] font-[500]
                                        
                                    `}>
                                    <ul className={``}>
                                        {list &&
                                            list.map((page, index) => {
                                                return  <li
                                                            key={index}
                                                            className={`border-b last:border-0 border-[#e8e8e8] pt-[7px] first:pt-[0] pb-[7px] last:pb-[2px]
                                                                ${page.slug===page_slug? 'text-[#bf4a23]' : ''}
                                                            `}
                                                        >
                                                            <Link href={`/${locale}/about/${page.slug}`}>
                                                                {page.title}
                                                            </Link>
                                                        </li>

                                            })
                                        }
                                    </ul>
                    </li>
                </ul>

                <div
                    className={`
                        px-[3vw] py-[4vw] xl:px-[37px] xl:py-[10px] xl:pt-[40px]
                        border-t-[6px] border-mainGreen rounded-tl-[3px] rounded-tr-[3px]
                        shadow-[0_1px_3px_rgba(0,0,0,0.1)] 
                        flex flex-col
                    `}
                >
                    {page && page.banner &&
                        <div
                            ref={bannerRef}
                            className={`
                                w-full
                                delay-[0.1s] transition duration-[1s] ease-in-out
                                ${bannerVis? 'opacity-100 translate-x-[0]' : 'opacity-0 translate-x-[2vw] xl:translate-x-[10px]'}
                            `}
                        >
                            
                            <div 
                                className="relative"
                                
                            >
                                {page.banner_text &&
                                    <span
                                        className={`
                                                ${cactusClassicalSerif.className}
                                                text-[1.6rem] xl:text-[1.875rem]
                                                text-transparent bg-clip-text bg-gradient-to-r from-[#016d21] to-[#053705]
                                                h-full
                                                pl-[12px]
                                                flex 
                                                items-center
                                                absolute 
                                            `}
                                    >
                                        {page.banner_text}
                                    </span>
                                }
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${page.banner.url}`} 
                                    alt={page.banner.alternativeText || `Item Image`} // 提供 SEO 友善的 alt 文本
                                    width={page.banner.width} // 設定寬度
                                    height={page.banner.height} // 設定高度
                                    className="w-full object-cover"
                                    priority={true}
                                />
                            </div>
                            <div 
                                className={`
                                    py-0 mt-[5px]
                                    w-full bg-mainGreen h-[9px]
                                `}
                            />
                        </div>
                    }
                    {page && page.sections &&
                        page.sections.map((section, index) => {
                            switch (section.__component) {
                                case "page.simple":
                                    return <SimpleSection section={section} index={index} key={`page-section-component-${index}`} />
                                case "page.collapsible-list":
                                    return <CollapsibleListSection section={section} index={index} key={`page-section-component-${index}`}/>
                            }
                        })
                    }
                </div>
                
                <div
                    className={`
                        xl:hidden
                        absolute 
                        h-0 w-0
                        overflow-visible
                    `}
                >
                    <PageGroupNavSwiper list={list} navVisible={navVisible} slug={slug} page_slug={page_slug} />
                </div>
            </div>

}



interface PageGroupNavSwiperProps {
    list:components["schemas"]["Page"][]
    navVisible:Boolean
    slug:string
    page_slug:string
}

export function PageGroupNavSwiper({ list, navVisible, slug, page_slug }: PageGroupNavSwiperProps) 
{
    const swiperRef = useRef<SwiperRef | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | undefined>(undefined);
    const lastScrollY = useRef<number | undefined>(undefined);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if(lastScrollY && lastScrollY.current)
            setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
        lastScrollY.current = currentScrollY;
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll(); 

        return () => window.removeEventListener("scroll", handleScroll);
    }, [swiperRef]);

    useEffect(() => {
        // 找到 slug 相匹配的 index
        if(!list) return;
        const initialIndex = list.findIndex((item) => item.slug === page_slug);
        if (initialIndex !== -1) {
          setActiveIndex(initialIndex);
          
          // 確保 Swiper 物件已初始化，然後設定 index
          if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(initialIndex, 0); // 直接跳到該 index，無動畫
          }
        }
      }, [slug, page_slug, list]); // 當 `slug` 或 `list` 變更時重新執行

    return  <div className={`
                    !h-[7vh] w-screen 
                    fixed
                    transition-all duration-300 ease-in-out
                    bottom-0 
                    ${scrollDirection === 'up' && !navVisible ? 'translate-y-[0vh]' : 'translate-y-[7vh]'}
                    left-[0]
                    bg-[#dff1ed]
                    z-mobile_bottom_nav
                `}>
                <Swiper 
                    ref={swiperRef}
                    slidesPerView={2.5}
                    centeredSlides={activeIndex>0 && !(activeIndex+2>=(list ? list.length : 0))}
                    spaceBetween={"2.5%"}
                    className={`
                        w-[96vw] h-[7vh] 
                    `}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex)
                        setIsLastSlide(swiper.isEnd)
                    }}
                >
                    {list &&
                        list.map((item, index) => {
                            return  <SwiperSlide 
                                        className={`
                                            max-h-[80%]                                         
                                            flex place-self-center content-center text-center
                                            ${item.slug===page_slug? 'text-[#bf4a23]' : 'text-black'}
                                            ${
                                                ((index-1 ===activeIndex && activeIndex>0) || (activeIndex==0 && index== (activeIndex+2) ) ) && !(isLastSlide && (index+1>=(list ? list.length : 0))) ? 'bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.1),rgba(255,255,255,0))]'
                                                : (activeIndex-1==index) ? 'bg-[linear-gradient(to_left,rgba(255,255,255,1),rgba(255,255,255,0.1),rgba(255,255,255,0))]'
                                                : 'bg-white'
                                            }
                                            
                                            rounded-[3px]
                                        `}
                                        
                                        key={`SwiperSlide-${index}`}
                                    >
                                        <Link href={`${item.slug}`}>
                                            {item.title}
                                        </Link>
                                    </SwiperSlide>

                        })
                    }
                </Swiper>
            </div>
}