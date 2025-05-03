"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentification = exports.Authentification = exports.AuthentificationResults = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var sletat_api_services_consts_1 = require("sletat-api-services-consts");
var BaseApiService_1 = require("../BaseApiService");
var AuthentificationResults;
(function (AuthentificationResults) {
    AuthentificationResults[AuthentificationResults["SUCCESS"] = 0] = "SUCCESS";
    AuthentificationResults[AuthentificationResults["ERROR"] = 1] = "ERROR";
})(AuthentificationResults = exports.AuthentificationResults || (exports.AuthentificationResults = {}));
var Authentification = /** @class */ (function (_super) {
    tslib_1.__extends(Authentification, _super);
    function Authentification() {
        var _this = _super.call(this) || this;
        _this.handlerName = '';
        _this.serviceName = sletat_api_services_consts_1.SLETAT_HOST_NAME;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'authentification';
        _this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        return _this;
    }
    Authentification.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            if (response === 'true') {
                resolve(AuthentificationResults.SUCCESS);
            }
            else {
                reject(AuthentificationResults.ERROR);
            }
        });
    };
    return Authentification;
}(BaseApiService_1.BaseApiService));
exports.Authentification = Authentification;
// TODO:stepancar TODO:ded obsolete  теперь для авторизации посылается столько один запрос
function authentification(params) {
    return new Authentification().call(params);
}
exports.authentification = authentification;
