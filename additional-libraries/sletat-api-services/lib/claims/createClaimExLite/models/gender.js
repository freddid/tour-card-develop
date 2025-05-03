"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTitle = exports.Title = exports.Gender = void 0;
// EXCUSE ME WTF?!
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 1] = "male";
    Gender[Gender["female"] = 2] = "female";
})(Gender = exports.Gender || (exports.Gender = {}));
var Title;
(function (Title) {
    Title[Title["mr"] = 1] = "mr";
    Title[Title["mrs"] = 2] = "mrs";
    Title[Title["kid"] = 3] = "kid";
})(Title = exports.Title || (exports.Title = {}));
function getTitle(tourist) {
    if (tourist.isChild) {
        return Title.kid;
    }
    return tourist.gender === Gender.male ? Title.mr : Title.mrs;
}
exports.getTitle = getTitle;
