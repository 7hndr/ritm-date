import { adjustDate } from '../src/calc'

describe('adjustDate function', () => {
  const baseDate = new Date(2025, 2, 6, 12, 0, 0)

  test('adds days correctly', () => {
    expect(adjustDate(baseDate, 5, 'days').toISOString()).toBe(
      new Date(2025, 2, 11, 12, 0, 0).toISOString()
    )
  })

  test('subtracts days correctly', () => {
    expect(adjustDate(baseDate, -3, 'days').toISOString()).toBe(
      new Date(2025, 2, 3, 12, 0, 0).toISOString()
    )
  })

  test('adds hours correctly', () => {
    expect(adjustDate(baseDate, 5, 'hours').toISOString()).toBe(
      new Date(2025, 2, 6, 17, 0, 0).toISOString()
    )
  })

  test('subtracts hours correctly', () => {
    expect(adjustDate(baseDate, -6, 'hours').toISOString()).toBe(
      new Date(2025, 2, 6, 6, 0, 0).toISOString()
    )
  })

  test('adds minutes correctly', () => {
    expect(adjustDate(baseDate, 30, 'minutes').toISOString()).toBe(
      new Date(2025, 2, 6, 12, 30, 0).toISOString()
    )
  })
})
