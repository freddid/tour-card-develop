"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUISletatMorpherApiService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseUISletatApiService_1 = require("../BaseUISletatApiService");
var BaseUISletatMorpherApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseUISletatMorpherApiService, _super);
    function BaseUISletatMorpherApiService() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.GET;
        _this.handlerName = 'Morpher/MorpherService.svc';
        _this.serviceName += '/Services';
        return _this;
    }
    return BaseUISletatMorpherApiService;
}(BaseUISletatApiService_1.BaseUISletatApiService));
exports.BaseUISletatMorpherApiService = BaseUISletatMorpherApiService;
