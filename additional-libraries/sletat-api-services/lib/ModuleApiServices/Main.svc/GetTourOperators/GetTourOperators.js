"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTourOperators = exports.GetTourOperators = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetTourOperatorsResponse_1 = require("./GetTourOperatorsResponse");
var GetTourOperators = /** @class */ (function (_super) {
    tslib_1.__extends(GetTourOperators, _super);
    function GetTourOperators() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetTourOperators';
        _this.ResponseWrapper = GetTourOperatorsResponse_1.getGetTourOperatorsResponseData;
        return _this;
    }
    return GetTourOperators;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetTourOperators = GetTourOperators;
/**
 * @deprecated нужно использовать module/getTourOperators
 */
function getTourOperators(params) {
    return new GetTourOperators().call(params);
}
exports.getTourOperators = getTourOperators;
