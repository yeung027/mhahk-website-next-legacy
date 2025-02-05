import { client } from "@/api";
import { components } from "@/api/strapi";
import Link from 'next/link'

export default async function Profile({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const pageResponse = await client.GET("/testings", {
  });

  const pageData = pageResponse;
  console.log(pageData)

  const lang = (await params).lang;
  console.log(lang)

  
  return (
    <div>
      {pageData.data?.data?.map((testing:components["schemas"]["Testing"]) => {
            return (
                <div key={`${testing.documentId}`}>
                    {`testing:${testing.abc}`}
                    <Link href="/nl/ok" locale={"nl"}>
      To /nl/another
    </Link>
    <Link href="/ok" locale={"en-us"}>
      To /us/another
    </Link>
    <Link href="/nl-NL/ok" locale={"nl"}>
      To /nl-NL/another
    </Link>

    <Link href="/nl-NL/" locale={"nl"}>
      To /nl-NL/
    </Link>
                </div>
            )
          })}
    </div>
  );
}