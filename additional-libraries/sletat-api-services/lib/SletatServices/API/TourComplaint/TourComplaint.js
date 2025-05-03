"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourComplaint = exports.TourComplaint = exports.TourComplaintReasons = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseSletatApiService_1 = require("../BaseSletatApiService");
var TourComplaintReasons;
(function (TourComplaintReasons) {
    TourComplaintReasons[TourComplaintReasons["PriceIsNotCorrect"] = 1] = "PriceIsNotCorrect";
    TourComplaintReasons[TourComplaintReasons["NoPlacesInTheHotel"] = 2] = "NoPlacesInTheHotel";
    TourComplaintReasons[TourComplaintReasons["NoPlacesInThePlane"] = 3] = "NoPlacesInThePlane";
    TourComplaintReasons[TourComplaintReasons["EverythingOk"] = 4] = "EverythingOk";
    TourComplaintReasons[TourComplaintReasons["Custom"] = 5] = "Custom";
})(TourComplaintReasons = exports.TourComplaintReasons || (exports.TourComplaintReasons = {}));
var TourComplaint = /** @class */ (function (_super) {
    tslib_1.__extends(TourComplaint, _super);
    function TourComplaint() {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'tourcomplaint';
        _this.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        };
        return _this;
    }
    TourComplaint.prototype.successHandler = function (response) {
        return new Promise(function (resolve, reject) {
            if (response.isError) {
                reject(response.errorMessage);
            }
            else {
                resolve();
            }
        });
    };
    return TourComplaint;
}(BaseSletatApiService_1.BaseSletatApiService));
exports.TourComplaint = TourComplaint;
function tourComplaint(params) {
    return new TourComplaint().call(params);
}
exports.tourComplaint = tourComplaint;
