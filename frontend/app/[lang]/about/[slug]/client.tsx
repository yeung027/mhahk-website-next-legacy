'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";
import { useState, useEffect } from "react";
import { Noto_Sans_HK } from 'next/font/google'
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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


    return  <div
                className={`
                    
                    flex flex-col-reverse xl:grid grid-cols-[220px_1fr] gap-[25px]
                    ${notoSansHK.className}

                    `}
            >
                <ul
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
                    <AboutNavSwiper list={list} />
                </div>
            </div>

}

interface AboutNavSwiperProps {
    list:components["schemas"]["About"][]
    
}

export function AboutNavSwiper({ list }: AboutNavSwiperProps) 
{
    const [activeIndex, setActiveIndex] = useState(0);

    return  <div className={`
                    !h-[7vh] w-screen 
                    fixed
                    bottom-[0] left-[0]
                    bg-[#dff1ed]
                    z-mobile_bottom_nav
                `}>
                <Swiper 
                    slidesPerView={2.5}
                    spaceBetween={"2.5%"}
                    className={`
                        w-[96vw] h-[7vh] 
                    `}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {list &&
                        list.map((item, index) => {
                            return  <SwiperSlide 
                                        className={`
                                            
                                            max-h-[80%]
                                            
                                            flex place-self-center content-center text-center
                                            ${
                                                (index-2===activeIndex) ? 'bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.1),rgba(255,255,255,0))]' : (index+1===activeIndex && activeIndex+2==list.length) ? 'bg-[linear-gradient(to_left,rgba(255,255,255,1),rgba(255,255,255,0.1),rgba(255,255,255,0))]' : 'bg-white'
                                            }
                                            
                                            rounded-[3px]
                                        `}
                                        key={`SwiperSlide-${index}`}
                                    >
                                        {item.title}
                                    </SwiperSlide>

                        })
                    }
                </Swiper>
            </div>
}