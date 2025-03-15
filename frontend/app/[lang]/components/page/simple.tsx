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
                        p-0 m-0
                    `
                }
            >
                
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