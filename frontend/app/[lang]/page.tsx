import { client } from "@/api";
import { components } from "@/api/strapi";
import Link from 'next/link'
import { getDictionary } from './dictionaries'
import Image from "next/image";
import { comma } from "postcss/lib/list";

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: 'zh-HK' | 'cn' }>
}) {
  const pageResponse = await client.GET("/index-page", {
    params:{
      query:{
        populate:"hero.images"
      }
    }
  });

  const pageData = pageResponse;
  // pageData.data?.data?.hero?.map((hero) => {
  //   hero.images?.map((image) => {
  //     console.log(image)
  //   })
  // })

  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  // console.log(lang)

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <section>
         {pageData.data && pageData.data.data && pageData.data.data.hero &&
            pageData.data?.data?.hero?.map((hero) => {
              return <>
                  {
                    hero.images &&
                    hero.images?.map((image) => {
                      return <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${image.url}`} key={`index-hero`} /> 
                    })
                  }
                </>        
            })
         }
      </section>
      {/* <section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section><section>section2</section>
    */}
    </div>
    
  );
}