/* eslint-disable */
/* eslint-disable prettier/prettier */
import { map } from 'lodash';

import { Customer, Tourist } from './BuyOnlineForm';
import { CLAIMS_HOST_NAME } from '../../config/api-consts/index';


interface LinkData {
    Host: string;
    CustomerData: {
        Fio: string;
        Passport: string;
        PassportSeries: string;
        PassportEmission: string;
        Address: string;
        Phone: string;
        Email: string
    };
    Tourists: Array<{
        Fio: string;
        Passport: string;
        BirthDate: string;
    }>;
    target?: string;
}

export function getOfferLink(customer: Customer, tourists: Array<Tourist>, target?: string) {
    const params: LinkData = {
        Host: window.location.hostname,
        CustomerData: {
            Fio: customer.fio,
            Passport: `${customer.passportSeries || ''} ${customer.passportNumber}`,
            PassportSeries: customer.passportSeries || '',
            PassportEmission: `${customer.issuedBy} ${customer.passportValidFrom ? formatDate(customer.passportValidFrom) : ''}`,
            Address: customer.address,
            Phone: customer.phone,
            Email: customer.email
        },
        Tourists: map(tourists, (tourist: Tourist) => {
            return {
                Fio: `${tourist.secondName} ${tourist.firstName}`,
                Passport: `${tourist.passportSeries || ''} ${tourist.passportNumber}`,
                BirthDate: tourist.birthdate ? formatDate(tourist.birthdate) : ''
            };
        })
    };
    if (target) {
        params.target = target;
    }
    return `//${CLAIMS_HOST_NAME}/docs/offer.html?data=${encodeURIComponent(JSON.stringify(params))}`;
}

function formatDate(date: Date): string {
    let day: any = date.getDate();
    day = day < 10 ? `0${day}` : String(day);

    let month: any = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : String(month);

    return `${day}.${month}.${date.getFullYear()}`;
}
