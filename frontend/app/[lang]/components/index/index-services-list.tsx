'use client'
import { components } from "@/api/strapi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import Image from 'next/image'
import { Noto_Sans_HK } from 'next/font/google'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

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
            <section className={`mt-[20px]`}>
                <h3 className={`${notoSansHK.className} text-[1.8rem] font-[400] text-[#0fa479] pl-[5px]`}>服務</h3>
                <div className={"relative w-full flex flex-col h-[250px] justify-center"}>
                    <div className={`absolute bg-[#0fa479] h-full w-[42%] z-[0]`} />
                    <div className={`grid grid-cols-[12%_88%] h-full flex items-center`}>
                        <div className={`h-full z-[20] grid grid-rows-[60%_40%]`}>
                            <div className={`flex flex-col justify-end items-center gap-[18px]`}>
                                <div className={`w-[43px] h-[43px] border flex justify-center items-center border-white text-white text-[1.7rem]`}>
                                    <MdOutlineArrowBackIos />
                                </div>
                                <div className={`w-[43px] h-[43px] border flex justify-center items-center border-white text-white text-[1.7rem]`}>
                                    <MdOutlineArrowForwardIos />
                                </div>
                            </div>
                            <div className={``}>
                                2
                            </div>
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
                            className={`w-full h-[70%] pb-[9px] overflow-hidden`}
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
                                                            className={`z-[0]`}
                                                        />
                                                    }
                                                </div>
                                            </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </section>
    
    );
}