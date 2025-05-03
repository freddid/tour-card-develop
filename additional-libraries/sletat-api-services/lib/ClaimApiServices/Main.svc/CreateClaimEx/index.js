"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaimEx = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseClaimMainApiService_1 = require("../BaseClaimMainApiService");
var Request_1 = require("../CreateClaim/Request");
var Response_1 = require("./Response");
/**
 * @deprecated
 * используем claims/createClaimEx
 */
var CreateClaimEx = /** @class */ (function (_super) {
    tslib_1.__extends(CreateClaimEx, _super);
    function CreateClaimEx(options) {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'CreateClaimEx';
        _this.RequestWrapper = Request_1.createClaimRequestWrapper;
        _this.ResponseWrapper = Response_1.createClaimExResponseWrapper;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return CreateClaimEx;
}(BaseClaimMainApiService_1.BaseClaimMainApiService));
function createClaimEx(params, options) {
    return new CreateClaimEx(options).call(params);
}
exports.createClaimEx = createClaimEx;
