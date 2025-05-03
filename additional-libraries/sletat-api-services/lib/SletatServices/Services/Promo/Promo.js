"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromoForm = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseSletatServicesService_1 = require("../BaseSletatServicesService");
var SendPromoForm = /** @class */ (function (_super) {
    tslib_1.__extends(SendPromoForm, _super);
    function SendPromoForm() {
        var _this = _super.call(this) || this;
        _this.methodName = 'promo.ashx';
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return _this;
    }
    /**
     * Сервис не возвращает ничего вроде как
     */
    SendPromoForm.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    };
    return SendPromoForm;
}(BaseSletatServicesService_1.BaseSletatServicesService));
function sendPromoForm(params) {
    return new SendPromoForm().call(params);
}
exports.sendPromoForm = sendPromoForm;
