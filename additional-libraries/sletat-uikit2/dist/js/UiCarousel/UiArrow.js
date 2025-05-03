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
import { UiAdaptiveComponent } from '../UiAdaptiveComponent';
import { ArrowIcon } from './ArrowIcon';
export var ArrowType;
(function (ArrowType) {
    ArrowType[ArrowType["Left"] = 0] = "Left";
    ArrowType[ArrowType["Right"] = 1] = "Right";
})(ArrowType || (ArrowType = {}));
var UiArrow = /** @class */ (function (_super) {
    __extends(UiArrow, _super);
    function UiArrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiArrow.prototype.render = function () {
        var _this = this;
        var _a;
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root, onTouchStart: function (e) { return _this.onClick(e); }, onClick: function (e) { return _this.onClick(e); }, onTouchEnd: function (e) { return _this.preventDefault(e); }, onTouchMove: function (e) { return _this.preventDefault(e); } }, (_a = this.props.arrowSvg, (_a !== null && _a !== void 0 ? _a : React.createElement(ArrowIcon, null)))));
    };
    UiArrow.prototype.onClick = function (e) {
        this.props.onClick();
        this.preventDefault(e);
    };
    UiArrow.prototype.classes = function () {
        var baseClass = 'uikit-carousel__arrow';
        return {
            root: this.classNames({
                prefix: baseClass,
                modifications: [
                    {
                        left: this.props.type === ArrowType.Left,
                        right: this.props.type === ArrowType.Right,
                        disabled: !!this.props.disabled
                    }
                ],
                additionalClasses: this.props.wrapperClass
            })
        };
    };
    UiArrow.prototype.preventDefault = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    return UiArrow;
}(UiAdaptiveComponent));
export { UiArrow };
