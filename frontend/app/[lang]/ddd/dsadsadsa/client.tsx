'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";
import { useState, useEffect, useRef, RefObject } from "react";
import { Noto_Sans_HK } from 'next/font/google'
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import { useIsVisible } from "@/helpers/util";

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

interface AboutClientProps {
    locale:Locale,
    slug:string,
    dict:any,
    about:components["schemas"]["About"],
    list:components["schemas"]["About"][]
    
}

export default function AboutPageClient({ locale, slug, dict, about, list }: AboutClientProps) 
{
    const navRef = useRef<HTMLUListElement | null>(null);
    const navVisible = useIsVisible(navRef, 0.1);
    
                            

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
                                    {dict && 
                                        dict?.about?.title
                                    }
                    </li>
                    <li className={`
                                        
                                        px-[10px] py-[10px]
                                        text-[#3e5062] text-[0.875rem] font-[500]
                                        
                                    `}>
                                    <ul className={``}>
                                        {list &&
                                            list.map((item, index) => {
                                                return  <li
                                                            key={index}
                                                            className={`border-b last:border-0 border-[#e8e8e8] pt-[7px] first:pt-[0] pb-[7px] last:pb-[2px]
                                                                ${item.slug===slug? 'text-[#bf4a23]' : ''}
                                                            `}
                                                        >
                                                            <Link href={`/${locale}/about/${item.slug}`}>
                                                                {item.title}
                                                            </Link>
                                                        </li>

                                            })
                                        }
                                    </ul>
                    </li>
                </ul>

                <div
                    className={`
                        px-[3vw] py-[4vw] xl:px-[37px] xl:py-[10px]
                        border-t-[6px] border-mainGreen rounded-tl-[3px] rounded-tr-[3px]
                        shadow-[0_1px_3px_rgba(0,0,0,0.1)] 
                        prose prose-sm markdown-content-Noto-Sans-HK
                    `}
                >
                    {about && about.content &&
                        <ReactMarkdown
                            children={about.content}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        />
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
                    <AboutNavSwiper list={list} navVisible={navVisible} slug={slug} />
                </div>
            </div>

}

interface AboutNavSwiperProps {
    list:components["schemas"]["About"][]
    navVisible:Boolean
    slug:string
}

export function AboutNavSwiper({ list, navVisible, slug }: AboutNavSwiperProps) 
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
        const initialIndex = list.findIndex((item) => item.slug === slug);
        
        if (initialIndex !== -1) {
          setActiveIndex(initialIndex);
          
          // 確保 Swiper 物件已初始化，然後設定 index
          if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideTo(initialIndex, 0); // 直接跳到該 index，無動畫
          }
        }
      }, [slug, list]); // 當 `slug` 或 `list` 變更時重新執行

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
                    centeredSlides={activeIndex>0 && !(activeIndex+2>=list.length)}
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
                                            ${item.slug===slug? 'text-[#bf4a23]' : 'text-black'}
                                            ${
                                                ((index-1 ===activeIndex && activeIndex>0) || (activeIndex==0 && index== (activeIndex+2) ) ) && !(isLastSlide && (index+1>=list.length)) ? 'bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.6),rgba(255,255,255,0))]'
                                                : (activeIndex-1==index) ? 'bg-[linear-gradient(to_left,rgba(255,255,255,1),rgba(255,255,255,0.6),rgba(255,255,255,0))]'
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