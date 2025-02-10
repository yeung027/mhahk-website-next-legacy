import { client } from "@/api";
import { components } from "@/api/strapi";
import Link from 'next/link'
import { getDictionary } from './dictionaries'
import Image from "next/image";

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: 'en-US' | 'nl' }>
}) {
  const pageResponse = await client.GET("/testings", {
  });

  const pageData = pageResponse;
  console.log(pageData)

  const lang = (await params).lang;
  const dict = await getDictionary(lang);
  console.log(lang)

  
  return (
    <div>
      {pageData.data?.data?.map((testing:components["schemas"]["Testing"]) => {
            return (
                <div key={`${testing.documentId}`}>
                    {`testing:${testing.abc}`}
                    <Link href="/nl">
      To /nl/another
    </Link>
    <Link href="/">
      To /us/another
    </Link>
    <div>{dict.products.cart}</div>
                </div>
            )
          })}
        <Image
                  className="dark:invert w-[300px]"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
                />
    </div>
    
  );
}