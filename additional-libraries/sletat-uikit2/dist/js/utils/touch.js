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
var TouchHelper = /** @class */ (function () {
    function TouchHelper() {
    }
    TouchHelper.prototype.handleTouchStart = function (event, isDevice) {
        this.startPoint = this.currentMovePoint = this.getTouchPoint(event, isDevice);
    };
    TouchHelper.prototype.handleTouchMove = function (event, isDevice) {
        this.currentMovePoint = this.getTouchPoint(event, isDevice);
    };
    TouchHelper.prototype.handleTouchEnd = function (event, isDevice) {
        this.endPoint = this.getTouchPoint(event, isDevice);
    };
    TouchHelper.prototype.getTouchPoint = function (event, isDevice, touchId) {
        if (touchId === void 0) { touchId = 0; }
        if (isDevice) {
            var touch = event
                .nativeEvent
                .changedTouches[touchId];
            return {
                x: touch.clientX,
                y: touch.clientY
            };
        }
        else {
            var evnt = event;
            return {
                x: evnt.clientX,
                y: evnt.clientY
            };
        }
    };
    return TouchHelper;
}());
export { TouchHelper };
export var SwipeActions;
(function (SwipeActions) {
    SwipeActions[SwipeActions["SwipeNext"] = 0] = "SwipeNext";
    SwipeActions[SwipeActions["SwipeBack"] = 1] = "SwipeBack";
})(SwipeActions || (SwipeActions = {}));
var SliderListener = /** @class */ (function (_super) {
    __extends(SliderListener, _super);
    function SliderListener() {
        var _this = _super.call(this) || this;
        _this.setMinHorizontalSwipeLength(100);
        _this.setMinVerticalSwipeLength(50);
        return _this;
    }
    Object.defineProperty(SliderListener.prototype, "leftOffset", {
        get: function () {
            return !!this.currentMovePoint && !!this.startPoint ? this.currentMovePoint.x - this.startPoint.x : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderListener.prototype, "topOffset", {
        get: function () {
            return !!this.currentMovePoint && !!this.startPoint ? this.currentMovePoint.y - this.startPoint.y : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderListener.prototype, "offset", {
        get: function () {
            return {
                left: this.leftOffset,
                top: this.topOffset
            };
        },
        enumerable: true,
        configurable: true
    });
    SliderListener.prototype.handleTouchStart = function (event, isDevice) {
        _super.prototype.handleTouchStart.call(this, event, isDevice);
    };
    SliderListener.prototype.handleTouchMove = function (event, isDevice) {
        _super.prototype.handleTouchMove.call(this, event, isDevice);
        this.onSliderMoveCallback(this.offset);
    };
    SliderListener.prototype.handleTouchEnd = function (event, isDevice) {
        _super.prototype.handleTouchEnd.call(this, event, isDevice);
        var action = SwipeActions.SwipeNext;
        if (!!this.startPoint && !!this.endPoint && this.startPoint.x < this.endPoint.x) {
            action = SwipeActions.SwipeBack;
        }
        var _a = this.offset, left = _a.left, top = _a.top;
        left = Math.abs(left);
        top = Math.abs(top);
        this.onSwipeCallback({
            action: action,
            offset: {
                top: top >= this.minVerticalSwipeLength ? top : 0,
                left: left >= this.minHorizontalSwipeLength ? left : 0
            }
        });
    };
    SliderListener.prototype.bindCallbackOnSwipe = function (callback) {
        this.onSwipeCallback = callback;
    };
    SliderListener.prototype.bindCallbackOnSliderMove = function (callback) {
        this.onSliderMoveCallback = callback;
    };
    SliderListener.prototype.setMinHorizontalSwipeLength = function (value) {
        this.minHorizontalSwipeLength = value;
    };
    SliderListener.prototype.setMinVerticalSwipeLength = function (value) {
        this.minVerticalSwipeLength = value;
    };
    return SliderListener;
}(TouchHelper));
export { SliderListener };
