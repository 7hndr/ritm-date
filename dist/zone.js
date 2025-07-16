export function changeTimeZone(date, offset) {
    const newDate = new Date(date);
    const minutes = newDate.getMinutes();
    newDate.setMinutes(newDate.getTimezoneOffset());
    newDate.setMinutes(offset * 60);
    newDate.setMinutes(minutes);
    return newDate;
}
