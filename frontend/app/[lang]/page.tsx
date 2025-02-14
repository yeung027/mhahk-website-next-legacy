import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from './dictionaries'
import {StrapiLocale, Locale} from "@/models/util";

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const pageResponse = await client.GET("/index-page", {
    params:{
      query:{
        populate:"hero.images",
        locale: lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk
      }
    }
  });

  const pageData = pageResponse;

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <section>
         {pageData.data && pageData.data.data && pageData.data.data.hero && pageData.data.data.hero.images &&
            pageData.data.data.hero.images.map((image) => {
              return <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} key={`index-hero`} />     
            })
         }
      </section>
      {/* <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
    */}
    </div>
    
  );
}