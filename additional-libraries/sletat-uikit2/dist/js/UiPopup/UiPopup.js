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
import * as React from 'react';
import { isUndefined, isEqual, isNumber, debounce } from 'lodash';
import { UiComponent } from '../UiComponent';
var UiPopup = /** @class */ (function (_super) {
    __extends(UiPopup, _super);
    function UiPopup(props) {
        var _this = _super.call(this, props) || this;
        _this.resizeListenerHandler = debounce(function () {
            _this.setState({ isMounted: false });
        }, 200);
        _this.onKeyDown = function (event) {
            if (event.keyCode === 27 && _this.props.isVisible) {
                // escape
                _this.closePopup();
            }
        };
        _this.state = {
            isMounted: false
        };
        return _this;
    }
    UiPopup.prototype.componentDidMount = function () {
        this.setState({ isMounted: true });
        this.bindListenerOnWindowResize();
    };
    UiPopup.prototype.componentWillUnmount = function () {
        this.unbindListenerOnWindowResize();
    };
    /**
     * TODO selkin: так сделано, чтобы после повторного открытия был двойной рендер,
     * ибо при первом рендере будет ref = null, ведь компонент был зарендерен в DOM как null
     */
    UiPopup.prototype.componentWillReceiveProps = function (nextProps) {
        if (!isEqual(this.props, nextProps)) {
            this.setState({ isMounted: false });
        }
    };
    /**
     * TODO selkin: так сделано, чтобы после повторного открытия был двойной рендер,
     * ибо при первом рендере будет ref = null, ведь компонент был зарендерен в DOM как null
     */
    UiPopup.prototype.componentDidUpdate = function () {
        if (!this.state.isMounted) {
            this.setState({ isMounted: true });
        }
        if (this.containerRef) {
            this.containerRef.focus();
        }
    };
    UiPopup.prototype.render = function () {
        var _this = this;
        if (!this.props.isVisible) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root },
            React.createElement("div", { className: cx.container, tabIndex: this.tabIndex, ref: function (ref) { return (_this.containerRef = ref); }, onClick: function () { return _this.onWrapperClick(); }, onKeyDown: function (e) { return _this.onKeyDown(e); } }, this.renderContentWrapper())));
    };
    UiPopup.prototype.renderContentWrapper = function () {
        var _this = this;
        var cx = this.classes();
        var sx = this.styles();
        return (React.createElement("div", { className: cx.contentWrapper, ref: function (ref) { return (_this.wrapperRef = ref); }, onClick: function (e) { return e.stopPropagation(); } },
            this.renderCloseButton(),
            React.createElement("div", { className: cx.content, style: sx.content }, this.props.children)));
    };
    UiPopup.prototype.renderCloseButton = function () {
        var _this = this;
        if (!this.showCloseButton) {
            return null;
        }
        var cx = this.classes();
        return (React.createElement("span", { className: cx.closeButton, ref: function (ref) { return (_this.closeBtnRef = ref); }, onClick: function () { return _this.closePopup(); } }));
    };
    UiPopup.prototype.closePopup = function () {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
    };
    UiPopup.prototype.classes = function () {
        var baseClass = 'uikit-popup';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            container: this.classNames({
                prefix: baseClass + "__container"
            }),
            contentWrapper: this.classNames({
                prefix: baseClass + "__content-wrapper"
            }),
            content: this.classNames({
                prefix: baseClass + "__content"
            }),
            closeButton: this.classNames({
                prefix: baseClass + "__close-button",
                modifications: [
                    {
                        'inside-popup': this.isContentFilledScreenWidth
                    }
                ]
            })
        };
    };
    UiPopup.prototype.styles = function () {
        return {
            content: {
                maxWidth: this.containerRef ? this.containerRef.offsetWidth : 'auto',
                maxHeight: this.containerRef ? this.containerRef.offsetHeight : 'auto',
                width: isNumber(this.props.fixedContentWidth) ? this.props.fixedContentWidth : 'auto'
            }
        };
    };
    Object.defineProperty(UiPopup.prototype, "showCloseButton", {
        get: function () {
            return isUndefined(this.props.showCloseButton) || this.props.showCloseButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPopup.prototype, "shouldCloseOnWrapperClick", {
        get: function () {
            return !isUndefined(this.props.shouldCloseOnWrapperClick) && this.props.shouldCloseOnWrapperClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPopup.prototype, "tabIndex", {
        get: function () {
            return (!isUndefined(this.props.tabIndex) && this.props.tabIndex) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiPopup.prototype, "isContentFilledScreenWidth", {
        get: function () {
            var CLOSE_BTN_OFFSET = 100;
            return (!!this.wrapperRef &&
                !!this.containerRef &&
                this.wrapperRef.offsetWidth + CLOSE_BTN_OFFSET >= this.containerRef.offsetWidth);
        },
        enumerable: true,
        configurable: true
    });
    UiPopup.prototype.onWrapperClick = function () {
        if (this.shouldCloseOnWrapperClick) {
            this.closePopup();
        }
    };
    UiPopup.prototype.bindListenerOnWindowResize = function () {
        window.addEventListener('resize', this.resizeListenerHandler);
    };
    UiPopup.prototype.unbindListenerOnWindowResize = function () {
        window.removeEventListener('resize', this.resizeListenerHandler);
    };
    return UiPopup;
}(UiComponent));
export { UiPopup };
