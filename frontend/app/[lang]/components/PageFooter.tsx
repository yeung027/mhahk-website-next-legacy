import { client } from "@/api";
import {StrapiLocale, Locale} from "@/models/util";
import { Noto_Serif_HK } from 'next/font/google'

interface PageFooterProps {
    locale: Locale
}

const notoSerifHK = Noto_Serif_HK({
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
            <div className={`px-pageX xl:px-pageXLX pt-[30px] flex flex-col xl:grid xl:grid-cols-[25%_75%] bg-[#d3fac7] rounded-tl-[25px] rounded-tr-[25px]`}>
                <ul className={`hidden xl:flex flex-col`}>
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
                <nav className={`border ${notoSerifHK.className}`}>
                    {data && data.data && data.data.data && data.data.data.nav_groups &&
                        data.data.data.nav_groups.map((group, x) => {
                            return  <div>
                                        {group.subgroup &&
                                            group.subgroup.map((subgroup, y) => {
                                                return  <ul>
                                                            <li className={`font-[500] text-[0.87rem]`}>
                                                                {subgroup.title}
                                                            </li>
                                                        </ul>
                                            })
                                        }
                                    </div>
                        })
                    }
                </nav>
            </div>
            <div className={`bg-[#a2d6c7]`}>
                icons
            </div>
        </footer>
    )
}
