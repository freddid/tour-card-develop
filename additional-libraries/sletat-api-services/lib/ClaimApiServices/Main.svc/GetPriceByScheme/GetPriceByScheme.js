"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceByScheme = exports.GetPriceByScheme = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseClaimMainApiService_1 = require("../BaseClaimMainApiService");
var Request_1 = require("./Request");
var Response_1 = require("./Response");
/**
 * @deprecated
 * SLT-2674 используется в приложении tour-card модулей
 */
var GetPriceByScheme = /** @class */ (function (_super) {
    tslib_1.__extends(GetPriceByScheme, _super);
    function GetPriceByScheme(options) {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'GetPriceByScheme';
        _this.RequestWrapper = Request_1.createGetPriceBySchemeRequestWrapper;
        _this.ResponseWrapper = Response_1.createGetPriceBySchemeResponseWrapper;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return GetPriceByScheme;
}(BaseClaimMainApiService_1.BaseClaimMainApiService));
exports.GetPriceByScheme = GetPriceByScheme;
function getPriceByScheme(params, options) {
    return new GetPriceByScheme(options).call(params);
}
exports.getPriceByScheme = getPriceByScheme;
