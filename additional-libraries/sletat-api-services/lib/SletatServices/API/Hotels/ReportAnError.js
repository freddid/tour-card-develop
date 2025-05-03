"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportAnError = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseSletatApiService_1 = require("../BaseSletatApiService");
/**
 * @deprecated в пользу sletat/reportAnErrorForHotel/index.ts
 */
var ReportAnError = /** @class */ (function (_super) {
    tslib_1.__extends(ReportAnError, _super);
    function ReportAnError() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'hotels/reportanerror';
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': '*/*'
        };
        return _this;
    }
    ReportAnError.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            if (response.isError) {
                reject(response.errorMessage);
            }
            else {
                resolve(response.data);
            }
        });
    };
    return ReportAnError;
}(BaseSletatApiService_1.BaseSletatApiService));
function reportAnError(params) {
    return new ReportAnError().call({ data: params });
}
exports.reportAnError = reportAnError;
