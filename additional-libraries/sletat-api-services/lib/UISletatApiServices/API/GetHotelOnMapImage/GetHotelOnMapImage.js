"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelOnMapImage = void 0;
var tslib_1 = require("tslib");
var BaseUISletatApiService_1 = require("../BaseUISletatApiService");
/**
 * Сервис для получения изображения отеля на карте.
 * @deprecated
 * актуальный сервис: src/ui/getHotelOnMapImage
 */
var GetHotelOnMapImage = /** @class */ (function (_super) {
    tslib_1.__extends(GetHotelOnMapImage, _super);
    function GetHotelOnMapImage(hotelId, options) {
        var _this = _super.call(this) || this;
        if (!!console && typeof console.warn === 'function') {
            console.warn('This service is deprecated. Use ui/getHotelOnMapImage instead!');
        }
        _this.methodName = "googlemapsimages/".concat(hotelId);
        _this.useCache = true;
        _this.cacheTime = 1000 * 60 * 60;
        _this.headers = {
            Accept: 'application/json'
        };
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    GetHotelOnMapImage.prototype.successHandler = function (response) {
        var resultData = response.data;
        var isError = !!response.isError;
        var errorMessage = response.errorMessage;
        return new Promise(function (resolve, reject) {
            if (isError) {
                reject(errorMessage);
            }
            else {
                resolve(resultData);
            }
        });
    };
    return GetHotelOnMapImage;
}(BaseUISletatApiService_1.BaseUISletatApiService));
function getHotelOnMapImage(hotelId, params, options) {
    return new GetHotelOnMapImage(hotelId, options).call(params);
}
exports.getHotelOnMapImage = getHotelOnMapImage;
