import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/helpers/dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import { notFound } from "next/navigation"; // ✅ 引入 `notFound()`
import AboutPageClient from "./client";

interface AboutProps {
  params: {
    lang: Locale;
    slug: string;
    page:string;
  };
}

export default async function AboutPage({ params }: AboutProps) {

  const safeParams = await Promise.resolve(params); // 確保 params 不是 pending

  if (!safeParams || !safeParams.lang || !safeParams.slug) {
    return notFound();
  }

  const { lang, slug, page } = safeParams;
  const dict = await getDictionary(lang); // 取得翻譯字典

  const dataFetch = await client.GET("/page-groups", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          pages:{
            populate:"*"
          }
        },
        locale: lang == Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: { $eq: slug }
        },
      },
    },
  });
  


  // console.log(dataFetch)

  if (!dataFetch || !dataFetch.data || !dataFetch.data.data || dataFetch.data.data.length<=0) {
    return notFound();
  }

  return (
    <div className="">
      {about && 
              <AboutPageClient locale={lang} slug={slug} about={about} dict={dict} list={list} />
            }
    </div>
  );
}