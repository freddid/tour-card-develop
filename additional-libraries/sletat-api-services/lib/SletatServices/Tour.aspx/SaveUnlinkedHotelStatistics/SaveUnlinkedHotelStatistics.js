"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUnlinkedHotelStatistics = void 0;
var tslib_1 = require("tslib");
var http_lite_1 = require("http-lite");
var BaseTourService_1 = require("../BaseTourService");
// TODO:stepancar Добавить автогенерацию для этого сервиса
var SaveUnlinkedHotelStatistics = /** @class */ (function (_super) {
    tslib_1.__extends(SaveUnlinkedHotelStatistics, _super);
    function SaveUnlinkedHotelStatistics() {
        var _this = _super.call(this) || this;
        _this.methodName = 'SaveUnlinkedHotelStatistics';
        _this.httpMethod = http_lite_1.HTTPMethods.GET;
        return _this;
    }
    return SaveUnlinkedHotelStatistics;
}(BaseTourService_1.BaseTourService));
/**
 * Логировать интерес(клик) к не слинкованному отелю. (Запросы падают в базу, собирается статистика не слинкованных но интересных отелей)
 */
function saveUnlinkedHotelStatistics(params) {
    return new SaveUnlinkedHotelStatistics().call(params);
}
exports.saveUnlinkedHotelStatistics = saveUnlinkedHotelStatistics;
