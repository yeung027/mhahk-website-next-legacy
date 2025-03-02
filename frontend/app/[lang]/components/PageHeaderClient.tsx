"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LiaSearchSolid } from "react-icons/lia";

import {StrapiLocale, Locale, PageCategory} from "@/models/util";


interface PageHeaderClientProps {
    pathname: string,
    locale: Locale,
    category: PageCategory
  }

export default function PageHeaderClient({ pathname, locale, category } : PageHeaderClientProps) {
    const currentPathname = usePathname(); // 獲取當前 URL

    // 移除 `/zh-HK/` 或 `/zh-CN/`，確保 pathname 不會重複語系
    const cleanPathname = currentPathname.replace(/^\/(zh-HK|zh-CN)/, "");

    return (
            <div className={"h-[49px] w-full bg-mainGreen hidden xl:flex flex-row-reverse px-[47px] items-center text-white text-[0.938rem]"}>
                <div className="ml-[33px] flex flex-row-reverse">
                    <input className="text-white bg-[#4db093] focus:bg-[#61b99f] h-[27px] rounded-[3px] px-[7px] w-[124px] placeholder-white text-[0.938rem]" type='search' placeholder="搜尋" />
                    <div className='absolute'>
                        <LiaSearchSolid className='h-[27px] text-[1.3rem] text-white mr-[7px] cursor-pointer' />
                    </div>
                </div>
                <div className="">
                    <Link href={`/zh-HK${cleanPathname}`} className={locale === "zh-HK" ? "font-bold" : ""}>
                        繁
                    </Link>
                    <span className='mx-[8px]'>|</span>
                    <Link href={`/zh-CN${cleanPathname}`} className={locale === "zh-CN" ? "font-bold" : ""}>
                        簡
                    </Link>
                </div>
            </div>
    )
}
