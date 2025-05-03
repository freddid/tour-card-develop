"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetToursErrorTypes = exports.GetToursAsyncService = exports.GetToursAsyncServiceEvents = void 0;
var lodash_1 = require("lodash");
// TODO selkin: зачем изобретать велосипед? нужно поменять на eventemitter3 - он уже есть в пакете
// TODO selkin: сам сервис тоже стоит причесать, лапша какая-то
var emitter_1 = require("sletat-common-utils/lib/emitter");
var getLoadState_1 = require("../getLoadState");
var index_1 = require("./index");
var GET_LOAD_STATE_TIMEOUT = 2500;
var GetToursAsyncServiceEvents;
(function (GetToursAsyncServiceEvents) {
    /**
     * Первые результаты получены
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["FirstResults"] = 0] = "FirstResults";
    /**
     * Имеющиеся результаты получены до availableResultsEventTimeout.
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["AvailableResultsIfTimeout"] = 1] = "AvailableResultsIfTimeout";
    /**
     * Прогресс LoadState отличается от предыдущего
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["Progress"] = 2] = "Progress";
    /**
     * Поиск туров окончен
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["Final"] = 3] = "Final";
    /**
     * Получен RequestId
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["RequestId"] = 4] = "RequestId";
    /**
     * Произошла ошибка в запросе GetTours
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["GetToursError"] = 5] = "GetToursError";
    /**
     * Произошла ошибка в запросе GetLoadState
     */
    GetToursAsyncServiceEvents[GetToursAsyncServiceEvents["GetLoadStateError"] = 6] = "GetLoadStateError";
})(GetToursAsyncServiceEvents = exports.GetToursAsyncServiceEvents || (exports.GetToursAsyncServiceEvents = {}));
// TODO selkin: говённо и быстро написано в рамках работы над мобильной версией, чтобы не использовать тот ужас,
// который есть в src/ModuleApiServices/Main.svc/GetTours - ибо там вообще всё плохо
//
// нужен нормальный аккуратный класс, который будет не sletat-common-utils/lib/emitter эмиттер - не за чем изобретать велосипеды
var GetToursAsyncService = /** @class */ (function () {
    function GetToursAsyncService(params, settings, availableResultsEventTimeout) {
        var _this = this;
        this.emitter = new emitter_1.Emitter();
        this.isAvailableResultsEventReached = false;
        this.isDestroyed = false;
        this.isFirstResultsGotten = false;
        this.availableResultsEventTimeout = availableResultsEventTimeout !== null && availableResultsEventTimeout !== void 0 ? availableResultsEventTimeout : 0;
        this.getLoadStateService = (0, getLoadState_1.getLoadState)({
            host: settings.host,
            isSearchWithRobot: settings.isSearchWithRobot,
            headers: settings.headers
        });
        this.getToursService = (0, index_1.getTours)({
            host: settings.host,
            isSearchWithRobot: settings.isSearchWithRobot,
            headers: settings.headers
        });
        if (params) {
            this.searchStartMs = Date.now();
            params.requestId = 0;
            this.searchParams = params;
            // First call of get tours with request Id
            this.getToursService(params)
                .then(function (response) {
                // Server returns requestId for next client requests
                _this.currentRequestId = response.currentRequestId;
                _this.searchParams.requestId = response.currentRequestId;
                _this.emitter.emit(GetToursAsyncServiceEvents.RequestId);
                _this.currentLoadState = response.loadState;
                var pessimizedOperators = _this.searchParams.pessimizedOperatorsIds || [];
                var isDemo = !response.currentRequestId && !!response.tours.length && response.tours[0].isDemo;
                _this.isFirstResultsGotten =
                    response.tours.filter(function (t) { return !pessimizedOperators.includes(t.sourceId); }).length > 0 &&
                        (isDemo || _this.isOperatorsHasTours(response.loadState));
                if (_this.isFirstResultsGotten) {
                    _this.emitter.emit(GetToursAsyncServiceEvents.FirstResults, response);
                }
                /**
                 * SLT-3135 для модулей поиска, если у агента нет лицензии, то будут возвращаться демо-туры
                 * при этом:
                 * - requestId будет 0
                 * - loadState в респонсе GetTours будет пустым
                 *
                 * В таких случаях нельзя дёргать GetLoadState, так как:
                 * - демо туры берутся из кэша
                 * - GetLoadState с requestId=0 вернёт Fake в списке операторов, если сделать запрос
                 */
                if (!_this.isAllOperatorsProcessed(response.loadState) && !isDemo) {
                    _this.startGetLoadStatePolling();
                }
                else {
                    _this.emitter.emit(GetToursAsyncServiceEvents.Progress);
                    _this.emitter.emit(GetToursAsyncServiceEvents.Final);
                }
            })
                .catch(function (err) {
                _this.emitter.emit(GetToursAsyncServiceEvents.GetToursError, {
                    message: err.message,
                    type: getErrorType(err.message, err.errorCode)
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
        return this.getToursService(searchParams).catch(function (err) {
            return Promise.reject({
                message: err.message,
                type: getErrorType(err.message, err.errorCode)
            });
        });
    };
    GetToursAsyncService.prototype.getLoadState = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return resolve(_this.currentLoadState); });
    };
    GetToursAsyncService.prototype.getRequestId = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.currentRequestId);
        });
    };
    GetToursAsyncService.prototype.getSearchParams = function () {
        return (0, lodash_1.clone)(this.searchParams);
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
        var _this = this;
        return loadState.operatorsList.some(function (operator) {
            return (operator.isProcessed &&
                !operator.isError &&
                !(_this.searchParams.pessimizedOperatorsIds || []).includes(operator.id) &&
                operator.rowsCount > 0);
        });
    };
    GetToursAsyncService.prototype.startGetLoadStatePolling = function () {
        var _this = this;
        this.loadStateTimeoutId = window.setTimeout(function () {
            _this.getLoadStateService({ requestId: _this.currentRequestId, target: _this.getSearchParams().target })
                .then(function (response) { return _this.loadStateResponseHandler(response); })
                .catch(function (err) {
                _this.emitter.emit(GetToursAsyncServiceEvents.GetLoadStateError, {
                    message: err.message,
                    type: getErrorType(err.message)
                });
            });
        }, GET_LOAD_STATE_TIMEOUT);
    };
    /**
     * На основании результата loadState
     * Принимается решение уведомить приложение о
     * 1 - первых результатах
     * 2 - о том, что прогресс изменился (Изменилась информация по какому-либо оператору)
     * 3 - об окончании поиска
     * 4 - о том, что произошла ошибка
     * Если поиск не закончен - getLoadState запрашивается заново
     */
    GetToursAsyncService.prototype.loadStateResponseHandler = function (loadState) {
        if (this.isDestroyed) {
            return;
        }
        // Error
        // Обратите внимание, что иногда сервис отвечает одним оператором fake
        // https://agile.sletat.ru/jiraurl/browse/SITES-513
        // Как говорит Федя - это нормально
        if (loadState.operatorsList.some(function (operator) { return operator.name === 'Fake'; })) {
            this.currentLoadState.operatorsList = [];
            clearTimeout(this.loadStateTimeoutId);
            this.emitter.emit(GetToursAsyncServiceEvents.GetLoadStateError, {
                type: GetToursErrorTypes.TourNotFound,
                message: 'Туры не найдены.'
            });
            return;
        }
        // Progress
        if (!this.currentLoadState || !this.isLoadStatesEquals(this.currentLoadState, loadState)) {
            this.currentLoadState = loadState;
            this.emitter.emit(GetToursAsyncServiceEvents.Progress);
        }
        // First Results
        if (!this.isFirstResultsGotten) {
            this.isFirstResultsGotten = this.isOperatorsHasTours(loadState);
            if (this.isFirstResultsGotten) {
                this.emitter.emit(GetToursAsyncServiceEvents.FirstResults);
            }
        }
        // Available Results If Timeout
        if (!this.isAvailableResultsEventReached
            && this.isFirstResultsGotten
            && (Date.now() - this.searchStartMs) >= this.availableResultsEventTimeout) {
            this.isAvailableResultsEventReached = true;
            this.emitter.emit(GetToursAsyncServiceEvents.AvailableResultsIfTimeout);
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
            this.startGetLoadStatePolling();
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
/*
  Коды ошибок на бэке:
* https://bitbucket.org/sletat_ru/sletatru.module.api/src/3f4b4faa44c1e0fb83fd174ff95da238428a10cf/SletatRu.Module/SletatRu.Module.Gate/ErrorCodes.cs
* */
var GetToursErrorTypes;
(function (GetToursErrorTypes) {
    /**
     * Неизвестная ошибка.
     * При возникновении такой ошибки - ее необходимо описать тут
     */
    GetToursErrorTypes[GetToursErrorTypes["UnknownError"] = 0] = "UnknownError";
    /**
     * Истекла поисковая сессия
     */
    GetToursErrorTypes[GetToursErrorTypes["SessionExpired"] = 1] = "SessionExpired";
    /**
     * По условиям поиска ни один отель не имеет индекса цены.
     * https://agile.sletat.ru/jiraurl/browse/SLT-2193
     */
    GetToursErrorTypes[GetToursErrorTypes["HotelIndexPriceDoesNotExist"] = 4] = "HotelIndexPriceDoesNotExist";
    /**
     * Превышено количество запросов
     */
    GetToursErrorTypes[GetToursErrorTypes["ExceedRequestsCount"] = 5] = "ExceedRequestsCount";
    GetToursErrorTypes[GetToursErrorTypes["CaptchaFailed"] = 6] = "CaptchaFailed";
    GetToursErrorTypes[GetToursErrorTypes["TourNotFound"] = 7] = "TourNotFound";
})(GetToursErrorTypes = exports.GetToursErrorTypes || (exports.GetToursErrorTypes = {}));
/**
 * Returns error type according error text
 * TODO: stepancar
 * TODO: ded попросить бэк выкидывать код бизнес ошибки для кастомизации сообщений
 */
function getErrorType(errorText, errorCode) {
    if (errorCode === void 0) { errorCode = null; }
    if (errorCode === GetToursErrorTypes.HotelIndexPriceDoesNotExist) {
        return GetToursErrorTypes.HotelIndexPriceDoesNotExist;
    }
    if (errorCode === GetToursErrorTypes.CaptchaFailed) {
        return GetToursErrorTypes.CaptchaFailed;
    }
    if (errorText.toLowerCase().includes('время поисковой сессии истекло')) {
        return GetToursErrorTypes.SessionExpired;
    }
    if (errorText.toLowerCase().includes('превышен лимит кол-ва поисковых запросов')) {
        return GetToursErrorTypes.ExceedRequestsCount;
    }
    return GetToursErrorTypes.UnknownError;
}
