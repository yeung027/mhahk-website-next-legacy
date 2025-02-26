'use client'
import { useEffect, useRef, useState } from "react";
import { components } from "@/api/strapi";
import { useIsVisible } from "@/app/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";


interface IndexHeroProps {
    pathname: string,
    data:components["schemas"]["IndexIndexHeroComponent"] | undefined
}


export default function IndexHero({ pathname, data } : IndexHeroProps) {
  
    
    const sectionRef = useRef<HTMLElement | null>(null);
    const isVisibleNow = useIsVisible(sectionRef, 0.3); // 監測 30% 可見度
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isVisibleNow && !isVisible) {
            setIsVisible(true); // 只更新一次
        }
    }, [isVisibleNow, isVisible]);

    return (
            <section className={`w-full ${isVisible ? "opacity-100 translate-y-[0]" : "opacity-0 translate-y-[3vw] xl:translate-y-[20px]"} delay-[0.1s] transition duration-[1s] ease-in-out `} ref={sectionRef}>
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
                                    <img 
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} 
                                        key={`index-hero-image-${index}`} 
                                        className={``}
                                    />
                                </SwiperSlide>
                    })
                }
                </Swiper>
            </section>
    
    );
}