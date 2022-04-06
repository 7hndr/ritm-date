export default class RitmDate {
  constructor (initialDate = null) {
    this.date = initialDate ? new Date(initialDate) : null
    this.offset = new Date().getTimezoneOffset() / 60
    this.weekDayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    this.monthNames = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ]
    this.userOffset = null
    this.spare = '—'
    this.parsed = null
    this.result = null
    this.ISO = null
    this.units = {
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000
    }
  }

  _reset () {
    this.spare = '—'
    this.date = null
    this.parsed = null
    this.userOffset = null
  }

  _isValid (d) {
    const date = new Date(d)
    return d && !isNaN(Date.parse(date))
  }

  _parseMask (m, parsedDate) {
    let mask = m
    const keys = Object.keys(parsedDate)
    keys.forEach(k => {
      mask = mask.replace(k, parsedDate[k])
    })

    this._reset()
    return mask
  }

  _split (date, offset, userOffset) {
    const twoDigit = v => {
      return v >= 10 ? v : `0${v}`
    }

    const getOffset = (offset, userOffset) => {
      const os = userOffset ?? offset
      const h = Math.abs(Math.floor(os))
      const m = Math.abs((os % 1).toFixed(1) * 10)
      return `${os >= 0 ? '-' : '+'}${twoDigit(h)}:${twoDigit(m)}`
    }

    if (typeof userOffset === 'number') {
      const h = date.getHours()
      const abs = Math.abs(userOffset)
      const o = userOffset >= 0 ? h - abs : h + abs
      date.setHours(offset + o)
    }

    const year = date.getFullYear()
    const month = date.getMonth()
    const dateNumber = date.getDate()
    const day = date.getDay()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return {
      YYYY: year,
      YY: String(year).slice(2, 4),
      MMMM: this.monthNames[month],
      MMM: this.monthNames[month]?.slice(0, 3),
      MM: twoDigit(month + 1),
      M: month + 1,
      DD: twoDigit(dateNumber),
      D: dateNumber,
      dd: this.weekDayNames[day],
      HH: twoDigit(hours),
      h: hours % 12 || 12,
      mm: twoDigit(minutes),
      ss: twoDigit(seconds),
      offset: getOffset(offset, userOffset),
      _instance: date
    }
  }

  getIso (parsedDate) {
    const { YYYY, MM, DD, HH, mm, ss, offset } = parsedDate
    return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}${offset}`
  }

  format (d, m, spare) {
    if (arguments.length === 1 && typeof d === 'string' && !this._isValid(d)) {
      m = d
      d = undefined
    }
    if (spare) this.spare = spare

    if (!d && !this._isValid(this.date)) return this.spare
    if (d && !this.date) {
      this.date = new Date(d)
    }
    this.parsed = Date.parse(this.date)

    if (m === 'x') return this.parsed

    const { offset, userOffset, date } = this
    const parsedDate = this._split(date, offset, userOffset)

    this.ISO = this.getIso(parsedDate)

    if (m?.toUpperCase() === 'ISO') {
      this._reset()

      return this.ISO
    } else {
      let mask
      if (m !== 'l') {
        mask = m || 'DD.MM.YYYY • HH:mm'
      } else mask = 'D/M/YY'
      return this._parseMask(mask, parsedDate)
    }
  }

  // Chaining items
  zone (offset) {
    this.userOffset = offset
    return this
  }

  calc (quantity, unit, date) {
    this.date = date
      ? this._isValid(date)
        ? new Date(date)
        : this.date
      : this.date

    if (!this.date) return this

    const u = this.units[unit]
    const time = this.date.getTime()
    this.date.setTime(time + quantity * u)

    return this
  }

  zeroing (date) {
    this.date = date
      ? this._isValid(date)
        ? new Date(date)
        : this.date
      : this.date

    if (!this.date) return this

    this.date.setHours(0)
    this.date.setMinutes(0)
    this.date.setSeconds(0)
    return this
  }

  // Other

  secondsToTime (initial) {
    const twoDigit = v => {
      return v >= 10 ? v : `0${v}`
    }

    const hours = Math.floor(initial / (60 * 60))
    const divisor_for_minutes = initial % (60 * 60)
    const minutes = Math.floor(divisor_for_minutes / 60)
    const divisor_for_seconds = divisor_for_minutes % 60
    const seconds = Math.ceil(divisor_for_seconds)

    return `${twoDigit(hours)}:${twoDigit(minutes)}:${twoDigit(seconds)}`
  }
}