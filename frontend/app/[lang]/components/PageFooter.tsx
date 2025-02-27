import { client } from "@/api";
import {StrapiLocale, Locale} from "@/models/util";
import { Noto_Sans_HK } from 'next/font/google'

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

    console.log(data)

    return (
        <footer className={"flex flex-col mt-[50px]"}>
            <div className={`px-pageX xl:px-pageXLX pt-[30px] flex flex-col xl:grid xl:grid-cols-[25%_75%] bg-[#d3fac7] rounded-tl-[25px] rounded-tr-[25px] pb-[5vw] xl:pb-[20px]`}>
                <ul className={`hidden xl:flex flex-col gap-[7px]`}>
                    {data && data.data && data.data.data && data.data.data.xl_only_nav_icons &&
                        data.data.data.xl_only_nav_icons.map((icon, index) => {
                            return  <li key={`xl_only_nav_icons-${index}`}>
                                        {icon.image &&
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image.url}`} 
                                                key={`index-hero-image-${index}`} 
                                                className={``}
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
            <div className="bg-[#a2d6c7] flex flex-col gap-[16px] py-[20px] px-pageX xl:px-pageXLX ">
            {data?.data?.data?.icon_groups?.map((group, index) => (
                <div key={`group-${index}`} className="flex justify-center items-center gap-[7px] flex-wrap">
                {group.icons?.map((icon, iconIndex) => (
                    <div key={`icon-${index}-${iconIndex}`} className="w-[120px] h-[80px] flex justify-center items-center">
                    {icon.image && icon.image.length > 0 && (
                        <img 
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon.image[0].url}`} 
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        alt={`icon-${index}-${iconIndex}`}
                        />
                    )}
                    </div>
                ))}
                </div>
            ))}
            </div>
        </footer>
    )
}
