export function getFormatDate(date) {
    return date.toISOString().slice(0, 10);
}