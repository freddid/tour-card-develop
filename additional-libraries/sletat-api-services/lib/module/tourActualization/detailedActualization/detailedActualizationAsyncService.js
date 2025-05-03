"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedActualizationAsyncService = void 0;
var EventEmitter = require("eventemitter3");
var types_1 = require("../../../types");
var getQueueActualizationCode_1 = require("./getQueueActualizationCode");
var getActualizationResult_1 = require("./getActualizationResult");
var DetailedActualizationAsyncService = /** @class */ (function () {
    function DetailedActualizationAsyncService(settings, params) {
        if (params === void 0) { params = {}; }
        this.startActualizationTime = 0;
        this.cancelled = false;
        var _a = params.timeoutLimit, timeoutLimit = _a === void 0 ? 90000 : _a, _b = params.repeatInterval, repeatInterval = _b === void 0 ? 2000 : _b;
        this.TIMEOUT_LIMIT = timeoutLimit;
        this.REPEAT_INTERVAL = repeatInterval;
        this.settings = settings;
        this.emitter = new EventEmitter();
    }
    DetailedActualizationAsyncService.prototype.on = function (event, fn) {
        this.emitter.on(event, fn);
        return this;
    };
    DetailedActualizationAsyncService.prototype.once = function (event, fn) {
        this.emitter.once(event, fn);
        return this;
    };
    DetailedActualizationAsyncService.prototype.off = function (event, fn) {
        this.emitter.off(event, fn);
        return this;
    };
    DetailedActualizationAsyncService.prototype.start = function (params) {
        var _this = this;
        (0, getQueueActualizationCode_1.getQueueActualizationCode)(this.settings)(params)
            .then(function (code) {
            if (_this.cancelled) {
                return;
            }
            _this.startActualizationTime = Date.now();
            return _this.waitUntilFinalActualizationResult(code);
        })
            .then(function (data) { return _this.emitter.emit('success', data); })
            .catch(function (err) {
            if (!_this.cancelled) {
                _this.emitter.emit('failed', err);
            }
            else {
                _this.emitter.emit('cancelled');
            }
        });
        return this;
    };
    DetailedActualizationAsyncService.prototype.cancel = function () {
        this.cancelled = true;
        this.emitter.removeAllListeners();
        return this;
    };
    Object.defineProperty(DetailedActualizationAsyncService.prototype, "isTimeoutLimit", {
        get: function () {
            return Date.now() - this.startActualizationTime > this.TIMEOUT_LIMIT;
        },
        enumerable: false,
        configurable: true
    });
    DetailedActualizationAsyncService.prototype.waitUntilFinalActualizationResult = function (code) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, getActualizationResult_1.getActualizationResult)(_this.settings)(code)
                .then(function (response) {
                if (response.isError) {
                    reject(new types_1.HttpError(response.errorMessage));
                    return;
                }
                if (response.isCompleted) {
                    resolve(response);
                    return;
                }
                if (_this.isTimeoutLimit) {
                    reject(new types_1.HttpError('Превышено время ожидания.'));
                    return;
                }
                if (_this.cancelled) {
                    reject(new Error('Детальная актуализация отменена'));
                    return;
                }
                setTimeout(function () {
                    _this.waitUntilFinalActualizationResult(code)
                        .then(resolve)
                        .catch(reject);
                }, _this.REPEAT_INTERVAL);
            })
                .catch(reject);
        });
    };
    return DetailedActualizationAsyncService;
}());
exports.DetailedActualizationAsyncService = DetailedActualizationAsyncService;
