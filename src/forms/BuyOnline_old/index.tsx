/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';

import { createClaimEx as createClaimExForModule5 } from '../../services/claims/create-claim-ex/module5';
import { createClaimEx as createClaimExForModule6 } from '../../services/claims/create-claim-ex/module6';

import { createClaim as createClaimForModule5, createClaimRequestWrapperForModule5 } from '../../services/claims/create-claim/module5';
import { createClaim as createClaimForModule6 } from '../../services/claims/create-claim/module6';
import { updateClaim } from '../../services/claims/update-claim';

import {
    Module5ClaimResponse,
    Module5ClaimExResponse,
    Module6ClaimResponse,
    Module6ClaimExResponse,
    WrappedCreateClaimRequestForModule5
} from '../../services/claims/models';

import {
    PrepaymentSchema,
    PrepaymentType
} from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { currency } from 'sletat-api-services/lib/types';

import { BuyOnlineForm, BuyOnlineFormSubmittedData } from './BuyOnlineForm';
import { FormNotificationsHandler, NotificationTypes } from '../FormNotificationsHandler';
import { MODULE6_TARGET } from '../../types-and-consts';
import { BuyOnlineHelper } from '../../helpers/BuyOnline';


export interface BuyOnlinePaymentOptions {
    price: number;
    schemas: Array<BuyOnlinePaymentSchema> | null;
    currency: currency;
}

export interface BuyOnlinePaymentSchema {
    advance: number;
    type: PrepaymentType;
    daysToPay: number;
}

export interface BuyOnlineProps {
    requestId: number;
    sourceId: number;
    offerId: number;
    adults: number;
    kids: number;
    tourPrice: number;
    currency: currency;
    isTwoStepsMode: boolean;
    target: string;
    prepaymentSchemas: Array<PrepaymentSchema>;
    priceModifierSchemeId: string | null;
    onSubmit: () => void;
    onSuccess: (request: WrappedCreateClaimRequestForModule5) => void;
    onError: (error: string) => void;
    onClose: () => void;
}

export interface BuyOnlineState {
    formKey: string;
}

export class BuyOnline extends React.Component<BuyOnlineProps, BuyOnlineState> {

    private buyOnlineRequest: WrappedCreateClaimRequestForModule5;
    private notificationsHandler: FormNotificationsHandler;

    private buyOnlineHelper: BuyOnlineHelper;

    constructor(props: BuyOnlineProps) {
        super(props);

        this.state = {
            formKey: this.formKeyGen()
        };
        this.notificationsHandler = new FormNotificationsHandler();
        this.buyOnlineHelper = new BuyOnlineHelper({
            requestId: props.requestId,
            sourceId: props.sourceId,
            offerId: props.offerId,
            priceModifierSchemeId: props.priceModifierSchemeId,
            isTwoStepPayment: props.isTwoStepsMode
        });
        this.notificationsHandler.bindOnShowNotification(() => this.forceUpdate());
        this.notificationsHandler.bindOnHideNotification(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.notificationsHandler.unbindOnShowNotification();
        this.notificationsHandler.unbindOnHideNotification();
    }

    render() {
        if (this.notificationsHandler.isVisibleNotification) {
            return this.notificationsHandler.renderVisibleNotification();
        }

        return (
            <BuyOnlineForm
                adults={this.props.adults}
                kids={this.props.kids}
                isTwoStepsMode={this.props.isTwoStepsMode}
                paymentOptions={this.getPaymentOptions()}
                target={this.props.target}
                onSubmit={(data: BuyOnlineFormSubmittedData) => {
                    this.prepareForClaim(data);
                }}
            />
        );
    }

    private prepareForClaim(data: BuyOnlineFormSubmittedData) {
        const isModule6 = this.props.target === MODULE6_TARGET;
        isModule6
            ? this.module6ClaimRequest(data)
            : this.module5ClaimRequest(data);
    }

    private async module5ClaimRequest(data: BuyOnlineFormSubmittedData) {
        const request = this.buyOnlineHelper.mapModule5CreateClaimRequest(data);
        this.notificationsHandler.showNotification(NotificationTypes.Processing);
        this.buyOnlineRequest = createClaimRequestWrapperForModule5(request);

        try {
            const response = this.props.isTwoStepsMode
                ? await createClaimExForModule5(request)
                : await createClaimForModule5(request);

            this.module5ClaimRequestSuccessHandler(response as Module5ClaimResponse | Module5ClaimExResponse);

        } catch (err) {
            this.props.onError(err);
        }
    }

    private async module6ClaimRequest(data: BuyOnlineFormSubmittedData) {
        const request = this.buyOnlineHelper.mapModule6CreateClaimRequest(data);
        this.notificationsHandler.showNotification(NotificationTypes.Processing);

        const collapsedClaimEx = async () => {
            try {
                const claim = await createClaimExForModule6(request);
                const updatedClaim = await updateClaim({ claimId: claim.claimIdentity, hasBeenViewedDate: new Date() });

                if (updatedClaim.operationStatus) {
                    window.location.href = claim.claimInfo.redirectToPaymentURL;
                }
            } catch (err) {
                this.props.onError(err);
            }
        };

        try {
            const response = this.props.isTwoStepsMode
                ? await collapsedClaimEx()
                : await createClaimForModule6(request);

            this.module6ClaimRequestSuccessHandler(response as Module6ClaimResponse);

        } catch (err) {
            this.props.onError(err);
        }
    }

    private getPaymentOptions(): BuyOnlinePaymentOptions {
        let tourPrice: number = this.props.tourPrice;

        if (!this.props.isTwoStepsMode) {
            return {
                price: tourPrice,
                currency: this.props.currency,
                schemas: null
            };
        }

        let schemas: Array<BuyOnlinePaymentSchema> | null = this.getPaymentSchemas(tourPrice);

        return {
            price: tourPrice,
            currency: this.props.currency,
            schemas
        };
    }

    private getPaymentSchemas(price: number): Array<BuyOnlinePaymentSchema> | null {
        let schemas: Array<PrepaymentSchema> = this.props.prepaymentSchemas || [];
        // уберём неподходящие схемы
        schemas = this.filterAnotherSchemas(schemas, price);
        if (schemas.length === 0) {
            return null;
        }
        // отсортируем по сумме оплачиваемого аванса
        schemas = this.sortPrepaymentSchemas(schemas, price);
        // добавим cхему с полной оплатой в конец списка
        schemas.push({
            minPrice: price,
            maxPrice: price,
            prepaymentType: PrepaymentType.fixed,
            daysToPay: 1,
            value: price
        });

        return schemas.map((schema: PrepaymentSchema) => {
            return {
                type: schema.prepaymentType,
                daysToPay: schema.daysToPay,
                advance: this.calcPrepaymentAdvance(schema, price)
            };
        });
    }

    private module6ClaimRequestSuccessHandler(response: Module6ClaimResponse): void {
        this.notificationsHandler.showNotification(
            NotificationTypes.Success,
            `Ваш заказ принят. Номер заказа: ${response.orderIdentity}`
        );
        this.setState({ formKey: this.formKeyGen() } as BuyOnlineState);
    }

    private module5ClaimRequestSuccessHandler(response: Module5ClaimResponse | Module5ClaimExResponse): void {
        this.props.onSuccess(this.buyOnlineRequest);

        if (this.isCreateClaimExResponse(response)) {
            this.notificationsHandler.hideNotification();
            this.updateWindowLocationWithClaimId(response.claimIdentity);
            this.props.onClose();
        } else {
            this.notificationsHandler.showNotification(
                NotificationTypes.Success,
                `Ваш заказ принят. Номер заказа: ${response.orderIdentity}`
            );
            this.setState({ formKey: this.formKeyGen() } as BuyOnlineState);
        }
    }

    private sortPrepaymentSchemas(schemas: Array<PrepaymentSchema>, price: number): Array<PrepaymentSchema> {
        return schemas.sort((a: PrepaymentSchema, b: PrepaymentSchema) => {
            return this.calcPrepaymentAdvance(a, price) - this.calcPrepaymentAdvance(b, price);
        });
    }

    private calcPrepaymentAdvance(schema: PrepaymentSchema, price: number): number {
        return (PrepaymentType.fixed === schema.prepaymentType)
            ? schema.value
            : Math.round(schema.value * price);
    }

    private filterAnotherSchemas(schemas: Array<PrepaymentSchema>, price: number): Array<PrepaymentSchema> {
        return schemas.filter((schema: PrepaymentSchema) => schema.minPrice <= price && schema.maxPrice >= price);
    }

    private isCreateClaimExResponse(response: any): response is Module5ClaimExResponse | Module6ClaimExResponse {
        return !!response.claimInfo;
    }

    private updateWindowLocationWithClaimId(claimId: string): void {
        let search = String(window.location.search);
        if (search) {
            search = `${search}&claimid=${claimId}`;
        } else {
            search = `?claimid=${claimId}`;
        }
        window.location.hash = '';
        window.location.search = search;
    }

    private formKeyGen(): string {
        return `buy-online-form-${Math.random().toFixed(6)}`;
    }
}
