Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus[ValidationStatus["normal"] = 0] = "normal";
    ValidationStatus[ValidationStatus["invalid"] = 1] = "invalid";
    ValidationStatus[ValidationStatus["dirty"] = 2] = "dirty";
})(ValidationStatus = exports.ValidationStatus || (exports.ValidationStatus = {}));
function getDefaultState() {
    var now = new Date();
    return {
        rating: 5,
        month: now.getMonth(),
        year: now.getFullYear(),
        name: '',
        positive: '',
        negative: '',
        status: ValidationStatus.normal
    };
}
exports.getDefaultState = getDefaultState;
function setName(state, value) {
    state = lodash_1.clone(state);
    state.name = value;
    if (state.status === ValidationStatus.invalid) {
        state.status = ValidationStatus.dirty;
    }
    return state;
}
exports.setName = setName;
function setMonth(state, value) {
    state = lodash_1.clone(state);
    state.month = value;
    return state;
}
exports.setMonth = setMonth;
function setYear(state, value) {
    state = lodash_1.clone(state);
    state.year = value;
    return state;
}
exports.setYear = setYear;
function setRating(state, value) {
    state = lodash_1.clone(state);
    state.rating = value;
    return state;
}
exports.setRating = setRating;
function setPositive(state, value) {
    state = lodash_1.clone(state);
    state.positive = value;
    if (state.status === ValidationStatus.invalid) {
        state.status = ValidationStatus.dirty;
    }
    return state;
}
exports.setPositive = setPositive;
function setNegative(state, value) {
    state = lodash_1.clone(state);
    state.negative = value;
    if (state.status === ValidationStatus.invalid) {
        state.status = ValidationStatus.dirty;
    }
    return state;
}
exports.setNegative = setNegative;
function setStatus(state) {
    state = lodash_1.clone(state);
    if (isStateValid(state)) {
        state.status = ValidationStatus.normal;
    }
    else {
        state.status = ValidationStatus.invalid;
    }
    return state;
}
exports.setStatus = setStatus;
function hasNameError(state) {
    return state.name.length === 0;
}
exports.hasNameError = hasNameError;
function isNameValid(state) {
    return state.status === ValidationStatus.normal || !hasNameError(state);
}
exports.isNameValid = isNameValid;
function hasReviewError(state) {
    return state.positive.length === 0 && state.negative.length === 0;
}
exports.hasReviewError = hasReviewError;
function isReviewValid(state) {
    return state.status === ValidationStatus.normal || !hasReviewError(state);
}
exports.isReviewValid = isReviewValid;
function getErrorForName(state) {
    if (isNameValid(state)) {
        return null;
    }
    else {
        return 'Пожалуйста, укажите имя';
    }
}
exports.getErrorForName = getErrorForName;
function getErrorForReview(state) {
    if (isReviewValid(state)) {
        return null;
    }
    else {
        return 'Заполните, пожалуйста, хотя бы одно из полей: достоинства или недостатки';
    }
}
exports.getErrorForReview = getErrorForReview;
function isStateValid(state) {
    return !hasNameError(state) && !hasReviewError(state);
}
exports.isStateValid = isStateValid;
