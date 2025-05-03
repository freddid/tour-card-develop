import { isNumber, toNumber, isUndefined, range } from 'lodash';
export var ComparisonOperators;
(function (ComparisonOperators) {
    ComparisonOperators[ComparisonOperators["More"] = 0] = "More";
    ComparisonOperators[ComparisonOperators["MoreOrEqual"] = 1] = "MoreOrEqual";
    ComparisonOperators[ComparisonOperators["Less"] = 2] = "Less";
    ComparisonOperators[ComparisonOperators["LessOrEqual"] = 3] = "LessOrEqual";
})(ComparisonOperators || (ComparisonOperators = {}));
export var IdentityDocumentType;
(function (IdentityDocumentType) {
    IdentityDocumentType[IdentityDocumentType["Passport"] = 0] = "Passport";
    IdentityDocumentType[IdentityDocumentType["InternationalPassport"] = 1] = "InternationalPassport";
    IdentityDocumentType[IdentityDocumentType["BirthCertificate"] = 2] = "BirthCertificate";
})(IdentityDocumentType || (IdentityDocumentType = {}));
export var Chars = {
    CYRILLIC: 'а-яё',
    SPACE: ' ',
    LATIN: 'a-z',
    APOSTROPHE: '`'
};
/**
 * Общие валидаторы
 */
export var REQUIRED_VALIDATOR_ID = 'REQUIRED_VALIDATOR_ID';
export function getRequiredValidator(message) {
    var DEFAULT_MSG = 'Поле является обязательным для заполнения!';
    return {
        id: REQUIRED_VALIDATOR_ID,
        validator: function (input) { return input !== null && input !== undefined && input !== ''; },
        errorMessage: message || DEFAULT_MSG
    };
}
/**
 * Условные валидаторы
 */
export var TRUE_VALIDATOR_ID = 'TRUE_VALIDATOR_ID';
export function getIsTrueValidator(message) {
    var DEFAULT_MSG = 'Значение не является положительным!';
    return {
        id: TRUE_VALIDATOR_ID,
        validator: function (input) { return input; },
        errorMessage: message || DEFAULT_MSG
    };
}
/**
 * Валидаторы строк
 */
export var Alphabet;
(function (Alphabet) {
    Alphabet[Alphabet["Cyrillic"] = 0] = "Cyrillic";
    Alphabet[Alphabet["Latin"] = 1] = "Latin";
})(Alphabet || (Alphabet = {}));
var EMAIL_VALIDATOR_ID = 'EMAIL_VALIDATOR_ID';
// регулярка взята с http://emailregex.com/
export function getEmailValidator(message) {
    // tslint:disable-next-line:max-line-length
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var DEFAULT_MSG = 'Вы указали некорректный email!';
    return {
        id: EMAIL_VALIDATOR_ID,
        validator: function (input) { return !input || EMAIL_REGEXP.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
export var NAME_VALIDATOR_ID = 'NAME_VALIDATOR_ID';
export function getNameValidator(message, options) {
    var nameRegexp = /.*/;
    var defaultMsg = 'Вы указали некорректное имя пользователя!';
    if (!!options && isNumber(options.alphabet)) {
        switch (options.alphabet) {
            case Alphabet.Cyrillic:
                nameRegexp = /^[а-яё\-‐−– ]*$/i;
                defaultMsg = 'Имя должно содержать только кириллические символы!';
                break;
            case Alphabet.Latin:
                nameRegexp = /^[a-z’'"\-‐−– ]*$/i;
                defaultMsg = 'Имя должно содержать только латинские символы!';
                break;
        }
    }
    return {
        id: NAME_VALIDATOR_ID,
        validator: function (input) { return !input || nameRegexp.test(input); },
        errorMessage: message || defaultMsg
    };
}
export var FULL_NAME_VALIDATOR_ID = 'FULL_NAME_VALIDATOR_ID';
export function getFullNameValidator(message, options) {
    var alphabets = options && !isUndefined(options.alphabets) ? options.alphabets : [Alphabet.Cyrillic];
    var getRegexp = function () {
        if (alphabets.indexOf(Alphabet.Cyrillic) > -1) {
            return /^[а-яё'`\-‐−–]{2,} [а-яё'`\-‐−–]{2,}( [а-яё'`\-‐−–]{2,})?$/i;
        }
        return /^[a-z'`\-‐−–]{2,} [a-z'`\-‐−–]{2,}( [a-z'`\-‐−–]{2,})?$/i;
    };
    var defaultMsg = 'Вы указали некорректное имя!';
    return {
        id: FULL_NAME_VALIDATOR_ID,
        validator: function (input) { return !input || getRegexp().test(input); },
        errorMessage: message || defaultMsg
    };
}
export var PHONE_VALIDATOR_ID = 'PHONE_VALIDATOR_ID';
export function getPhoneValidator(message) {
    var PHONE_REGEXP = /^\+?[\d]*(\([\d]+\))?\d[\d\-‐−– ]*\d$/;
    var DEFAULT_MSG = 'Вы указали некорректный номер телефона!';
    return {
        id: PHONE_VALIDATOR_ID,
        validator: function (input) { return !input || PHONE_REGEXP.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
export var FEDERAL_PHONE_VALIDATOR_ID = 'FEDERAL_PHONE_VALIDATOR_ID';
export function getFederalPhoneValidator(message) {
    // https://agile.sletat.ru/jiraurl/browse/SITES-3212
    // только цифры, +, -, пробелы. минимум 11 числовых символов
    var DEFAULT_MSG = 'Вы указали некорректный номер телефона!';
    return {
        id: FEDERAL_PHONE_VALIDATOR_ID,
        validator: function (input) {
            if (input === '') {
                return true;
            }
            if (!/^[+-\d\s]*$/g.test(input)) {
                return false;
            }
            return input.replace(/[^\d]/g, '').length >= 11;
        },
        errorMessage: message || DEFAULT_MSG
    };
}
export var URL_VALIDATOR_ID = 'URL_VALIDATOR_ID';
// TODO selkin: need to fix minor bugs (see unit tests in 'index.spec.ts')
export function getUrlValidator(message) {
    var URL_REGEXP = /^((https?|ftp):\/\/)?([a-zа-я\d._]+-?)*[a-zа-я_\d]\.[a-zа-я]{2,}\/?.*/i;
    var DEFAULT_MSG = 'Вы ввели некорректный адрес в поле!';
    return {
        id: URL_VALIDATOR_ID,
        validator: function (input) { return !input || URL_REGEXP.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
export var MIN_LENGTH_VALIDATOR_ID = 'MIN_LENGTH_VALIDATOR_ID';
export function getMinLengthValidator(min, msg) {
    var DEFAULT_MSG = "\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 " + min + " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432";
    return {
        id: MIN_LENGTH_VALIDATOR_ID,
        validator: function (input) { return !input || String(input).length >= min; },
        errorMessage: msg || DEFAULT_MSG
    };
}
export var CHARS_VALIDATOR_ID = 'CHARS_VALIDATOR_ID';
export function getCharsValidator(chars, message) {
    var regExp = new RegExp("^[" + chars.join('') + "]*$", 'i');
    var DEFAULT_MSG = "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0441\u0438\u043C\u0432\u043E\u043B\u044B. \u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u043C\u0438 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F: \"" + chars.join('') + "\"";
    return {
        id: CHARS_VALIDATOR_ID,
        validator: function (input) { return !input || regExp.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
export var PASSPORT_VALIDATOR_ID = 'PASSPORT_VALIDATOR_ID';
export function getPassportValidator(message, options) {
    var docType = options && !isUndefined(options.documentType) ? options.documentType : IdentityDocumentType.Passport;
    var getRegexp = function () {
        if (docType === IdentityDocumentType.InternationalPassport) {
            return /[A-ZА-ЯЁ0-9]{2} [\d]{7}/i; // XX DDDDDDD
        }
        if (docType === IdentityDocumentType.BirthCertificate) {
            return /[A-Z]{1,4}-[А-ЯЁ]{2} [\d]{6}/i; // XX(X)-XX XXXXXX
        }
        return /[\d]{4} [\d]{6}/i; // 9999 999999
    };
    var DEFAULT_MSG = 'Вы ввели некорректную серию паспорта!';
    return {
        id: PASSPORT_VALIDATOR_ID,
        validator: function (input) { return !input || getRegexp().test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
export var PASSPORT_SERIES_VALIDATOR_ID = 'PASSPORT_SERIES_VALIDATOR_ID';
export function getPassportSeriesValidator(message, options) {
    var SERIES_REGEXP = !!options && options.isChild
        ? /^([^_`~@#$%\^&*:;'"()+\[\]{}|<>?!.,\\\/]{0,6}[0-9]*)$/i
        : /^([^\-_`~@#$%\^&*:;'"()+\[\]{}|<>?!.,\\\/]{0,3}[0-9]*)$/i;
    var DEFAULT_MSG = 'Вы ввели некорректную серию паспорта!';
    return {
        id: PASSPORT_SERIES_VALIDATOR_ID,
        validator: function (input) { return !input || SERIES_REGEXP.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
export var PASSPORT_NUMBER_VALIDATOR_ID = 'PASSPORT_NUMBER_VALIDATOR_ID';
export function getPassportNumberValidator(message) {
    var PASSPORT_NUMBER_REGEXP = /^\d{1,20}$/i;
    var DEFAULT_MSG = 'Вы ввели некорректный номер паспорта!';
    return {
        id: PASSPORT_NUMBER_VALIDATOR_ID,
        validator: function (input) { return !input || PASSPORT_NUMBER_REGEXP.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
/**
 * Валидаторы чисел
 */
export var MAX_VALIDATOR_ID = 'MAX_VALIDATOR_ID';
export function getMaxValidator(max, message) {
    var DEFAULT_MSG = 'Вы ввели слишком большое значение!';
    return {
        id: MAX_VALIDATOR_ID,
        validator: function (input) {
            if (typeof input === 'string') {
                input = toNumber(input);
            }
            return !input && input !== 0 ? true : input <= max;
        },
        errorMessage: message || DEFAULT_MSG
    };
}
export var MIN_VALIDATOR_ID = 'MIN_VALIDATOR_ID';
export function getMinValidator(min, message) {
    var DEFAULT_MSG = 'Вы ввели слишком маленькое значение!';
    return {
        id: MIN_VALIDATOR_ID,
        validator: function (input) {
            if (typeof input === 'string') {
                input = toNumber(input);
            }
            return !input && input !== 0 ? true : input >= min;
        },
        errorMessage: message || DEFAULT_MSG
    };
}
export var MIN_COUNT_OF_NUMBER_VALIDATOR_ID = 'MIN_COUNT_OF_NUMBER_VALIDATOR_ID';
export function getMinCountOfNumbersValidator(min, message) {
    var DEFAULT_MSG = "\u041A\u043E\u043B-\u0432\u043E \u0446\u0438\u0444\u0440 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043B\u0438\u0431\u043E \u0440\u0430\u0432\u043D\u043E " + min;
    var NUM_REGEXP = /\d/g;
    return {
        id: MIN_COUNT_OF_NUMBER_VALIDATOR_ID,
        validator: function (input) {
            if (!input) {
                return true;
            }
            var countNums = input.match(NUM_REGEXP);
            return !!countNums && countNums.length >= min;
        },
        errorMessage: message || DEFAULT_MSG
    };
}
/**
 * Валидаторы цвета
 */
export var COLOR_HEX_VALIDATOR_ID = 'COLOR_HEX_VALIDATOR_ID';
export function getColorHexValidator(message) {
    var DEFAULT_MSG = 'Вы ввели недопустимый формат цвета!';
    var HEX_REGEXP = /^#([A-Fa-f0-9]{6})$/;
    return {
        id: COLOR_HEX_VALIDATOR_ID,
        validator: function (input) { return !input || HEX_REGEXP.test(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
/**
 * Валидаторы дат
 */
function calculateAge(date) {
    var now = new Date();
    var years = now.getFullYear() - date.getFullYear();
    if (now.getMonth() < date.getMonth() || (now.getMonth() === date.getMonth() && now.getDate() < date.getDate())) {
        years--;
    }
    return years;
}
export var AGE_VALIDATOR_ID = 'AGE_VALIDATOR_ID';
function getAgeValidator(ageLimit, options, message) {
    var defaultMsg;
    var isCorrectAge;
    var isCorrectDate = function (date) { return date.getTime() <= Date.now(); };
    switch (options.operator) {
        case ComparisonOperators.Less:
            defaultMsg = 'Указанный возраст больше допустимого!';
            isCorrectAge = function (date) { return calculateAge(date) < ageLimit; };
            break;
        case ComparisonOperators.LessOrEqual:
            defaultMsg = 'Указанный возраст больше допустимого или не равен!';
            isCorrectAge = function (date) { return calculateAge(date) <= ageLimit; };
            break;
        case ComparisonOperators.More:
            defaultMsg = 'Указанный возраст меньше допустимого!';
            isCorrectAge = function (date) { return calculateAge(date) > ageLimit; };
            break;
        case ComparisonOperators.MoreOrEqual:
            defaultMsg = 'Указанный возраст меньше допустимого или не равен!';
            isCorrectAge = function (date) { return calculateAge(date) >= ageLimit; };
            break;
        default:
            throw new Error('Unknown comparison operator was received!');
    }
    return {
        id: AGE_VALIDATOR_ID,
        validator: function (date) {
            return date === null || (date instanceof Date && isCorrectDate(date) && isCorrectAge(date));
        },
        errorMessage: message || defaultMsg
    };
}
export function getAgeLessThanValidator(ageLimit, message) {
    return getAgeValidator(ageLimit, { operator: ComparisonOperators.Less }, message);
}
export function getAgeLessOrEqualThanValidator(ageLimit, message) {
    return getAgeValidator(ageLimit, { operator: ComparisonOperators.LessOrEqual }, message);
}
export function getAgeMoreThanValidator(ageLimit, message) {
    return getAgeValidator(ageLimit, { operator: ComparisonOperators.More }, message);
}
export function getAgeMoreOrEqualThanValidator(ageLimit, message) {
    return getAgeValidator(ageLimit, { operator: ComparisonOperators.MoreOrEqual }, message);
}
export var DATE_COMPARE_VALIDATOR_ID = 'DATE_COMPARE_VALIDATOR_ID';
export function getDateCompareValidator(dateToCompare, options, message) {
    var defaultMsg = 'Указана некорректная дата!';
    var compareFn = function (date) { return true; };
    if (dateToCompare) {
        switch (options.operator) {
            case ComparisonOperators.Less:
                compareFn = function (date) { return date.getTime() < dateToCompare.getTime(); };
                break;
            case ComparisonOperators.More:
                compareFn = function (date) { return date.getTime() > dateToCompare.getTime(); };
                break;
            case ComparisonOperators.LessOrEqual:
                compareFn = function (date) { return date.getTime() <= dateToCompare.getTime(); };
                break;
            case ComparisonOperators.MoreOrEqual:
                compareFn = function (date) { return date.getTime() >= dateToCompare.getTime(); };
                break;
            default:
                throw new Error('Unknown comparison operator was received!');
        }
    }
    return {
        id: DATE_COMPARE_VALIDATOR_ID,
        validator: function (date) { return !date || compareFn(date); },
        errorMessage: message || defaultMsg
    };
}
export var NUM_WORDS_VALIDATOR_ID = 'NUM_WORDS_VALIDATOR_ID';
export function getNumWordsValidator(numWords, message) {
    var DEFAULT_MSG = 'Вы ввели недопустимое количество слов!';
    return {
        id: NUM_WORDS_VALIDATOR_ID,
        validator: function (input) { return !input || input.trim().split(' ').length === numWords; },
        errorMessage: message || DEFAULT_MSG
    };
}
export var CARD_NUMBER_VALIDATOR_ID = 'CARD_NUMBER_VALIDATOR_ID';
export function getCardNumberValidator(message) {
    var DEFAULT_MSG = 'Введен некорректный номер карты';
    var checkLuhn = function (cardNumber) {
        if (/[^0-9-\s]+/.test(cardNumber)) {
            return false;
        }
        var nCheck = 0;
        var bEven = false;
        for (var n = cardNumber.length - 1; n >= 0; n--) {
            var cDigit = cardNumber.charAt(n);
            var nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return nCheck % 10 === 0;
    };
    return {
        id: CARD_NUMBER_VALIDATOR_ID,
        validator: function (input) {
            input = input.replace(/[^\d]/g, '');
            return !input || (range(16, 20).indexOf(input.length) >= 0 && checkLuhn(input));
        },
        errorMessage: message || DEFAULT_MSG
    };
}
export var CUSTOM_VALIDATOR_ID = 'CUSTOM_VALIDATOR_ID';
export function getCustomValidator(condition, message, options) {
    var DEFAULT_MSG = 'Вы ввели некорректные данные!';
    var validate = function (value) {
        if (condition instanceof RegExp) {
            return condition.test(value);
        }
        if (typeof condition === 'function') {
            return condition(value);
        }
        return true;
    };
    return {
        id: (options && options.id) || CUSTOM_VALIDATOR_ID,
        validator: function (input) { return !input || validate(input); },
        errorMessage: message || DEFAULT_MSG
    };
}
