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
import { UiRadio } from '../UiRadio/UiRadio';
var UiRadioList = /** @class */ (function (_super) {
    __extends(UiRadioList, _super);
    function UiRadioList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changeHandler = function (state) {
            if (typeof _this.props.onChange !== 'function') {
                return;
            }
            _this.props.onChange(_this.getChangeState(state));
        };
        return _this;
    }
    UiRadioList.prototype.renderControlTitle = function () {
        if (!this.props.controlTitle) {
            return null;
        }
        var cx = this.classes();
        return React.createElement("span", { className: cx.controlTitle }, this.props.controlTitle);
    };
    UiRadioList.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("fieldset", { className: cx.root },
            this.renderControlTitle(),
            React.createElement("ul", { className: cx.list }, this.props.radioList.map(function (radio, idx) {
                return (React.createElement("li", { key: "key:radio-list:" + idx, className: cx.item },
                    React.createElement(UiRadio, { inputName: _this.props.inputName, inputValue: radio.inputValue, label: radio.label, isChecked: radio.inputValue === _this.props.checkedValue, isDisabled: _this.props.isDisabled || !!radio.isDisabled, onChange: _this.changeHandler, isNativeRequired: _this.props.isNativeRequired, bemModifications: _this.props.bemModifications })));
            }))));
    };
    UiRadioList.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-radio-list',
                modifications: [
                    {
                        disabled: !!this.props.isDisabled
                    }
                ],
                additionalClasses: this.props.wrapperClass
            }),
            controlTitle: this.classNames({
                prefix: 'uikit-radio-list__title'
            }),
            list: this.classNames({
                prefix: 'uikit-radio-list__list'
            }),
            item: this.classNames({
                prefix: 'uikit-radio-list__item'
            })
        };
    };
    UiRadioList.prototype.getChangeState = function (state) {
        return {
            checkedValue: state.value,
            event: state.event,
            checkedTarget: state.target
        };
    };
    return UiRadioList;
}(UiComponent));
export { UiRadioList };
