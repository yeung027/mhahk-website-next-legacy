import Image from "next/image";
import { components } from "@/api/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "@/helpers/util";

interface ComponentSimpleProps {
    section:components["schemas"]["PageSimpleComponent"]
    index:number
}

export function SimpleSection({ section, index }: ComponentSimpleProps) 
{
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const bannerVisNow = useIsVisible(bannerRef, 0.3);
    const [bannerVis, setBannerVis] = useState<boolean>(false);
    const contentVisNow = useIsVisible(bannerRef, undefined);
    const [contentVis, setContentVis] = useState<boolean>(false);

    useEffect(() => {
        if (bannerVisNow && !bannerVis) {
            setBannerVis(true); // 只更新一次
        }
    }, [bannerVisNow, bannerVis]);

    useEffect(() => {
        if (contentVisNow && !contentVis) {
            setContentVis(true); // 只更新一次
        }
    }, [contentVisNow, contentVis]);
        
    return  <section 
                key={`page-section-${index}`} 
                className={` 
                        flex flex-col
                        p-0 m-0
                    `
                }
            >
                {section.banner &&
                    <div
                        ref={bannerRef}
                        className={`
                            w-fit max-w-full
                            delay-[0.1s] transition duration-[1s] ease-in-out
                            ${bannerVis? 'opacity-100 translate-x-[0]' : 'opacity-0 translate-x-[2vw] xl:translate-x-[10px]'}
                        `}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${section.banner.url}`} 
                            alt={section.banner.alternativeText || `Item Image ${index}`} // 提供 SEO 友善的 alt 文本
                            width={section.banner.width} // 設定寬度
                            height={section.banner.height} // 設定高度
                            className="w-full max-w-full object-cover"
                            priority={true}
                        />
                        <div 
                            className={`
                                py-0 mt-[5px]
                                w-full bg-mainGreen h-[9px]
                            `}
                        />
                    </div>
                }
                {section && section.content &&
                    <div
                        ref={contentRef}
                        className={`
                            prose prose-sm markdown-content-Noto-Sans-HK
                            delay-[0.9s] transition duration-[1s] ease-in-out
                            ${contentVis? 'opacity-100 translate-y-[0]' : 'opacity-0 -translate-y-[2vw] xl:-translate-y-[10px]'}
                        `}
                    >
                        <ReactMarkdown
                            children={section.content}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        />
                    </div>
                }
            </section>
}
/** END COMPONENT SIMPLE **/