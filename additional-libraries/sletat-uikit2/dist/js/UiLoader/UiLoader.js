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
var UiLoader = /** @class */ (function (_super) {
    __extends(UiLoader, _super);
    function UiLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiLoader.prototype.renderText = function () {
        if (!this.props.text) {
            return null;
        }
        var cx = this.classes();
        return React.createElement("span", { className: cx.text }, this.props.text);
    };
    UiLoader.prototype.render = function () {
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root },
            React.createElement("div", { className: cx.loader },
                React.createElement("div", null),
                React.createElement("div", null),
                React.createElement("div", null),
                React.createElement("div", null),
                React.createElement("div", null)),
            this.renderText()));
    };
    UiLoader.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: 'uikit-loader',
                additionalClasses: this.props.wrapperClass,
                modifications: this.props.bemModifications
            }),
            loader: this.classNames({
                prefix: 'uikit-loader__spinner',
                modifications: this.props.bemModifications
            }),
            text: this.classNames({
                prefix: 'uikit-loader__text',
                modifications: this.props.bemModifications
            })
        };
    };
    return UiLoader;
}(UiComponent));
export { UiLoader };
