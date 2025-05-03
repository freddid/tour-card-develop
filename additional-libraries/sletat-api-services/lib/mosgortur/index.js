"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCertificateAsync = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("../utils");
function CheckCertificateAsync(params, host) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var response, jres;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch("https://".concat(host, "/mosgortur/check"), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params)
                    })];
                case 1:
                    response = _c.sent();
                    if ((0, utils_1.isHttpError)(response.status)) {
                        return [2 /*return*/, { errorMessage: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430.", isValid: false }];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    jres = (_c.sent());
                    if (jres.error || (!jres.error && !jres.result)) {
                        return [2 /*return*/, { errorMessage: (_b = (_a = jres.error) === null || _a === void 0 ? void 0 : _a.reason) !== null && _b !== void 0 ? _b : "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430.", isValid: false }];
                    }
                    return [2 /*return*/, { errorMessage: null, isValid: jres.result.isValid, isSimple: jres.result.isSimple }];
            }
        });
    });
}
exports.CheckCertificateAsync = CheckCertificateAsync;
;
