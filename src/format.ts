import { locales } from './locales'

export function formatDate(date: Date, mask: string, locale: string): string {
  const replacements: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    YY: date.getFullYear().toString().slice(-2),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    h: date.getHours().toString(),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
    MMMM: locales[locale]?.months[date.getMonth()] || '',
    MMM: locales[locale]?.shortMonths[date.getMonth()] || ''
  }

  return mask.replace(
    /YYYY|YY|MMMM|MMM|MM|DD|HH|h|mm|ss/g,
    match => replacements[match] || match
  )
}
