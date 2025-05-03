"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHotelComment = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseSletatApiService_1 = require("../BaseSletatApiService");
var AddHotelComment = /** @class */ (function (_super) {
    tslib_1.__extends(AddHotelComment, _super);
    function AddHotelComment(host) {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'hotelcomments/addhotelcomment';
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };
        if (host) {
            _this.serviceName = host;
        }
        return _this;
    }
    AddHotelComment.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            if (response.isError) {
                reject(response.errorMessage);
            }
            else {
                // TODO erm wtf - в сигнатуре промис интерфейса, а резоливим булеан,
                // пока скастил к any, чтобы не наломать ничего
                resolve(true);
            }
        });
    };
    return AddHotelComment;
}(BaseSletatApiService_1.BaseSletatApiService));
function addHotelComment(params, host) {
    return new AddHotelComment(host).call({ data: params });
}
exports.addHotelComment = addHotelComment;
