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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import { UiComponent } from '../UiComponent';
var UiTooltip = /** @class */ (function (_super) {
    __extends(UiTooltip, _super);
    function UiTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiTooltip.prototype.render = function () {
        if (!this.props.tooltipText) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("span", { className: cx.root + " " + cx.theme, role: 'tooltip' }, this.props.tooltipText));
    };
    UiTooltip.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: "" + this.blockNames.main,
                modifications: [
                    {
                        error: !!this.props.isErrorTooltip,
                        help: !this.props.isErrorTooltip,
                    }
                ],
                additionalClasses: this.props.wrapperClass
            }),
            theme: this.classNames({
                prefix: this.blockNames.main + "__theme",
                modifications: [
                    {
                        light: !!this.props.tooltipLight
                    }
                ]
            })
        };
    };
    Object.defineProperty(UiTooltip.prototype, "blockNames", {
        get: function () {
            return __assign({ main: 'uikit-tooltip' }, this.props.blockNames);
        },
        enumerable: true,
        configurable: true
    });
    return UiTooltip;
}(UiComponent));
export { UiTooltip };
