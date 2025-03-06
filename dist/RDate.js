import { formatDate } from './format';
import { adjustDate } from './calc';
import { zeroTime } from './zeroing';
import { changeTimeZone } from './zone';
import { isValidDate } from './helpers';
import { formatMasks } from './constants';
export class RDate {
    constructor(input) {
        var _a, _b;
        this.locale = ((_b = ((navigator === null || navigator === void 0 ? void 0 : navigator.language) || ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.languages) === null || _a === void 0 ? void 0 : _a[0]))) === null || _b === void 0 ? void 0 : _b.startsWith('ru'))
            ? 'ru'
            : 'en';
        if (input instanceof Date) {
            this.date = new Date(input.getTime());
        }
        else if (typeof input === 'string' || typeof input === 'number') {
            const parsedDate = new Date(input);
            if (isValidDate(parsedDate)) {
                this.date = parsedDate;
            }
            else {
                throw new Error('Invalid date input');
            }
        }
        else {
            this.date = new Date();
        }
    }
    format(mask) {
        switch (mask) {
            case 'iso':
                return formatDate(this.date, formatMasks.iso, this.locale);
            case 'l':
                return formatDate(this.date, formatMasks.lite, this.locale);
            case 'x':
            case 'X':
                return Date.parse(this.date.toString());
            default:
                return formatDate(this.date, formatMasks.default, this.locale);
        }
    }
    setLocale(locale) {
        this.locale = locale;
        return this;
    }
    calc(value, unit) {
        this.date = adjustDate(this.date, value, unit);
        return this;
    }
    zeroing() {
        this.date = zeroTime(this.date);
        return this;
    }
    zone(offset) {
        this.date = changeTimeZone(this.date, offset);
        return this;
    }
    isValid() {
        return isValidDate(this.date);
    }
}
