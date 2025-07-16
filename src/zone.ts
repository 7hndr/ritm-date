export function changeTimeZone(date: Date, offset: number): Date {
  console.log('date', date)
  const newDate = new Date(date)
  console.log('newDate', newDate)
  const minutes = newDate.getMinutes()
  console.log('minutes', newDate)
  newDate.setMinutes(newDate.getTimezoneOffset())
  newDate.setMinutes(offset * 60)
  newDate.setMinutes(minutes)

  console.log('newDate2', newDate)
  return newDate
}
