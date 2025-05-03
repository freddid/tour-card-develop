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
var ThumbnailItem = /** @class */ (function (_super) {
    __extends(ThumbnailItem, _super);
    function ThumbnailItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThumbnailItem.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root, onClick: function () { return _this.props.selectHandler(); } },
            React.createElement("div", { className: cx.content }, this.props.source({
                width: this.props.itemWidth,
                i: this.props.index,
                selectedIndex: this.props.selectedIndex
            }))));
    };
    ThumbnailItem.prototype.classes = function () {
        var baseClass = 'uikit-carousel__slide';
        return {
            root: this.classNames({
                prefix: baseClass + "-thumb",
                modifications: [
                    {
                        selected: this.props.selectedIndex === this.props.index
                    }
                ],
                additionalClasses: this.props.wrapperClass
            }),
            content: this.classNames({
                prefix: baseClass + "-thumb-wrapper"
            })
        };
    };
    return ThumbnailItem;
}(UiComponent));
export { ThumbnailItem };
