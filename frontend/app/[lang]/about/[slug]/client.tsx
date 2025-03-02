'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";


interface AboutClientProps {
    locale:Locale,
    slug:string,
    dict:any,
    about:components["schemas"]["About"]
}

export default function AboutPageClient({ locale, slug, dict, about }: AboutClientProps) 
{


    return  <div
                className={`
                            flex flex-col xl:grid xl:grid-cols-[220px_1fr]
                            gap-0 xl:gap-[25px]
                            `}
            >
                <div
                    className={`border-4 border-sky-300`}
                >
                    {dict?.about?.title}
                </div>
                <div
                    className={`border-4 border-purple-300`}
                >
                    2
                </div>
            </div>
}

interface SidebarProps {
    dict:any,
    about:components["schemas"]["About"] | undefined
}

export function Sidebar({ dict, about }: SidebarProps) 
{
    return <></>
}