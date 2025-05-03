"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCustomer = void 0;
var date_1 = require("sletat-common-utils/lib/date");
function wrapCustomer(customer) {
    return {
        FullName: customer.fullName ? customer.fullName : '',
        Phone: customer.phone,
        Email: customer.email,
        Address: customer.address ? customer.address : '',
        Passport: customer.passport ? customer.passport : '',
        IssuedBy: customer.passportIssuedBy ? customer.passportIssuedBy : '',
        DateOfIssue: customer.passportIssuedWhen ? (0, date_1.formatDate)(customer.passportIssuedWhen, 'DD.MM.YYYY') : null
    };
}
exports.wrapCustomer = wrapCustomer;
