export declare class RDate {
    private date;
    private locale;
    constructor(input?: Date | string | number);
    format(mask?: string): string | number;
    setLocale(locale: string): this;
    calc(value: number, unit: 'day' | 'days' | 'hour' | 'hours' | 'minute' | 'minutes'): this;
    zeroing(): this;
    zone(offset: number): this;
    isValid(_date?: Date | string | number): boolean;
}
