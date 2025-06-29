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

export async function generateMetadata({ params }: AboutProps) {
  const { lang, slug, page } = params;

  const dataFetch = await client.GET("/pages", {
    params: {
      query: {
        populate: "*",
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: { $eq: page },
          group: { slug: { $eq: slug } },
        },
      },
    },
  });

  if (!dataFetch || !dataFetch.data || !dataFetch.data.data || dataFetch.data.data.length <= 0) {
    return {
      title: "Page Not Found | The Mental Health Association of Hong Kong 香港心理衞生會",
    };
  }

  const pageTitle = dataFetch.data.data[0]?.title || "Untitled Page";

  return {
    title: `${pageTitle} | The Mental Health Association of Hong Kong 香港心理衞生會`,
  };
}

export default async function AboutPage({ params }: AboutProps) {
  const safeParams = await Promise.resolve(params);

  if (!safeParams || !safeParams.lang || !safeParams.slug) {
    return notFound();
  }

  const { lang, slug, page } = safeParams;
  const dict = await getDictionary(lang);

  const dataFetch = await client.GET("/pages", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          banner: { populate: "*" },
          sections: {
            on: {
              "page.simple": { populate: "*" },
              "page.collapsible-list": { populate: "*" },
            },
          },
        },
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
        filters: {
          slug: { $eq: page },
          group: { slug: { $eq: slug } },
        },
      },
    },
  });

  const list = await client.GET("/pages", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          fields: ["title", "slug", "order"],
          group: { fields: ["title"] },
        },
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
        sort: "order:asc",
        filters: { group: { slug: { $eq: slug } } },
      },
    },
  });

  if (!dataFetch || !dataFetch.data || !dataFetch.data.data || dataFetch.data.data.length <= 0) {
    return notFound();
  }

  return (
    <div>
      {dataFetch.data.data[0] && list.data && list.data.data && (
        <PageClient
          locale={lang}
          slug={slug}
          page_slug={page}
          page={dataFetch.data.data[0]}
          list={list.data.data}
          dict={dict}
        />
      )}
    </div>
  );
}
