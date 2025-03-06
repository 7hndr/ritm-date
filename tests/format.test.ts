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
})
