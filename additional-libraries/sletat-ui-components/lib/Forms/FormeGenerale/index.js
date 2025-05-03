Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var react_1 = require("react");
var BEM_1 = require("sletat-common-utils/lib/BEM");
require("./index.styl");
var UiLoader_1 = require("react-sletat-uikit/lib/ui-loader/UiLoader");
var FormMode;
(function (FormMode) {
    FormMode[FormMode["normal"] = 0] = "normal";
    FormMode[FormMode["successfullySubmitted"] = 1] = "successfullySubmitted";
    FormMode[FormMode["submitFailed"] = 2] = "submitFailed";
    FormMode[FormMode["processing"] = 3] = "processing";
})(FormMode = exports.FormMode || (exports.FormMode = {}));
var FormeGenerale = /** @class */ (function (_super) {
    tslib_1.__extends(FormeGenerale, _super);
    function FormeGenerale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TIMEOUT_TIME = 5000;
        return _this;
    }
    FormeGenerale.prototype.render = function () {
        return (React.createElement("div", { className: BEM_1.bem(this.props, 'general-form', { add: this.props.wrapperClass }) }, this.getFormContent()));
    };
    FormeGenerale.prototype.getFormContent = function () {
        var bemify = BEM_1.bem(this.props);
        switch (this.state.mode) {
            case FormMode.normal:
                return this.getFormBodyMarkup();
            case FormMode.processing:
                return (React.createElement("div", { className: bemify('general-form__feedback') },
                    React.createElement("div", { className: bemify('general-form__processing-loader') },
                        React.createElement(UiLoader_1.UiLoader, { bemModifications: ['big'] }))));
            case FormMode.successfullySubmitted:
                return (React.createElement("div", { className: bemify('general-form__feedback') },
                    React.createElement("div", { className: bemify('general-form__message-success') }, this.getSuccessMessage())));
            case FormMode.submitFailed:
                return (React.createElement("div", { className: bemify('general-form__feedback') },
                    React.createElement("div", { className: bemify('general-form__message-fail') }, this.getFailMessage())));
            default: {
                return null;
            }
        }
    };
    FormeGenerale.prototype.submitForm = function () {
        var _this = this;
        this.setState({ mode: FormMode.processing }, function () {
            _this.props.onSubmitHandler(_this.state)
                .then(function (response) { return _this.successHandler(response); })
                .catch(function (err) { return _this.errorHandler(err); });
        });
    };
    FormeGenerale.prototype.successHandler = function (response) {
        // Показать сообщение об успешнйо отправке.
        this.setState({ mode: FormMode.successfullySubmitted });
        // Возвращаем в дефолтное состояние.
        this.startBackToDefaultTimer();
        if (this.props.onSuccessHandler) {
            this.props.onSuccessHandler(response);
        }
    };
    FormeGenerale.prototype.errorHandler = function (err) {
        // Показать сообщение о неуспешной отправке.
        this.setState({ mode: FormMode.submitFailed });
        // Возвращаем в дефолтное состояние.
        this.startBackToDefaultTimer();
        if (this.props.onErrorHandler) {
            this.props.onErrorHandler(err);
        }
    };
    FormeGenerale.prototype.startBackToDefaultTimer = function () {
        var _this = this;
        this.timeout = window.setTimeout(function () {
            _this.setState(_this.getDefaultState());
        }, this.TIMEOUT_TIME);
    };
    return FormeGenerale;
}(react_1.Component));
exports.FormeGenerale = FormeGenerale;
