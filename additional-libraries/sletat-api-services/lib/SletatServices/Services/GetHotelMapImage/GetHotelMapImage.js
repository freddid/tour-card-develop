"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelMapImage = exports.GetHotelMapImage = void 0;
var tslib_1 = require("tslib");
var BaseSletatServicesService_1 = require("../BaseSletatServicesService");
/**
 * @deprecated в пользу sletat/getHotelMapImage
 */
var GetHotelMapImage = /** @class */ (function (_super) {
    tslib_1.__extends(GetHotelMapImage, _super);
    function GetHotelMapImage() {
        var _this = _super.call(this) || this;
        _this.methodName = 'common.ashx';
        return _this;
    }
    GetHotelMapImage.prototype.successHandler = function (response) {
        var isError = typeof response !== 'string';
        return new Promise(function (resolve, reject) {
            if (isError) {
                reject('В ответе ожидается изображение в base64-формате!');
            }
            else {
                resolve(response);
            }
        });
    };
    return GetHotelMapImage;
}(BaseSletatServicesService_1.BaseSletatServicesService));
exports.GetHotelMapImage = GetHotelMapImage;
function getHotelMapImage(params) {
    return new GetHotelMapImage().call(params);
}
exports.getHotelMapImage = getHotelMapImage;
