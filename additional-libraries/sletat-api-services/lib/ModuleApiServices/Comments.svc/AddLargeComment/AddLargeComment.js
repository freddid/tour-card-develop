"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLargeComment = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseModuleCommentsApiService_1 = require("../BaseModuleCommentsApiService");
var AddLargeCommentRequest_1 = require("./AddLargeCommentRequest");
/**
 * @deprecated
 * используется в tour-card модулей
 */
var AddLargeComment = /** @class */ (function (_super) {
    tslib_1.__extends(AddLargeComment, _super);
    function AddLargeComment(options) {
        var _this = _super.call(this) || this;
        _this.httpMethod = HttpLite.HTTPMethods.POST;
        _this.methodName = 'AddLargeComment';
        _this.RequestWrapper = AddLargeCommentRequest_1.getAddLargeCommentRequestData;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        return _this;
    }
    AddLargeComment.prototype.successHandler = function (response) {
        var data = response;
        var resultName = this.getResultName();
        var isErrorResultFieldName = this.isErrorResultFieldName || 'IsError';
        var errorMessageResultFieldName = this.errorMessageResultFieldName || 'ErrorMessage';
        var dataResultFieldName = this.dataResultFieldName || 'Data';
        var result = resultName ? data[resultName] : data;
        var resultData = result[dataResultFieldName];
        var isError = !!result[isErrorResultFieldName];
        var errorMessage = result[errorMessageResultFieldName];
        /**
         * Фокус в том, что сервис в случае успешного выполнения возвращает такую конструкцию:
         *
         * {"AddLargeCommentResult":{"ErrorMessage":"Ваш отзыв добавлен","ExecutionTimeMs":0,"IsError":true,"Data":null}}
         *
         * Придется нам с этим жить.
         */
        isError = errorMessage.indexOf('Ваш отзыв добавлен') === -1;
        return new Promise(function (resolve, reject) {
            if (isError) {
                reject(errorMessage);
            }
            else {
                resolve(resultData);
            }
        });
    };
    return AddLargeComment;
}(BaseModuleCommentsApiService_1.BaseModuleCommentsApiService));
/**
 * @deprecated
 * используется в tour-card модулей
 */
function addLargeComment(params, options) {
    return new AddLargeComment(options).call(params);
}
exports.addLargeComment = addLargeComment;
