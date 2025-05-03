import { startsWith } from 'lodash';
export var CountryPhoneCodes;
(function (CountryPhoneCodes) {
    CountryPhoneCodes["Russia"] = "+7";
    CountryPhoneCodes["Kazakhstan"] = "+7";
    CountryPhoneCodes["Belarus"] = "+375";
    CountryPhoneCodes["Uzbekistan"] = "+998";
})(CountryPhoneCodes || (CountryPhoneCodes = {}));
// Примеры: +7 123 456 78 90,  +375 44 456 78 90
export function federalPhoneMask(options) {
    return function (currentValue, prevValue, startCaretPosition, endCaretPosition) {
        var _a;
        if (currentValue === prevValue) {
            return { value: currentValue, startCaretPosition: startCaretPosition, endCaretPosition: endCaretPosition };
        }
        // префикс, который нужно подставлять
        var prefix = ((_a = options) === null || _a === void 0 ? void 0 : _a.countryPhoneCode) || CountryPhoneCodes.Russia;
        var prefixLength = prefix.length;
        var isDeletion = currentValue.length < prevValue.length;
        var deleteInvalidSymbols = function (value, caretPosition) {
            var startsWithPlus = startsWith(value, '+');
            // плюс в начале строки убираем специально, чтобы он не удалился при реплэйсе и чтобы учесть позицию курсора
            if (startsWithPlus) {
                value = value.slice(1);
                caretPosition--;
            }
            // смещаем курсор на число невалидных символов, которые собираемся удалить
            caretPosition -= (value.slice(0, caretPosition).match(/[^\d]/g) || []).length;
            value = value.replace(/[^\d]/g, '');
            // возвращаем плюс на место и корректируем положение курсора
            if (startsWithPlus) {
                value = "+" + value;
                caretPosition++;
            }
            return { value: value, caretPosition: caretPosition };
        };
        var formatPrefix = function (value, caretPosition) {
            // если удалили всю строку, то смещаем каретку в 0 (кейс "на всякий случай")
            if (isDeletion && !value) {
                caretPosition = 0;
                return { value: value, caretPosition: caretPosition };
            }
            if (isDeletion && ['+', prefix].indexOf(value) > -1 && prevValue.length < (2 + prefixLength)) {
                value = '';
                caretPosition = 0;
                return { value: value, caretPosition: caretPosition };
            }
            var startsWithPlus = startsWith(value, '+');
            var hasNoPrefix = !startsWith(value, prefix);
            // у строки нету полного префикса, но она начинается с плюса
            if ((startsWithPlus || startsWith(value, prefix.slice(1))) && hasNoPrefix) {
                value = prefix + " " + value.slice(1);
                // пытаются удалить плюс
                if (isDeletion && caretPosition < prefixLength) {
                    caretPosition = prefixLength;
                    return { value: value, caretPosition: caretPosition };
                }
                caretPosition += prefixLength;
                return { value: value, caretPosition: caretPosition };
            }
            // подставляем префикс
            if (hasNoPrefix) {
                value = prefix + " " + value;
                if (isDeletion && caretPosition < prefixLength) {
                    caretPosition = prefixLength;
                    return { value: value, caretPosition: caretPosition };
                }
                caretPosition += (1 + prefixLength);
                return { value: value, caretPosition: caretPosition };
            }
            // в строке уже есть префикс, просто подставляем пробел за ним
            value = prefix + " " + value.slice(prefixLength);
            caretPosition++;
            return { value: value, caretPosition: caretPosition };
        };
        var formatOperatorCode = function (value, caretPosition) {
            // ищем последний пробел, т.к от него будет вестить отсчет блока. Хвостовые цифры не содержат пробелов, т.к
            // мы их обрезали в самом начале.
            var lastSpaceIdx = value.lastIndexOf(' ');
            var countDigits = prefix === CountryPhoneCodes.Uzbekistan || prefix === CountryPhoneCodes.Belarus ? 2 : 3;
            if (lastSpaceIdx === -1) {
                return { value: value, caretPosition: caretPosition };
            }
            var startBlockIdx = lastSpaceIdx + 1;
            var startTailIdx = startBlockIdx + countDigits;
            // контент до блока
            var head = value.slice(0, startBlockIdx);
            // контент после блока
            var tail = value.slice(startTailIdx);
            var operatorCode = value.substr(startBlockIdx, countDigits);
            var isComplete = operatorCode.length === countDigits;
            // должны добавлять пробел после блока, если только он полный (содержит нужное кол-во символов)
            // и не происходит удаление символа, а если происходит удаление символа, то этот блок
            // не является концом всего контента, иначе пробел не будет удаляться.
            var haveToAddSpace = isComplete && (!isDeletion || startTailIdx !== value.length);
            if (haveToAddSpace) {
                // сдвигаем курсор, если он уже находится за текущим блоком или блок является концом строки и
                // курсор находится в самом его конце.
                if (caretPosition > startTailIdx || (startTailIdx === value.length && caretPosition === startTailIdx)) {
                    caretPosition++;
                }
                operatorCode += ' ';
            }
            return {
                value: head + operatorCode + tail,
                caretPosition: caretPosition
            };
        };
        var formatSecondThree = function (value, caretPosition) {
            // ищем последний пробел, т.к от него будет вестить отсчет блока. Хвостовые цифры не содержат пробелов, т.к
            // мы их обрезали в самом начале.
            var lastSpaceIdx = value.lastIndexOf(' ');
            if (lastSpaceIdx < (2 + prefixLength)) {
                return { value: value, caretPosition: caretPosition };
            }
            var startBlockIdx = lastSpaceIdx + 1;
            var startTailIdx = lastSpaceIdx + 4;
            // контент до блока
            var head = value.slice(0, startBlockIdx);
            // контент после блока
            var tail = value.slice(startTailIdx);
            var secondThree = value.substr(startBlockIdx, 3);
            var isComplete = secondThree.length === 3;
            // должны добавлять пробел после блока, если только он полный (содержит нужное кол-во символов)
            // и не происходит удаление символа, а если происходит удаление символа, то этот блок
            // не является концом всего контента, иначе пробел не будет удаляться.
            var haveToAddSpace = isComplete && (!isDeletion || startTailIdx !== value.length);
            if (haveToAddSpace) {
                // сдвигаем курсор, если он уже находится за текущим блоком или блок является концом строки и
                // курсор находится в самом его конце.
                if (caretPosition > startTailIdx || (startTailIdx === value.length && caretPosition === startTailIdx)) {
                    caretPosition++;
                }
                secondThree += ' ';
            }
            return {
                value: head + secondThree + tail,
                caretPosition: caretPosition
            };
        };
        var formatFirstPair = function (value, caretPosition) {
            // ищем последний пробел, т.к от него будет вестить отсчет блока. Хвостовые цифры не содержат пробелов, т.к
            // мы их обрезали в самом начале.
            var lastSpaceIdx = value.lastIndexOf(' ');
            if (lastSpaceIdx < (7 + prefixLength)) {
                return { value: value, caretPosition: caretPosition };
            }
            var startBlockIdx = lastSpaceIdx + 1;
            var startTailIdx = lastSpaceIdx + 3;
            // контент до блока
            var head = value.slice(0, startBlockIdx);
            // контент после блока
            var tail = value.slice(startTailIdx);
            var firstPair = value.substr(startBlockIdx, 2);
            var isComplete = firstPair.length === 2;
            // должны добавлять пробел после блока, если только он полный (содержит нужное кол-во символов)
            // и не происходит удаление символа, а если происходит удаление символа, то этот блок
            // не является концом всего контента, иначе пробел не будет удаляться.
            var haveToAddSpace = isComplete && (!isDeletion || startTailIdx !== value.length);
            if (haveToAddSpace) {
                // сдвигаем курсор, если он уже находится за текущим блоком или блок является концом строки и
                // курсор находится в самом его конце.
                if (caretPosition > startTailIdx || (startTailIdx === value.length && caretPosition === startTailIdx)) {
                    caretPosition++;
                }
                firstPair += ' ';
            }
            return {
                value: head + firstPair + tail,
                caretPosition: caretPosition
            };
        };
        var formatSecondPair = function (value, caretPosition) {
            var lastSpaceIdx = value.lastIndexOf(' ');
            if (lastSpaceIdx < (10 + prefixLength)) {
                return { value: value, caretPosition: caretPosition };
            }
            var startBlockIdx = lastSpaceIdx + 1;
            var startTailIdx = lastSpaceIdx + 3;
            var head = value.slice(0, startBlockIdx);
            var secondPair = value.slice(startBlockIdx, startTailIdx);
            // если курсор находится в конце строки, у которой контент больше чем нужно, то мы его смещаем на нужное значение.
            if (caretPosition === value.length) {
                caretPosition -= value.slice(startTailIdx).length;
            }
            return {
                value: head + secondPair,
                caretPosition: caretPosition
            };
        };
        var result = deleteInvalidSymbols(currentValue, startCaretPosition);
        result = formatPrefix(result.value, result.caretPosition);
        result = formatOperatorCode(result.value, result.caretPosition);
        result = formatSecondThree(result.value, result.caretPosition);
        result = formatFirstPair(result.value, result.caretPosition);
        result = formatSecondPair(result.value, result.caretPosition);
        return {
            value: result.value,
            startCaretPosition: result.caretPosition,
            endCaretPosition: result.caretPosition
        };
    };
}
