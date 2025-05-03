"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailAboutRecipient = exports.sendMailAbout = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseUISletatApiMailService_1 = require("../BaseUISletatApiMailService");
var MailAbout = /** @class */ (function (_super) {
    tslib_1.__extends(MailAbout, _super);
    function MailAbout() {
        var _this = _super.call(this) || this;
        _this.methodName = "mail/about";
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };
        _this.isErrorResultFieldName = 'isError';
        _this.errorMessageResultFieldName = 'errorMessage';
        return _this;
    }
    MailAbout.prototype.getResultName = function () {
        return null;
    };
    return MailAbout;
}(BaseUISletatApiMailService_1.BaseUISletatApiMailService));
function sendMailAbout(params) {
    return new MailAbout().call(params);
}
exports.sendMailAbout = sendMailAbout;
/**
 * 0 -директор (av@sletat.ru)
 * 1 – компания (info@sletat.ru)
 * 2 – партнер (ed@sletat.ru, et@sletat.ru)
 */
var MailAboutRecipient;
(function (MailAboutRecipient) {
    MailAboutRecipient[MailAboutRecipient["Director"] = 0] = "Director";
    MailAboutRecipient[MailAboutRecipient["Company"] = 1] = "Company";
    MailAboutRecipient[MailAboutRecipient["Partner"] = 2] = "Partner";
})(MailAboutRecipient = exports.MailAboutRecipient || (exports.MailAboutRecipient = {}));
