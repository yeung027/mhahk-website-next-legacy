import Link from 'next/link'
import Image from 'next/image'
import { LiaSearchSolid } from "react-icons/lia";
import MainMenu from "./MainMenu";
import { client } from "@/api";
import {StrapiLocale, Locale, PageCategory} from "@/models/util";
import { components } from '@/api/strapi';

interface PageHeaderProps {
    pathname: string,
    locale: Locale,
    category: PageCategory
  }

export default async function PageHeader({ pathname, locale, category } : PageHeaderProps) {
    
    const menuItemsFetch = await client.GET("/main-menu", {
        params:{
          query:{
            // @ts-ignore
            populate:{
                items:{
                    on: 
                    {
                        "main-menu.main-menu-item": {
                            populate:"*"
                        },
                        "main-menu.mainmenu-submenu": {
                            populate:"*"
                        }
                    }
                }
            },
            locale: locale== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
            filters:{
                root:true
            }
          }
        }
      });

      console.log(menuItemsFetch.data)
    //   const menuItems:components["schemas"]["MainMenu"][] | undefined = menuItemsFetch.data? menuItemsFetch.data.data : undefined

    return (
        <header className={"flex flex-col"}>
            <div className={"h-[49px] w-full bg-mainGreen hidden xl:flex flex-row-reverse px-[47px] items-center text-white text-[0.938rem]"}>
                <div className="ml-[33px] flex flex-row-reverse">
                    <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white text-[0.938rem]" type='search' placeholder="搜尋" />
                    <div className='absolute'>
                        <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                    </div>
                </div>
                <div className="">
                    <Link href={`zh-HK/${pathname}`}>
                        繁
                    </Link>
                    <span className='mx-[8px]'>|</span>
                    <Link href={`cn/${pathname}`}>
                        簡
                    </Link>
                </div>
            </div>
            <div className={"px-[7vw] xl:px-[30px] flex flex-col"}>
                <div className={"flex flex-col xl:grid xl:grid-cols-[500px_auto] pt-[5px] xl:pt-0"}>
                    <div className={"grid grid-cols-[90%_auto] xl:flex"}>
                        <div className={""}>
                            <Image
                                src="/header/logo.png"
                                width={474}
                                height={121}
                                alt="logo"
                                className={"w-[80vw] xl:w-[474px] xl:max-w-[474px] xl:h-[121px]"}
                                priority={true}
                            />
                        </div>
                        <div className={"mr-[-1vw] flex xl:hidden items-center justify-end text-[1.5rem]"}>
                            
                        </div>
                    </div>
                    <div className={"xl:w-full pl-[2vw] xl:pl-0 pt-[2vw] xl:pt-0 flex flex-row-reverse items-center place-self-start xl:place-self-center xl:pr-[70px]"}>
                        <Image
                            src="/header/donation.png"
                            width={90}
                            height={22}
                            alt="logo"
                            priority={true}
                            key={"img4ggg22"}
                            className={"cursor-pointer h-[26px] w-[88px] ml-[7px]"}
                        />
                        <Image
                            src="/header/youtube.png"
                            width={30}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img3gggg"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/fb.png"
                            width={30}
                            height={30}
                            alt="logo"
                            priority={true}
                            key={"img2gggg"}
                            className={"cursor-pointer"}
                        />
                        <Image
                            src="/header/ig.png"
                            width={30}
                            height={28}
                            alt="logo"
                            className={"w-[30px] h-[28px] mr-[1px] cursor-pointer"}
                            priority={true}
                            key={"imgggg1"}
                        />
                    </div>
                </div>
                
                {/* <MainMenu pathname={pathname} items={menuItems} category={category} /> */}

               
            </div>
        </header>
    )
}
