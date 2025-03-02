import { client } from "@/api";
import { getDictionary } from './dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import IndexGridCategoryList from "@/app/[lang]/components/index/index-grid-category-list";
import IndexTabsSection from "./components/index/index-tabs-section";
import IndexHero from "./components/index/index-hero";
import IndexServicesList from "./components/index/index-services-list";

export default async function Index({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);


  const pageData = await client.GET("/index-page", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          hero: {
            populate:['images'],
          },
          grid_category_list: {
            populate: ['bg_image','bg_image_mobile']
          }
        },
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
      }
    }
  });

  const services = await client.GET("/services", {
    params: {
      query: {
        // @ts-ignore
        populate: "index_cover"
        },
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
    }
  });

  //populate: "tabs_section.index.index-tabs-layout-left-and-right.*",
  const tabSectionData = await client.GET("/index-page", {
    params: {
      query: {
        // @ts-ignore
        populate: {
          tabs_section: {
            on: {
              "index.index-tabs-layout-left-and-right": {
                populate: {
                  pages: {
                    populate: {
                      items: {
                        populate: "image" // 取得items中的image
                      }
                    }
                  }
                }
              }
            }
          }
        },
        locale: lang === Locale.cn ? StrapiLocale.cn : StrapiLocale.zhhk,
      }
    }
  });
  
  // console.log(services.data?.data)

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <IndexHero data={pageData.data?.data?.hero} />
      <IndexGridCategoryList items={pageData.data?.data?.grid_category_list} />
      <IndexTabsSection items={tabSectionData.data?.data?.tabs_section} />
      <IndexServicesList services={services.data?.data} />
    </div>
    
  );
}