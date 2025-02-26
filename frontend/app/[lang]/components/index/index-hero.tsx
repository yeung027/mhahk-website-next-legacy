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
  
    const imgsRef = useRef<HTMLDivElement[]>([]);

    const [isVisible, setIsVisible] = useState<boolean[]>([]);
    
    // useEffect(() => {
    //     if(items) setIsVisible(new Array(items.length).fill(false));
    //   }, [items]);

    const handleVisibilityChange = (index: number, visible: boolean) => {
        if(visible && !isVisible[index])
            setIsVisible((prev) => {
            const updated = [...prev];
            updated[index] = visible;
            return updated;
        });
    };

    return (
            <section className={`w-full`}>
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
                        return  <SwiperSlide className="">
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