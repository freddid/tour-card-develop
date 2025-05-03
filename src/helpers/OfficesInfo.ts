/* eslint-disable */
/* eslint-disable prettier/prettier */
import { isUndefined } from 'lodash';

import { getOffices } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetOffices/GetOffices';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';
import {
    GetOfficesResponse,
    City,
    Office
} from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetOffices/GetOfficesResponse';

import { target } from 'sletat-api-services';


export interface OfficesState {
    cityId: string;
    officeId: string;
}


export class OfficesInfo {

    private _cities: Array<City>;
    private _offices: Array<Office>;

    public get cities(): Array<City> {
        return this._cities || [];
    }

    public get firstCity(): City {
        return this.cities[0];
    }

    public get hasCities(): boolean {
        return !!this._cities && !!this._cities.length;
    }

    public get onlyOneCity(): boolean {
        return this.cities.length === 1;
    }

    public get offices(): Array<Office> {
        return this._offices || [];
    }

    public get hasOffices(): boolean {
        return !!this._offices && !!this._offices.length;
    }

    public loadOffices(target: target): Promise<{}> {
        return new Promise((resolve, reject) => {
            getOffices({ target: target }, { protocol: Protocols.HTTPS })
                .then((response: GetOfficesResponse) => {
                    this._cities = response.cities.slice();
                    this._offices = response.offices.slice();
                    resolve();
                })
                .catch((err) => {
                    if (!!console && typeof console.error === 'function') {
                        console.error('OfficesInfo#loadOffices: ', err);
                        reject();
                    }
                });
        });
    }

    public hasOfficeWithId(officeId: number | string) {
        return !!this.getOfficeById(officeId);
    }

    public cityHasMoreThanOneOffice(cityId: number | string): boolean {
        return this.cityOffices(cityId).length > 1;
    }

    // Если cityId, то проверяет кол-во офисов для города, иначе проверяет общее кол-во офисов
    public onlyOneOffice(cityId?: number | string): boolean {
        cityId = !isUndefined(cityId) ? parseInt(String(cityId), 10) : '';
        const offices = !!cityId ? this.cityOffices(cityId) : this._offices;

        return !!offices && offices.length === 1;
    }

    public getFirstOffice(cityId?: number | string): Office | null {
        cityId = !isUndefined(cityId) ? parseInt(String(cityId), 10) : '';
        const offices = !!cityId ? this.cityOffices(cityId) : this._offices;

        return !!offices && !!offices.length ? offices[0] : null;
    }

    public cityOffices(cityId: string | number): Array<Office> {
        cityId = parseInt(String(cityId), 10);
        return this.offices.filter(item => item.city.id === cityId);
    }

    public getCityById(cityId: number | string): City | null {
        const cities = this.cities.filter(item => item.id === parseInt(String(cityId), 10));
        return cities.length ? cities[0] : null;
    }

    public getCityByOfficeId(officeId: number | string): City | null {
        const getCity = (cityName: string) => this.cities.filter(item => item.name === cityName)[0];
        const cities = this.offices
            .filter(item => item.id === parseInt(String(officeId), 10))
            .map(item => getCity(item.city.name));

        return !!cities.length ? cities[0] : null;
    }

    public getOfficeById(officeId: number | string): Office | null {
        const offices = this.offices.filter(item => item.id === parseInt(String(officeId), 10));
        return offices.length ? offices[0] : null;
    }
}
