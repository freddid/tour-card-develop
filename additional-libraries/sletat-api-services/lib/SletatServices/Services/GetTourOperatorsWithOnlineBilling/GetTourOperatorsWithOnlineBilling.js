"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTourOperatorsWithOnlineBilling = exports.GetTourOperatorsWithOnlineBilling = void 0;
var tslib_1 = require("tslib");
var BaseSletatServicesService_1 = require("../BaseSletatServicesService");
/**
 * @deprecated В пользу src/sletat/getTOWithOnlineBilling
 */
var GetTourOperatorsWithOnlineBilling = /** @class */ (function (_super) {
    tslib_1.__extends(GetTourOperatorsWithOnlineBilling, _super);
    function GetTourOperatorsWithOnlineBilling(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetTourOperatorsWithOnlineBilling.ashx';
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        return _this;
    }
    GetTourOperatorsWithOnlineBilling.prototype.getResultName = function () {
        return "".concat(this.methodName.replace('.ashx', ''), "Result");
    };
    return GetTourOperatorsWithOnlineBilling;
}(BaseSletatServicesService_1.BaseSletatServicesService));
exports.GetTourOperatorsWithOnlineBilling = GetTourOperatorsWithOnlineBilling;
/**
 * @deprecated В пользу src/sletat/getTOWithOnlineBilling
 */
function getTourOperatorsWithOnlineBilling(params, options) {
    return new GetTourOperatorsWithOnlineBilling(options).call(params);
}
exports.getTourOperatorsWithOnlineBilling = getTourOperatorsWithOnlineBilling;
