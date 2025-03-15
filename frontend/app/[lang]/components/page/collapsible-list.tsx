import { components } from "@/api/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "@/helpers/util";
import { Noto_Sans_HK } from 'next/font/google'

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

interface CollapsibleListSectionProps {
    section:components["schemas"]["PageCollapsibleListComponent"]
    index:number
}

export function CollapsibleListSection({ section, index }: CollapsibleListSectionProps) 
{
    const contentRef = useRef<HTMLDivElement | null>(null);
    
    
    const contentVisNow = useIsVisible(contentRef, undefined);
    const [contentVis, setContentVis] = useState<boolean>(false);

    

    useEffect(() => {
        if (contentVisNow && !contentVis) {
            setContentVis(true); // 只更新一次
        }
    }, [contentVisNow, contentVis]);
        
    return  <section 
                key={`page-section-${index}`} 
                className={` 
                        flex flex-col
                        mt-[4vw] xl:mt-[30px]
                    `
                }
            >
                {section.items &&
                    section.items.map((item, j) => {
                        return  <div 
                                 className={`
                                    grid grid-rows-[10vw_1fr] xl:grid-rows-[70px_1fr] 
                                    ${notoSansHK.className}
                                    border-mainGreen border-2
                                `}
                                >
                                    <div 
                                        className={`
                                            
                                            flex items-center px-[2vw] xl:px-[12px]
                                            bg-mainGreen text-white text-[1.125rem] font-[500] tracking-wider
                                            

                                        `}
                                    >
                                        {item.title}
                                    </div>
                                    <div 
                                        className={`border-sky-300

                                        `}
                                    >
                                        {item && item.content &&
                                            <div
                                                ref={contentRef}
                                                className={`
                                                    
                                                    my-0
                                                    prose prose-sm markdown-content-Noto-Sans-HK
                                                `}
                                            >
                                                <ReactMarkdown
                                                    children={item.content}
                                                    remarkPlugins={[remarkGfm]}
                                                    rehypePlugins={[rehypeRaw]}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                    })
                }
                
            </section>
}