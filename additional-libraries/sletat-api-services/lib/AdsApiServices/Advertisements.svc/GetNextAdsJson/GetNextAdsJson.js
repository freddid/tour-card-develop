"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextAdsJson = exports.GetNextAdsJson = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseAdsAdvertisementsApiService_1 = require("../BaseAdsAdvertisementsApiService");
var GetNextAdsJsonResponse_1 = require("./GetNextAdsJsonResponse");
/**
 * @deprecated
 * нужно использовать ads/getNextAdsJson
 */
var GetNextAdsJson = /** @class */ (function (_super) {
    tslib_1.__extends(GetNextAdsJson, _super);
    function GetNextAdsJson() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.JSONP;
        _this.methodName = 'GetNextAdsJson';
        _this.ResponseWrapper = GetNextAdsJsonResponse_1.getGetNextAdsJsonResponseData;
        _this.successHandler = function (response) {
            var data = response;
            var isError = !!data.IsError;
            return new Promise(function (resolve, reject) {
                if (isError) {
                    reject(data.ErrorMessage);
                }
                else {
                    resolve(_this.ResponseWrapper(data.Data));
                }
            });
        };
        return _this;
    }
    return GetNextAdsJson;
}(BaseAdsAdvertisementsApiService_1.BaseAdsAdvertisementsApiService));
exports.GetNextAdsJson = GetNextAdsJson;
/**
 * @deprecated нужно использовать ads/getNextAdsJson
 */
function getNextAdsJson(params) {
    return new GetNextAdsJson().call(params);
}
exports.getNextAdsJson = getNextAdsJson;
