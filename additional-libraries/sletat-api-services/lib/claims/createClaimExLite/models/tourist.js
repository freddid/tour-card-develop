"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapTourist = void 0;
var isUndefined_1 = require("../../../utils/isUndefined");
var date_1 = require("sletat-common-utils/lib/date");
var gender_1 = require("./gender");
function wrapTourist(tourist) {
    var _a;
    return {
        BirthDate: tourist.birthday ? (0, date_1.formatDate)(tourist.birthday, 'DD.MM.YYYY') : null,
        Citizenship: tourist.citizenship ? tourist.citizenship : '',
        FirstName: tourist.name ? tourist.name : '',
        Surname: tourist.surname ? tourist.surname : '',
        Patronymic: (_a = tourist.patronymic) !== null && _a !== void 0 ? _a : '',
        Gender: !(0, isUndefined_1.isUndefined)(tourist.gender) ? String(tourist.gender) : '',
        PassportSeries: tourist.passportSeries ? tourist.passportSeries : '',
        PassportNumber: tourist.passportNumber ? tourist.passportNumber : '',
        IssuedBy: tourist.passportIssuedBy ? tourist.passportIssuedBy : '',
        DateOfIssue: tourist.passportIssuedWhen ? (0, date_1.formatDate)(tourist.passportIssuedWhen, 'DD.MM.YYYY') : null,
        Expires: tourist.passportValidUntil ? (0, date_1.formatDate)(tourist.passportValidUntil, 'DD.MM.YYYY') : null,
        Title: !(0, isUndefined_1.isUndefined)(tourist.gender) ? String((0, gender_1.getTitle)(tourist)) : ''
    };
}
exports.wrapTourist = wrapTourist;
