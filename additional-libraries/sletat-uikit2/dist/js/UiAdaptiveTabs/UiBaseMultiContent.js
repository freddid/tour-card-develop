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
var UiBaseMultiContent = /** @class */ (function (_super) {
    __extends(UiBaseMultiContent, _super);
    function UiBaseMultiContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UiBaseMultiContent.prototype, "activeIndex", {
        get: function () {
            return typeof this.props.activeIndex === 'number' ? this.props.activeIndex : 0;
        },
        enumerable: true,
        configurable: true
    });
    UiBaseMultiContent.prototype.changeActiveIndex = function (activeIndex) {
        this.props.onChange({ index: activeIndex });
    };
    UiBaseMultiContent.prototype.renderContent = function (activeIndex) {
        var activeItem = this.props.items[activeIndex];
        var wrapContent = function (content) { return React.createElement("div", { key: "content-" + activeIndex + "-key" }, content); };
        var content = !!activeItem && activeItem.content;
        if (!content) {
            return null;
        }
        content = wrapContent(content);
        if (this.props.shouldAnimate) {
            content = this.animateContentAppearance(content);
        }
        return content;
    };
    UiBaseMultiContent.prototype.animateContentAppearance = function (content) {
        throw new Error('UiBaseMultiContent#animateContentAppearance is not implemented.');
    };
    return UiBaseMultiContent;
}(UiAdaptiveComponent));
export { UiBaseMultiContent };
