"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToursErrorTypes = exports.GetToursAsyncService = exports.GetToursAsyncServiceEvents = void 0;
var tslib_1 = require("tslib");
var clone_1 = tslib_1.__importDefault(require("lodash/clone"));
var emitter_1 = require("sletat-common-utils/lib/emitter");
var GetLoadState_1 = require("../GetLoadState/GetLoadState");
var GetTours_1 = require("./GetTours");
var GET_LOAD_STATE_TIMEOUT = 2500;
var GetToursAsyncServiceEvents;
(function (GetToursAsyncServiceEvents) {
    /**
     * Первые результаты получены
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["FirstResults"] = 0] = "FirstResults";
    /**
     * Прогресс LoadState отличается от предыдущего
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["Progress"] = 1] = "Progress";
    /**
     * Поиск туров окончен
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["Final"] = 2] = "Final";
    /**
     * Получен RequestId
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["RequestId"] = 3] = "RequestId";
    /**
     * Произошла ошибка в запросе GetTours
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["GetToursError"] = 4] = "GetToursError";
})(GetToursAsyncServiceEvents = exports.GetToursAsyncServiceEvents || (exports.GetToursAsyncServiceEvents = {}));
/**
 * @deprecated используй /src/module/getTours/getToursAsyncService
 */
var GetToursAsyncService = /** @class */ (function () {
    function GetToursAsyncService(params) {
        var _this = this;
        this.emitter = new emitter_1.Emitter();
        this.isDestroyed = false;
        this.isFirstResultsGotten = false;
        if (params) {
            params.requestId = 0;
            this.searchParams = params;
            // First call of get tours with request Id
            new GetTours_1.GetTours()
                .call(params)
                .then(function (response) {
                // Server returns requestId for next client requests
                _this.currentRequestId = response.currentRequestId;
                _this.searchParams.requestId = response.currentRequestId;
                _this.emitter.emit(GetToursAsyncServiceEvents.RequestId);
                _this.currentLoadState = response.loadState;
                _this.isFirstResultsGotten =
                    response.tours.length > 0 || _this.isOperatorsHasTours(response.loadState);
                if (_this.isFirstResultsGotten) {
                    _this.emitter.emit(GetToursAsyncServiceEvents.FirstResults, response);
                }
                if (!_this.isAllOperatorsProcessed(response.loadState)) {
                    _this.startGetLoadStatePolling();
                }
                else {
                    _this.emitter.emit(GetToursAsyncServiceEvents.Progress);
                    _this.emitter.emit(GetToursAsyncServiceEvents.Final);
                }
            }, function (message) {
                _this.emitter.emit(GetToursAsyncServiceEvents.GetToursError, {
                    message: message,
                    type: getErrorType(message)
                });
            })
                .catch(function (message) {
                _this.emitter.emit(GetToursAsyncServiceEvents.GetToursError, {
                    message: message,
                    type: getErrorType(message)
                });
            });
        }
    }
    GetToursAsyncService.prototype.on = function (eventType, listener) {
        return this.emitter.on(eventType, listener);
    };
    GetToursAsyncService.prototype.once = function (eventType, listener) {
        return this.emitter.once(eventType, listener);
    };
    GetToursAsyncService.prototype.getTours = function (params) {
        var searchParams = params || this.searchParams;
        return new GetTours_1.GetTours()
            .call(searchParams)
            .then(function (response) {
            return response;
        })
            .catch(function (message) {
            return Promise.reject({
                message: message,
                type: getErrorType(message)
            });
        });
    };
    GetToursAsyncService.prototype.getLoadState = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.currentLoadState);
        });
    };
    GetToursAsyncService.prototype.getRequestId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.currentRequestId);
        });
    };
    GetToursAsyncService.prototype.getSearchParams = function () {
        return (0, clone_1.default)(this.searchParams);
    };
    GetToursAsyncService.prototype.destroy = function () {
        clearTimeout(this.loadStateTimeoutId);
        clearInterval(this.loadStateTimeoutId);
        this.isDestroyed = true;
        this.emitter.removeEvent();
    };
    GetToursAsyncService.prototype.getTrackedLoadStateValues = function (loadState) {
        return loadState.operatorsList.map(function (operator) { return ({
            RowsCount: operator.rowsCount,
            IsProcessed: operator.isProcessed,
            MaxPrice: operator.maxPrice,
            MinPrice: operator.minPrice
        }); });
    };
    GetToursAsyncService.prototype.isLoadStatesEquals = function (oldState, newState) {
        return (JSON.stringify(this.getTrackedLoadStateValues(oldState)) ===
            JSON.stringify(this.getTrackedLoadStateValues(newState)));
    };
    GetToursAsyncService.prototype.isOperatorsHasTours = function (loadState) {
        return (loadState.operatorsList.filter(function (operator) {
            return operator.isProcessed && !operator.isError && operator.rowsCount > 0;
        }).length > 0);
    };
    GetToursAsyncService.prototype.startGetLoadStatePolling = function () {
        var _this = this;
        this.loadStateTimeoutId = window.setTimeout(function () {
            new GetLoadState_1.GetLoadState()
                .call({ requestId: _this.currentRequestId })
                .then(_this.loadStateResponseHandler.bind(_this));
        }, GET_LOAD_STATE_TIMEOUT);
    };
    /**
     * На основаним результата loadState
     * Принимается решение уведомить приложение о
     * 1 - первых результатах
     * 2 - о том, что прогресс изменился (Изменилась информация по какому-либо оператору)
     * 3 - об окончании поиска
     * 4 - о том, что произошла ошибка
     * Если поиск не закончен - getLoadState запрашивается заново
     */
    GetToursAsyncService.prototype.loadStateResponseHandler = function (loadState) {
        var _this = this;
        if (this.isDestroyed) {
            return;
        }
        // Error
        // Обратите внимание, что иногда сервис отвечает одним оператором fake
        // https://agile.sletat.ru/jiraurl/browse/SITES-513
        // Как говорит Федя - это нормально
        if (loadState.operatorsList.filter(function (operator) { return operator.name === 'Fake'; }).length > 0) {
            this.currentLoadState.operatorsList = [];
            clearTimeout(this.loadStateTimeoutId);
            this.emitter.emit(GetToursAsyncServiceEvents.GetToursError, {
                type: GetToursErrorTypes.TourNotFound,
                message: 'Туры не найдены.'
            });
            return;
        }
        // First Results
        if (!this.isFirstResultsGotten) {
            this.isFirstResultsGotten = this.isOperatorsHasTours(loadState);
            if (this.isFirstResultsGotten) {
                this.emitter.emit(GetToursAsyncServiceEvents.FirstResults);
            }
        }
        // Progress
        if (!this.currentLoadState || !this.isLoadStatesEquals(this.currentLoadState, loadState)) {
            this.currentLoadState = loadState;
            this.emitter.emit(GetToursAsyncServiceEvents.Progress);
        }
        // Final
        if (this.isAllOperatorsProcessed(loadState)) {
            clearTimeout(this.loadStateTimeoutId);
            this.emitter.emit(GetToursAsyncServiceEvents.Final);
        }
        else {
            // Continue search
            this.loadStateTimeoutId = window.setTimeout(function () {
                new GetLoadState_1.GetLoadState()
                    .call({ requestId: _this.currentRequestId })
                    .then(_this.loadStateResponseHandler.bind(_this));
            }, GET_LOAD_STATE_TIMEOUT);
        }
    };
    /**
     * Завершен ли поиск по всем туроператорам
     */
    GetToursAsyncService.prototype.isAllOperatorsProcessed = function (loadState) {
        // Если лист операторов пуст (первый поиск, нет данных в кеше)
        if (loadState.operatorsList.length === 0) {
            return false;
        }
        return (loadState.operatorsList.filter(function (operator) {
            return operator.isProcessed || operator.isSkipped || operator.isError;
        }).length === loadState.operatorsList.length);
    };
    return GetToursAsyncService;
}());
exports.GetToursAsyncService = GetToursAsyncService;
var GetToursErrorTypes;
(function (GetToursErrorTypes) {
    /**
     * Превышено количество запросов
     */
    GetToursErrorTypes[GetToursErrorTypes["ExceedRequestsCount"] = 0] = "ExceedRequestsCount";
    /**
     * Истекла поисковая сессия
     */
    GetToursErrorTypes[GetToursErrorTypes["SessionExpired"] = 1] = "SessionExpired";
    GetToursErrorTypes[GetToursErrorTypes["TourNotFound"] = 2] = "TourNotFound";
    /**
     * Неизвестная ошибка.
     * При возникновении такой ошибки - ее необходимо описать тут
     */
    GetToursErrorTypes[GetToursErrorTypes["UnknownError"] = 3] = "UnknownError";
})(GetToursErrorTypes = exports.GetToursErrorTypes || (exports.GetToursErrorTypes = {}));
/**
 * Returns error type according error text
 * TODO:stepancar, TODO: ded попросить бэк выкидывать код бизнес ошибки для кастоми зации сообщений
 */
function getErrorType(errorText) {
    if (errorText.toLowerCase().includes('время поисковой сессии истекло')) {
        return GetToursErrorTypes.SessionExpired;
    }
    if (errorText.toLowerCase().includes('превышен лимит кол-ва поисковых запросов')) {
        return GetToursErrorTypes.ExceedRequestsCount;
    }
    return GetToursErrorTypes.UnknownError;
}
