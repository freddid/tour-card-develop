"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = void 0;
var tslib_1 = require("tslib");
var BaseModuleCommentsApiService_1 = require("../BaseModuleCommentsApiService");
var GetCommentsResponse_1 = require("./GetCommentsResponse");
/**
 * Возвращает список отзывов об отеле.
 * @deprecated
 * нужно использовать ui/hotelReviews
 */
var GetComments = /** @class */ (function (_super) {
    tslib_1.__extends(GetComments, _super);
    function GetComments(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetComments';
        _this.useCache = true;
        _this.ResponseWrapper = GetCommentsResponse_1.getCommentsResponse;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return GetComments;
}(BaseModuleCommentsApiService_1.BaseModuleCommentsApiService));
/**
 * @deprecated
 * используется в старом компоненте Reviews в sletat-ui-components
 * нужно использовать ui/hotelReviews
 */
function getComments(params, options) {
    return new GetComments(options).call(params);
}
exports.getComments = getComments;
