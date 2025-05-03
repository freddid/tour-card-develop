"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUISletatWhereToBuyApiService = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseUISletatApiService_1 = require("../BaseUISletatApiService");
var BaseUISletatWhereToBuyApiService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseUISletatWhereToBuyApiService, _super);
    function BaseUISletatWhereToBuyApiService() {
        var _this = _super.call(this) || this;
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };
        _this.httpMethod = HttpLite.HTTPMethods.GET;
        _this.handlerName = 'wheretobuy';
        _this.serviceName += '/api';
        return _this;
    }
    BaseUISletatWhereToBuyApiService.prototype.successHandler = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (response.isError) {
                reject(response.errorMessage);
            }
            else {
                resolve(_this.ResponseWrapper ? _this.ResponseWrapper(response.data) : response.data);
            }
        });
    };
    return BaseUISletatWhereToBuyApiService;
}(BaseUISletatApiService_1.BaseUISletatApiService));
exports.BaseUISletatWhereToBuyApiService = BaseUISletatWhereToBuyApiService;
