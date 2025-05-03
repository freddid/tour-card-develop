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
export var UiPaginationLink = function (props) {
    var href = 'javascript:void(0);';
    // не надо так. Нужно удалить
    if (props.templateForGenerateHref) {
        href = props.templateForGenerateHref.replace('{page}', String(props.index));
    }
    if (typeof props.getHrefForPage === 'function') {
        href = props.getHrefForPage(props.index || 0);
    }
    var onClick = function (event) {
        event.preventDefault();
        if (props.index && props.onSelectPageHandler) {
            props.onSelectPageHandler(props.index);
        }
    };
    return (React.createElement("a", { title: props.title, href: href, className: props.linkClassNames, onClick: onClick },
        React.createElement("span", { className: props.spanClassNames, title: props.title }, props.content)));
};
var UiPagination = /** @class */ (function (_super) {
    __extends(UiPagination, _super);
    function UiPagination(props) {
        var _this = _super.call(this, props) || this;
        _this.setLimitedCountPagination = function (pages) {
            var page;
            var isHasLeftDots = false;
            var isHasRightDots = false;
            _this.visibleItems = [];
            for (page = 1; page <= pages; page += 1) {
                _this.visibleItems.push({ index: page });
            }
            if (_this.props.maxPositions !== undefined && _this.props.maxPositions < pages) {
                var currentPage = _this.state.currentPage - 1; // Делаем отсчёт currentPage не с 1, а с 0
                var frame = _this.props.maxPositions - 6; // Фрагмент пагинации между dots
                var middleFrame = parseInt("" + (frame / 2 + 1), 10); // Середина фрагмента пагинации между dots
                if (currentPage > 2 + middleFrame) {
                    _this.visibleItems[2] = {
                        dots: '&hellip;',
                        index: undefined
                    };
                    isHasLeftDots = true;
                }
                if (currentPage < pages - middleFrame - 2) {
                    _this.visibleItems[pages - 3] = {
                        dots: '&hellip;',
                        index: undefined
                    };
                    isHasRightDots = true;
                }
                if (isHasRightDots) {
                    if (isHasLeftDots) {
                        // Если dots и справа и слева
                        var spliceFrom = 3;
                        var frameFromIndex = _this.state.currentPage - middleFrame + 1;
                        var frameToIndex = _this.state.currentPage + middleFrame - 1;
                        /**
                         * Сначала обрезаются 'лишние' элменты пагинации справа
                         */
                        _this.visibleItems.splice(frameToIndex, pages - frameToIndex - 3);
                        /**
                         * Затем обрезаются 'лишние' элементы пагинации
                         */
                        _this.visibleItems.splice(spliceFrom, frameFromIndex - 4);
                    }
                    else {
                        // Если dots только справа
                        var spliceFrom = _this.props.maxPositions - 3;
                        var spliceCount = pages - spliceFrom - 3;
                        _this.visibleItems.splice(spliceFrom, spliceCount);
                    }
                }
                else if (isHasLeftDots) {
                    // Если dots только слева
                    var spliceFrom = 3;
                    var spliceCount = pages - _this.props.maxPositions;
                    _this.visibleItems.splice(spliceFrom, spliceCount);
                }
            }
            _this.forceUpdate();
        };
        _this.onSelectPageHandler = function (page) {
            if (_this.props.onSelectPageHandler !== undefined) {
                _this.props.onSelectPageHandler(page);
            }
        };
        _this.state = {
            currentPage: _this.props.currentPage,
            bemModifications: _this.props.bemModifications
        };
        return _this;
    }
    UiPagination.prototype.componentWillMount = function () {
        this.setLimitedCountPagination(this.props.pages);
    };
    UiPagination.prototype.componentWillReceiveProps = function (newProps) {
        var _this = this;
        if (this.state.currentPage !== newProps.currentPage) {
            this.setState({
                currentPage: newProps.currentPage
            }, function () {
                _this.setLimitedCountPagination(newProps.pages);
            });
        }
        if (newProps.pages !== this.props.pages) {
            this.setLimitedCountPagination(newProps.pages);
            this.forceUpdate();
        }
    };
    UiPagination.prototype.render = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("ul", { className: cx.root, 
            // tslint:disable-next-line
            ref: 'pagination' },
            React.createElement("li", { className: cx.prevItem, key: 'prev' }, this.renderPrevPaginationLink()),
            this.visibleItems.map(function (item, idx) { return _this.renderVisibleItem(item, idx); }),
            React.createElement("li", { className: cx.nextItem, key: 'next' }, this.renderNextPaginationLink())));
    };
    UiPagination.prototype.renderPrevPaginationLink = function () {
        var cx = this.classes();
        if (this.state.currentPage === 1) {
            return (React.createElement("span", { key: 'prev-text', className: cx.prevText }, "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F"));
        }
        return (React.createElement(UiPaginationLink, { key: 'prev__page-link', title: 'Предыдущая страница', content: 'Предыдущая', index: this.state.currentPage - 1, templateForGenerateHref: this.props.templateForGenerateHref, getHrefForPage: this.props.getHrefForPage, onSelectPageHandler: this.onSelectPageHandler, linkClassNames: cx.prevLink, spanClassNames: cx.prevText }));
    };
    UiPagination.prototype.renderNextPaginationLink = function () {
        var cx = this.classes();
        if (this.state.currentPage === this.props.pages) {
            return (React.createElement("span", { key: 'next-text', className: cx.nextText }, "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F"));
        }
        return (React.createElement(UiPaginationLink, { key: 'next__page-link', title: 'Следующая страница', content: 'Следующая', index: this.state.currentPage + 1, templateForGenerateHref: this.props.templateForGenerateHref, getHrefForPage: this.props.getHrefForPage, onSelectPageHandler: this.onSelectPageHandler, linkClassNames: cx.nextLink, spanClassNames: cx.nextText }));
    };
    UiPagination.prototype.renderVisibleItem = function (page, pageIndex) {
        var _this = this;
        var cx = this.classes();
        var renderActiveItem = function () { return (React.createElement("span", { className: cx.activePage, key: (page.index || 'dots') + "__active-page" }, page.index)); };
        var renderInactiveItem = function () {
            var title = "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 " + page.index;
            return (React.createElement(UiPaginationLink, { key: page.index + "__page-link", title: title, content: page.index || '', index: page.index, templateForGenerateHref: _this.props.templateForGenerateHref, getHrefForPage: _this.props.getHrefForPage, onSelectPageHandler: _this.onSelectPageHandler, linkClassNames: cx.link, spanClassNames: cx.text }));
        };
        var renderDots = function () { return (React.createElement("span", { className: cx.dots, key: pageIndex + "_" + pageIndex + "__dots" },
            "\u2026",
            ' ')); };
        var children;
        if (page.index && this.state.currentPage === page.index) {
            children = renderActiveItem();
        }
        else if (page.index !== undefined) {
            children = renderInactiveItem();
        }
        else {
            children = renderDots();
        }
        return (React.createElement("li", { className: cx.item, key: (page.index ? page.index : 'dots') + "_" + pageIndex + "__page-item-wrapper" }, children));
    };
    UiPagination.prototype.classes = function () {
        var baseClass = 'uikit-pagination'; // uis-pagination
        return {
            root: this.classNames({
                prefix: "" + baseClass,
                additionalClasses: this.props.wrapperClass,
                modifications: []
            }),
            item: this.classNames({
                prefix: baseClass + "__item"
            }),
            prevItem: this.classNames({
                prefix: baseClass + "__item-step",
                modifications: [
                    {
                        prev: true
                    }
                ]
            }),
            nextItem: this.classNames({
                prefix: baseClass + "__item-step",
                modifications: [
                    {
                        next: true
                    }
                ]
            }),
            link: this.classNames({
                prefix: baseClass + "__link"
            }),
            prevLink: this.classNames({
                prefix: baseClass + "__link-step",
                modifications: [
                    {
                        prev: true
                    }
                ]
            }),
            nextLink: this.classNames({
                prefix: baseClass + "__link-step",
                modifications: [
                    {
                        next: true
                    }
                ]
            }),
            text: this.classNames({
                prefix: baseClass + "__text"
            }),
            prevText: this.classNames({
                prefix: baseClass + "__text-step",
                modifications: [
                    {
                        prev: true
                    }
                ]
            }),
            nextText: this.classNames({
                prefix: baseClass + "__text-step",
                modifications: [
                    {
                        next: true
                    }
                ]
            }),
            dots: this.classNames({
                prefix: baseClass + "__dots"
            }),
            activePage: this.classNames({
                prefix: baseClass + "__active-page"
            })
        };
    };
    return UiPagination;
}(UiComponent));
export { UiPagination };
