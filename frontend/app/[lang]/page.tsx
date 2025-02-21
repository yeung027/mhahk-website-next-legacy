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

  const section1 = await client.GET("/index-page", {
    params:{
      query:{
        populate:"hero.images",
        locale: lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
      }
    }
  });

  const section1Data = section1;

  const section2 = await client.GET("/index-page", {
    params:{
      query:{
        populate:"grid_category_list.bg_image",
        locale: lang== Locale.cn?  StrapiLocale.cn : StrapiLocale.zhhk,
      }
    }
  });
  const section2Data = section2;
  console.log(section2Data)

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <section>
         {section1Data.data && section1Data.data.data && section1Data.data.data.hero && section1Data.data.data.hero.images &&
            section1Data.data.data.hero.images.map((image) => {
              return <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} key={`index-hero`} />     
            })
         }
      </section>
      <section className={"w-full mt-[20px] grid grid-cols-3 gap-4"}>
        {section2Data.data && section2Data.data.data && section2Data.data.data.grid_category_list &&
          section2Data.data.data.grid_category_list.map((item) => {
            return  <div 
                      style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.bg_image?.url}")`}} 
                      className={`h-[170px] flex text-[#00a0e9] font-Noto_Sans_HK font-[400] text-[36px]`}
                    >
                      <div className={"self-end mb-[12px] ml-[30px] h-[80px] w-[60%] flex"}>
                        <span className={" transition duration-300 ease-in-out flex self-center"}>
                        {item.title}
                        </span>
                      </div>
                    </div>
          })
        }
      </section>
      {/* <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
    */}
    </div>
    
  );
}