"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeals = exports.GetMeals = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetMeals = /** @class */ (function (_super) {
    tslib_1.__extends(GetMeals, _super);
    function GetMeals() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetMeals';
        return _this;
    }
    return GetMeals;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetMeals = GetMeals;
function getMeals(params) {
    return new GetMeals().call(params);
}
exports.getMeals = getMeals;
