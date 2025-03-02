import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/app/[lang]/dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import AboutPageClient from "./client";

interface AboutProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

export default async function AboutPage({ params }: AboutProps) {

  const { lang, slug } = params; // 取得語系 & slug
  const dict = await getDictionary(lang); // 取得翻譯字典

  const dataFetch = await client.GET("/abouts", {
    params:{
      query:{
        // @ts-ignore
        populate:"*",
        locale: params.lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: {
            $eq: params.slug,
          },
        },
      }
    }
  });

  const about = dataFetch.data?.data?.[0] || undefined;
  console.log(about)

  

  return (
    <div className="w-full">
      <AboutPageClient locale={lang} slug={slug} about={about} />
    </div>
  );
}
