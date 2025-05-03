"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTours = exports.GetTours = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var GetToursResponse_1 = require("./GetToursResponse");
var GetToursRequest_1 = require("./GetToursRequest");
/**
 * TODO:ded, TODO:stepancar, TODO:im, TODO:dmtrv Выпилить этот класс из экспорта
 * @deprecated используй /src/module/getTours
 */
var GetTours = /** @class */ (function (_super) {
    tslib_1.__extends(GetTours, _super);
    function GetTours() {
        var _this = _super.call(this) || this;
        _this.methodName = 'GetTours';
        _this.RequestWrapper = GetToursRequest_1.getGetToursRequestData;
        _this.ResponseWrapper = GetToursResponse_1.getGetToursResponseData;
        return _this;
    }
    return GetTours;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
exports.GetTours = GetTours;
/**
 * Получить туры
 * @deprecated используй /src/module/getTours
 */
function getTours(params) {
    return new GetTours().call(params);
}
exports.getTours = getTours;
