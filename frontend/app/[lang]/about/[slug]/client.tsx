'use client'

import { Locale } from "@/models/util"
import { components } from "@/api/strapi";


interface AboutClientProps {
    locale:Locale,
    slug:string,
    about:components["schemas"]["About"] | undefined
}

export default function AboutPageClient({ locale, slug, about }: AboutClientProps) 
{


    return  <div>
                dsada
            </div>
}