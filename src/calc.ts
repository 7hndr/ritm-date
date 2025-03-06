export function adjustDate(
  date: Date,
  value: number,
  unit: 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes'
): Date {
  const newDate = new Date(date)
  switch (unit) {
    case 'day':
    case 'days':
      newDate.setDate(newDate.getDate() + value)
      break
    case 'hour':
    case 'hours':
      newDate.setHours(newDate.getHours() + value)
      break
    case 'minute':
    case 'minutes':
      newDate.setMinutes(newDate.getMinutes() + value)
      break
  }
  return newDate
}
