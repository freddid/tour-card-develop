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
import { isUndefined, isFunction } from 'lodash';
import { REQUIRED_VALIDATOR_ID } from '.';
var FieldValidator = /** @class */ (function () {
    function FieldValidator(validators) {
        this.validators = validators;
    }
    FieldValidator.prototype.validate = function (value, touched) {
        touched = !isUndefined(touched) && touched;
        var validationInfo = {
            hasError: false,
            isValid: true,
            isTouchedAndValid: false,
            errors: []
        };
        if (this.validators && this.validators.length > 0) {
            this.validators.forEach(function (item) {
                if (!item.validator(value)) {
                    var message = isFunction(item.errorMessage) ? item.errorMessage(value) : item.errorMessage;
                    validationInfo.errors.push({
                        validatorId: item.id || '',
                        message: message
                    });
                }
            });
        }
        this.validationInfo = __assign(__assign({}, validationInfo), { hasError: !!validationInfo.errors.length && !!touched, isValid: !validationInfo.errors.length, isTouchedAndValid: !validationInfo.errors.length && !!touched });
    };
    FieldValidator.prototype.setErrorMessage = function (errorMessage) {
        this.validationInfo = {
            errors: [{ validatorId: '', message: errorMessage }],
            hasError: true,
            isValid: false,
            isTouchedAndValid: false
        };
    };
    FieldValidator.prototype.hasError = function () {
        if (!this.validationInfo) {
            throw new Error('FieldValidatorError: Please call validate method before getting validation results!');
        }
        return this.validationInfo.hasError;
    };
    FieldValidator.prototype.failedValidatorId = function () {
        if (!this.validationInfo) {
            throw new Error('FieldValidatorError: Please call validate method before getting validation results!');
        }
        return this.validationInfo.errors.length ? this.validationInfo.errors[0].validatorId : '';
    };
    FieldValidator.prototype.isFieldRequired = function () {
        return this.validators.some(function (validator) { return validator.id === REQUIRED_VALIDATOR_ID; });
    };
    FieldValidator.prototype.isValid = function () {
        if (!this.validationInfo) {
            throw new Error('FieldValidatorError: Please call validate method before getting validation results!');
        }
        return this.validationInfo.isValid;
    };
    FieldValidator.prototype.isTouchedAndValid = function () {
        if (!this.validationInfo) {
            throw new Error('FieldValidatorError: Please call validate method before getting validation results!');
        }
        return this.validationInfo.isTouchedAndValid;
    };
    FieldValidator.prototype.errorMessage = function () {
        if (!this.validationInfo) {
            throw new Error('FieldValidatorError: Please call validate method before getting validation results!');
        }
        return this.validationInfo.errors.length ? this.validationInfo.errors[0].message : '';
    };
    return FieldValidator;
}());
export { FieldValidator };
