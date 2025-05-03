var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import { UiAdaptiveComponent } from '../../UiAdaptiveComponent';
import { UiText } from '../../UiText/UiText';
import { UiCustomScroll } from '../../UiCustomScroll/UiCustomScroll';
import { UiOptionItem } from './UiOptionItem';
/**
 * Этот компонент должен иметь адаптивное представление для touch-устройств
 * То есть область его ответственности - простой селект с одиночным выбором
 * Если нужно усложнять, то это стоит делать в рамках другого компонента
 */
var UiAdaptiveSingleSelect = /** @class */ (function (_super) {
    __extends(UiAdaptiveSingleSelect, _super);
    function UiAdaptiveSingleSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.rootElem = null;
        _this.isOutsideClick = true;
        _this.NOT_FOUND_RESULTS = 'Нет результатов';
        _this.handleOutsideClick = function (e) {
            if (!_this.isOutsideClick) {
                return;
            }
            _this.hideList();
        };
        /**
         * обработчик на выбор опции из списка для desktop версии
         */
        _this.selectHandler = function (option) {
            _this.hideList();
            _this.props.onChange({
                options: _this.props.options.slice(),
                selectedValue: option.inputValue
            });
        };
        /**
         * обработчик на выбор опции из списка для мобильной версии
         */
        _this.selectMobileHandler = function (e) {
            _this.props.onChange({
                selectedValue: e.target.value,
                options: _this.props.options.slice()
            });
        };
        if (!_this.isMobileVersion) {
            _this.state = {
                opened: false
            };
        }
        return _this;
    }
    UiAdaptiveSingleSelect.prototype.componentWillUnmount = function () {
        if (!this.isMobileVersion) {
            this.detachOutsideHandler();
        }
    };
    UiAdaptiveSingleSelect.prototype.showList = function () {
        if (this.state.opened) {
            return;
        }
        this.attachOutsideHandler();
        this.setState({
            opened: true
        });
    };
    UiAdaptiveSingleSelect.prototype.hideList = function () {
        if (!this.state.opened) {
            return;
        }
        this.detachOutsideHandler();
        this.setState({
            opened: false
        });
    };
    UiAdaptiveSingleSelect.prototype.toggleList = function () {
        if (this.state.opened) {
            this.hideList();
        }
        else {
            this.showList();
        }
    };
    UiAdaptiveSingleSelect.prototype.renderControlTitle = function () {
        var cx = this.classes();
        if (!this.props.controlTitle) {
            return null;
        }
        return React.createElement("div", { className: cx.controlTitle }, this.props.controlTitle);
    };
    UiAdaptiveSingleSelect.prototype.renderOptionsList = function () {
        var _this = this;
        var cx = this.classes();
        if (!this.state.opened) {
            return null;
        }
        if (this.props.options.length === 0) {
            return React.createElement("div", { className: cx.notResults }, this.NOT_FOUND_RESULTS);
        }
        var selectedOption = this.selectedOption;
        var list = this.props.options.map(function (option) {
            return (React.createElement(UiOptionItem, { key: "key:ui-single-option-item:" + JSON.stringify(option), onClick: function (optn) { return _this.selectHandler(optn); }, isSelected: !!selectedOption && selectedOption.inputValue === option.inputValue, option: option, bemModifications: _this.props.bemModifications }));
        });
        return (React.createElement(UiCustomScroll, { maxHeightList: this.props.maxHeightList || 200, bemModifications: this.props.bemModifications, wrapperClass: cx.customScroll },
            React.createElement("ul", { className: cx.list }, list)));
    };
    UiAdaptiveSingleSelect.prototype.renderDesktopVersion = function () {
        var _this = this;
        var cx = this.classes();
        var selectedOption = this.selectedOption;
        return (React.createElement("div", { className: cx.widget },
            React.createElement("div", { className: cx.input, onClick: !this.props.isDisabled ? function () { return _this.toggleList(); } : undefined },
                React.createElement(UiText, { inputName: this.props.inputName, autofocus: this.props.autofocus, isError: this.props.isError, isValid: this.props.isValid, tooltipErrorText: this.props.tooltipErrorText, tooltipHelpText: this.props.tooltipHelpText, bemModifications: this.props.bemModifications, placeholderText: this.props.placeholderText, isNativeRequired: this.props.isNativeRequired, isReadonly: true, isDisabled: this.props.isDisabled, tabIndex: this.props.tabIndex, inputValue: selectedOption ? selectedOption.label : '' })),
            this.renderOptionsList()));
    };
    UiAdaptiveSingleSelect.prototype.renderMobileVersion = function () {
        var _this = this;
        var EMPTY_DEFAULT_LABEL = 'Не выбрано';
        var sizeList = this.props.sizeList || 1;
        var cx = this.classes();
        var selectedOption = this.selectedOption;
        var list = this.props.options.map(function (option) {
            return (React.createElement("option", { key: JSON.stringify(_this.props.options) + option.inputValue, value: option.inputValue, disabled: option.isDisabled }, option.label));
        });
        /**
         * MODULES-1015: на мобильных в списке из одного options создаётся впечатление,
         * что option выбран, хотя это не так. для это и добавляется этот элемент
         */
        if (sizeList === 1) {
            list.unshift(React.createElement("option", { key: JSON.stringify(this.props.options) + "empty", value: '', disabled: true }, this.props.emptyAdaptiveLabel || EMPTY_DEFAULT_LABEL));
        }
        return (React.createElement("div", { className: cx.widget },
            React.createElement("select", { value: selectedOption ? selectedOption.inputValue : '', onChange: this.selectMobileHandler, name: this.props.inputName, className: cx.select, size: sizeList, required: this.props.isNativeRequired, autoFocus: this.props.autofocus, tabIndex: this.props.tabIndex, disabled: this.props.isDisabled }, list)));
    };
    UiAdaptiveSingleSelect.prototype.renderWidget = function () {
        return this.isMobileVersion ? this.renderMobileVersion() : this.renderDesktopVersion();
    };
    UiAdaptiveSingleSelect.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("fieldset", { ref: function (elem) { return (_this.rootElem = elem); }, onMouseDown: !this.isMobileVersion ? function () { return (_this.isOutsideClick = false); } : undefined, onMouseUp: !this.isMobileVersion ? function () { return (_this.isOutsideClick = true); } : undefined, className: cx.root },
            this.renderControlTitle(),
            this.renderWidget()));
    };
    UiAdaptiveSingleSelect.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-select',
                modifications: [
                    {
                        error: !!this.props.isError,
                        help: !this.props.isError && !!this.props.tooltipHelpText,
                        valid: !!this.props.isValid && !this.props.isError,
                        disabled: !!this.props.isDisabled,
                        opened: !this.isMobileVersion && this.state.opened // только для desktop версии
                    }
                ],
                additionalClasses: this.props.wrapperClass
            }),
            widget: this.classNames({
                prefix: 'uikit-select__widget',
                modifications: [
                    {
                        mobile: this.isMobileVersion
                    }
                ]
            }),
            customScroll: this.classNames({
                prefix: 'uikit-select__custom-scroll'
            }),
            list: this.classNames({
                prefix: 'uikit-select__list'
            }),
            select: this.classNames({
                prefix: 'uikit-select__select',
                modifications: [
                    {
                        disabled: !!this.props.isDisabled
                    }
                ]
            }),
            input: this.classNames({
                prefix: 'uikit-select__field'
            }),
            controlTitle: this.classNames({
                prefix: 'uikit-select__control-title'
            }),
            notResults: this.classNames({
                prefix: 'uikit-select__no-results'
            })
        };
    };
    Object.defineProperty(UiAdaptiveSingleSelect.prototype, "window", {
        /**
         * для кейсов с фреймами и т.п.
         */
        get: function () {
            return this.rootElem && this.rootElem.ownerDocument && this.rootElem.ownerDocument.defaultView
                ? this.rootElem.ownerDocument.defaultView
                : window;
        },
        enumerable: true,
        configurable: true
    });
    UiAdaptiveSingleSelect.prototype.attachOutsideHandler = function () {
        this.window.addEventListener('mousedown', this.handleOutsideClick);
    };
    UiAdaptiveSingleSelect.prototype.detachOutsideHandler = function () {
        this.window.removeEventListener('mousedown', this.handleOutsideClick);
    };
    Object.defineProperty(UiAdaptiveSingleSelect.prototype, "selectedOption", {
        get: function () {
            var _this = this;
            return this.props.options.filter(function (option) { return option.inputValue === _this.props.inputValue; })[0];
        },
        enumerable: true,
        configurable: true
    });
    return UiAdaptiveSingleSelect;
}(UiAdaptiveComponent));
export { UiAdaptiveSingleSelect };
