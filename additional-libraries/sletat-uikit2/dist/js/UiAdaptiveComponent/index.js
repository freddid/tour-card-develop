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
import { UiComponent } from '../UiComponent';
var UiAdaptiveComponent = /** @class */ (function (_super) {
    __extends(UiAdaptiveComponent, _super);
    function UiAdaptiveComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UiAdaptiveComponent.prototype.renderDesktopVersion = function () {
        throw new Error('нет имплементации метода renderDesktopVersion');
    };
    UiAdaptiveComponent.prototype.renderMobileVersion = function () {
        throw new Error('нет имплементации метода renderDesktopVersion');
    };
    UiAdaptiveComponent.prototype.render = function () {
        return this.isMobileVersion ? this.renderMobileVersion() : this.renderDesktopVersion();
    };
    Object.defineProperty(UiAdaptiveComponent.prototype, "isMobileVersion", {
        get: function () {
            return (this.props.isAdaptive === undefined || this.props.isAdaptive) && this.isTouchDevice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiAdaptiveComponent.prototype, "isTouchDevice", {
        get: function () {
            return 'ontouchstart' in document.documentElement;
        },
        enumerable: true,
        configurable: true
    });
    return UiAdaptiveComponent;
}(UiComponent));
export { UiAdaptiveComponent };
