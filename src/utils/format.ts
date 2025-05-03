import { declineByCount } from 'sletat-common-utils/lib/format';
import { parseDateString } from 'sletat-common-utils/lib/date/lib/parseDateString';
import _ from 'lodash';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

export function getVerbalFlights(count: number): string {
  return declineByCount(['перелёт', 'перелёта', 'перелётов'], count);
}

export function getVerbalCharterPlaces(count: number): string {
  return declineByCount(['место', 'места', 'мест'], count);
}

export function formatDateStringToIsoString(
  dateStr: string | null,
  timeStr: string | null,
): string | null {
  const dateParsed = parseDateString(dateStr ?? '', 'DD.MM.YYYY');

  if (!dateParsed) {
    return null;
  }

  const [hours, minutes] = (timeStr ?? '')
    .split(':')
    .map((item) => parseInt(item, 10))
    .filter((item) => _.isInteger(item));

  if (hours) {
    dateParsed.setHours(hours);
  }

  if (minutes) {
    dateParsed.setMinutes(minutes);
  }

  const dateParsedWithLocalTime = new Date(
    dateParsed.getTime() - dateParsed.getTimezoneOffset() * 60000,
  );

  return dateParsedWithLocalTime.toISOString();
}

export function getVerbalRegularFlights(count: number): string {
  return declineByCount(
    ['регулярный рейс', 'регулярных рейса', 'регулярных рейсов'],
    count,
  );
}

export function getVerbalCharterFlights(count: number): string {
  return declineByCount(
    ['чартерный рейс', 'чартерных рейса', 'чартерных рейсов'],
    count,
  );
}

export function getVerbalTransfers(count: number): string {
  return declineByCount(['пересадка', 'пересадки', 'пересадок'], count);
}

/**
 * Возвращает отформатированную строку даты
 *
 *
 * @param date - дата формата ДЕНЬ.МЕСЯЦ.ГОД (разделитель можно поменять, но важен сам порядок)
 * @param pattern - например MM/DD/YYYY | MMMM D YYYY etc.
 * @param divider - стринговый разделитель
 * @returns отформатированная строка
 *
 */
export const getVerbalDate = (
  date: string,
  pattern: string,
  divider = '.',
): string => {
  const [day, month, year] = date.split(divider).map((s) => +s);
  return format(new Date(year, month - 1, day), pattern, { locale: ru });
};
export function getVerbalPlacements(count: number): string {
  return declineByCount(['комната', 'комнаты', 'комнат'], count);
}

export function getVerbalPeople(count: number): string {
  return declineByCount(['человек', 'человека', 'человек'], count);
}
