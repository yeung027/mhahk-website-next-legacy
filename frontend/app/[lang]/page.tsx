import { client } from "@/api";
import { components } from "@/api/strapi";
import Link from 'next/link'
import { getDictionary } from './dictionaries'
import Image from "next/image";

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: 'zh-HK' | 'cn' }>
}) {
  const pageResponse = await client.GET("/testings", {
  });

  const pageData = pageResponse;
  console.log(pageData)

  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  console.log(lang)

  
  return (
    <div className={"w-full flex flex-col items-center"}>
      <section>
         <Image
              src="/index/70thbanner.png"
              width={929}
              height={421}
              alt="logo"
              className={""}
              priority={true}
          />
      </section>
      <section>section2</section>
    </div>
    
  );
}