"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTourOrderPhone = exports.SaveTourOrderPhone = void 0;
var tslib_1 = require("tslib");
var BaseTourOrderService_1 = require("./BaseTourOrderService");
var SaveTourOrderPhoneResponse_1 = require("./SaveTourOrderPhoneResponse");
/**
 * Сервис для отправки формы
 */
var SaveTourOrderPhone = /** @class */ (function (_super) {
    tslib_1.__extends(SaveTourOrderPhone, _super);
    function SaveTourOrderPhone() {
        var _this = _super.call(this) || this;
        _this.methodName = 'SaveTourOrder';
        _this.ResponseWrapper = SaveTourOrderPhoneResponse_1.getSaveTourOrderPhoneResponseData;
        return _this;
    }
    return SaveTourOrderPhone;
}(BaseTourOrderService_1.BaseTourOrderService));
exports.SaveTourOrderPhone = SaveTourOrderPhone;
function saveTourOrderPhone(params) {
    return new SaveTourOrderPhone().call(params);
}
exports.saveTourOrderPhone = saveTourOrderPhone;
