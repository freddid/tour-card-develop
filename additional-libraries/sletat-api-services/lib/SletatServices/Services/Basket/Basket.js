"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTourFromBasket = exports.removeTourFromBasket = exports.addTourToBasket = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseSletatServicesService_1 = require("../BaseSletatServicesService");
var AddTourToBasketRequest_1 = require("./AddTourToBasketRequest");
var AddTourToBasketResponse_1 = require("./AddTourToBasketResponse");
var RemoveTourFromBasketRequest_1 = require("./RemoveTourFromBasketRequest");
var AddTourToBasketService = /** @class */ (function (_super) {
    tslib_1.__extends(AddTourToBasketService, _super);
    function AddTourToBasketService() {
        var _this = _super.call(this) || this;
        _this.methodName = 'basket.ashx';
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        _this.RequestWrapper = AddTourToBasketRequest_1.getAddTourToBasketRequestData;
        _this.ResponseWrapper = AddTourToBasketResponse_1.getAddTourToBasketResponseData;
        return _this;
    }
    AddTourToBasketService.prototype.successHandler = function (response) {
        var _this = this;
        var data = JSON.parse(response);
        var isErorr = data.length === 0;
        return new Promise(function (resolve, reject) {
            if (isErorr) {
                reject('Ошибка при добавлении тура в корзину.');
            }
            else {
                resolve(_this.ResponseWrapper(data[0]));
            }
        });
    };
    return AddTourToBasketService;
}(BaseSletatServicesService_1.BaseSletatServicesService));
var RemoveTourFromBasketService = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveTourFromBasketService, _super);
    function RemoveTourFromBasketService() {
        var _this = _super.call(this) || this;
        _this.methodName = 'basket.ashx';
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        _this.RequestWrapper = RemoveTourFromBasketRequest_1.getRemoveTourFromBasketRequestData;
        return _this;
    }
    /**
     * Сервис не возвращает вообще ничего никогда
     */
    RemoveTourFromBasketService.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    };
    return RemoveTourFromBasketService;
}(BaseSletatServicesService_1.BaseSletatServicesService));
/**
 * Этот сервис очень странный, по факту он возвращает массив туров в корзине,
 * но крашится, если запрос из под незалогиненного юзера идёт
 * Нужно дописать нормально, если будем использовать дальше.
 * Сейчас и на выдаче, и в карточке, туры изначально считаются недобавленными, даже если они лежат в корзине,
 * т.е. никакой проверки нет, при перезагрузке страницы всё обнуляется
 */
var CheckTourFromBasketService = /** @class */ (function (_super) {
    tslib_1.__extends(CheckTourFromBasketService, _super);
    function CheckTourFromBasketService() {
        var _this = _super.call(this) || this;
        _this.methodName = 'basket.ashx';
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        _this.RequestWrapper = function getCheckTourFromBasketRequestData() {
            return {
                method: '24',
                type: 1
            };
        };
        return _this;
    }
    CheckTourFromBasketService.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            resolve(response);
        });
    };
    return CheckTourFromBasketService;
}(BaseSletatServicesService_1.BaseSletatServicesService));
/**
 * Добавить тур в корзину
 */
function addTourToBasket(params) {
    return new AddTourToBasketService().call(params);
}
exports.addTourToBasket = addTourToBasket;
/**
 * Удалить тур из корзины
 */
function removeTourFromBasket(params) {
    return new RemoveTourFromBasketService().call(params);
}
exports.removeTourFromBasket = removeTourFromBasket;
/**
 * Проверить есть ли тур в корзине
 */
function checkTourFromBasket() {
    return new CheckTourFromBasketService().call();
}
exports.checkTourFromBasket = checkTourFromBasket;
