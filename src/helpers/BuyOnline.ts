/* eslint-disable */
/* eslint-disable prettier/prettier */
import {
    AffiliateProgram,
    Gender,
    Module5ClaimRequest,
    Module5Customer,
    Module5Tourist,
    Module6ClaimRequest,
    Module6Customer,
    Module6Tourist,
    Title
} from '../services/claims/models';

import {
    BuyOnlineFormSubmittedData,
    Customer as BuyOnlineFormCustomer,
    Tourist as BuyOnlineFormTourist
} from '../forms/BuyOnline_old/BuyOnlineForm';
import { ClaimKind, MODULE6_TARGET, MODULE_CLAIM_KIND_KEY, MODULE_TARGET_PARAM_KEY, TARGET } from '../types-and-consts';
import { formatDateDotted } from '../utils/date';
import { MAX_KID_AGE } from '../consts/ageConstants';


export interface BuyOnlineHelperSettings {
    requestId: number;
    sourceId: number;
    offerId: number;
    priceModifierSchemeId: string | null;
    isTwoStepPayment: boolean;
}

export class BuyOnlineHelper {

    constructor(private settings: BuyOnlineHelperSettings) {}


    mapModule5CreateClaimRequest(formData: BuyOnlineFormSubmittedData): Module5ClaimRequest {
        const result: Module5ClaimRequest = {
            requestId: this.settings.requestId,
            sourceId: this.settings.sourceId,
            offerId: this.settings.offerId,
            initialURL: String(window.location),
            affiliateProgram: AffiliateProgram.none,
            comment: formData.comment,
            tourists: formData.tourists.map(tourist => this.mapTouristForModule5(tourist)),
            customer: this.mapCustomerForModule5(formData.customer),
            host: window.location.hostname,
            checkCacheForPrice: true,
            target: TARGET,
        };

        if (this.settings.priceModifierSchemeId) {
            result.pricingSchemeId = this.settings.priceModifierSchemeId;
        }

        if (formData.availableSchemas && formData.availableSchemas.length) {
            let selectedSchema = formData.availableSchemas[formData.selectedSchema];
            let daysToPay: Date = new Date();
            let isLastSchema: boolean = formData.availableSchemas.length - 1 === formData.selectedSchema;

            daysToPay.setDate(daysToPay.getDate() + selectedSchema.daysToPay);

            if (!isLastSchema) {
                result.prePayment = selectedSchema.advance;
                result.toPayBefore = formatDateDotted(daysToPay);
            }
        }

        return result;
    }

    mapModule6CreateClaimRequest(formData: BuyOnlineFormSubmittedData): Module6ClaimRequest {
        const result: Module6ClaimRequest = {
            requestId: this.settings.requestId,
            sourceId: this.settings.sourceId,
            offerId: this.settings.offerId,
            initialURL: this.initialURLForModule6,
            affiliateProgram: AffiliateProgram.none,
            comment: formData.comment,
            tourists: formData.tourists.map(t => this.mapTouristForModule6(t)),
            customer: this.mapCustomerForModule6(formData.customer),
            host: window.location.hostname,
            checkCacheForPrice: true
        };

        if (this.settings.priceModifierSchemeId) {
            result.pricingSchemeId = this.settings.priceModifierSchemeId;
        }

        if (formData.availableSchemas && formData.availableSchemas.length) {
            let selectedSchema = formData.availableSchemas[formData.selectedSchema];
            let daysToPay: Date = new Date();
            let isLastSchema: boolean = formData.availableSchemas.length - 1 === formData.selectedSchema;

            daysToPay.setDate(daysToPay.getDate() + selectedSchema.daysToPay);

            if (!isLastSchema) {
                result.prePayment = selectedSchema.advance;
                result.toPayBefore = formatDateDotted(daysToPay);
            }
        }

        return result;
    }

    private mapCustomerForModule5(customerFormData: BuyOnlineFormCustomer): Module5Customer {
        return {
            phone: customerFormData.phone,
            fullName: customerFormData.fio,
            passport: {
                series: customerFormData.passportSeries,
                number: parseInt(customerFormData.passportNumber, 10)
            },
            issuedBy: customerFormData.issuedBy,
            address: customerFormData.address,
            email: customerFormData.email
        };
    }
    private mapCustomerForModule6(customerFormData: BuyOnlineFormCustomer): Module6Customer {
        const [ name, surname, patronymic ] = customerFormData.fio.split(' ');

        return {
            phone: customerFormData.phone,
            name: name || '',
            surname: surname || '',
            patronymic: patronymic || '',
            passportSeries: customerFormData.passportSeries,
            passportNumber: customerFormData.passportNumber,
            passportIssuedBy: customerFormData.issuedBy,
            passportIssuedWhen: formatDateDotted(customerFormData.passportValidFrom),
            address: customerFormData.address,
            email: customerFormData.email
        };
    }

    private mapTouristForModule5(touristFormData: BuyOnlineFormTourist): Module5Tourist {
        return {
            birthdate: touristFormData.birthdate!,
            dateOfIssue: touristFormData.passportValidFrom!,
            expires: touristFormData.passportValidUntil!,
            firstName: touristFormData.firstName,
            secondName: touristFormData.secondName,
            citizenship: touristFormData.citizenship,
            gender: this.getGender(touristFormData),
            passport: {
                series: touristFormData.passportSeries,
                number: parseInt(touristFormData.passportNumber, 10)
            },
            issuedBy: touristFormData.issuedBy,
            title: this.getTitleForModule5(touristFormData),
            isChild: this.isTouristChildForModule5(touristFormData)
        };
    }

    private mapTouristForModule6(touristFormData: BuyOnlineFormTourist): Module6Tourist {
        return {
            birthday: formatDateDotted(touristFormData.birthdate),
            citizenship: touristFormData.citizenship,
            name: touristFormData.firstName,
            surname: touristFormData.secondName,
            gender: this.getGender(touristFormData),
            passportSeries: touristFormData.passportSeries,
            passportNumber: touristFormData.passportNumber,
            passportIssuedBy: touristFormData.issuedBy,
            passportIssuedWhen: formatDateDotted(touristFormData.passportValidFrom),
            passportValidUntil: formatDateDotted(touristFormData.passportValidUntil),
            isChild: this.isTouristChildForModule6(touristFormData)
        };
    }

    private isTouristChildForModule5(touristFormData: BuyOnlineFormTourist): boolean {
        return (new Date().getFullYear() - (touristFormData.birthdate as Date).getFullYear()) < MAX_KID_AGE;
    }

    // SLT-9207 подымаем максимальный возраст детей до 18 лет
    private isTouristChildForModule6(touristFormData: BuyOnlineFormTourist): boolean {
        return (new Date().getFullYear() - (touristFormData.birthdate as Date).getFullYear()) < MAX_KID_AGE;
    }

    private getTitleForModule5(touristFormData: BuyOnlineFormTourist): Title {
        if (this.isTouristChildForModule5(touristFormData)) {
            return Title.kid;
        }

        return this.getGender(touristFormData) === Gender.female
            ? Title.mrs
            : Title.mr;
    }

    private getGender(touristFormData: BuyOnlineFormTourist): Gender {
        return touristFormData.sex === 'Ж'
            ? Gender.female
            : Gender.male;
    }

    // SLT-3685 globaltps вырезает #hash из url, однако при возврате с оплаты нам необходимо определять,
    // с какого модуля пришла заявка, чтобы отобразить верный попап
    // (на странице могут быть установлены модули 5 и 6 одновременно)
    private get initialURLForModule6(): string {
        const claimKind = this.settings.isTwoStepPayment
            ? ClaimKind.Online
            : ClaimKind.FromUrl;

        return `${window.location.protocol}//`
            + window.location.host
            + window.location.pathname
            + `?${MODULE_TARGET_PARAM_KEY}=${MODULE6_TARGET}`
            + `&${MODULE_CLAIM_KIND_KEY}=${claimKind}`;
    }
}
