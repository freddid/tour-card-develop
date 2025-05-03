"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverySendConfirmEmail = exports.registrationSendConfirmEmail = exports.sendConfirmEmail = exports.RecoverySendConfirmEmail = exports.RegistrationSendConfirmEmail = exports.SendConfirmEmail = exports.SendConfirmEmailResults = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var merge_1 = tslib_1.__importDefault(require("lodash/merge"));
var BaseSletatServicesService_1 = require("../BaseSletatServicesService");
var SendConfirmEmailResults;
(function (SendConfirmEmailResults) {
    SendConfirmEmailResults[SendConfirmEmailResults["SUCCESS"] = 0] = "SUCCESS";
    SendConfirmEmailResults[SendConfirmEmailResults["DUPLICATE"] = 1] = "DUPLICATE";
    SendConfirmEmailResults[SendConfirmEmailResults["NOT_FOUND"] = 2] = "NOT_FOUND";
    SendConfirmEmailResults[SendConfirmEmailResults["ERROR"] = 3] = "ERROR";
})(SendConfirmEmailResults = exports.SendConfirmEmailResults || (exports.SendConfirmEmailResults = {}));
var SendConfirmEmail = /** @class */ (function (_super) {
    tslib_1.__extends(SendConfirmEmail, _super);
    function SendConfirmEmail(options) {
        var _this = _super.call(this) || this;
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        _this.methodName = 'SendConfirmEmail.ashx';
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        _this.httpMethod = HttpLite.HTTPMethods.JSONP;
        return _this;
    }
    SendConfirmEmail.prototype.successHandler = function (response) {
        var isError = !response.result;
        return new Promise(function (resolve, reject) {
            if (isError) {
                reject(SendConfirmEmailResults.ERROR);
            }
            else {
                switch (response.result) {
                    // Пользователя с таким емейлом не существтует
                    case '-1':
                        resolve(SendConfirmEmailResults.NOT_FOUND);
                        break;
                    // Успех
                    case '0':
                        resolve(SendConfirmEmailResults.SUCCESS);
                        break;
                    // Повтор, пользователь с таким емейлом уже существует
                    case '1':
                        resolve(SendConfirmEmailResults.DUPLICATE);
                        break;
                    // Произошла ошибка или пришло что-то незапланированное
                    case '2':
                    default:
                        reject(SendConfirmEmailResults.ERROR);
                        break;
                }
            }
        });
    };
    return SendConfirmEmail;
}(BaseSletatServicesService_1.BaseSletatServicesService));
exports.SendConfirmEmail = SendConfirmEmail;
var RegistrationSendConfirmEmail = /** @class */ (function (_super) {
    tslib_1.__extends(RegistrationSendConfirmEmail, _super);
    function RegistrationSendConfirmEmail(options) {
        return _super.call(this, options) || this;
    }
    RegistrationSendConfirmEmail.prototype.call = function (options) {
        return _super.prototype.call.call(this, (0, merge_1.default)({}, options, { action: 'reg' }));
    };
    return RegistrationSendConfirmEmail;
}(SendConfirmEmail));
exports.RegistrationSendConfirmEmail = RegistrationSendConfirmEmail;
var RecoverySendConfirmEmail = /** @class */ (function (_super) {
    tslib_1.__extends(RecoverySendConfirmEmail, _super);
    function RecoverySendConfirmEmail(options) {
        return _super.call(this, options) || this;
    }
    RecoverySendConfirmEmail.prototype.call = function (options) {
        return _super.prototype.call.call(this, (0, merge_1.default)({}, options, { action: 'rem' }));
    };
    return RecoverySendConfirmEmail;
}(SendConfirmEmail));
exports.RecoverySendConfirmEmail = RecoverySendConfirmEmail;
function sendConfirmEmail(params) {
    return new SendConfirmEmail().call(params);
}
exports.sendConfirmEmail = sendConfirmEmail;
function registrationSendConfirmEmail(params, options) {
    return new RegistrationSendConfirmEmail(options).call(params);
}
exports.registrationSendConfirmEmail = registrationSendConfirmEmail;
function recoverySendConfirmEmail(params, options) {
    return new RecoverySendConfirmEmail(options).call(params);
}
exports.recoverySendConfirmEmail = recoverySendConfirmEmail;
