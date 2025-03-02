import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/app/[lang]/dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import AboutPageClient from "./client";
import { notFound } from "next/navigation"; // ✅ 引入 `notFound()`

interface AboutProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

export default async function AboutPage({ params }: AboutProps) {

  const { lang, slug } = params; // 取得語系 & slug
  const dict = await getDictionary(lang); // 取得翻譯字典


  // filters: {
  //   slug: {
  //     $eq: params.slug,
  //   },
  // },
  const dataFetch = await client.GET("/abouts", {
    params:{
      query:{
        // @ts-ignore
        populate:"*",
        locale: params.lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
        
      }
    }
  });

console.log(dataFetch)
  if (!dataFetch || !dataFetch.data || !dataFetch.data.data) {
    return notFound();
  }
  else
  {
    const index = dataFetch.data?.data.findIndex((about) => about.slug === slug);
    if(index<=-1) return notFound();
  }

  return (
    <div className="">
      {dataFetch && dataFetch.data && dataFetch.data.data &&
        <AboutPageClient locale={lang} slug={slug} abouts={dataFetch.data.data} dict={dict} />
      }
      
    </div>
  );
}
