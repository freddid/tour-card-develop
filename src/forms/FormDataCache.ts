/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as localForage from 'localforage';
import { pick } from 'lodash';
import { Customer } from 'sletat-api-services/lib/claims/models/create-claim';



export interface BuyOnlineFormCachedData {
    customer: Customer;
}

export interface TourOrderFormCachedData {
    name: string;
    email: string;
    phone: string;
    cityId?: string;
    officeId?: string;
}

abstract class BaseFormCachedData {
    protected cachedData: any;

    loadCachedData(): Promise<any> {
        return new Promise((resolve, reject) => {
            localForage.getItem(this.getKeyName(), (err, value) => {
                if (!!err) {
                    reject(err);
                }
                this.setCachedData(value);
                resolve();
            });
        });
    }

    protected abstract getKeyName(): string;
    protected abstract setCachedData(data: any): void;
}

export class BuyOnlineFormCache extends BaseFormCachedData {
    private static KEY_NAME = 'buy-online-form';

    static saveFormData(formData: any) {
        localForage.setItem(BuyOnlineFormCache.KEY_NAME, {
            customer: pick(formData.customer, [
                'fio', 'email', 'phone', 'passportSeries', 'passportNumber', 'passportValidFrom', 'address', 'issuedBy'])
        });
    }

    get customer(): Customer {
        return !!this.cachedData ? this.cachedData.customer : null;
    }

    protected getKeyName() {
        return BuyOnlineFormCache.KEY_NAME;
    }

    protected setCachedData(data: any) {
        this.cachedData = (data || {}) as BuyOnlineFormCachedData;
    }
}

export class TourOrderFormCache extends BaseFormCachedData {
    private static KEY_NAME = 'tour-order-form';

    static saveFormData(formData: any) {
        localForage.setItem(
            TourOrderFormCache.KEY_NAME,
            pick(formData, ['name', 'email', 'phone', 'cityId', 'officeId'])
        );
    }

    get name(): string {
        return this.cachedData.name || '';
    }

    get email(): string {
        return this.cachedData.email || '';
    }

    get phone(): string {
        return this.cachedData.phone || '';
    }

    get cityId(): string {
        return this.cachedData.cityId || null;
    }

    get officeId(): string {
        return this.cachedData.officeId || null;
    }

    protected setCachedData(data: any) {
        this.cachedData = (data || {}) as TourOrderFormCachedData;
    }

    protected getKeyName() {
        return TourOrderFormCache.KEY_NAME;
    }
}
