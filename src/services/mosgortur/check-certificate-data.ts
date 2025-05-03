/* eslint-disable */
/* eslint-disable prettier/prettier */
import { CheckCertificateAsync } from 'sletat-api-services/lib/mosgortur';
import { CheckCertificateRequest } from 'sletat-api-services/lib/mosgortur/reguest';
import { CheckCertificateResponse } from 'sletat-api-services/lib/mosgortur/response';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { API_SLETAT_HOST_NAME } from '../../config/api-consts';
import { BuyOnlineStore } from '../../stores/buy-online';
import { CertificateDataStore } from '../../stores/buy-online/certificate-data';
import { MgtCertificateType } from '../../models/module';

export async function checkCertificateAsync(certificate: CertificateDataStore, buyOnlineStore: BuyOnlineStore): Promise<CheckCertificateResponse> {

    const certRequest = {
        certNumber: certificate.certificateNumber.value,
        certDate: certificate.issueDate.value,
        applicantFirstName: certificate.decantCyrillicFirstname.value,
        applicantLastName: certificate.decantCyrillicSurname.value,
        applicantMiddleName: certificate.decantCyrillicPatronymic.value,
        applicantSnils: certificate.snilsDeclarant.value,
    } as CheckCertificateRequest;

    const tourist = buyOnlineStore.touristsData[certificate.childrenIndex.value];
    if ((certificate.certificateType === MgtCertificateType.type2 || certificate.certificateType === MgtCertificateType.type3) 
        && tourist.IsAdult) {
        certRequest.applicantFirstName = tourist.cyrillicFirstNameFieldState.value;
        certRequest.applicantLastName = tourist.cyrillicSurnameFieldState.value;
        certRequest.applicantMiddleName = tourist.cyrillicPatronymicFieldState.value;
        certRequest.attendantFirstName = tourist.cyrillicFirstNameFieldState.value;
        certRequest.attendantLastName = tourist.cyrillicSurnameFieldState.value;
        certRequest.attendantMiddleName = tourist.cyrillicPatronymicFieldState.value;
        certRequest.attendantDateBirth = tourist.birthDateFieldState.value;
        certRequest.attendantSnils = certificate.snilsDeclarant.value;
    } else {
        certRequest.childFirstName = tourist.cyrillicFirstNameFieldState.value;
        certRequest.childLastName = tourist.cyrillicSurnameFieldState.value;
        certRequest.childMiddleName = tourist.cyrillicPatronymicFieldState.value;
        certRequest.childDateBirth = tourist.birthDateFieldState.value;
        certRequest.childSnils = certificate.snilsChildren.value;
    }

    if (certificate.isSupportSertificate.value) {
        const tourist = buyOnlineStore.touristsData[certificate.touristSupportIndex.value];
        certRequest.attendantFirstName = tourist.cyrillicFirstNameFieldState.value;
        certRequest.attendantLastName = tourist.cyrillicSurnameFieldState.value;
        certRequest.attendantMiddleName = tourist.cyrillicPatronymicFieldState.value;
        certRequest.attendantDateBirth = tourist.birthDateFieldState.value;
        certRequest.attendantSnils = certificate.snilsSupport.value;
    }

    return await CheckCertificateAsync(certRequest, API_SLETAT_HOST_NAME)
        .then(resp => resp)
        .catch(err => {
            console.error('checkCertificateAsync has failed!', err);
            return { errorMessage: 'Произошла ошибка. Повторите позже', isValid: false } as CheckCertificateResponse;
        });
}