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
import * as React from 'react';
import { Collapse } from 'react-collapse';
import { isString } from 'lodash';
import { UiComponent } from '../UiComponent';
import { UiTooltip } from '../UiTooltip/UiTooltip';
import { SimpleTransition } from '../SimpleTransition';
import Eye from '../icons/eye';
var UiText = /** @class */ (function (_super) {
    __extends(UiText, _super);
    function UiText(props) {
        var _this = _super.call(this, props) || this;
        _this.inputElem = null;
        _this.handleInputValueEvent = function (e, eventHandler) {
            var nativeEvent = e.nativeEvent;
            _this.setInputValue(e.target.value).then(function () {
                if (typeof eventHandler === 'function') {
                    eventHandler(_this.getChangeState(nativeEvent));
                }
            });
        };
        _this.changeHandler = function (e) {
            _this.handleInputValueEvent(e, _this.props.onChange);
        };
        _this.blurHandler = function (e) {
            _this.handleInputValueEvent(e, _this.props.onBlur);
        };
        _this.focusHandler = function (e) {
            _this.handleInputValueEvent(e, _this.props.onFocus);
        };
        _this.keyDownHandler = function (e) {
            _this.handleInputValueEvent(e, _this.props.onKeyDown);
        };
        _this.keyUpHandler = function (e) {
            _this.handleInputValueEvent(e, _this.props.onKeyUp);
        };
        var currentValue = props.inputValue || '';
        if (_this.props.inputTextFormatter) {
            currentValue = _this.props.inputTextFormatter(currentValue, '');
        }
        _this.state = { inputValue: currentValue, showPass: false };
        return _this;
    }
    UiText.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.inputValue !== this.state.inputValue) {
            this.setInputValue(nextProps.inputValue || '');
        }
    };
    UiText.prototype.renderControlTitle = function () {
        var cx = this.classes();
        if (!this.props.controlTitle) {
            return null;
        }
        return (React.createElement("label", { className: cx.controlTitle, htmlFor: this.props.id }, this.props.controlTitle));
    };
    UiText.prototype.renderTextAreaField = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("textarea", { ref: function (ref) {
                _this.inputElem = ref;
                if (typeof _this.props.inputRef === 'function') {
                    _this.props.inputRef(ref);
                }
            }, tabIndex: this.props.tabIndex, maxLength: this.props.maxLength, cols: this.props.cols || 10, rows: this.props.rows || 10, name: this.props.inputName, value: this.inputValue, defaultValue: this.props.defaultValue, placeholder: this.props.placeholderText, className: cx.textarea, readOnly: this.props.isReadonly, disabled: this.props.isDisabled, required: this.props.isNativeRequired, onChange: this.changeHandler, onKeyDown: this.keyDownHandler, onKeyUp: this.keyUpHandler, onBlur: this.blurHandler, onFocus: this.focusHandler, id: this.props.id }));
    };
    UiText.prototype.renderInputField = function () {
        var _this = this;
        var cx = this.classes();
        var autocomplete = function () {
            if (!_this.props.autocomplete) {
                return 'off';
            }
            return isString(_this.props.autocomplete) ? _this.props.autocomplete : 'on';
        };
        var props = {
            ref: function (ref) {
                _this.inputElem = ref;
                if (typeof _this.props.inputRef === 'function') {
                    _this.props.inputRef(ref);
                }
            },
            type: (this.props.inputType === 'password' && this.state.showPass && "text") || this.props.inputType || 'text',
            maxLength: this.props.maxLength,
            tabIndex: this.props.tabIndex,
            name: this.props.inputName,
            value: this.inputValue,
            defaultValue: this.props.defaultValue,
            autoComplete: autocomplete(),
            autoFocus: this.props.autofocus,
            placeholder: this.props.placeholderText,
            className: cx.input,
            readOnly: this.props.isReadonly,
            disabled: this.props.isDisabled,
            required: this.props.isNativeRequired,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step,
            id: this.props.id
        };
        if (this.props.onFocus) {
            props.onFocus = this.focusHandler;
        }
        if (this.props.onKeyDown) {
            props.onKeyDown = this.keyDownHandler;
        }
        if (this.props.onChange) {
            props.onChange = this.changeHandler;
        }
        if (this.props.onKeyUp) {
            props.onKeyUp = this.keyUpHandler;
        }
        if (this.props.onBlur) {
            props.onBlur = this.blurHandler;
        }
        return React.createElement("input", __assign({}, props));
    };
    UiText.prototype.render = function () {
        var cx = this.classes();
        return (React.createElement("fieldset", { className: cx.root },
            this.renderControlTitle(),
            React.createElement("div", { className: cx.wrapperInput },
                this.props.isMultiLine ? this.renderTextAreaField() : this.renderInputField(),
                this.props.useShowPassword && this.renderEye(),
                !this.props.useShowPassword && this.renderValidationIcon(),
                this.renderTooltip())));
    };
    UiText.prototype.renderEye = function () {
        var _this = this;
        var cx = this.classes();
        return (React.createElement("span", { onClick: function () {
                _this.setState({
                    showPass: !_this.state.showPass
                });
            }, className: this.blockNames.main + "__eye-password" },
            React.createElement(Eye, null)));
    };
    UiText.prototype.renderValidationIcon = function () {
        var _this = this;
        if (this.props.useTooltipAnimation) {
            return (React.createElement(SimpleTransition, { isVisible: !!this.props.isError || !!this.props.tooltipHelpText, transitionContainerClass: this.classes().tooltipIconTransition, renderData: function () { return (React.createElement("span", { className: _this.classes().tooltipButton, onClick: function () { return _this.props.onValidationIconClick && _this.props.onValidationIconClick(); } })); } }));
        }
        if ((!!this.props.isError || !!this.props.tooltipHelpText) && !this.props.tooltipLight) {
            return (React.createElement("span", { className: this.classes().tooltipButton, onClick: function () { return _this.props.onValidationIconClick && _this.props.onValidationIconClick(); } }));
        }
        return null;
    };
    UiText.prototype.renderTooltip = function () {
        var _this = this;
        if (this.props.useTooltipAnimation) {
            return (React.createElement(Collapse, { isOpened: (!!this.props.isError && !!this.props.tooltipErrorText) || !!this.props.tooltipHelpText, onRest: function () {
                    if (typeof _this.props.onCompleteTooltipAnimation === 'function') {
                        _this.props.onCompleteTooltipAnimation();
                    }
                }, springConfig: { stiffness: 190, damping: 25, precision: 5 } },
                React.createElement(UiTooltip, { isErrorTooltip: this.props.isError, tooltipText: this.props.tooltipErrorText || this.props.tooltipHelpText, blockNames: { main: this.blockNames.tooltip }, bemModifications: this.props.bemModifications })));
        }
        return (React.createElement(UiTooltip, { isErrorTooltip: this.props.isError, tooltipText: this.props.isError ? this.props.tooltipErrorText : this.props.tooltipHelpText, tooltipLight: this.props.tooltipLight, blockNames: { main: this.blockNames.tooltip }, bemModifications: this.props.bemModifications }));
    };
    UiText.prototype.classes = function () {
        return {
            root: this.classNames({
                prefix: this.blockNames.main,
                modifications: [
                    {
                        'error': !!this.props.isError,
                        'error-msg': !!this.props.isError && !!this.props.tooltipErrorText,
                        'disabled': !!this.props.isDisabled,
                        'valid': !!this.props.isValid && !this.props.isError,
                        'help': !this.props.isError && !!this.props.tooltipHelpText
                    }
                ],
                additionalClasses: this.props.wrapperClass
            }),
            controlTitle: this.classNames({
                prefix: this.blockNames.main + "__title"
            }),
            textarea: this.classNames({
                prefix: this.blockNames.main + "__input",
                modifications: [
                    {
                        'resize-both': !!this.props.isResizeX && !!this.props.isResizeY,
                        'resize-horizontal': !!this.props.isResizeX && !this.props.isResizeY,
                        'resize-vertical': !this.props.isResizeX && !!this.props.isResizeY,
                        'error': !!this.props.isError,
                        'readonly': !!this.props.isReadonly,
                        'disabled': !!this.props.isDisabled
                    }
                ]
            }),
            input: this.classNames({
                prefix: this.blockNames.main + "__input",
                modifications: [
                    {
                        error: !!this.props.isError,
                        readonly: !!this.props.isReadonly,
                        disabled: !!this.props.isDisabled
                    }
                ]
            }),
            wrapperInput: this.classNames({
                prefix: this.blockNames.main + "__wrapper"
            }),
            tooltipButton: this.classNames({
                prefix: this.blockNames.main + "__hint",
                modifications: [
                    {
                        'error': !!this.props.isError,
                        'error-msg': !!this.props.isError && !!this.props.tooltipErrorText,
                        'valid': !!this.props.isValid && !this.props.isError,
                        'help': !this.props.isError && !!this.props.tooltipHelpText
                    }
                ]
            }),
            tooltipIconTransition: this.classNames({
                prefix: this.blockNames.main + "__tooltip-icon-transition"
            })
        };
    };
    Object.defineProperty(UiText.prototype, "blockNames", {
        get: function () {
            return __assign({ main: 'uikit-text', tooltip: 'uikit-tooltip' }, this.props.blockNames);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UiText.prototype, "inputValue", {
        get: function () {
            return this.state.inputValue;
        },
        enumerable: true,
        configurable: true
    });
    UiText.prototype.setInputValue = function (currentValue) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.props.inputTextFormatter) {
                _this.setState({
                    inputValue: _this.props.inputTextFormatter(currentValue, _this.state.inputValue)
                }, function () { return resolve(); });
            }
            else if (_this.props.maskOptions) {
                var maskResult = _this.props.maskOptions.mask(currentValue, _this.state.inputValue, _this.inputElem ? _this.inputElem.selectionStart : 0, _this.inputElem ? _this.inputElem.selectionEnd : 0);
                var shouldApplyMask = !_this.props.maskOptions.shouldApplyMask ||
                    _this.props.maskOptions.shouldApplyMask(currentValue, maskResult.value);
                var result_1 = {
                    value: shouldApplyMask ? maskResult.value : currentValue,
                    startCaretPosition: shouldApplyMask
                        ? maskResult.startCaretPosition
                        : _this.inputElem
                            ? _this.inputElem.selectionStart
                            : 0,
                    endCaretPosition: shouldApplyMask
                        ? maskResult.endCaretPosition
                        : _this.inputElem
                            ? _this.inputElem.selectionEnd
                            : 0
                };
                if (_this.props.maskOptions.shouldSetInputValue &&
                    !_this.props.maskOptions.shouldSetInputValue(currentValue, result_1.value)) {
                    resolve();
                    return;
                }
                _this.setState({ inputValue: result_1.value }, function () {
                    // https://agile.sletat.ru/jiraurl/browse/SLT-1368
                    // https://github.com/nosir/cleave.js/pull/230/commits/803d62c981f97eda43276dbe372e0e75998da473
                    if (_this.inputElem instanceof HTMLInputElement && _this.inputElem === document.activeElement) {
                        _this.inputElem.setSelectionRange(result_1.startCaretPosition, result_1.endCaretPosition);
                    }
                    if (_this.props.maskOptions.shouldCallOnChangeAfterMaskApplied && _this.props.onChange) {
                        _this.props.onChange({ value: _this.state.inputValue });
                    }
                    resolve();
                });
            }
            else {
                _this.setState({ inputValue: currentValue }, function () { return resolve(); });
            }
        });
    };
    UiText.prototype.getChangeState = function (e) {
        return {
            value: e.target.value,
            event: e,
            target: e.target
        };
    };
    return UiText;
}(UiComponent));
export { UiText };
