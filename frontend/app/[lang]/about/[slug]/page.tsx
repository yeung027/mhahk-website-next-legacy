import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/app/[lang]/dictionaries'
import {StrapiLocale, Locale} from "@/models/util";


export default async function Profile({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);




  
  return (
    <div className={"w-full flex flex-col items-center"}>
      1111
    </div>
    
  );
}