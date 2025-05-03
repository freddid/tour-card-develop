/* eslint-disable */
/* eslint-disable prettier/prettier */
import { Emitter } from 'sletat-common-utils/lib/emitter';
import { SaveTourOrderRequest } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/SaveTourOrder/SaveTourOrderRequest';
import { WrappedCreateClaimRequest } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/CreateClaim/Request';
import { LeadsResponse } from 'sletat-api-services/lib/LeadHubServices/API/Leads/LeadsResponse';

import { Mode as ComparisonMode, TourComparisonData } from './ComparisonButton';
import { TourCardParams } from './types-and-consts';
import { BaseBuyOnlineParams } from './models/buy-online';

export enum CardUserEvents {
    tourCard,
    buyingClick,
    buyingSubmit,
    buyingError,
    bookingClick,
    bookingSubmit,
    bookingError,
    hotelReviewsSelected
}

export interface RequestErrorDescription {
    message: string;
}

export type SaveTourOrderData = { request: SaveTourOrderRequest, cityName?: string };
export type CardEventPayload = RequestErrorDescription | SaveTourOrderData | WrappedCreateClaimRequest | LeadsResponse | BaseBuyOnlineParams;

export class CardPolyfill extends Emitter<string> {
    constructor (private container: Element) {
        super();
    }

    bind() {
        return this.on.apply(this, arguments);
    }

    unbind() {
        return this.off.apply(this, arguments);
    }

    show() {
        (this.container as any).style.display = '';
    }

    hide() {
        (this.container as any).style.display = 'hidden';
    }

    destroy(options?: DestroyOptions) {
        this.emit('destroy', options);
    }

    afterInit() {}

    getFrame() {}

    fadeInFrame() {}

    addTourToComparisonBasket(data: CompareTourData) {
        this.emit('addToCompare', { data: { tour: data } });
    }

    removeTourFromComparisonBasket(data: CompareTourData) {
        this.emit('removeFromCompare', { data: { tour: data } });
    }

    setWaitToCompareHint() {
    //
    }

    unsetWaitToCompareHint() {
    //
    }

    setRemoveFromCompareHint() {
        this.emit('changeMode', { mode: ComparisonMode.remove });
    }

    setAddToCompareHint() {
        this.emit('changeMode', { mode: ComparisonMode.add });
    }

    startSimilarSearch(data: TourCardParams) {
        this.emit('startSimilarSearch', { data: { card: this, cardOptions: data } });
    }

    sendReady(data: TourComparisonData) {
        // Уведомляем корзину тура о том, что карточка готова.
        this.emit('fulled', { data: { tour: data } });
    }

    fire(event: CardUserEvents, payload?: CardEventPayload) {
        switch (event) {
            case CardUserEvents.tourCard:
                this.emit('tourCard', {});
                break;
            case CardUserEvents.buyingClick:
                this.emit('buyingClick', {});
                break;
            case CardUserEvents.buyingSubmit:
                const request = payload as WrappedCreateClaimRequest | BaseBuyOnlineParams; 
                this.emit('buyingSubmit', { request });
                break;
            case CardUserEvents.buyingError:
                this.emit('buyingError', (payload as RequestErrorDescription));
                break;
            case CardUserEvents.bookingClick:
                this.emit('bookingClick', {});
                break;
            case CardUserEvents.bookingSubmit:
                // TODO selkin: сделать по-нормальному. кроме того, в leadTourDetails теперь больше данных
                const params = payload as SaveTourOrderData & LeadsResponse;
                const opts = {
                    'name'       : '',
                    'email'      : '',
                    'phone'      : '',
                    'comments'   : '',
                    'request'    : 0,
                    'source'     : 0,
                    'offer'      : 0,
                    'country'    : '',
                    'city'       : '',
                    'currency'   : '',
                    'office'     : 0,
                    'officeCity' : ''
                };
                if (params.request) {
                    opts['name']       = params.request.userName;
                    opts['email']      = params.request.email || opts.email;
                    opts['phone']      = params.request.phone || opts.phone;
                    opts['comments']   = params.request.comment || opts.comments;
                    opts['request']    = params.request.requestId;
                    opts['source']     = params.request.sourceId;
                    opts['offer']      = params.request.offerId;
                    opts['country']    = params.request.countryName;
                    opts['city']       = params.request.cityFromName;
                    opts['currency']   = params.request.currencyAlias;
                    opts['office']     = params.request.officeId;
                    opts['officeCity'] = params.cityName || opts.officeCity;
                } else {
                    opts['name']       = params.name;
                    opts['email']      = params.email;
                    opts['phone']      = params.phone;
                    opts['comments']   = params.requestInfo;
                    opts['request']    = params.leadTourDetails.tourRequestId || opts.request;
                    opts['source']     = params.leadTourDetails.tourSourceId || opts.source;
                    opts['offer']      = params.leadTourDetails.tourOfferId || opts.offer;
                    opts['country']    = params.leadTourDetails.countryToName || opts.country;
                    opts['city']       = params.leadTourDetails.departureCityName || opts.city;
                    opts['currency']   = params.leadTourDetails.currencyName || opts.currency;
                    opts['office']     = params.agencyOfficeId || opts.office;
                    opts['officeCity'] = params.agencyOfficeCity || opts.officeCity;
                }
                this.emit('bookingSubmit', opts);
                break;
            case CardUserEvents.bookingError:
                this.emit('bookingError', (payload as RequestErrorDescription));
                break;
            case CardUserEvents.hotelReviewsSelected:
                this.emit('hotelReviewsSelected', {});
                break;
            default:
                break;
        }
    }

}


export interface CompareTourData {
    requestId: number;
    sourceId: number;
    offerId: number;
    tourId: number;
}

export interface DestroyOptions {
    clearHash: boolean;
}
