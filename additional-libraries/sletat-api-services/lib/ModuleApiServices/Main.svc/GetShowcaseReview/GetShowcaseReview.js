"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowcaseReview = exports.GetShowcaseReview = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetShowcaseReviewResponse_1 = require("./GetShowcaseReviewResponse");
/**
 * Список шаблонов горящих туров.
 */
var GetShowcaseReview = /** @class */ (function (_super) {
    tslib_1.__extends(GetShowcaseReview, _super);
    function GetShowcaseReview() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetShowcaseReview';
        _this.ResponseWrapper = GetShowcaseReviewResponse_1.getGetShowcaseReviewResponseData;
        _this.useCache = true;
        return _this;
    }
    return GetShowcaseReview;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetShowcaseReview = GetShowcaseReview;
function getShowcaseReview(params) {
    return new GetShowcaseReview().call(params);
}
exports.getShowcaseReview = getShowcaseReview;
