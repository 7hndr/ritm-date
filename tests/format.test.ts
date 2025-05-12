import { formatDate } from '../src/format'

describe('formatDate function', () => {
  const testDate = new Date(2025, 2, 6, 3, 15, 45) // 6 марта 2025, 03:15:45

  test('formats YYYY-MM-DD', () => {
    expect(formatDate(testDate, 'YYYY-MM-DD', 'en')).toBe('2025-03-06')
  })

  test('formats DD.MM.YYYY', () => {
    expect(formatDate(testDate, 'DD.MM.YYYY', 'en')).toBe('06.03.2025')
  })

  test('formats HH:mm:ss', () => {
    expect(formatDate(testDate, 'HH:mm:ss', 'en')).toBe('03:15:45')
  })

  test('formats h:mm without leading zero', () => {
    expect(formatDate(testDate, 'h:mm', 'en')).toBe('3:15')
  })

  test('formats month names in en', () => {
    expect(formatDate(testDate, 'DD MMMM YYYY', 'en')).toBe('06 March 2025')
    expect(formatDate(testDate, 'DD MMM YYYY', 'en')).toBe('06 Mar 2025')
  })

  test('formats month names in ru', () => {
    expect(formatDate(testDate, 'DD MMMM YYYY', 'ru')).toBe('06 Март 2025')
    expect(formatDate(testDate, 'DD MMM YYYY', 'ru')).toBe('06 Март 2025')
  })

  test('formats default format with dot and bullet', () => {
    expect(
      formatDate(new Date(2022, 1, 1, 0, 0), 'DD.MM.YYYY • HH:mm', 'en')
    ).toBe('01.02.2022 • 00:00')
  })

  test('formats ISO-like with offset-style format', () => {
    expect(
      formatDate(
        new Date(Date.UTC(2022, 1, 1, 0, 0)),
        'YYYY-MM-DDTHH:mm:ss',
        'en'
      )
    ).toBe('2022-02-01T04:00:00') // +4 only if UTC+4 timezone
  })

  test('iso', () => {
    // FE rDate(new Date()).format('iso')
    expect(
      formatDate(new Date(2022, 1, 1, 0, 0), 'YYYY-MM-DDTHH:mm:ssZZ')
    ).toBe('2022-02-01T00:00:00+04:00') // +4 only if UTC+4 timezone
  })

  test('formats custom symbols in mask', () => {
    expect(
      formatDate(new Date(2022, 1, 1, 0, 0), 'DD*MM&YY::HH:mm', 'en')
    ).toBe('01*02&22::00:00')
  })

  test('formats month names with ** wrapper', () => {
    expect(formatDate(new Date(2022, 1, 1), 'DD ** MMMM ** YY', 'en')).toBe(
      '01 ** February ** 22'
    )
  })

  test('formats short year and short month in English', () => {
    expect(formatDate(new Date(2022, 1, 1), 'DD MMM YY', 'en')).toBe(
      '01 Feb 22'
    )
  })

  test('formats short year and short month in Russian', () => {
    expect(formatDate(new Date(2022, 1, 1), 'DD MMM YY', 'ru')).toBe(
      '01 Фев 22'
    )
  })

  test('formats hour without leading zero in Russian', () => {
    expect(formatDate(new Date(2022, 1, 1, 3, 0), 'h:mm', 'ru')).toBe('3:00')
  })

  test('formats full date-time with Russian month name', () => {
    expect(
      formatDate(new Date(2022, 10, 5, 23, 59), 'DD MMMM YYYY, HH:mm', 'ru')
    ).toBe('05 Ноябрь 2022, 23:59')
  })

  test('formats end-of-year date', () => {
    expect(
      formatDate(new Date(2022, 11, 31, 23, 59), 'DD.MM.YYYY HH:mm', 'en')
    ).toBe('31.12.2022 23:59')
  })

  test('formats start-of-year date', () => {
    expect(formatDate(new Date(2023, 0, 1, 0, 0), 'DD MMMM YYYY', 'en')).toBe(
      '01 January 2023'
    )
  })
})
