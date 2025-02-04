import { client } from "@/api";
import type { paths } from "../../api/strapi";

export default async function Profile() {
  const pageResponse = await client.GET("/testings", {
  });

  const pageData = pageResponse;
  console.log(pageData)
  return (
    <div>
      okok
    </div>
  );
}