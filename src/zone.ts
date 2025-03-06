export function changeTimeZone(date: Date, offset: number): Date {
  const newDate = new Date(date)
  newDate.setMinutes(newDate.getMinutes() + offset * 60)
  return newDate
}
