"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTourOrderService = void 0;
var tslib_1 = require("tslib");
var BaseSletatService_1 = require("../../BaseSletatService");
var BaseTourOrderService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseTourOrderService, _super);
    function BaseTourOrderService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'tour.aspx';
        _this.getResultName = function () { return 'd'; };
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return _this;
    }
    BaseTourOrderService.prototype.successHandler = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (response.d.IsError) {
                reject(response.d.ErrorMessage);
            }
            else {
                resolve(_this.ResponseWrapper ? _this.ResponseWrapper(response.d) : response.d);
            }
        });
    };
    return BaseTourOrderService;
}(BaseSletatService_1.BaseSletatService));
exports.BaseTourOrderService = BaseTourOrderService;
