"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = exports.GetTemplates = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetTemplatesResponse_1 = require("./GetTemplatesResponse");
/**
 * Список шаблонов горящих туров.
 */
var GetTemplates = /** @class */ (function (_super) {
    tslib_1.__extends(GetTemplates, _super);
    function GetTemplates(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetTemplates';
        _this.ResponseWrapper = GetTemplatesResponse_1.getGetTemplatesResponseData;
        _this.useCache = true;
        _this.cacheTime = 1000 * 60 * 10;
        _this.isSearchWithRobot = !!options && !!options.isSearchWithRobot;
        return _this;
    }
    return GetTemplates;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetTemplates = GetTemplates;
function getTemplates(params, options) {
    return new GetTemplates(options).call(params);
}
exports.getTemplates = getTemplates;
