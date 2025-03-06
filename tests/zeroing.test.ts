import { zeroTime } from '../src/zeroing'

describe('zeroTime', () => {
  test('sets time to 00:00:00', () => {
    const date = new Date('2022-02-01T12:34:56')
    const zeroed = zeroTime(date)
    expect(zeroed.getHours()).toBe(0)
    expect(zeroed.getMinutes()).toBe(0)
    expect(zeroed.getSeconds()).toBe(0)
  })
})
