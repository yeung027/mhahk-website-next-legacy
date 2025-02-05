import { client } from "@/api";
import { components } from "@/api/strapi";

export default async function Profile() {
  const pageResponse = await client.GET("/testings", {
  });

  const pageData = pageResponse;
  console.log(pageData)
  return (
    <div>
      {pageData.data?.data?.map((testing:components["schemas"]["Testing"]) => {
            return (
                <div key={`${testing.documentId}`}>
                    {`testing:${testing.abc}`}
                </div>
            )
          })}
    </div>
  );
}