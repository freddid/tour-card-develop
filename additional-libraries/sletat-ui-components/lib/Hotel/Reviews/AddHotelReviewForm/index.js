Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var moment = require("moment");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var lodash_3 = require("lodash");
var lodash_4 = require("lodash");
var UiSelect_1 = require("react-sletat-uikit/lib/ui-select/UiSelect");
var UiButton_1 = require("react-sletat-uikit/lib/ui-button/UiButton");
var UiText_1 = require("react-sletat-uikit/lib/ui-text/UiText");
var BEMClassNames_1 = require("sletat-common-utils/lib/BEM/BEMClassNames");
var AdaptiveCirclesRatingSelector_1 = require("../../../Rating/CirclesRatingSelector/AdaptiveCirclesRatingSelector");
var FormeGenerale_1 = require("../../../Forms/FormeGenerale");
var State = require("./State");
var AddHotelReviewForm = /** @class */ (function (_super) {
    tslib_1.__extends(AddHotelReviewForm, _super);
    function AddHotelReviewForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = _this.getDefaultState();
        _this.TIMEOUT_TIME = 2000;
        _this.months = moment.months();
        _this.onSuccessPopupClose = function () {
            clearTimeout(_this.timeout);
            _this.props.onBackToDefault();
        };
        _this.onFormClose = function () {
            clearTimeout(_this.timeout);
            _this.props.onFormClose();
        };
        _this.preSubmit = function () {
            if (State.isStateValid(_this.state)) {
                _this.submitForm();
            }
            else {
                _this.setState(State.setStatus(_this.state));
            }
        };
        _this.nextModeOfAdaptiveSelectorHandler = function () {
            var timeout = 100;
            return new Promise(function (resolve, reject) {
                var handler = function () {
                    if (!_this.ratingNode && timeout < 3000) {
                        timeout = timeout * 2;
                        setTimeout(handler, timeout);
                    }
                    else if (timeout > 3000) {
                        reject(new Error('Не удалось получить "ratingNode"'));
                    }
                    else {
                        resolve(_this.ratingNode.offsetWidth < 550 ?
                            AdaptiveCirclesRatingSelector_1.AdaptiveCirclesRatingSelectorModes.mobile :
                            AdaptiveCirclesRatingSelector_1.AdaptiveCirclesRatingSelectorModes.desktop);
                    }
                };
                if (!_this.ratingNode) {
                    setTimeout(handler, timeout);
                }
                else {
                    resolve(_this.ratingNode.offsetWidth < 550 ?
                        AdaptiveCirclesRatingSelector_1.AdaptiveCirclesRatingSelectorModes.mobile :
                        AdaptiveCirclesRatingSelector_1.AdaptiveCirclesRatingSelectorModes.desktop);
                }
            });
        };
        return _this;
        // tslint:enable:member-ordering
    }
    AddHotelReviewForm.prototype.getSuccessMessage = function () {
        return (React.createElement("div", { className: "block-review-success-message" },
            React.createElement("div", { className: "block-review-success-message__bold" }, "\u0421\u043F\u0430\u0441\u0438\u0431\u043E!"),
            this.props.showSuccessCloseButton ?
                React.createElement("button", { className: "block-review-success-message__button", onClick: this.onSuccessPopupClose })
                : null,
            "\u0412\u0430\u0448 \u043E\u0442\u0437\u044B\u0432 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u044E."));
    };
    AddHotelReviewForm.prototype.getFailMessage = function () {
        return 'К сожалению, произошла ошибка.';
    };
    AddHotelReviewForm.prototype.getDefaultState = function () {
        return lodash_2.merge(State.getDefaultState(), { mode: FormeGenerale_1.FormMode.normal });
    };
    AddHotelReviewForm.prototype.getFormBodyMarkup = function () {
        var _this = this;
        var DEBOUNCE_VALUE = 200;
        var monthsRange = moment.months();
        var yearsRange = lodash_3.range(2000, (new Date()).getFullYear() + 1);
        return (React.createElement("div", { className: getGeneralFormBodyClassName(this.props.bemModifications) },
            React.createElement("p", { className: "uis-header-2 general-form__title" },
                "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432\u0430\u0448\u0435 \u043C\u043D\u0435\u043D\u0438\u0435 \u043E\u0431 \u043E\u0442\u0435\u043B\u0435",
                this.props.showFormCloseButton ?
                    React.createElement("button", { className: "general-form__close-button", onClick: this.onFormClose })
                    : null),
            React.createElement(UiText_1.UiText, { headerText: "\u0418\u043C\u044F", bemModifications: getGeneralFormUiSelectorsClassName(this.props.bemModifications), inputValue: this.state.name, isError: !State.isNameValid(this.state), tooltipErrorText: State.getErrorForName(this.state), onChange: lodash_4.debounce(function (state) { return _this.setState(State.setName(_this.state, state.inputValue)); }, DEBOUNCE_VALUE) }),
            React.createElement("div", { className: getGeneralFormGridTableClassName(this.props.bemModifications) },
                React.createElement(UiSelect_1.UiSelect, { headerText: "\u041C\u0435\u0441\u044F\u0446 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F \u043E\u0442\u0435\u043B\u044F", bemModifications: getGeneralFormUiSelectorsClassName(this.props.bemModifications), wrapperClass: getGeneralFormGridCellClassName(this.props.bemModifications), optionHeight: 30, onChange: function (state, checked) { return _this.setState(State.setMonth(_this.state, checked.inputValue)); }, inputValue: this.months[this.state.month], options: lodash_1.map(monthsRange, function (monthLabel, monthIndex) {
                        return {
                            label: monthLabel,
                            inputValue: monthIndex,
                            isChecked: monthIndex === _this.state.month
                        };
                    }) }),
                React.createElement(UiSelect_1.UiSelect, { headerText: "\u0413\u043E\u0434 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F \u043E\u0442\u0435\u043B\u044F", bemModifications: getGeneralFormUiSelectorsClassName(this.props.bemModifications), wrapperClass: getGeneralFormGridCellClassName(this.props.bemModifications), optionHeight: 30, onChange: function (state, checked) { return _this.setState(State.setYear(_this.state, checked.inputValue)); }, inputValue: this.state.year, options: lodash_1.map(yearsRange, function (val) {
                        return {
                            label: val,
                            inputValue: val,
                            isChecked: val === _this.state.year
                        };
                    }) })),
            React.createElement(UiText_1.UiText, { headerText: "\u0414\u043E\u0441\u0442\u043E\u0438\u043D\u0441\u0442\u0432\u0430", bemModifications: getGeneralFormUiSelectorsClassName(this.props.bemModifications), isMultiLine: true, isError: !State.isReviewValid(this.state), tooltipErrorText: State.getErrorForReview(this.state), onChange: lodash_4.debounce(function (state) { return _this.setState(State.setPositive(_this.state, state.inputValue)); }, DEBOUNCE_VALUE) }),
            React.createElement(UiText_1.UiText, { headerText: "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043A\u0438", bemModifications: getGeneralFormUiSelectorsClassName(this.props.bemModifications), isMultiLine: true, isError: !State.isReviewValid(this.state), tooltipErrorText: State.getErrorForReview(this.state), onChange: lodash_4.debounce(function (state) { return _this.setState(State.setNegative(_this.state, state.inputValue)); }, DEBOUNCE_VALUE) }),
            React.createElement("div", { className: getGeneralFormRatingClassName(this.props.bemModifications), ref: function (ref) { return _this.ratingNode = ref; } },
                React.createElement("span", { className: getGeneralFormRatingLabelClassName(this.props.bemModifications) }, "\u0412\u0430\u0448\u0430 \u043E\u0446\u0435\u043D\u043A\u0430 \u043E\u0442\u0435\u043B\u044E"),
                React.createElement(AdaptiveCirclesRatingSelector_1.AdaptiveCirclesRatingSelector, { onChange: function (rating) { return _this.setState(State.setRating(_this.state, rating)); }, nextModeOnResize: this.nextModeOfAdaptiveSelectorHandler, maxValue: 10, currentValue: this.state.rating })),
            React.createElement("div", { className: getGeneralFormBlockControlsClassName(this.props.bemModifications) },
                React.createElement(UiButton_1.UiButton, { label: 'Отправить отзыв', bemModifications: ['orange', 'middle'], wrapperClass: getGeneralFormControlSendClassName(this.props.bemModifications), onClickHandler: this.preSubmit }),
                React.createElement("p", { className: getGeneralFormBlockPrivacyPolicyClassName(this.props.bemModifications) },
                    "\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043D\u0430\u00A0\u043A\u043D\u043E\u043F\u043A\u0443, \u0432\u044B\u00A0\u0434\u0430\u0435\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430\u00A0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u00A0\u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441\u00A0",
                    React.createElement("a", { href: "//static.sletat.ru/Files/on_personal_data.pdf", target: "_blank", rel: "nofollow" }, "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438")))));
    };
    // tslint:disable:member-ordering
    AddHotelReviewForm.prototype.startBackToDefaultTimer = function () {
        var _this = this;
        this.timeout = window.setTimeout(function () {
            _this.setState(_this.getDefaultState());
            _this.props.onBackToDefault();
        }, this.TIMEOUT_TIME);
    };
    return AddHotelReviewForm;
}(FormeGenerale_1.FormeGenerale));
exports.AddHotelReviewForm = AddHotelReviewForm;
function getGeneralFormBodyClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__body',
        modifications: bemModifications || []
    });
}
function getGeneralFormGridTableClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__table',
        modifications: bemModifications || []
    });
}
function getGeneralFormGridCellClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__table-cell',
        modifications: bemModifications || []
    });
}
function getGeneralFormRatingClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__rating',
        modifications: bemModifications || []
    });
}
function getGeneralFormRatingLabelClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__rating-label',
        modifications: bemModifications || []
    });
}
function getGeneralFormBlockControlsClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__controls',
        modifications: bemModifications || []
    });
}
function getGeneralFormBlockPrivacyPolicyClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__privacy-policy',
        modifications: bemModifications || []
    });
}
function getGeneralFormControlSendClassName(bemModifications) {
    return BEMClassNames_1.GetBEMClassNames({
        prefix: 'general-form__button-send',
        modifications: bemModifications || []
    });
}
function getGeneralFormUiSelectorsClassName(bemModifications) {
    return bemModifications ? ['general-form'].concat(bemModifications) : ['general-form'];
}
