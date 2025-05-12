import { locales } from './locales';
const pad = (n, len = 2) => String(n).padStart(len, '0');
const getOffsetString = (date) => {
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absMinutes = Math.abs(offsetMinutes);
    const hours = pad(Math.floor(absMinutes / 60));
    const minutes = pad(absMinutes % 60);
    return `${sign}${hours}:${minutes}`;
};
const applyMask = (mask, parts) => {
    const tokens = Object.keys(parts).sort((a, b) => b.length - a.length);
    const abbreviationsRegex = new RegExp(tokens.join('|'), 'g');
    return mask.replace(abbreviationsRegex, match => { var _a; return (_a = parts[match]) !== null && _a !== void 0 ? _a : match; });
};
// prettier-ignore
export const formatDate = (date, mask, locale = 'en') => {
    var _a;
    const monthIndex = date.getMonth();
    const loc = (_a = locales[locale]) !== null && _a !== void 0 ? _a : { months: [], shortMonths: [] };
    const parts = {
        YYYY: String(date.getFullYear()),
        YY: String(date.getFullYear()).slice(-2),
        MM: pad(monthIndex + 1),
        DD: pad(date.getDate()),
        HH: pad(date.getHours()),
        h: String(date.getHours()),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        MMMM: loc.months[monthIndex] || '',
        MMM: loc.shortMonths[monthIndex] || '',
        ZZ: getOffsetString(date)
    };
    return applyMask(mask, parts);
};
