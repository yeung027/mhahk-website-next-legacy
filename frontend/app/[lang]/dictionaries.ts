import 'server-only'
 
const dictionaries = {
  'zh-HK': () => import('./dictionaries/zh-HK.json').then((module) => module.default),
  'zh-CN': () => import('./dictionaries/cn.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'zh-HK' | 'zh-CN') =>
  dictionaries[locale]()