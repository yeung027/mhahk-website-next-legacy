'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/helpers/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import Image from "next/image";


interface IndexHeroProps {
    data:components["schemas"]["IndexIndexHeroComponent"] | undefined
}


export default function IndexHero({ data } : IndexHeroProps) {
  
    
    const sectionRef = useRef<HTMLElement | null>(null);
    const isVisibleNow = useIsVisible(sectionRef, 0.3);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isVisibleNow && !isVisible) {
            setIsVisible(true); // 只更新一次
        }
    }, [isVisibleNow, isVisible]);

    return (
            <section className={`w-full ${isVisible ? "opacity-100 translate-y-[0]" : "opacity-0 translate-y-[3vw] xl:translate-y-[20px]"}
                 delay-[0.1s] transition duration-[1s] ease-in-out`} 
                ref={sectionRef}
            >
                <Swiper 
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className=""
                >
                {data && data.images &&
                    data.images.map((image, index) => {
                        return  <SwiperSlide className="" key={`SwiperSlide-${index}`}>
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} 
                                        alt={image.alternativeText || `Slide ${index}`} // 提供 SEO 友善的 alt 文本
                                        width={1920} // 設定寬度
                                        height={1080} // 設定高度
                                        layout="responsive" // 讓圖片自動適應螢幕
                                        priority
                                        className="object-cover w-full h-full" // 確保圖片適應容器
                                    />
                                </SwiperSlide>
                    })
                }
                </Swiper>
            </section>
    
    );
}