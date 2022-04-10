# ritm-date

Really lightweight fast date &amp; time formatter

1. npm install ritm-date
2. import RitmDate from 'ritm-date' at your .js file
3. use it

```js
const dateFormatter = date => {
	return new RitmDate(date)
}

dateFormatter(new Date()).format()
// Output: '01.02.2022 • 00:00'

dateFormatter('2022-02-01T00:00:00+03:00').format()
// Output: '01.02.2022 • 00:00'

dateFormatter(new Date()).format('iso')
// Output: '2022-02-01T00:00:00+03:00'

dateFormatter(new Date()).format('DD-MM-YY')
// Output: '01-02-2022'

dateFormatter(new Date()).setLocale('ru').format('DD MMM YY')
// Output: '01 Фев 2022'

dateFormatter(new Date()).setLocale('en').format('DD MMM YY')
// Output: '01 Feb 2022'

dateFormatter(new Date()).setLocale('en').format('DD ** MMMM ** YY')
// Output: '01 ** February ** 2022'

dateFormatter(new Date()).format('DD*MM&YY::HH:mm')
// Output: '01*02&22::00:00'

dateFormatter(new Date()).calc(-10, 'days').calc(1, 'hour').format()
// You can use day/days, hour/hours, minute/minutes
// Output: '22.01.2022 • 02:00'

dateFormatter('2022-02-01T12:34:56+03:00').zeroing().format('iso')
// Zeroing time
// Output: '2022-02-01T00:00:00+03:00'

dateFormatter(new Date()).zone(1).format('iso')
// Output: '2022-01-31T20:00:00-01:00'

dateFormatter(new Date()).format('x')
// Output: 1643662800000 <-- Timestamp

dateFormatter(new Date()).format('l')
// Short format, e.g. for comparing dates
// Output: 1/2/22 <-- Timestamp
```

## Utils

```js
...
dateFormatter().seconsToTime(12213)
// Output: 03:23:33 (3h, 23m, 33s)

dateFormatter().seconsToTime(123)
// Output: 00:02:03 (0h, 2m, 3s)

dateFormatter().isValid(new Date())
// Output: true

dateFormatter().isValid(new Date('grrr!'))
// Output: false

// Locales: en/ru
// Available abbreviations for masks YYYY, YY, MMMM, MMM, MM, M, DD, D, dd, ddd, HH, h, mm, ss
```
