import { toInteger, endsWith, startsWith } from 'lodash';
export var DateMaskCorrectionType;
(function (DateMaskCorrectionType) {
    DateMaskCorrectionType[DateMaskCorrectionType["lessThanMinDate"] = 0] = "lessThanMinDate";
})(DateMaskCorrectionType || (DateMaskCorrectionType = {}));
export function dateMask(options) {
    return function (currentValue, prevValue, startCaretPosition, endCaretPosition) {
        if (currentValue === prevValue) {
            return { value: currentValue, startCaretPosition: startCaretPosition, endCaretPosition: endCaretPosition };
        }
        if (currentValue.length > 10) {
            return { value: prevValue, startCaretPosition: prevValue.length, endCaretPosition: prevValue.length };
        }
        var mCaretPosition = startCaretPosition;
        currentValue = currentValue
            .split('')
            .map(function (ch, idx) {
            // Если не число или точка, то убираем символ из строки и сдвигаем курсор, если он находится позади
            // невалидного значения
            if (/[\d.]/.test(ch)) {
                return ch;
            }
            if (idx <= mCaretPosition) {
                startCaretPosition--;
            }
            return '';
        })
            .join('');
        var _a = currentValue.split('.'), _day = _a[0], _month = _a[1], _year = _a[2];
        var day = (_day || '').slice(0, 2);
        var month = (_month || '').slice(0, 2);
        var year = (_year || '').slice(0, 4);
        var isDeletion = currentValue.length < prevValue.length;
        var isCaretAtTheEnd = currentValue.length === startCaretPosition;
        // не даем удалять разделительную точку, если она не является последним символом строки
        if (isDeletion && !isCaretAtTheEnd && prevValue[startCaretPosition] === '.') {
            startCaretPosition++;
            return { value: prevValue, startCaretPosition: startCaretPosition, endCaretPosition: startCaretPosition };
        }
        if (day) {
            if (toInteger(day) > 31) {
                day = '31';
            }
            else if (day.length === 1 && toInteger(day) > 3) {
                day = "0" + day;
                startCaretPosition++;
            }
            else if (day === '00') {
                day = '01';
            }
        }
        if (month) {
            if (toInteger(month) > 12) {
                month = '12';
            }
            else if (month.length === 1 && toInteger(month) > 1) {
                month = "0" + month;
                startCaretPosition++;
            }
            else if (month === '00') {
                month = '01';
            }
        }
        var minValidYear = options && options.minValidYear ? options.minValidYear : 0;
        if (startsWith(year, '0')) {
            year = "1" + year.slice(1);
        }
        else if (year.length === 4 && toInteger(year) < minValidYear) {
            year = String(minValidYear);
            if (options && options.onMaskCorrection) {
                options.onMaskCorrection(DateMaskCorrectionType.lessThanMinDate);
            }
        }
        // рисуем разделительную точку для дня
        function dayPoint() {
            // удаляем разделительную точку, если она последняя в строке
            if (isDeletion && isCaretAtTheEnd && endsWith(currentValue, '.') && !month && !year) {
                startCaretPosition--;
                return '';
            }
            // при вооде данных смещаем курсор вместе с добавлением разделительной точки
            if (!month && !year && day.length === 2) {
                startCaretPosition++;
            }
            // рисуем точку если день полностью заполнен или если не заполнен (редактируется), но после него указан
            // месяц или год.
            if (day.length === 2 || !!month || !!year) {
                return '.';
            }
            return '';
        }
        function monthPoint() {
            // удаляем разделительную точку, если она последняя в строке
            if (isDeletion && isCaretAtTheEnd && endsWith(currentValue, '.') && !!month && !year) {
                startCaretPosition--;
                return '';
            }
            // при вооде данных смещаем курсор вместе с добавлением разделительной точки
            if (!year && month.length === 2) {
                startCaretPosition++;
            }
            // рисуем точку если месяц полностью заполнен или если не заполнен (редактируется), но после него указан год.
            if (month.length === 2 || !!year) {
                return '.';
            }
            return '';
        }
        var value = "" + day + dayPoint() + month + monthPoint() + year;
        if (value.length < startCaretPosition) {
            startCaretPosition = value.length;
        }
        return {
            value: value,
            startCaretPosition: startCaretPosition,
            endCaretPosition: startCaretPosition
        };
    };
}
