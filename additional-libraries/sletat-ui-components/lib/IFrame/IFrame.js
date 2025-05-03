Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var lodash_1 = require("lodash");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var ROOT_NODE_ID = 'root-id';
var IFrameComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IFrameComponent, _super);
    function IFrameComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChildrenFromProps = function () {
            react_dom_1.render(_this.props.children, _this.getRootNode());
        };
        _this.setBodyClasses = function () {
            if (!_this.props.bodyClasses) {
                return;
            }
            _this.props.bodyClasses.forEach(function (bodyClass) { return _this.getFrameDocument().body.classList.add(bodyClass); });
        };
        _this.prepareFrameDOM = function () {
            return new Promise(function (resolve) {
                var frameDocument = _this.getFrameDocument();
                frameDocument.open();
                frameDocument.write(_this.getPreparedLayout());
                frameDocument.addEventListener('DOMContentLoaded', resolve);
                frameDocument.close();
            });
        };
        return _this;
    }
    IFrameComponent.prototype.componentDidMount = function () {
        var _this = this;
        this.prepareFrameDOM()
            .then(function () {
            _this.renderChildrenFromProps();
            _this.setBodyClasses();
        });
    };
    IFrameComponent.prototype.componentWillReceiveProps = function () {
        this.setBodyClasses();
    };
    IFrameComponent.prototype.componentDidUpdate = function () {
        this.renderChildrenFromProps();
        this.setBodyClasses();
    };
    IFrameComponent.prototype.componentWillUnmount = function () {
        react_dom_1.unmountComponentAtNode(this.getRootNode());
    };
    IFrameComponent.prototype.render = function () {
        var _this = this;
        var props = lodash_1.clone(this.props);
        delete props.styleSheets;
        delete props.scripts;
        delete props.children;
        delete props.inlineHeadStyles;
        return (React.createElement("iframe", tslib_1.__assign({ ref: function (ref) { return _this.iframe = ref; } }, props, { src: 'about:blank' })));
    };
    IFrameComponent.prototype.getRootNode = function () {
        return this.getFrameDocument().getElementById(ROOT_NODE_ID);
    };
    IFrameComponent.prototype.getFrameDocument = function () {
        return this.iframe.contentWindow.document;
    };
    IFrameComponent.prototype.getPreparedLayout = function () {
        return "\n            <head>\n                " + this.buildStyleSheetsBlock(this.props.styleSheets || []) + "\n                " + this.buildHeadInlineStyles(this.props.inlineHeadStyles) + "\n            </head>\n            <body>\n                " + this.buildRootNodeBlock() + "\n                " + this.buildScriptsBlock(this.props.scripts || []) + "\n            </body>\n        ";
    };
    IFrameComponent.prototype.buildStyleSheetsBlock = function (styles) {
        return styles.map(function (href) { return "<link rel=\"stylesheet\" href=\"" + href + "\" />"; }).join('');
    };
    IFrameComponent.prototype.buildHeadInlineStyles = function (styles) {
        return !!styles
            ? "<style type=\"text/css\">" + styles + "</style>"
            : '';
    };
    IFrameComponent.prototype.buildScriptsBlock = function (scripts) {
        return scripts.map(function (script) {
            var async = !!script.async ? 'async' : '';
            var charset = !!script.charset ? "charset=\"" + script.charset + "\"" : '';
            return "<script type=\"text/javascript\" src=\"" + script.src + "\" " + charset + " " + async + "></script>";
        }).join('');
    };
    IFrameComponent.prototype.buildRootNodeBlock = function () {
        return "<div id=\"" + ROOT_NODE_ID + "\" style=\"-webkit-overflow-scrolling: touch\"></div>";
    };
    return IFrameComponent;
}(react_1.Component));
exports.IFrameComponent = IFrameComponent;
