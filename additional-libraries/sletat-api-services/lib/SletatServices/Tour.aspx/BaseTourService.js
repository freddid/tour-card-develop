"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTourService = void 0;
var tslib_1 = require("tslib");
var BaseSletatService_1 = require("../BaseSletatService");
/**
 * Базовый класс сервисов карточки тура
 */
var BaseTourService = /** @class */ (function (_super) {
    tslib_1.__extends(BaseTourService, _super);
    function BaseTourService() {
        var _this = _super.call(this) || this;
        _this.handlerName = 'tour.aspx';
        _this.getResultName = function () { return 'd'; };
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return _this;
    }
    return BaseTourService;
}(BaseSletatService_1.BaseSletatService));
exports.BaseTourService = BaseTourService;
