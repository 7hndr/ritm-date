import { isValidDate } from '../src/helpers'

describe('isValidDate', () => {
  test('returns true for valid Date object', () => {
    expect(isValidDate(new Date())).toBe(true)
  })

  test('returns false for invalid Date object', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false)
  })

  test('returns false for non-Date values', () => {
    expect(isValidDate(null)).toBe(false)
    expect(isValidDate(undefined)).toBe(false)
    expect(isValidDate('2022-01-01')).toBe(false)
  })
})
