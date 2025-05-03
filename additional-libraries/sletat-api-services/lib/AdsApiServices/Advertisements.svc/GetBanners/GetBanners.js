"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBanners = exports.GetBanners = void 0;
var tslib_1 = require("tslib");
var http_lite_1 = require("http-lite");
var BaseAdsAdvertisementsApiService_1 = require("../BaseAdsAdvertisementsApiService");
var GetBannersResponse_1 = require("./GetBannersResponse");
/**
 * @deprecated Используй /src/ads/getBanners
 */
var GetBanners = /** @class */ (function (_super) {
    tslib_1.__extends(GetBanners, _super);
    function GetBanners() {
        var _this = _super.call(this) || this;
        _this.httpMethod = http_lite_1.HTTPMethods.JSONP;
        _this.methodName = 'GetBanners';
        // TODO:sm ЗАМЕНИТЬ ФОРМАТ ОТВЕТА СЕРВИСА
        _this.successHandler = function (response) {
            var _a;
            return _super.prototype.successHandler.call(_this, (_a = {},
                _a[_this.getResultName()] = response,
                _a));
            // var data = response;
            // var isError = !!data["IsError"];
            // return new Promise((resolve, reject) => {
            //    if (isError) {
            //        reject(data["ErrorMessage"]);
            //    } else {
            //        resolve(new GetBannersResponse(data["Data"]));
            //    }
            // });
        };
        _this.ResponseWrapper = GetBannersResponse_1.getGetBannersResponseData;
        return _this;
    }
    return GetBanners;
}(BaseAdsAdvertisementsApiService_1.BaseAdsAdvertisementsApiService));
exports.GetBanners = GetBanners;
function getBanners(params) {
    return new GetBanners().call(params);
}
exports.getBanners = getBanners;
