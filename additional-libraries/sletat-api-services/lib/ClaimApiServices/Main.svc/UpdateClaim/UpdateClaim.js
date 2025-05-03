"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClaimService = exports.UpdateClaimService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseClaimMainApiService_1 = require("../BaseClaimMainApiService");
/**
 * @deprecated нужно использовать claims/updateClaim
 */
var UpdateClaimService = /** @class */ (function (_super) {
    tslib_1.__extends(UpdateClaimService, _super);
    function UpdateClaimService() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'UpdateClaim';
        return _this;
    }
    return UpdateClaimService;
}(BaseClaimMainApiService_1.BaseClaimMainApiService));
exports.UpdateClaimService = UpdateClaimService;
/**
 * @deprecated нужно использовать claims/updateClaim
 */
function updateClaimService(params) {
    return new UpdateClaimService().call(params);
}
exports.updateClaimService = updateClaimService;
