import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';
export function SimpleTransition(props) {
    var TRANSITION_KEY = 'transition-item-key';
    var getStyles = function () {
        if (!props.isVisible) {
            return [];
        }
        return [
            {
                key: TRANSITION_KEY,
                data: props.data,
                style: {
                    opacity: spring(1, { stiffness: 120, damping: 25, precision: 0.5 })
                }
            }
        ];
    };
    var willEnter = function () { return ({
        opacity: 0
    }); };
    var willLeave = function () { return ({
        opacity: spring(0, { stiffness: 280, damping: 25, precision: 0.5 })
    }); };
    return (React.createElement(TransitionMotion, { defaultStyles: [
            {
                key: TRANSITION_KEY,
                style: { opacity: 0 }
            }
        ], styles: getStyles(), willEnter: willEnter, willLeave: willLeave }, function (items) { return (React.createElement("div", { className: props.transitionContainerClass }, items.map(function (_a) {
        var key = _a.key, style = _a.style, data = _a.data;
        return (React.createElement("div", { key: key, style: style }, props.renderData(data, style)));
    }))); }));
}
