import { client } from "@/api";
import { components } from "@/api/strapi";
import Link from 'next/link'
import { getDictionary } from './dictionaries'

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: 'en' | 'nl' }>
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
                    <Link href="/nl" locale={"nl"}>
      To /nl/another
    </Link>
    <Link href="/" locale={"en-us"}>
      To /us/another
    </Link>
    <div>{dict.products.cart}</div>
                </div>
            )
          })}
    </div>
  );
}