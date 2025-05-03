import { isUndefined } from 'lodash';
export function compose(validators) {
    return {
        validate: function (data, touched) {
            validators.forEach(function (validator, idx) {
                var currentData = data[idx];
                var isTouched = !isUndefined(currentData.touched) ? currentData.touched : touched;
                validator.validate(currentData.value, isTouched);
            });
        },
        hasError: function () {
            return validators.some(function (validator) { return validator.hasError(); });
        },
        failedValidatorId: function () {
            return validators.map(function (validator) { return validator.failedValidatorId(); }).filter(Boolean)[0] || '';
        },
        isFieldRequired: function () {
            return validators.some(function (validator) { return validator.isFieldRequired(); });
        },
        isValid: function () {
            return validators.every(function (validator) { return validator.isValid(); });
        },
        isTouchedAndValid: function () {
            return validators.every(function (validator) { return validator.isTouchedAndValid(); });
        },
        errorMessage: function () {
            return validators.map(function (validator) { return validator.errorMessage(); }).filter(Boolean)[0] || '';
        },
        setErrorMessage: function (errorMessage) {
            validators.forEach(function (validator) {
                validator.setErrorMessage(errorMessage);
            });
        }
    };
}
