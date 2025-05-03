"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelStars = exports.GetHotelStars = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetHotelStarsResponse_1 = require("./GetHotelStarsResponse");
var GetHotelStarsRequest_1 = require("./GetHotelStarsRequest");
/**
 * Возвращает список доступных категорий отелей в выбранных курортах.
 */
var GetHotelStars = /** @class */ (function (_super) {
    tslib_1.__extends(GetHotelStars, _super);
    function GetHotelStars() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetHotelStars';
        _this.ResponseWrapper = GetHotelStarsResponse_1.getGetHotelStarsResponseData;
        _this.RequestWrapper = GetHotelStarsRequest_1.getGetHotelStarsRequestData;
        return _this;
    }
    return GetHotelStars;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetHotelStars = GetHotelStars;
/**
 * @deprecated нужно использовать module/getHotelStars
 */
function getHotelStars(params) {
    return new GetHotelStars().call(params);
}
exports.getHotelStars = getHotelStars;
