import { client } from "@/api";
import {StrapiLocale, Locale} from "@/models/util";
import { Noto_Sans_HK } from 'next/font/google'
import Image from "next/image";

interface PageFooterProps {
    locale: Locale
}

const notoSansHK = Noto_Sans_HK({
    subsets: ['latin'],
    display: 'swap',
})

export default async function PageFooter({ locale } : PageFooterProps) {
    
    const data = await client.GET("/footer", {
        params:{
          query:{
            // @ts-ignore
            populate:{
                nav_groups:{
                    populate:{
                        subgroup:{
                            populate: "items"
                        }
                    }
                },
                xl_only_nav_icons:{
                    populate:"image"
                },
                icon_groups:{
                    populate:{
                        icons:{
                            populate:"image"
                        }
                    }
                },
                bottom_paragraphs:{
                    populate:"*"
                }
            },
            locale: locale== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk
          }
        }
      });

    return (
        <footer className={"flex flex-col mt-[50px]"}>
            <div className={`px-pageX xl:px-pageXLX pt-[30px] flex flex-col xl:grid xl:grid-cols-[25%_75%] bg-[#d3fac7] rounded-tl-[25px] rounded-tr-[25px] pb-[5vw] xl:pb-[20px]`}>
                <ul className={`hidden xl:flex flex-col gap-[7px]`}>
                    {data && data.data && data.data.data && data.data.data.xl_only_nav_icons &&
                        data.data.data.xl_only_nav_icons.map((icon, index) => {
                            return  <li key={`xl_only_nav_icons-${index}`}>
                                        {icon.image &&
                                            // <img 
                                            //     src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image.url}`} 
                                            //     key={`index-hero-image-${index}`} 
                                            //     className={``}
                                            // />
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image.url}`} 
                                                alt={icon.image.alternativeText || `Item Image ${index}`} // 提供 SEO 友善的 alt 文本
                                                width={150} // 設定寬度
                                                height={80} // 設定高度，根據 `max-h-[60px]`
                                                layout="intrinsic" // ✅ 自動維持圖片原始比例
                                                className=""
                                                priority={false} // 這裡不需要優先載入（如果是 Header 內的圖片才需要）
                                            />
                                                                                
                                        }
                                    </li>
                        })
                    }
                </ul>
                <nav className={`${notoSansHK.className} grid grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-[3vw] xl:gap-[7px] tracking-widest`}>
                    {data && data.data && data.data.data && data.data.data.nav_groups &&
                        data.data.data.nav_groups.map((group, x) => {
                            return  <div className={`flex flex-col gap-[4vw] xl:gap-[10px]`}>
                                        {group.subgroup &&
                                            group.subgroup.map((subgroup, y) => {
                                                return  <ul>
                                                            <li className={`font-[500] text-[0.875rem]`}>
                                                                {subgroup.title}
                                                            </li>
                                                            {subgroup.items &&
                                                                subgroup.items.map((item, z) => {
                                                                    return  <li className={`font-[200] text-[0.813rem] text-[#333333]`}>
                                                                                {item.title}
                                                                            </li>
                                                                })
                                                            }
                                                        </ul>
                                            })
                                        }
                                    </div>
                        })
                    }
                </nav>
            </div>
            <div className="bg-[#a2d6c7] ">
                <div className="hidden xl:flex flex-wrap xl:flex-col gap-[16px] py-[20px] px-pageX xl:px-pageXLX">
                {data?.data?.data?.icon_groups?.map((group, index) => (
                    <div key={`group-${index}`} className="flex justify-center items-center gap-[7px] flex-wrap">
                    {group.icons?.map((icon, iconIndex) => (
                        <div key={`icon-${index}-${iconIndex}`} className="w-[120px] h-[80px] flex justify-center items-center">
                        {/* {icon.image && icon.image.length > 0 && (
                            <img 
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image[0].url}`} 
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                            alt={`icon-${index}-${iconIndex}`}
                            />
                        )} */}
                        {icon.image && icon.image.length > 0 && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image[0].url}`}
                                alt={`icon-${index}-${iconIndex}`}
                                width={100} // ✅ 設定一個合理的預設寬度
                                height={100} // ✅ 設定一個合理的預設高度
                                layout="intrinsic" // ✅ 根據圖片原比例縮放
                                className="max-w-full max-h-full w-auto h-auto object-contain"
                            />
                        )}

                        </div>
                    ))}
                    </div>
                ))}
                </div>

                <div className="flex xl:hidden flex-wrap justify-center items-center xl:flex-col gap-[16px] py-[20px] px-pageX xl:px-pageXLX">
                {data?.data?.data?.icon_groups?.map((group, index) => (
                    <>
                    {group.icons?.map((icon, iconIndex) => (
                        <div key={`icon-${index}-${iconIndex}`} className="w-[120px] h-[80px] flex justify-center items-center">
                        {/* {icon.image && icon.image.length > 0 && (
                            <img 
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image[0].url}`} 
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                            alt={`icon-${index}-${iconIndex}`}
                            />
                        )} */}
                        {icon.image && icon.image.length > 0 && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image[0].url}`}
                                alt={`icon-${index}-${iconIndex}`}
                                width={100} // ✅ 設定一個合理的預設寬度
                                height={100} // ✅ 設定一個合理的預設高度
                                layout="intrinsic" // ✅ 根據圖片原比例縮放
                                className="max-w-full max-h-full w-auto h-auto object-contain"
                            />
                        )}
                        </div>
                    ))}
                    </>
                ))}
                </div>

                <div className={`flex flex-col justify-center items-center px-pageX xl:px-pageXLX ${notoSansHK.className} pb-[5vw] xl:pb-[23px] tracking-widest gap-[3vw] xl:gap-[0]`}>
                    {data?.data?.data?.bottom_paragraphs &&
                        data?.data?.data?.bottom_paragraphs.map((paragraph, index) => {
                            return  <p className="text-[0.625rem] leading-[1.2rem] xl:leading-[2rem] text-center">
                                        {Array.isArray(paragraph.content) &&
                                            paragraph.content.map((content) => {
                                                return  <>
                                                            {Array.isArray(content.children) &&
                                                                content.children.map((children:any) => {
                                                                    if(children.type && children.type=='text')
                                                                        return  <span
                                                                                    className={`
                                                                                        ${children.bold? 'font-[600]' : ''} 
                                                                                        ${children.italic? 'italic' : ''} 
                                                                                        ${children.underline? 'underline' : ''} 
                                                                                        ${children.strikethrough? 'line-through' : ''} 
                                                                                    `}
                                                                                >
                                                                                    {children.text && 
                                                                                        children.text
                                                                                    }
                                                                                </span>
                                                                    else if(children.type && children.type=='link')
                                                                        return  <a href={`${children.url? children.url : ''}`}>
                                                                                    {Array.isArray(children.children) &&
                                                                                        children.children.map((cc:any) => {
                                                                                            return  <span>
                                                                                                    {cc.text && 
                                                                                                        cc.text
                                                                                                    }
                                                                                                    </span>
                                                                                        })
                                                                                    }
                                                                                </a>
                                                                })
                                                            }
                                                        </>
                                            })
                                        }
                                    </p>
                        })
                    }
                </div>
                
            </div>

        </footer>
    )
}
