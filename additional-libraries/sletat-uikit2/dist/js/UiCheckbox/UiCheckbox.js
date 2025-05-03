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
import React from 'react';
import { UiComponent } from '../UiComponent';
import { UiTooltip } from '../UiTooltip/UiTooltip';
var UiCheckbox = /** @class */ (function (_super) {
    __extends(UiCheckbox, _super);
    function UiCheckbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changeHandler = function (e) {
            if (typeof _this.props.onChange !== 'function') {
                return;
            }
            _this.props.onChange({
                checked: e.target.checked,
                event: e.nativeEvent,
                value: _this.props.inputValue || '',
                target: e.target
            });
        };
        return _this;
    }
    UiCheckbox.prototype.renderTooltip = function () {
        return (React.createElement(UiTooltip, { isErrorTooltip: this.props.isError, tooltipText: this.props.isError ? this.props.tooltipErrorText : this.props.tooltipHelpText, bemModifications: this.props.bemModifications }));
    };
    UiCheckbox.prototype.renderControlTitle = function () {
        if (!this.props.controlTitle) {
            return null;
        }
        var cx = this.classes();
        return React.createElement("div", { className: cx.title }, this.props.controlTitle);
    };
    UiCheckbox.prototype.render = function () {
        var cx = this.classes();
        return (React.createElement("fieldset", { className: cx.root },
            this.renderControlTitle(),
            React.createElement("input", { type: 'checkbox', id: this.props.id, className: cx.checkbox, tabIndex: this.props.tabIndex, checked: this.props.isChecked, value: this.props.inputValue || 'on', name: this.props.inputName, disabled: this.props.isDisabled, onChange: this.changeHandler, required: this.props.isNativeRequired, autoFocus: this.props.autofocus }),
            React.createElement("label", { className: cx.label, htmlFor: this.props.id }, this.props.label),
            this.renderTooltip()));
    };
    UiCheckbox.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-checkbox',
                additionalClasses: this.props.wrapperClass,
                modifications: [
                    {
                        'error': !!this.props.isError,
                        'valid': !this.props.isError && !!this.props.isValid,
                        'with-tooltip': !!this.props.tooltipErrorText || !!this.props.tooltipHelpText
                    }
                ]
            }),
            title: this.classNames({
                prefix: 'uikit-checkbox__title'
            }),
            label: this.classNames({
                prefix: 'uikit-checkbox__label',
                modifications: [
                    {
                        checked: !!this.props.isChecked,
                        disabled: !!this.props.isDisabled
                    }
                ]
            }),
            checkbox: this.classNames({
                prefix: 'uikit-checkbox__input'
            })
        };
    };
    return UiCheckbox;
}(UiComponent));
export { UiCheckbox };
