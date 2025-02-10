import 'server-only'
 
const dictionaries = {
  'zh-HK': () => import('./dictionaries/zh-HK.json').then((module) => module.default),
  cn: () => import('./dictionaries/cn.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'zh-HK' | 'cn') =>
  dictionaries[locale]()