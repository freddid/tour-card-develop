"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelServices = void 0;
var tslib_1 = require("tslib");
var axios_1 = require("axios");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var getHotelServices = function (_a) {
    var host = _a.host, countryId = _a.countryId, towns = _a.towns, stars = _a.stars, minBeachLine = _a.minBeachLine, selectedFeatures = _a.selectedFeatures, minRate = _a.minRate;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var res, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://".concat(host, "/Main.svc/GetAvailableFeatures?countryId=").concat(countryId, "&towns=").concat(towns.join(','), "&stars=").concat(stars.join(','), "&minBeachLine=").concat(minBeachLine.join(','), "&minRate=").concat(minRate, "&selectedFeatures=").concat(selectedFeatures.join(',')))];
                case 1:
                    res = _b.sent();
                    if ((0, utils_1.isHttpError)(res.status)) {
                        throw new types_1.HttpError(res.message, res.status);
                    }
                    return [2 /*return*/, res.data.GetAvailableFeaturesResult.Data];
                case 2:
                    e_1 = _b.sent();
                    throw new types_1.HttpError(e_1);
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getHotelServices = getHotelServices;
