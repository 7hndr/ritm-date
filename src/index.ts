import { RDate } from './RDate'

export function rDate(input?: Date | string | number): RDate {
  return new RDate(input)
}

export { RDate }
