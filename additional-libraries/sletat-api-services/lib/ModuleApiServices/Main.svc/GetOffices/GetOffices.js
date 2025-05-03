"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffices = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetOfficesResponse_1 = require("./GetOfficesResponse");
var GetOffices = /** @class */ (function (_super) {
    tslib_1.__extends(GetOffices, _super);
    function GetOffices(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetOffices';
        _this.ResponseWrapper = GetOfficesResponse_1.getOfficesResponse;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return GetOffices;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
function getOffices(params, options) {
    return new GetOffices(options).call(params);
}
exports.getOffices = getOffices;
