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
var UiButtonGroup = /** @class */ (function (_super) {
    __extends(UiButtonGroup, _super);
    function UiButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiButtonGroup.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("ul", { className: cx.root }, this.props.buttons.map(function (item, i) { return _this.renderButton(item, i); })));
    };
    UiButtonGroup.prototype.renderButton = function (button, buttonIndex) {
        var _this = this;
        var cx = this.classes();
        var isChecked = button.isChecked, isDisabled = button.isDisabled;
        return (React.createElement("li", { key: "button-group-" + buttonIndex, className: cx.item },
            React.createElement("button", { className: cx.button(isDisabled, isChecked), disabled: isDisabled, tabIndex: this.props.tabIndex, onClick: function (e) {
                    return _this.props.onClick({
                        index: buttonIndex,
                        event: e
                    });
                } }, button.text)));
    };
    UiButtonGroup.prototype.classes = function () {
        var _this = this;
        var BASE_CLASS = 'uikit-button-group';
        return {
            root: this.classNames({
                prefix: "" + BASE_CLASS,
                additionalClasses: this.props.wrapperClass
            }),
            item: this.classNames({
                prefix: BASE_CLASS + "__item"
            }),
            button: function (isDisabled, isChecked) {
                return _this.classNames({
                    prefix: BASE_CLASS + "__button",
                    modifications: [
                        {
                            selected: isChecked,
                            disabled: isDisabled
                        }
                    ]
                });
            }
        };
    };
    return UiButtonGroup;
}(UiComponent));
export { UiButtonGroup };
