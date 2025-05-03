"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCases = exports.GetCases = void 0;
var tslib_1 = require("tslib");
var BaseUISletatMorpherApiService_1 = require("../BaseUISletatMorpherApiService");
var GetCasesResponse_1 = require("./GetCasesResponse");
/**
 * Сервис для получения падежных форм слов
 * @deprecated Нужно использовать сервис ui/getCases
 */
var GetCases = /** @class */ (function (_super) {
    tslib_1.__extends(GetCases, _super);
    function GetCases(settings) {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetCases';
        _this.ResponseWrapper = GetCasesResponse_1.getGetCasesResponseData;
        if (settings && settings.host) {
            _this.serviceName = settings.host;
        }
        return _this;
    }
    return GetCases;
}(BaseUISletatMorpherApiService_1.BaseUISletatMorpherApiService));
exports.GetCases = GetCases;
/**
 * @deprecated Нужно использовать сервис ui/getCases
 */
function getCases(params, settings) {
    return new GetCases(settings).call(params);
}
exports.getCases = getCases;
