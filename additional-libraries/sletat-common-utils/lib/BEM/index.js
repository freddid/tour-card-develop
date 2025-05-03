"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var union_1 = __importDefault(require("lodash/union"));
var BEMClassNames_1 = require("./BEMClassNames");
var BEMClassNames_2 = require("./BEMClassNames");
exports.GetBEMClassNames = BEMClassNames_2.GetBEMClassNames;
function bem(props, prefix, options) {
    if (!prefix) {
        return function (pre, opt) {
            var additionalClasses = opt ? opt.add : '';
            var modifications = union_1.default((props.bemModifications || []), (opt ? (opt.mod || []) : []));
            return BEMClassNames_1.GetBEMClassNames({
                prefix: pre,
                additionalClasses: additionalClasses,
                modifications: modifications
            });
        };
    }
    else {
        var additionalClasses = options ? options.add : '';
        var modifications = union_1.default((props.bemModifications || []), (options ? (options.mod || []) : []));
        return BEMClassNames_1.GetBEMClassNames({
            prefix: prefix,
            additionalClasses: additionalClasses,
            modifications: modifications
        });
    }
}
exports.bem = bem;
