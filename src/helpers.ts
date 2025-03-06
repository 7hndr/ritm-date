export const isValidDate = (date: unknown): boolean =>
  date instanceof Date && !isNaN(date.getTime())
