import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from './dictionaries'
import {StrapiLocale, Locale} from "@/models/util";
import IndexGridCategoryList from "@/app/[lang]/components/index/grid-category-list";


export default async function Profile({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);


  const section1Data = await client.GET("/index-page", {
    params:{
      query:{
        populate:"hero.images",
        locale: lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
      }
    }
  });


  const section2Data = await client.GET("/index-page", {
    params:{
      query:{
        populate:"grid_category_list.bg_image",
        locale: lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
      }
    }
  });
  // console.log(section2Data)

  

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <section>
         {section1Data.data && section1Data.data.data && section1Data.data.data.hero && section1Data.data.data.hero.images &&
            section1Data.data.data.hero.images.map((image) => {
              return <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} key={`index-hero`} />     
            })
         }
      </section>
      {/* <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
    */}
      <IndexGridCategoryList pathname={"/"} items={section2Data.data?.data?.grid_category_list} />
      <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
   
    </div>
    
  );
}