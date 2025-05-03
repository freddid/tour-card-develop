Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var canUseDOM_1 = require("sletat-common-utils/lib/canUseDOM");
function Icon(props) {
    return (React.createElement("svg", { className: props.className, width: props.width, height: props.height },
        React.createElement("use", { xmlnsXlink: "http://www.w3.org/1999/xlink", xlinkHref: "" + props.glyph, xmlBase: canUseDOM_1.canUseDOM ? window.location.toString() : '' })));
}
exports.Icon = Icon;
