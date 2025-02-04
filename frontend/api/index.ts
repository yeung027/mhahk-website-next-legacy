// in src/api/index.ts
import createClient from "openapi-fetch";
import type { paths } from "./strapi";

const client = createClient<paths>({
  baseUrl: "http://127.0.0.1:1337/api",
  headers: {
    Accept: "application/json",
    Authorization:`Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  },
});
export { client };