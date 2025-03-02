import { client } from "@/api";
import { components } from "@/api/strapi";
import { getDictionary } from '@/app/[lang]/dictionaries'
import {StrapiLocale, Locale} from "@/models/util";

interface AboutProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

export default async function About({ params }: AboutProps) {
  const { lang, slug } = params; // 取得語系 & slug
  const dict = await getDictionary(lang); // 取得翻譯字典

  return (
    <div className="w-full flex border-2 p-6">
      <h1 className="text-2xl font-bold">當前頁面：{slug}</h1>
      <p className="text-gray-600">語言：{lang}</p>
    </div>
  );
}
