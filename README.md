# ritm-date
date &amp; time formatter
1. npm install ritm-date
2. import RitmDate from 'ritm-date' at your .js file
3. use it

```js
const dateFormatter (date) => {
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

dateFormatter(new Date()).format('DD*MM&YY::HH:mm')
// Output: '01*02&22::00:00'

dateFormatter(new Date()).calc(-10, 'day').calc(2, 'hour').format()
// Output: '22.01.2022 • 02:00'

dateFormatter().zeroing('2022-02-01T12:34:56+03:00').format('iso')
// Output: '2022-02-01T00:00:00+03:00'

dateFormatter(new Date()).zone(1).format('iso')
// Output: '2022-01-31T20:00:00-01:00'

dateFormatter(new Date()).format('x')
// Output: 1643662800000 <-- Timestamp

//You also can use YYYY, YY, MMMM, MMM, MM, M, DD, D, dd, HH, h, mm, ss
```
