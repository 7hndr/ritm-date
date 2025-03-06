export function changeTimeZone(date, offset) {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + offset * 60);
    return newDate;
}
