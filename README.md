# ritm-date

[![npm version](https://badge.fury.io/js/ritm-date.svg)](https://badge.fury.io/js/ritm-date)

Really lightweight, fast date &amp; time formatter

1. npm install ritm-date
2. import rDate from 'ritm-date' at your .js file
3. use it

```js
rDate(new Date()).format()
// Output: '01.02.2022 • 00:00'

rDate('2022-02-01T00:00:00+03:00').format()
// Output: '01.02.2022 • 00:00'

rDate(new Date()).format('iso')
// Output: '2022-02-01T00:00:00+03:00'

rDate(new Date()).format('DD-MM-YY')
// Output: '01-02-2022'

rDate(new Date()).setLocale('ru').format('DD MMM YY')
// Output: '01 Фев 2022'

rDate(new Date()).setLocale('en').format('DD MMM YY')
// Output: '01 Feb 2022'

rDate(new Date()).setLocale('en').format('DD ** MMMM ** YY')
// Output: '01 ** February ** 2022'

rDate(new Date()).format('DD*MM&YY::HH:mm')
// Output: '01*02&22::00:00'

rDate(new Date()).calc(-10, 'days').calc(1, 'hour').format()
// You can use day/days, hour/hours, minute/minutes
// Output: '22.01.2022 • 02:00'

rDate('2022-02-01T12:34:56+03:00').zeroing().format('iso')
// Zeroing time
// Output: '2022-02-01T00:00:00+03:00'

rDate(new Date()).zone(1).format('iso')
// Output: '2022-01-31T20:00:00-01:00'

rDate(new Date()).format('x')
// Output: 1643662800000 <-- Timestamp

rDate(new Date()).format('l')
// Short format, e.g. for comparing dates
// Output: 1/2/22 <-- Timestamp
```

## Utils

```js
...
rDate().seconsToTime(12213)
// Output: 03:23:33 (3h, 23m, 33s)

rDate().seconsToTime(123)
// Output: 00:02:03 (0h, 2m, 3s)

rDate().isValid(new Date())
// Output: true

rDate().isValid(new Date('grrr!'))
// Output: false

// Locales: en/ru
// Available abbreviations for masks YYYY, YY, MMMM, MMM, MM, M, DD, D, dd, ddd, HH, h, mm, ss
```
