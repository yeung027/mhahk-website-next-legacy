import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/helpers/dictionaries'
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

  const safeParams = await Promise.resolve(params); // 確保 params 不是 pending

  if (!safeParams || !safeParams.lang || !safeParams.slug) {
    return notFound();
  }

  const { lang, slug } = safeParams;
  const dict = await getDictionary(lang); // 取得翻譯字典

  const dataFetch = await client.GET("/abouts", {
    params:{
      query:{
        // @ts-ignore
        populate:"*",
        locale: lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: {
            $eq: slug,
          },
        },
      }
    }
  });

  const listFetch = await client.GET("/abouts", {
    params: {
      query: {
        // @ts-ignore
        fields: ["slug", "title", "content"],
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
      },
    },
});

  const about = dataFetch.data?.data?.[0] || undefined;
  const list = listFetch.data?.data || [];
  console.log(about)

  if (!about) {
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