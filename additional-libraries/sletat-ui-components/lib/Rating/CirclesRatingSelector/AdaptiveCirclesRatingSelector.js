Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-unused-variable */
var React = require("react");
/* tslint:enable:no-unused-variable */
var react_1 = require("react");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var UiSelect_1 = require("react-sletat-uikit/lib/ui-select/UiSelect");
var CirclesRatingSelector_1 = require("./CirclesRatingSelector");
var AdaptiveCirclesRatingSelectorModes;
(function (AdaptiveCirclesRatingSelectorModes) {
    AdaptiveCirclesRatingSelectorModes[AdaptiveCirclesRatingSelectorModes["desktop"] = 0] = "desktop";
    AdaptiveCirclesRatingSelectorModes[AdaptiveCirclesRatingSelectorModes["mobile"] = 1] = "mobile";
})(AdaptiveCirclesRatingSelectorModes = exports.AdaptiveCirclesRatingSelectorModes || (exports.AdaptiveCirclesRatingSelectorModes = {}));
var AdaptiveCirclesRatingSelector = /** @class */ (function (_super) {
    tslib_1.__extends(AdaptiveCirclesRatingSelector, _super);
    function AdaptiveCirclesRatingSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.resizeHandler = function () {
            _this.props.nextModeOnResize()
                .then(function (mode) {
                if (_this.state.mode !== mode) {
                    _this.setState({ mode: mode });
                }
            });
        };
        _this.state = {
            win: _this.props.windowContext || (typeof window === 'undefined' ? null : window),
            maxValue: props.maxValue,
            currentValue: props.currentValue,
            mode: AdaptiveCirclesRatingSelectorModes.desktop
        };
        return _this;
    }
    AdaptiveCirclesRatingSelector.prototype.componentWillReceiveProps = function (props) {
        this.setState({ currentValue: props.currentValue });
    };
    AdaptiveCirclesRatingSelector.prototype.componentDidMount = function () {
        this.state.win.addEventListener('resize', this.resizeHandler, false);
        this.resizeHandler();
    };
    AdaptiveCirclesRatingSelector.prototype.componentWillUnmount = function () {
        this.state.win.removeEventListener('resize', this.resizeHandler);
    };
    AdaptiveCirclesRatingSelector.prototype.render = function () {
        var _this = this;
        switch (this.state.mode) {
            case AdaptiveCirclesRatingSelectorModes.desktop:
                return (React.createElement(CirclesRatingSelector_1.CirclesRatingSelector, { onChange: this.props.onChange, maxValue: this.state.maxValue, currentValue: this.state.currentValue }));
            case AdaptiveCirclesRatingSelectorModes.mobile:
                var range = lodash_2.rangeRight(1, this.state.maxValue + 1);
                return (React.createElement(UiSelect_1.UiSelect, { optionHeight: 30, onChange: function (state, checked) { return _this.props.onChange(checked.inputValue); }, inputValue: this.state.currentValue, options: lodash_1.map(range, function (val) {
                        return {
                            label: val,
                            inputValue: val,
                            isChecked: val === _this.state.currentValue
                        };
                    }) }));
            default:
                return null;
        }
    };
    return AdaptiveCirclesRatingSelector;
}(react_1.Component));
exports.AdaptiveCirclesRatingSelector = AdaptiveCirclesRatingSelector;
