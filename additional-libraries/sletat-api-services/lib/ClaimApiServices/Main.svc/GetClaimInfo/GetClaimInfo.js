"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClaimInfoService = exports.GetClaimInfoService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseClaimMainApiService_1 = require("../BaseClaimMainApiService");
/**
 * @deprecated нужно использовать claims/getClaimInfo
 */
var GetClaimInfoService = /** @class */ (function (_super) {
    tslib_1.__extends(GetClaimInfoService, _super);
    function GetClaimInfoService(options) {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.JSONP;
        _this.methodName = 'GetClaimInfo';
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        return _this;
    }
    return GetClaimInfoService;
}(BaseClaimMainApiService_1.BaseClaimMainApiService));
exports.GetClaimInfoService = GetClaimInfoService;
/**
 * @deprecated нужно использовать claims/getClaimInfo
 */
function getClaimInfoService(params, options) {
    return new GetClaimInfoService(options).call(params);
}
exports.getClaimInfoService = getClaimInfoService;
