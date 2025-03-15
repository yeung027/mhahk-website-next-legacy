import { components } from "@/api/strapi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useState } from "react";
import { Noto_Sans_HK } from 'next/font/google'
import { FiMinus, FiPlus } from "react-icons/fi";

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
});

interface CollapsibleListSectionProps {
    section: components["schemas"]["PageCollapsibleListComponent"];
    index: number;
}

export function CollapsibleListSection({ section, index }: CollapsibleListSectionProps) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleItem = (j: number) => {
        setOpenIndexes(prev =>
            prev.includes(j) ? prev.filter(i => i !== j) : [...prev, j]
        );
    };

    return (
        <section key={`page-section-${index}`} className="flex flex-col mt-[4vw] xl:mt-[30px] gap-[5px]">
            {section.items &&
                section.items.map((item, j) => {
                    const isOpen = openIndexes.includes(j);
                    return (
                        <div 
                            key={`collapsible-item-${j}`} 
                            className={`grid grid-rows-[70px_1fr] ${notoSansHK.className} border-mainGreen border-2`}
                        >
                            {/* 標題區 */}
                            <div
                                className="
                                    grid grid-cols-[1fr_10%] items-center 
                                    px-[2vw] xl:px-[12px] 
                                    bg-mainGreen 
                                    text-white text-[1.125rem] font-[500] tracking-wider 
                                    cursor-pointer
                                "
                                onClick={() => toggleItem(j)}
                            >
                                <div>{item.title}</div>
                                <div className="flex justify-center">
                                    <div className="bg-[#EDF000] rounded-full h-[20px] w-[20px] text-mainGreen flex justify-center items-center">
                                        {isOpen ? <FiMinus /> : <FiPlus />}
                                    </div>
                                </div>
                            </div>

                            {/* 折疊內容區 */}
                            <div
                                className={`transition-all duration-300 overflow-hidden`}
                                style={{
                                    maxHeight: isOpen ? "1000px" : "0px", // 限制高度
                                    opacity: isOpen ? 1 : 0, // 淡入淡出效果
                                    padding: isOpen ? "12px" : "0px", // 收起時移除 padding
                                }}
                            >
                                {item.content && (
                                    <div className="prose prose-sm markdown-content-Noto-Sans-HK">
                                        <ReactMarkdown children={item.content} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
        </section>
    );
}
