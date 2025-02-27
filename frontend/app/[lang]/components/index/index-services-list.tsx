'use client'
import { useRef, useState } from "react";
import { components } from "@/api/strapi";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";
import Image from 'next/image'
import { Noto_Sans_HK, Noto_Serif_HK } from 'next/font/google'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

const notoSerifHK = Noto_Serif_HK({
    subsets: ['latin'],
    display: 'swap',
})

interface IndexGridCategoryListProps {
    pathname: string,
    services:components["schemas"]["Service"][] | undefined
}

export default function IndexServicesList({ pathname, services } : IndexGridCategoryListProps) {

    const [activeIndex, setActiveIndex] = useState<number>(1); // ✅ TypeScript 指定數字類型
    const swiperRef = useRef<SwiperClass | null>(null);

    // ✅ 監聽 Swiper 事件，確保類型安全
    const handleSlideChange = (swiper: SwiperClass) => {
        setActiveIndex(swiper.realIndex + 1); // Swiper Index 從 0 開始，+1 變成人類習慣
    };

    return (
        <section className="mt-[20px]">
            {/* 標題 */}
            <h3 className={`${notoSansHK.className} text-[1.8rem] font-[400] text-[#0fa479] pl-2`}>服務</h3>
            
            <div className="relative w-full flex flex-col h-[250px] justify-center">
                {/* 背景色塊 */}
                <div className="absolute bg-[#0fa479] h-full w-[42%] z-0 rounded-r-lg" />
                
                {/* Swiper + 按鈕 */}
                <div className="grid grid-cols-[12%_88%] h-full flex items-center">
                    
                    {/* 左側按鈕區 */}
                    <div className="h-full z-20 grid grid-rows-[60%_40%]">
                        <div className="flex flex-col justify-end items-center gap-4">
                            {/* 上一頁 */}
                            <button 
                                className="w-11 h-11 rounded-full border border-white flex justify-center 
                                items-center text-white text-2xl transition-all duration-200 hover:bg-white hover:text-[#0fa479]"
                                onClick={() => swiperRef.current?.slidePrev()}
                            >
                                <MdOutlineArrowBackIos />
                            </button>
                            {/* 下一頁 */}
                            <button 
                                className="w-11 h-11 rounded-full border border-white flex justify-center items-center 
                                text-white text-2xl transition-all duration-200 hover:bg-white hover:text-[#0fa479]"
                                onClick={() => swiperRef.current?.slideNext()}
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                        <div className={`text-white text-center flex justify-center items-end pb-[16%] gap-[5px] ${notoSerifHK.className}`}>
                            {/* 讓這個 div 控制對齊 */}
                            <div className="flex items-end">
                                <span className="text-[2rem] leading-none">{String(activeIndex).padStart(2, "0")} {/* ✅ 自動補 0 */}</span>
                            </div>
                            
                            <div className="flex items-end">
                                <span className="text-[1.3rem] leading-none">/</span>
                            </div>
                            
                            <div className="flex items-end">
                                <span className="text-[1.3rem] leading-none">{services? String(services.length).padStart(2, "0") : 0}</span>
                            </div>
                        </div>



                    </div>

                    {/* Swiper 輪播 */}
                    <Swiper 
                        slidesPerView={2.5}
                        spaceBetween={"2.5%"}
                        loop={true}
                        speed={1000} // 平滑動畫
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Autoplay]}
                        className="w-full h-[70%] pb-2 overflow-hidden"
                        onSlideChange={handleSlideChange}
                    >
                        {services &&
                            services.map((service, index) => (
                                <SwiperSlide 
                                    className="flex transition-all duration-300 hover:scale-105" 
                                    key={`SwiperSlide-${index}`}
                                >
                                    <div className="w-full h-[calc(100%-7px)] shadow-lg bg-white flex flex-col justify-center p-4 relative overflow-hidden">
                                        {/* 上方裝飾圖 */}
                                        <Image
                                            src="/index/services/item_top.png"
                                            width={470}
                                            height={34}
                                            alt="logo"
                                            className="w-full absolute top-0 left-0 z-10"
                                            priority={true}
                                        />
                                        {/* 服務封面圖片 */}
                                        {service.index_cover &&
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.index_cover.url}`} 
                                                key={`index-hero-image-${index}`} 
                                                className="z-0 w-full h-auto object-cover"
                                            />
                                        }
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
