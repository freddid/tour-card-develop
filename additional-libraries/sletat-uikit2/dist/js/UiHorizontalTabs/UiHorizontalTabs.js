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
import { UiBaseTabs } from '../UiAdaptiveTabs/UiBaseTabs';
var UiHorizontalTabs = /** @class */ (function (_super) {
    __extends(UiHorizontalTabs, _super);
    function UiHorizontalTabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiHorizontalTabs.prototype.classes = function () {
        var _this = this;
        var baseClass = 'uikit-tabs';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            tabsButtons: this.classNames({
                prefix: baseClass + "__header"
            }),
            tabContent: this.classNames({
                prefix: baseClass + "__content"
            }),
            tabsButtonsItem: function (itemIndex) {
                return _this.classNames({
                    prefix: baseClass + "__button",
                    modifications: [
                        {
                            active: itemIndex === _this.activeIndex
                        }
                    ]
                });
            },
            tabsButtonsTitle: function (itemIndex) {
                return _this.classNames({
                    prefix: baseClass + "__title",
                    modifications: [
                        {
                            active: itemIndex === _this.activeIndex
                        }
                    ]
                });
            }
        };
    };
    return UiHorizontalTabs;
}(UiBaseTabs));
export { UiHorizontalTabs };
