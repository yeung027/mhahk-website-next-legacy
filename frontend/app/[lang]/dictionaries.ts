import 'server-only'
 
const dictionaries = {
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en-US' | 'nl') =>
  dictionaries[locale]()