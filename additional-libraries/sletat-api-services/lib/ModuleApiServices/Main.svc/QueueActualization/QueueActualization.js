"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueActualization = void 0;
var tslib_1 = require("tslib");
var BaseModuleMainApiService_1 = require("../BaseModuleMainApiService");
var Response_1 = require("./Response");
var QueueActualization = /** @class */ (function (_super) {
    tslib_1.__extends(QueueActualization, _super);
    function QueueActualization(options) {
        var _this = _super.call(this) || this;
        _this.methodName = 'QueueActualization';
        _this.ResponseWrapper = Response_1.getQueueActualizationResponse;
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    return QueueActualization;
}(BaseModuleMainApiService_1.BaseModuleMainApiService));
/**
 * Сервис получения идентификатора запроса на актуализацию тура.
 */
function queueActualization(params, options) {
    return new QueueActualization(options).call(params);
}
exports.queueActualization = queueActualization;
