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
// tslint:disable-next-line:deprecation
import { UiLoader } from '../UiLoader/UiLoader';
export var UiImageWithLoaderStatus;
(function (UiImageWithLoaderStatus) {
    /**
     * состояние-ожидание: изображение не рендерится
     */
    UiImageWithLoaderStatus[UiImageWithLoaderStatus["PENDING"] = 0] = "PENDING";
    /**
     * состояние загрузки: изображение рендерится, но скрыто. вместо него показан лоадер
     */
    UiImageWithLoaderStatus[UiImageWithLoaderStatus["LOADING"] = 1] = "LOADING";
    /**
     * успешное состояние: изображение рендерится и оно уже загружено. лоадера нет
     */
    UiImageWithLoaderStatus[UiImageWithLoaderStatus["LOADED"] = 2] = "LOADED";
    /**
     * неудачное состояние: изображение не загрузилось, рендерится ошибка
     */
    UiImageWithLoaderStatus[UiImageWithLoaderStatus["FAILED"] = 3] = "FAILED";
})(UiImageWithLoaderStatus || (UiImageWithLoaderStatus = {}));
export var UiImageWithLoaderPendingMode;
(function (UiImageWithLoaderPendingMode) {
    /**
     * если компонент сейчас не в состоянии PENDING (грузится картинка/уже загружена/уже ошибка),
     * то передача null в качестве src не повлияет на изображение (оно не пропадёт).
     * то есть PENDING может быть лишь однажды, в начале, когда ещё не передали src, но если
     * компонент уже не в состоянии PENDING, то заново он в нём не окажется
     */
    UiImageWithLoaderPendingMode[UiImageWithLoaderPendingMode["once"] = 0] = "once";
    /**
     * противоположность режиму once (по-умолчанию). то есть я могу передать новый src = null,
     * когда изображение уже загрузилось. в таком случае старое изображение пропадёт, и компонент
     * сново станет PENDING
     */
    UiImageWithLoaderPendingMode[UiImageWithLoaderPendingMode["manyTimes"] = 1] = "manyTimes";
})(UiImageWithLoaderPendingMode || (UiImageWithLoaderPendingMode = {}));
var UiImageWithLoader = /** @class */ (function (_super) {
    __extends(UiImageWithLoader, _super);
    function UiImageWithLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.onLoadHandler = function (e) {
            _this.setState({
                status: UiImageWithLoaderStatus.LOADED
            });
            if (typeof _this.props.onLoad === 'function') {
                _this.props.onLoad();
            }
        };
        _this.onErrorHandler = function (e) {
            _this.setState({
                status: UiImageWithLoaderStatus.FAILED
            });
            if (typeof _this.props.onError === 'function') {
                _this.props.onError();
            }
        };
        _this.state = {
            status: _this.props.src ? UiImageWithLoaderStatus.LOADING : UiImageWithLoaderStatus.PENDING,
            src: _this.props.src
        };
        return _this;
    }
    UiImageWithLoader.prototype.componentWillReceiveProps = function (nextProps) {
        var pendingMode = this.pendingMode;
        // TODO selkin: дублирование setState намеренное, чтобы были понятны все кейсы
        // кейс1 - изображение в состоянии PENDING, но получает не null адрес, загружаем изображение
        if (this.state.status === UiImageWithLoaderStatus.PENDING && nextProps.src) {
            this.setState({
                status: UiImageWithLoaderStatus.LOADING,
                src: nextProps.src
            });
            // кейс2 - изображение получает другой адрес, новое изображение должно быть загружено
        }
        else if (nextProps.src !== this.state.src && nextProps.src) {
            this.setState({
                status: UiImageWithLoaderStatus.LOADING,
                src: nextProps.src
            });
        }
        else if (!nextProps.src && pendingMode === UiImageWithLoaderPendingMode.manyTimes) {
            this.setState({
                status: UiImageWithLoaderStatus.PENDING,
                src: null
            });
        }
    };
    UiImageWithLoader.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("div", { className: cx.root, onClick: function () {
                if (typeof _this.props.onClick === 'function') {
                    _this.props.onClick();
                }
            } },
            this.renderImage(),
            this.renderLoader(),
            this.renderError()));
    };
    UiImageWithLoader.prototype.renderImage = function () {
        var cx = this.classes();
        var sx = this.styles();
        if (this.state.status === UiImageWithLoaderStatus.PENDING) {
            return null;
        }
        return (React.createElement("img", __assign({}, this.props.imgProps, { style: sx.image, className: cx.image, onLoad: this.onLoadHandler, onError: this.onErrorHandler, src: this.state.src || '#', draggable: this.props.draggable })));
    };
    UiImageWithLoader.prototype.renderLoader = function () {
        var cx = this.classes();
        if (this.state.status !== UiImageWithLoaderStatus.PENDING &&
            this.state.status !== UiImageWithLoaderStatus.LOADING) {
            return null;
        }
        // SLT-523: для не соседних фото не нужно рендерить спиннер в режиме ожидания
        if (this.shouldCheckNearby && this.state.status === UiImageWithLoaderStatus.PENDING && !this.props.isNearby) {
            return null;
        }
        var text = this.state.status === UiImageWithLoaderStatus.LOADING ? this.props.loadingText : this.props.pendingText;
        return (React.createElement("div", { className: cx.loader, style: {
                width: this.props.loaderStyles && this.props.loaderStyles.width,
                height: this.props.loaderStyles && this.props.loaderStyles.height
            } },
            React.createElement(UiLoader, { text: text || '', bemModifications: this.props.bemModifications })));
    };
    UiImageWithLoader.prototype.renderError = function () {
        var cx = this.classes();
        if (this.state.status !== UiImageWithLoaderStatus.FAILED) {
            return null;
        }
        return React.createElement("div", { className: cx.error }, this.props.errorStatus || 'Изображение не загружено');
    };
    UiImageWithLoader.prototype.classes = function () {
        var baseClass = 'uikit-image-with-loader';
        return {
            root: this.classNames({
                prefix: baseClass,
                additionalClasses: this.props.wrapperClass
            }),
            image: this.classNames({
                prefix: baseClass + "__img"
            }),
            error: this.classNames({
                prefix: baseClass + "__error"
            }),
            loader: this.classNames({
                prefix: baseClass + "__loader"
            })
        };
    };
    UiImageWithLoader.prototype.styles = function () {
        return {
            image: {
                display: this.state.status === UiImageWithLoaderStatus.LOADED ? 'block' : 'none'
            }
        };
    };
    Object.defineProperty(UiImageWithLoader.prototype, "shouldCheckNearby", {
        // SLT-523: доступно только для once режима
        get: function () {
            return typeof this.props.isNearby === 'boolean' && this.pendingMode === UiImageWithLoaderPendingMode.once;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiImageWithLoader.prototype, "pendingMode", {
        get: function () {
            return typeof this.props.pendingMode === 'number'
                ? this.props.pendingMode
                : UiImageWithLoaderPendingMode.manyTimes;
        },
        enumerable: true,
        configurable: true
    });
    return UiImageWithLoader;
}(UiComponent));
export { UiImageWithLoader };
