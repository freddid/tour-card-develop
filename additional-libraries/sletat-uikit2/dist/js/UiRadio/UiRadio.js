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
import { UiComponent } from '../UiComponent';
var UiRadio = /** @class */ (function (_super) {
    __extends(UiRadio, _super);
    function UiRadio() {
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
    UiRadio.prototype.renderControlTitle = function () {
        if (!this.props.controlTitle) {
            return null;
        }
        var cx = this.classes();
        return React.createElement("div", { className: cx.controlTitle }, this.props.controlTitle);
    };
    UiRadio.prototype.render = function () {
        var cx = this.classes();
        return (React.createElement("fieldset", { className: cx.root },
            this.renderControlTitle(),
            React.createElement("label", { className: cx.label },
                this.props.label,
                React.createElement("input", { type: 'radio', className: cx.radio, checked: this.props.isChecked, disabled: this.props.isDisabled, value: this.props.inputValue, name: this.props.inputName, onChange: this.changeHandler, required: this.props.isNativeRequired, autoFocus: this.props.autofocus }))));
    };
    UiRadio.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-radio',
                additionalClasses: this.props.wrapperClass
            }),
            controlTitle: this.classNames({
                prefix: 'uikit-radio__title'
            }),
            label: this.classNames({
                prefix: 'uikit-radio__label',
                modifications: [
                    {
                        wrapper: true,
                        checked: !!this.props.isChecked,
                        disabled: !!this.props.isDisabled
                    }
                ]
            }),
            radio: this.classNames({
                prefix: 'uikit-radio__input'
            })
        };
    };
    return UiRadio;
}(UiComponent));
export { UiRadio };
