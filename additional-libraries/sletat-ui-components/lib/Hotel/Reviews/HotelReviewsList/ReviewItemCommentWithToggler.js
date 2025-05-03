Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var BEM_1 = require("sletat-common-utils/lib/BEM");
var ReviewItemCommentWithToggler = /** @class */ (function (_super) {
    tslib_1.__extends(ReviewItemCommentWithToggler, _super);
    function ReviewItemCommentWithToggler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
            needToCut: false,
            cutHeight: 0
        };
        return _this;
    }
    ReviewItemCommentWithToggler.prototype.componentDidMount = function () {
        var lineHeight = parseFloat(getComputedStyle(this.commentDiv).lineHeight);
        var fiveLinesHeight = Math.floor(lineHeight * 5);
        var divHeight = this.commentDiv.getBoundingClientRect().height;
        if (divHeight > fiveLinesHeight) {
            this.setState({
                needToCut: true,
                cutHeight: fiveLinesHeight
            });
        }
    };
    ReviewItemCommentWithToggler.prototype.render = function () {
        var _this = this;
        var bemify = BEM_1.bem(this.props);
        return (React.createElement("div", null,
            React.createElement("div", { ref: function (node) { return _this.commentDiv = node; }, style: { maxHeight: !this.state.isOpen && this.state.needToCut ? this.state.cutHeight + "px" : 'none' }, className: bemify(this.props.isPositive ? 'comments__positive' : 'comments__negative', {
                    mod: [{ 'opened': this.state.isOpen }]
                }), dangerouslySetInnerHTML: { __html: this.props.comment } }),
            this.state.needToCut ?
                React.createElement("p", { className: bemify('comments__controls') },
                    React.createElement("a", { href: "", className: bemify('comments__toggle'), onClick: function (event) {
                            event.preventDefault();
                            _this.setState({ isOpen: !_this.state.isOpen });
                        } }, this.state.isOpen ? 'Скрыть описание' : 'Полное описание')) : null));
    };
    return ReviewItemCommentWithToggler;
}(React.Component));
exports.ReviewItemCommentWithToggler = ReviewItemCommentWithToggler;
