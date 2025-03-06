import { locales } from './locales';
export function formatDate(date, mask, locale) {
    var _a, _b;
    const replacements = {
        YYYY: date.getFullYear().toString(),
        YY: date.getFullYear().toString().slice(-2),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        DD: String(date.getDate()).padStart(2, '0'),
        HH: String(date.getHours()).padStart(2, '0'),
        mm: String(date.getMinutes()).padStart(2, '0'),
        ss: String(date.getSeconds()).padStart(2, '0'),
        MMMM: ((_a = locales[locale]) === null || _a === void 0 ? void 0 : _a.months[date.getMonth()]) || '',
        MMM: ((_b = locales[locale]) === null || _b === void 0 ? void 0 : _b.shortMonths[date.getMonth()]) || ''
    };
    return mask.replace(/YYYY|YY|MMMM|MMM|MM|DD|HH|mm|ss/g, match => replacements[match] || match);
}
