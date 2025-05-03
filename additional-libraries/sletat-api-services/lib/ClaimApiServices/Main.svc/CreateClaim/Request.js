"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClaimRequestWrapper = exports.Title = exports.Gender = exports.AffiliateProgram = void 0;
var AffiliateProgram;
(function (AffiliateProgram) {
    AffiliateProgram[AffiliateProgram["none"] = 0] = "none";
    AffiliateProgram[AffiliateProgram["sletat"] = 1] = "sletat";
})(AffiliateProgram = exports.AffiliateProgram || (exports.AffiliateProgram = {}));
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
function createClaimRequestWrapper(params) {
    var wrappedCustomer = {
        Phone: params.customer.phone,
        FullName: params.customer.fullName,
        Passport: "".concat(params.customer.passport.series, " ").concat(params.customer.passport.number),
        IssuedBy: params.customer.issuedBy,
        Address: params.customer.address,
        Email: params.customer.email
    };
    if (params.customer.dateOfIssue) {
        wrappedCustomer.DateOfIssue = formatDate(params.customer.dateOfIssue);
    }
    var result = {
        SourceId: params.sourceId,
        OfferId: params.offerId,
        RequestId: params.requestId,
        InitialURL: params.initialURL,
        AffiliateProgram: params.affiliateProgram,
        Comments: params.comment,
        Tourists: params.tourists.map(function (tourist) { return getTourist(tourist); }),
        Customer: wrappedCustomer,
        Host: params.host
    };
    if (params.pricingSchemeId) {
        result.PricingSchemeId = params.pricingSchemeId;
    }
    if (params.prePayment) {
        result.PrePayment = params.prePayment;
    }
    if (params.toPayBefore) {
        result.ToPayBefore = params.toPayBefore;
    }
    if (params.checkCacheForPrice !== undefined) {
        result.CheckCacheForPrice = params.checkCacheForPrice;
    }
    if (params.sessionId) {
        result.SessionId = params.sessionId;
    }
    if (params.vkGroupId) {
        result.VkGroupId = params.vkGroupId;
    }
    if (params.target) {
        result.target = params.target;
    }
    return result;
}
exports.createClaimRequestWrapper = createClaimRequestWrapper;
function getTourist(tourist) {
    return {
        BirthDate: formatDate(tourist.birthdate),
        DateOfIssue: formatDate(tourist.dateOfIssue),
        Expires: formatDate(tourist.expires),
        FirstName: tourist.firstName,
        Surname: tourist.secondName,
        Citizenship: tourist.citizenship,
        Gender: String(tourist.gender),
        PassportSeries: String(tourist.passport.series),
        PassportNumber: String(tourist.passport.number),
        IssuedBy: tourist.issuedBy,
        Title: String(getTitle(tourist))
    };
}
function formatDate(date) {
    var day = date.getDate();
    day = day < 10 ? "0".concat(day) : String(day);
    var month = date.getMonth() + 1;
    month = month < 10 ? "0".concat(month) : String(month);
    return "".concat(day, ".").concat(month, ".").concat(date.getFullYear());
}
function getTitle(tourist) {
    switch (tourist.gender) {
        case Gender.female:
            return tourist.isChild ? Title.kid : Title.mrs;
        case Gender.male:
            return tourist.isChild ? Title.kid : Title.mr;
    }
}
