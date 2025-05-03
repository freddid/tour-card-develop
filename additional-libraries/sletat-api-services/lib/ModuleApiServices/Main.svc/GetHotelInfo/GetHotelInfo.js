"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelInfo = exports.GetHotelInfo = void 0;
var tslib_1 = require("tslib");
var isUndefined_1 = require("../../../utils/isUndefined");
var BaseXhrModuleMainApiService_1 = require("../BaseXhrModuleMainApiService");
var GetHotelInfoResponse_1 = require("./GetHotelInfoResponse");
/**
 * @deprecated нужно использовать modules/getHotelInfo
 * Запрос информации об отеле
 */
var GetHotelInfo = /** @class */ (function (_super) {
    tslib_1.__extends(GetHotelInfo, _super);
    function GetHotelInfo(params, options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetHotelInfo';
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        if (!(0, isUndefined_1.isUndefined)(params)) {
            _this.ResponseWrapper = (0, GetHotelInfoResponse_1.getHandlerForGetHotelInfoResponseData)(params);
        }
        return _this;
    }
    return GetHotelInfo;
}(BaseXhrModuleMainApiService_1.BaseXhrModuleMainApiService));
exports.GetHotelInfo = GetHotelInfo;
function getHotelInfo(params, options) {
    var service = new GetHotelInfo(params, options);
    return service.call(params);
}
exports.getHotelInfo = getHotelInfo;
