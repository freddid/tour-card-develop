"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAdsAdvertisementsApiService = void 0;
var tslib_1 = require("tslib");
var BaseAdsApiService_1 = require("../BaseAdsApiService");
/**
 * @deprecated
 * используем функции из ads
 */
var BaseAdsAdvertisementsApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseAdsAdvertisementsApiService, _super);
    function BaseAdsAdvertisementsApiService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'Advertisements.svc';
        return _this;
    }
    return BaseAdsAdvertisementsApiService;
}(BaseAdsApiService_1.BaseAdsApiService));
exports.BaseAdsAdvertisementsApiService = BaseAdsAdvertisementsApiService;
