'use client'
import { components } from "@/api/strapi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import Image from 'next/image'

interface IndexGridCategoryListProps {
    pathname: string,
    services:components["schemas"]["Service"][] | undefined
}


export default function IndexServicesList({ pathname, services } : IndexGridCategoryListProps) {
  

    return (
            <section className={"relative w-full mt-[20px] flex flex-col h-[358px] border"}>
                <h3 className={`absolute pl-[200px] pt-[70px]`}>title</h3>
                <div className={`grid grid-cols-[12%_88%] border-2 h-full flex items-center`}>
                    <div className={`border-2 h-full`}>
                        1
                    </div>
                    <Swiper 
                        slidesPerView={2.5}
                        loop={true}
                        // autoplay={{
                        //     delay: 2000,
                        //     disableOnInteraction: false,
                        // }}
                        modules={[Autoplay]}
                        className={`border-2 border-green-600 w-full h-[51%]`}
                    >
                        {services && services &&
                            services.map((service, index) => {
                                return  <SwiperSlide 
                                            className={`border-2 border border-rose-300 mr-[2.5%] flex content-center p-[3%]`} 
                                            key={`SwiperSlide-${index}`}
                                        >
                                            <Image
                                                src="/index/services/item_top.png"
                                                width={470}
                                                height={34}
                                                alt="logo"
                                                className={"w-full absolute top-0 left-0 z-[20]"}
                                                priority={true}
                                                key={"imgggg1"}
                                            />
                                            {service.index_cover&&
                                                <img 
                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.index_cover.url}`} 
                                                    key={`index-hero-image-${index}`} 
                                                    className={` z-[18]`}
                                                />
                                            }
                                        </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </section>
    
    );
}