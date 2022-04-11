import names from './names.js'

export default class RitmDate {
	constructor(initialDate = null) {
		this.date = initialDate ? new Date(initialDate) : null
	}

	#offset = new Date().getTimezoneOffset() / 60
	#userOffset = null
	#locale = 'en'
	#availableLocales = ['en', 'ru']
	#spare = '—'
	#timestamp = null
	#ISO = null

	#units = {
		day: 86400000,
		days: 86400000,
		hour: 3600000,
		hours: 3600000,
		minutes: 60000,
		minute: 60000
	}

	#logError(error) {
		console.warn(`Incorrect ${error}!`)
	}

	#reset() {
		this.#spare = '—'
		this.date = null
		this.#timestamp = null
		this.#userOffset = null
	}

	#parseMask(m, parsedDate) {
		let mask = m
		const keys = Object.keys(parsedDate)

		keys.forEach(k => {
			mask = mask.replace(k, parsedDate[k])
		})

		this.#reset()
		return mask
	}

	#split(date, offset, userOffset) {
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
		const monthNames = names.months[this.#locale]
		const weekNames = names.weeks[this.#locale]

		return {
			YYYY: year,
			YY: String(year).slice(2, 4),
			MMMM: monthNames.full[month],
			MMM: monthNames.short[month],
			MM: twoDigit(month + 1),
			M: month + 1,
			DD: twoDigit(dateNumber),
			D: dateNumber,
			ddd: weekNames.full[day],
			dd: weekNames.short[day],
			HH: twoDigit(hours),
			h: hours % 12 || 12,
			mm: twoDigit(minutes),
			ss: twoDigit(seconds),
			offset: getOffset(offset, userOffset),
			_instance: date
		}
	}

	#getIso(parsedDate) {
		const { YYYY, MM, DD, HH, mm, ss, offset } = parsedDate
		return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}${offset}`
	}

	format(mask) {
		if (!this.isValid(this.date)) return this.#spare

		this.#timestamp = Date.parse(this.date)

		if (mask === 'x' || mask === 'X') return this.#timestamp

		const parsedDate = this.#split(this.date, this.#offset, this.#userOffset)

		this.#ISO = this.#getIso(parsedDate)

		if (mask?.toUpperCase() === 'ISO') {
			this.#reset()

			return this.#ISO
		} else {
			if (mask !== 'l') {
				mask = mask || 'DD.MM.YYYY • HH:mm'
			} else mask = 'D/M/YY'
			return this.#parseMask(mask, parsedDate)
		}
	}

	// Chaining items
	zone(offset) {
		if (typeof offset !== 'number') {
			this.#logError('zone offset, must be number')
		} else {
			this.userOffset = offset
		}
		return this
	}

	setSpare(spare) {
		if (typeof spare !== 'string') {
			this.#logError('spare, must be string')
		} else {
			this.#spare = spare
		}
		return this
	}

	setLocale(locale) {
		if (this.#availableLocales.includes(locale)) {
			this.#locale = locale
		} else {
			this.#logError('localization')
		}
		return this
	}

	calc(quantity, unit) {
		if (this.isValid(this.date)) {
			const u = this.#units[unit]
			const time = this.date.getTime()
			this.date.setTime(time + quantity * u)
		}
		return this
	}

	zeroing() {
		if (this.isValid(this.date)) {
			this.date.setHours(0)
			this.date.setMinutes(0)
			this.date.setSeconds(0)
		}
		return this
	}

	// Utils

	isValid(d) {
		const date = new Date(d)
		return d && !isNaN(Date.parse(date))
	}

	secondsToTime(initial) {
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