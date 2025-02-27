'use client'
import { useEffect, useRef, useState } from "react";
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
    const [swiperKey, setSwiperKey] = useState(0); // 🔥 用來強制重新渲染 Swiper
    const [activeIndex, setActiveIndex] = useState<number>(1); // ✅ TypeScript 指定數字類型
    const swiperRef = useRef<SwiperClass | null>(null);

    // ✅ 監聽 Swiper 事件，確保類型安全
    const handleSlideChange = (swiper: SwiperClass) => {
        setActiveIndex(swiper.realIndex + 1); // Swiper Index 從 0 開始，+1 變成人類習慣
    };

    useEffect(() => {
        const handleResize = () => {
            setSwiperKey(prevKey => prevKey + 1); // 🔥 重新設定 key 讓 Swiper 重新渲染
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
        <section className="mt-[20px]">
            {/* 標題 */}
            <h3 className={`${notoSansHK.className} text-[1.8rem] font-[400] text-[#0fa479] pl-2`}>服務</h3>
            
            <div className="relative w-full flex flex-col h-[66vw] xl:h-[250px] justify-center">
                {/* 背景色塊 */}
                <div className="hidden xl:flex absolute bg-[#0fa479] h-full w-[42%] z-0 rounded-r-lg" />
                
                {/* Swiper + 按鈕 */}
                <div className="grid grid-rows-[24vw_auto] xl:grid-rows-1 xl:grid-cols-[12%_88%] h-full flex items-center">
                    
                    {/* 左側按鈕區 */}
                    <div className="h-full z-20 grid grid-cols-2 xl:grid-cols-1 xl:grid-rows-[60%_40%] bg-[#0fa479] xl:transparent gap-[4vw] xl:gap-0 pb-[4vw] xl:pb-[0px]">
                        <div className="flex flex-row xl:flex-col justify-end items-end xl:items-center gap-[4vw] xl:gap-4">
                            {/* 上一頁 */}
                            <button 
                                className="w-[7.7vw] h-[7.7vw] xl:w-11 xl:h-11 rounded-full border border-white flex justify-center 
                                items-center text-white text-[1.2rem] xl:text-2xl transition-all duration-200 hover:bg-white hover:text-[#0fa479]"
                                onClick={() => swiperRef.current?.slidePrev()}
                            >
                                <MdOutlineArrowBackIos />
                            </button>
                            {/* 下一頁 */}
                            <button 
                                className="w-[7.7vw] h-[7.7vw] xl:w-11 xl:h-11 rounded-full border border-white flex justify-center items-center 
                                text-white text-[1.2rem] xl:text-2xl transition-all duration-200 hover:bg-white hover:text-[#0fa479]"
                                onClick={() => swiperRef.current?.slideNext()}
                            >
                                <MdOutlineArrowForwardIos />
                            </button>
                        </div>
                        <div className={`text-white text-center flex justify-start xl:justify-center items-end xl:pb-[16%] gap-[5px] ${notoSerifHK.className}`}>
                            {/* 讓這個 div 控制對齊 */}
                            <div className="flex items-end">
                                <span className="text-[1.6rem] xl:text-[2rem] leading-none">{String(activeIndex).padStart(2, "0")} {/* ✅ 自動補 0 */}</span>
                            </div>
                            
                            <div className="flex items-end">
                                <span className="text-[1rem] xl:text-[1.3rem] leading-none">/</span>
                            </div>
                            
                            <div className="flex items-end">
                                <span className="text-[1rem] xl:text-[1.3rem] leading-none">{services? String(services.length).padStart(2, "0") : 0}</span>
                            </div>
                        </div>



                    </div>

                    {/* Swiper 輪播 */}
                    <Swiper 
                        key={swiperKey} // 🔥 每次 `setSwiperKey` 變更時，Swiper 會重新載入
                        breakpoints={{
                            1280: { slidesPerView: 2.5 }, // xl 以上
                            0: { slidesPerView: 1.1 } // xl 以下 (預設)
                        }}
                        spaceBetween={"2.5%"}
                        loop={true}
                        speed={1000} // 平滑動畫
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        modules={[Autoplay]}
                        className="w-full h-[85%] xl:h-[70%] pb-2 overflow-hidden"
                        onSlideChange={handleSlideChange}
                    >
                        {services &&
                            services.map((service, index) => (
                                <SwiperSlide 
                                    className="flex transition-all duration-300 hover:scale-105" 
                                    key={`SwiperSlide-${index}`}
                                >
                                    <div className="w-full h-[calc(100%-7px)] shadow-md bg-white flex flex-col justify-center p-4 relative overflow-hidden">
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
