"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotels = exports.GetHotels = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetHotelsResponse_1 = require("./GetHotelsResponse");
var GetHotelsRequest_1 = require("./GetHotelsRequest");
var GetHotels = /** @class */ (function (_super) {
    tslib_1.__extends(GetHotels, _super);
    function GetHotels() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetHotels';
        _this.RequestWrapper = GetHotelsRequest_1.getGetHotelsRequestData;
        _this.ResponseWrapper = GetHotelsResponse_1.getGetHotelsResponseData;
        return _this;
    }
    return GetHotels;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetHotels = GetHotels;
function getHotels(params) {
    return new GetHotels().call(params);
}
exports.getHotels = getHotels;
