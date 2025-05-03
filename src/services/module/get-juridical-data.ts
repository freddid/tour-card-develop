/* eslint-disable */
/* eslint-disable prettier/prettier */
import { getJuridicalData as _getJuridicalData } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetJuridicalData/GetJuridicalData';


export function getJuridicalData(): Promise<string> {
    return _getJuridicalData({})
        .then(resp => resp.agreementHTML)
        .catch(err => {
            console.error('getJuridicalData has failed!', err);
            throw err;
        });
}
