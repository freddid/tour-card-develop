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
import { UiComponent } from '../../UiComponent';
var UiOptionItem = /** @class */ (function (_super) {
    __extends(UiOptionItem, _super);
    function UiOptionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiOptionItem.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        var isDisabled = !!this.props.option.isDisabled;
        var isSelected = this.props.isSelected;
        return (React.createElement("li", { className: cx.optionItem(isDisabled, isSelected), onClick: !isDisabled ? function () { return _this.props.onClick(_this.props.option); } : undefined },
            React.createElement("span", { className: cx.optionItemInner }, this.props.option.label)));
    };
    UiOptionItem.prototype.classes = function () {
        var _this = this;
        return {
            optionItem: function (isDisabled, isSelected) {
                return _this.classNames({
                    prefix: 'uikit-select__option',
                    modifications: [
                        {
                            disabled: isDisabled,
                            selected: isSelected
                        }
                    ]
                });
            },
            optionItemInner: this.classNames({
                prefix: 'uikit-select__inner-label'
            })
        };
    };
    return UiOptionItem;
}(UiComponent));
export { UiOptionItem };
