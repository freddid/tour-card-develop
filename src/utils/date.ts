/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as _formatDate from 'date-fns/format';
import { ru as ruLocale } from 'date-fns/locale';


export function formatDateDotted(date: Date | string | number | null): string {
    if (!date) {
        return '';
    }
    return _formatDate(date, 'DD.MM.YYYY');
}

export function formatDateVerbal(date: Date): string {
    return _formatDate(date, 'DD MMMM YYYY', { locale: ruLocale });
}

export function formatDateVerbalWithoutYear(date: Date): string {
    return _formatDate(date, 'DD MMMM', { locale: ruLocale });
}

export function formatWeekDayShortName(date: Date): string {
    return _formatDate(date, 'dd', { locale: ruLocale });
}
