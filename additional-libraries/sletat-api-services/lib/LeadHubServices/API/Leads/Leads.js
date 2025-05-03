"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLead = exports.createLead = void 0;
var tslib_1 = require("tslib");
var HttpLite = tslib_1.__importStar(require("http-lite"));
var BaseLeadHubAPIService_1 = require("../BaseLeadHubAPIService");
var utils_1 = require("../../../utils");
/**
 * @deprecated нужно использовать leadhub/leads
 */
var Leads = /** @class */ (function (_super) {
    tslib_1.__extends(Leads, _super);
    function Leads(sourceToken, httpMethod, options) {
        var _this = _super.call(this, sourceToken) || this;
        _this.methodName = 'leads';
        _this.httpMethod = httpMethod;
        if (options && options.protocol) {
            _this.protocol = options.protocol;
        }
        if (options && options.host) {
            _this.serviceName = options.host;
        }
        return _this;
    }
    return Leads;
}(BaseLeadHubAPIService_1.BaseLeadHubAPIService));
/**
 * Отправить заявку в лидхаб
 * @deprecated нужно использовать leadhub/leads
 * @param  {[type]}       {phone       телефон
 * @param  {LeadsRequest} params} идентификатор места сборщика заявок
 * @param  {LeadsOptions} options} опции запроса
 * @return {[type]}                    [description]
 */
function createLead(params, options) {
    var partnerId = (0, utils_1.cookies)('partner-id');
    /**
     * неявно пробрасываем идентификатор партнера из куки
     */
    if (partnerId) {
        params.partnerId = partnerId;
    }
    return new Leads(params.sourceToken, HttpLite.HTTPMethods.POST, options).call(params);
}
exports.createLead = createLead;
function getLead(_a, options) {
    var phone = _a.phone, sourceToken = _a.sourceToken;
    return new Leads(sourceToken, HttpLite.HTTPMethods.GET, options).call({ phone: phone });
}
exports.getLead = getLead;
