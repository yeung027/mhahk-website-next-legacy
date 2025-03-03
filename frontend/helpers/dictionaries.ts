import 'server-only'
 
const dictionaries = {
  'zh-HK': () => import('../app/[lang]/dictionaries/zh-HK.json').then((module) => module.default),
  'zh-CN': () => import('../app/[lang]/dictionaries/zh-CN.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'zh-HK' | 'zh-CN') =>
  dictionaries[locale]()