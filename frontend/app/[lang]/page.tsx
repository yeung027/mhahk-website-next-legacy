import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from './dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import IndexGridCategoryList from "@/app/[lang]/components/index/grid-category-list";
import qs from "qs";

export default async function Profile({
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
  
  

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <section>
         {pageData.data && pageData.data.data && pageData.data.data.hero && pageData.data.data.hero.images &&
            pageData.data.data.hero.images.map((image) => {
              return <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} key={`index-hero`} />     
            })
         }
      </section>
      <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
   
      <IndexGridCategoryList pathname={"/"} items={pageData.data?.data?.grid_category_list} />
      <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
   
    </div>
    
  );
}