'use client'
import { components } from "@/api/strapi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import Image from 'next/image'
import { Noto_Sans_HK } from 'next/font/google'

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})
  

interface IndexGridCategoryListProps {
    pathname: string,
    services:components["schemas"]["Service"][] | undefined
}


export default function IndexServicesList({ pathname, services } : IndexGridCategoryListProps) {
  

    return (
            <section className={"relative w-full mt-[20px] flex flex-col h-[358px] justify-center"}>
                <h3 className={`absolute pl-[2%] top-0 pt-[3%] z-[20] ${notoSansHK.className} text-[2.3rem] font-[400] text-white`}>服務</h3>
                <div className={`absolute bg-[#0fa479] h-[90%] w-[42%] z-[0]`} />
                <div className={`grid grid-cols-[12%_88%] h-full flex items-center`}>
                    <div className={`h-full`}>
                        
                    </div>
                    <Swiper 
                        slidesPerView={2.5}
                        spaceBetween={"2.5%"}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className={`w-full h-[51%] pb-[9px] overflow-hidden`}
                    >
                        {services && services &&
                            services.map((service, index) => {
                                return  <SwiperSlide 
                                            className={`flex`} 
                                            key={`SwiperSlide-${index}`}
                                        >
                                            <div className={`w-full h-[calc(100%-7px)] shadow-[0px_2px_9px_-1px_rgba(0,0,0,0.2)] flex flex-col justify-center bg-white p-[3%]`}>
                                                <Image
                                                    src="/index/services/item_top.png"
                                                    width={470}
                                                    height={34}
                                                    alt="logo"
                                                    className={"w-full absolute top-0 left-0 z-[20]"}
                                                    priority={true}
                                                />
                                                {service.index_cover&&
                                                    <img 
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.index_cover.url}`} 
                                                        key={`index-hero-image-${index}`} 
                                                        className={`z-[30]`}
                                                    />
                                                }
                                            </div>
                                        </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </section>
    
    );
}