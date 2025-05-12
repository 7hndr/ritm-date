import { locales } from './locales'

const pad = (n: number, len = 2): string => String(n).padStart(len, '0')

const getOffsetString = (date: Date): string => {
  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const absMinutes = Math.abs(offsetMinutes)
  const hours = pad(Math.floor(absMinutes / 60))
  const minutes = pad(absMinutes % 60)
  return `${sign}${hours}:${minutes}`
}

const applyMask = (mask: string, parts: Record<string, string>): string => {
  const tokens = Object.keys(parts).sort((a, b) => b.length - a.length)
  const abbreviationsRegex = new RegExp(tokens.join('|'), 'g')
  return mask.replace(abbreviationsRegex, match => parts[match] ?? match)
}

// prettier-ignore
export const formatDate = (date: Date,  mask: string,  locale: string = 'en'): string => {
  const monthIndex = date.getMonth()
  const loc = locales[locale] ?? { months: [], shortMonths: [] }
  const parts = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MM: pad(monthIndex + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    h: String(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    MMMM: loc.months[monthIndex] || '',
    MMM: loc.shortMonths[monthIndex] || '',
    ZZ: getOffsetString(date)
  }

  return applyMask(mask, parts)
}
