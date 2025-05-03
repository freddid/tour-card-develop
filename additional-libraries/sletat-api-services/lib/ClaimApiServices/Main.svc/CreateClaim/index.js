"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaim = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseClaimMainApiService_1 = require("../BaseClaimMainApiService");
var Request_1 = require("./Request");
var Response_1 = require("./Response");
/**
 * @deprecated
 * SLT-2674 используется в приложении tour-card модулей
 */
var CreateClaim = /** @class */ (function (_super) {
    tslib_1.__extends(CreateClaim, _super);
    function CreateClaim(options) {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'CreateClaim';
        _this.RequestWrapper = Request_1.createClaimRequestWrapper;
        _this.ResponseWrapper = Response_1.createClaimResponseWrapper;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return CreateClaim;
}(BaseClaimMainApiService_1.BaseClaimMainApiService));
function createClaim(params, options) {
    return new CreateClaim(options).call(params);
}
exports.createClaim = createClaim;
