"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTourDates = exports.GetTourDates = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetTourDatesResponse_1 = require("./GetTourDatesResponse");
/**
 * Список даты в которые есть туры по заданному направлению. Данные берутся из кеша
 */
var GetTourDates = /** @class */ (function (_super) {
    tslib_1.__extends(GetTourDates, _super);
    function GetTourDates() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetTourDates';
        _this.ResponseWrapper = GetTourDatesResponse_1.getGetTourDatesResponseData;
        return _this;
    }
    return GetTourDates;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetTourDates = GetTourDates;
/**
 * @deprecated нужно использовать module/getTourDates
 */
function getTourDates(params) {
    return new GetTourDates().call(params);
}
exports.getTourDates = getTourDates;
