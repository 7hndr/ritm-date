import { formatDate } from './format'
import { adjustDate } from './calc'
import { zeroTime } from './zeroing'
import { changeTimeZone } from './zone'
import { isValidDate } from './helpers'
import { formatMasks } from './constants'

export class RDate {
  private date: Date
  private locale: string = (
    navigator?.language || navigator?.languages?.[0]
  )?.startsWith('ru')
    ? 'ru'
    : 'en'

  constructor(input?: Date | string | number) {
    if (input instanceof Date) {
      this.date = new Date(input.getTime())
    } else if (typeof input === 'string' || typeof input === 'number') {
      const parsedDate = new Date(input)
      if (isValidDate(parsedDate)) {
        this.date = parsedDate
      } else {
        throw new Error('Invalid date input')
      }
    } else {
      this.date = new Date()
    }
  }

  format(mask: string): string | number {
    switch (mask) {
      case 'iso':
        return formatDate(this.date, formatMasks.iso, this.locale)
      case 'l':
        return formatDate(this.date, formatMasks.lite, this.locale)
      case 'x':
      case 'X':
        return Date.parse(this.date.toString())

      default:
        return formatDate(this.date, mask ?? formatMasks.default, this.locale)
    }
  }

  setLocale(locale: string): this {
    this.locale = locale
    return this
  }

  calc(
    value: number,
    unit: 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes'
  ): this {
    this.date = adjustDate(this.date, value, unit)
    return this
  }

  zeroing(): this {
    this.date = zeroTime(this.date)
    return this
  }

  zone(offset: number): this {
    this.date = changeTimeZone(this.date, offset)
    return this
  }

  isValid(): boolean {
    return isValidDate(this.date)
  }
}
