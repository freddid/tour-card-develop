"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSearchChangeView = void 0;
var tslib_1 = require("tslib");
var http_lite_1 = require("http-lite");
var BaseSletatServicesService_1 = require("../BaseSletatServicesService");
var NewSearchViewChangeService = /** @class */ (function (_super) {
    tslib_1.__extends(NewSearchViewChangeService, _super);
    function NewSearchViewChangeService(params, options) {
        var _this = _super.call(this) || this;
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        _this.httpMethod = http_lite_1.HTTPMethods.POST;
        _this.methodName = "NewSearch.ashx?v=".concat(params.v);
        return _this;
    }
    NewSearchViewChangeService.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    };
    return NewSearchViewChangeService;
}(BaseSletatServicesService_1.BaseSletatServicesService));
/**
 * Пользователь переключил тип выдачи
 */
function newSearchChangeView(params, options) {
    return new NewSearchViewChangeService(params, options).call(params);
}
exports.newSearchChangeView = newSearchChangeView;
