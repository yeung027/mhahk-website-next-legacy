import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/helpers/dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import { notFound } from "next/navigation"; // ✅ 引入 `notFound()`
import PageClient from "./client";

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

  const dataFetch = await client.GET("/pages", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          sections:{
            on:{
              "page.simple": {
                populate: "*"
              }
            }
          }
        },
        locale: lang == Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: { $eq: page },
          group:{
            slug:{ $eq: slug }
          }
        },
      },
    },
  });

  const list = await client.GET("/page-groups", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          pages: {
            fields: ["title", "slug"], 
          },
        },
        locale: lang == Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: { $eq: slug }
        },
      },
    },
  });
  
  


  console.log(dataFetch)

  if (!dataFetch || !dataFetch.data || !dataFetch.data.data || dataFetch.data.data.length<=0) {
    return notFound();
  }

  return (
    <div className="">
      {dataFetch && dataFetch.data && dataFetch.data.data && dataFetch.data.data[0] &&
        list && list.data && list.data.data && list.data.data[0] && list.data.data[0].pages &&
              <PageClient locale={lang} slug={slug} page_slug={page} page={dataFetch.data.data[0]} list={list.data.data[0]} dict={dict} />
            }
    </div>
  );
}