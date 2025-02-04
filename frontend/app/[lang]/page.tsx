"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./utils/fetch-api";

import Loader from "./components/Loader";
import PageHeader from "./components/PageHeader";
import PostList from "./components/PostList";



export default function Profile() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>([]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
          const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
          const path = `/testings`;
          const urlParamsObject = {
           
          };
          const options = { headers: { Authorization: `Bearer ${token}` } };
          const responseData = await fetchAPI(path, urlParamsObject, options);
          console.log(token)
          console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL)
          console.log(`data:${responseData}`)
          console.log(responseData)
          setData(responseData.data);

        } catch (error) {
            console.error('oh my god');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, []);

      useEffect(() => {
        fetchData();
      }, [fetchData]);
    
      if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader heading="Our Blog" text="Checkout Something Cool" />
      <PostList data={data}>
            123123
    </PostList>
    </div>
  );
}