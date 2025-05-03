/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { range } from 'lodash';
import { addDays } from 'date-fns';

import { AffiliateProgram } from 'sletat-api-services/lib/claims/createClaimExLite/request';
import { CreateClaimExLiteResponse } from 'sletat-api-services/lib/claims/createClaimExLite/response';
import { prepareFlightsToClaimRequest } from 'sletat-api-services/lib/claims/createClaimExLite/utils/flight-util';
import { PrepaymentType } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { parseDateString } from 'sletat-common-utils/lib/date';

import { CreateTourOfficeClaimResponse } from 'sletat-api-services/lib/claims/createTourOfficeClaim/response';
import { CustomerDataStore } from './customer-data';
import { TouristDataStore } from './tourist-data';
import {
  createClaimExLite,
  CreateClaimExLiteRequest,
  CustomerLite,
  GenderLite,
  TouristLite,
} from '../../services/claims/create-claim-ex-lite';
import { createTourOfficeClaim } from '../../services/claims/create-tour-office-claim';
import { updateClaim } from '../../services/claims/update-claim';
import { getJuridicalData } from '../../services/module/get-juridical-data';
import {
  BuyOnlineCreateClaimStatus,
  BuyOnlineSettings,
  ComputedPrepaymentSchema,
  Gender,
} from '../../models/buy-online';
import { formatDateDotted } from '../../utils/date';
// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { CLAIMS_HOST_NAME } from '../../config/api-consts';
import {
  ClaimKind,
  MODULE6_TARGET,
  MODULE_CLAIM_KIND_KEY,
  MODULE_TARGET_PARAM_KEY,
  TARGET,
} from '../../types-and-consts';
import { MainStore } from '../main';
import { MgtCertificateType, ModuleTypes } from '../../models/module';
import { CertificateDataStore } from './certificate-data';
import S from '../index';
import { checkCertificateAsync } from '../../services/mosgortur/check-certificate-data';
import { createTourOfficeClaimLetsFly } from '../../services/claims/create-tour-office-claim-lets-fly';

export enum Module5PrivacyPolicyLoadingStatus {
  Initial,
  Loading,
  Success,
  Failed,
}

export class BuyOnlineStore {
  private _mainStore: MainStore;

  buyOnlineSettings: BuyOnlineSettings = {
    priceModifierSchemeId: null,
    isTwoStepPayment: false,
    prepaymentSchemas: [],
  };

  customerData: CustomerDataStore;

  selectedPrepaymentSchemaId = -1;

  createClaimStatus = BuyOnlineCreateClaimStatus.Initial;

  createClaimErrorMessage: string | null = null;

  addCertificateErrorMessage: Map<number, string | null> = new Map([]);

  module5PrivacyPolicyDocumentLoadingStatus =
    Module5PrivacyPolicyLoadingStatus.Initial;

  module5PrivacyPolicyDocument = '';

  userComment = '';

  certificates: Map<number, Array<CertificateDataStore>> = new Map([]);

  private setInitialCreateClaimStatusTimer = 0;

  private CertificateType1FixedPrice = 40000;

  private CertificateType2and3FixedPrice = 71724;

  constructor(mainStore: MainStore) {
    makeAutoObservable(this);
    this._mainStore = mainStore;
    this.customerData = new CustomerDataStore();
  }

  async buyTourOnline(onSuccess: () => void): Promise<void> {
    this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Loading);
    try {
      const resp = await createClaimExLite(
        { target: this.mainStore.moduleTarget },
        this.buyOnlineRequest,
      );
      if (resp.operationStatus) onSuccess();
      await this.handleCreateClaimResponse(resp);
    } catch (err) {
      console.error('could not create claim ', err);
      this.handleErrorStatus(err);
    }
  }

  async buyTourOnlineTourOffice(onSuccess: () => void): Promise<void> {
    this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Loading);
    try {
      const resp = await createTourOfficeClaim(
        { target: this.mainStore.moduleTarget },
        this.buyOnlineRequest,
      );
      if (resp.operationStatus) onSuccess();
      await this.handleCreateTourOfficeClaimResponse(resp);
    } catch (err) {
      console.error('could not create claim to TourOffice', err);
      this.handleErrorStatus(err);
    }
  }

  async buyTourOnlineTourOfficeLetsFly(onSuccess: () => void): Promise<void> {
    this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Loading);
    try {
      const resp = await createTourOfficeClaimLetsFly(this.buyOnlineRequest);
      if (resp.operationStatus) onSuccess();
      await this.handleCreateTourOfficeClaimResponse(resp);
    } catch (err) {
      console.error('could not create LetsFly claim to TourOffice', err);
      this.handleErrorStatus(err);
    }
  }

  private async handleCreateClaimResponse(
    response: CreateClaimExLiteResponse,
  ): Promise<void> {
    if (this.buyOnlineSettings.isTwoStepPayment) {
      try {
        const updatedClaim = await updateClaim({
          claimId: response.claimIdentity,
          hasBeenViewedDate: new Date(),
        });

        if (this.isModule5) {
          this.setInitialCreateClaimStatus();
          this.updateWindowLocationWithClaimId(response.claimIdentity);
          return;
        }

        if (this.isModule6) {
          if (updatedClaim.operationStatus) {
            window.location.href = response.claimInfo.redirectToPaymentURL;
          }
        }
      } catch (err) {
        console.error('could not update claim ', err);
        this.handleErrorStatus(err);
      }
    } else {
      this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Success);
      this.setInitialCreateClaimStatus();
    }
  }

  private async handleCreateTourOfficeClaimResponse(
    response: CreateTourOfficeClaimResponse,
  ): Promise<void> {
    if (!response.operationStatus) {
      const err = new Error('Internal error');
      console.error('Create request err: ', err);
      this.handleErrorStatus(err);
      return;
    }

    if (this.buyOnlineSettings.isTwoStepPayment) {
      try {
        window.location.href = response.paymentUrl;
      } catch (err) {
        console.error('could not redirect to paymentUrl', err);
        this.handleErrorStatus(err);
      }
    } else {
      this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Success);
      this.setInitialCreateClaimStatus();
    }
  }

  async loadPrivacyPolicyDocument(): Promise<void> {
    this.setModule5PrivacyPolicyDocumentLoadingStatus(
      Module5PrivacyPolicyLoadingStatus.Loading,
    );
    try {
      const data = await getJuridicalData();
      // eslint-disable-next-line no-return-assign
      runInAction(() => (this.module5PrivacyPolicyDocument = data));
      this.setModule5PrivacyPolicyDocumentLoadingStatus(
        Module5PrivacyPolicyLoadingStatus.Success,
      );
    } catch (err) {
      this.setModule5PrivacyPolicyDocumentLoadingStatus(
        Module5PrivacyPolicyLoadingStatus.Failed,
      );
    }
  }

  setBuyOnlineSettings(settings: Partial<BuyOnlineSettings>): void {
    this.buyOnlineSettings = {
      ...this.buyOnlineSettings,
      ...settings,
    };
  }

  setSelectedPrepaymentSchemaId(id: number): void {
    this.selectedPrepaymentSchemaId = id;
  }

  setCreateClaimStatus(status: BuyOnlineCreateClaimStatus): void {
    this.createClaimStatus = status;
  }

  setModule5PrivacyPolicyDocumentLoadingStatus(
    status: Module5PrivacyPolicyLoadingStatus,
  ): void {
    this.module5PrivacyPolicyDocumentLoadingStatus = status;
  }

  setUserComment(input: string): void {
    this.userComment = input;
  }

  addCertificateData(touristKey: number): boolean {
    const now = new Date();
    if (now >= new Date(2025, 9, 31)) {
      this.addCertificateErrorMessage.set(
        touristKey,
        'Согласно правилам реализации сертификатов, дата окончания реализации 31 октября 2025 года.',
      );
      return false;
    }

    if (
      !!this.mainStore.checkOut &&
      this.mainStore.checkOut >= new Date(2025, 9, 31)
    ) {
      this.addCertificateErrorMessage.set(
        touristKey,
        'Согласно правилам реализации сертификатов, дата окончания тура должна быть не позднее 31.10.2025',
      );
      return false;
    }

    const tourist = S.buyOnlineStore.touristsData[touristKey];
    if (!tourist.formValidators.birthday.isTouchedAndValid()) {
      this.addCertificateErrorMessage.set(
        touristKey,
        'Чтобы применить сертификат, необходимо заполнить данные о дате рождения',
      );
      return false;
    }

    const today = new Date();

    const dateMinus3Year = new Date(
      today.getFullYear() - 3,
      today.getMonth(),
      today.getDate(),
    ).getTime();

    const kidsNOInfant =
      (parseDateString(
        tourist.birthDateFieldState.value,
        'DD.MM.YYYY',
      )?.getTime() ?? 0) < dateMinus3Year;

    if (!kidsNOInfant) {
      this.addCertificateErrorMessage.set(
        touristKey,
        'Сертификат нельзя добавить. Ребенку должно быть от 3 лет на дату бронирования тура.',
      );
      return false;
    }

    this.addCertificateErrorMessage.set(touristKey, '');

    const certificate = new CertificateDataStore(
      S.buyOnlineStore,
      S.mainStore.isNoInternationalPassportNeed,
      touristKey,
    );
    certificate.validateForm();

    certificate.childrenIndex.value = touristKey;
    certificate.issueDate.value = '17.01.2025';

    const prevCertificate = this.certificates.values().next()?.value;
    if (!!prevCertificate && !!prevCertificate[0]) {
      certificate.decantCyrillicFirstname =
        prevCertificate[0].decantCyrillicFirstname;
      certificate.decantCyrillicSurname =
        prevCertificate[0].decantCyrillicSurname;
      certificate.decantCyrillicPatronymic =
        prevCertificate[0].decantCyrillicPatronymic;
      certificate.snilsDeclarant = prevCertificate[0].snilsDeclarant;
    }

    this.certificates.set(
      touristKey,
      this.certificates.get(touristKey)?.concat(certificate) ?? [certificate],
    );
    return true;
  }

  async applyCertificateData(touristKey: number): Promise<void> {
    const cert = this.certificates.get(touristKey)?.[0];
    if (!cert) return;

    // if (this.allCertificates.filter(c => c.certificateNumber.value === cert.certificateNumber.value).length > 2){
    //     this.addCertificateErrorMessage.set(touristKey, 'Один сертификат нельзя применять больше 2 раз');
    //     return;
    // }

    if (
      this.allCertificates.filter(
        (c) =>
          c.certificateNumber.value === cert.certificateNumber.value &&
          c.snilsChildren.value === cert.snilsChildren.value,
      ).length > 1
    ) {
      this.addCertificateErrorMessage.set(
        touristKey,
        `Сертификат ${cert.certificateNumber.value} с СНИЛС ${cert.snilsChildren.value} уже есть в туре`,
      );
      return;
    }

    if (cert.attemptCheckCount < 2) {
      // Ну грустно, видимо что-то пошло не так.
      const checkCertResp = await checkCertificateAsync(cert, S.buyOnlineStore);
      cert.setIsChecked(
        checkCertResp.isValid,
        checkCertResp.isSimple,
        checkCertResp.errorMessage,
      );
      if (!checkCertResp.isValid) {
        this.addCertificateErrorMessage.set(
          touristKey,
          checkCertResp.errorMessage,
        );
        return;
      }
    }

    if (cert) {
      cert.setIsApplied(true);
      this.addCertificateErrorMessage.set(touristKey, '');
    }
  }

  removeCertificateData(touristKey: number): void {
    this.certificates.set(touristKey, []);
  }

  private handleErrorStatus(err: Error): void {
    this.createClaimErrorMessage = err.message;
    this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Failed);
    this.setInitialCreateClaimStatus();
  }

  private setInitialCreateClaimStatus(): void {
    if (this.setInitialCreateClaimStatusTimer) {
      clearTimeout(this.setInitialCreateClaimStatusTimer);
    }

    this.setInitialCreateClaimStatusTimer = window.setTimeout(() => {
      this.setCreateClaimStatus(BuyOnlineCreateClaimStatus.Initial);
    }, 5000);
  }

  get isMgtModule(): boolean {
    return this.mainStore.moduleType === ModuleTypes.mgt;
  }

  get isLetsFlyModule(): boolean {
    return this.mainStore.moduleType === ModuleTypes.letsFly;
  }

  get isPaymentWithCertificateAvailable(): boolean {
    return this.isMgtModule;
  }

  get numTourists(): number {
    return this._mainStore.numAdults + this._mainStore.numKids;
  }

  get touristsData(): Array<TouristDataStore> {
    return range(0, this.numTourists).map(
      (item) =>
        new TouristDataStore({
          touristId: item,
          mainStore: this.mainStore,
        }),
    );
  }

  get certificatesDiscount(): number {
    const today = new Date();
    const dateMinus3Year = new Date(
      today.getFullYear() - 3,
      today.getMonth(),
      today.getDate(),
    ).getTime();

    const adultsCountTourist =
      S.buyOnlineStore.touristsData.filter(
        (t) =>
          (parseDateString(
            t.birthDateFieldState.value,
            'DD.MM.YYYY',
          )?.getTime() ?? 0) < dateMinus3Year,
      )?.length ?? 0;

    const pricePerTourist = Math.floor(
      this.mainStore.fullTourPrice / adultsCountTourist,
    );

    /// Считаем скидки по туру для сертификатов 2-го и 3-го типа
    const appliedCertificatesType2and3 = this.allCertificates.filter(
      (cert) =>
        cert.isApplied &&
        (cert.certificateType === MgtCertificateType.type2 ||
          cert.certificateType === MgtCertificateType.type3),
    );
    const numKidsCertificatesType2and3 = appliedCertificatesType2and3.length;

    // Каждый сертификат ребёнка * на (цену за человека старше 3х лет, но не больше certificateFixedPrice)
    let maxDiscount =
      numKidsCertificatesType2and3 *
      Math.min(this.CertificateType2and3FixedPrice, pricePerTourist);
    // Добавляем скидку за сопровождающих. Скидка не может быть больше суммы на 1 человека
    const supportTouristType2and3 = appliedCertificatesType2and3
      .filter((c) => c.isSupportSertificate.value)
      .reduce(
        (acc, c) =>
          acc.set(
            c.touristSupportIndex.value,
            (acc.get(c.touristSupportIndex.value) || 0) + 1,
          ),
        new Map<number, number>(),
      );
    supportTouristType2and3.forEach(() => {
      maxDiscount += Math.min(
        this.CertificateType2and3FixedPrice,
        pricePerTourist,
      );
    });

    /// Считаем скидки по туру для сертификатов 1-го типа
    const appliedCertificatesType1 = this.allCertificates.filter(
      (cert) =>
        cert.isApplied && cert.certificateType === MgtCertificateType.type1,
    );
    const numKidsCertificatesType1 = appliedCertificatesType1.length;

    // Каждый сертификат ребёнка * на (цену за человека старше 3х лет, но не больше certificateFixedPrice)
    maxDiscount +=
      numKidsCertificatesType1 *
      Math.min(this.CertificateType1FixedPrice, pricePerTourist);

    // Добавляем скидку за сопровождающих. Скидка не может быть больше суммы на 1 человека
    const supportTouristType1 = appliedCertificatesType1
      .filter((c) => c.isSupportSertificate.value)
      // Проверяем, что нет сопровождающих туристов для которых применили сертификаты типа 2
      .filter(
        (c) =>
          !appliedCertificatesType2and3.some(
            (t) => t.touristSupportIndex === c.touristSupportIndex,
          ),
      )
      .reduce(
        (acc, c) =>
          acc.set(
            c.touristSupportIndex.value,
            (acc.get(c.touristSupportIndex.value) || 0) + 1,
          ),
        new Map<number, number>(),
      );

    supportTouristType1.forEach(() => {
      maxDiscount += Math.min(this.CertificateType1FixedPrice, pricePerTourist);
    });

    return Math.floor(Math.min(maxDiscount, this.mainStore.fullTourPrice - 1));
  }

  get computedPrepaymentSchemas(): Array<ComputedPrepaymentSchema> {
    const computeAdvance = (value: number) =>
      Math.round(value * this.mainStore.fullTourPrice);
    const getPercentage = (value: number) => Math.round(value * 100);

    return toJS(this.buyOnlineSettings.prepaymentSchemas)
      .filter(
        (schema) =>
          schema.minPrice <= this.mainStore.fullTourPrice &&
          schema.maxPrice >= this.mainStore.fullTourPrice,
      )
      .map((schema) => ({
        advance:
          schema.prepaymentType === PrepaymentType.percent
            ? computeAdvance(schema.value)
            : schema.value,
        percents:
          schema.prepaymentType === PrepaymentType.percent
            ? getPercentage(schema.value)
            : null,
        daysToPay: schema.daysToPay,
        type: schema.prepaymentType,
      }))
      .sort((a, b) => {
        return computeAdvance(a.advance) - computeAdvance(b.advance);
      });
  }

  get offerLink(): string {
    return `//${CLAIMS_HOST_NAME}/docs/offer.html?data=${encodeURIComponent(
      JSON.stringify({
        Host: window.location.hostname,
        Target: this.mainStore.moduleTarget,
        CustomerData: {
          Fio: this.customerData.fullName,
          Phone: this.customerData.phoneFieldState.value,
          Email: this.customerData.emailFieldState.value,
        },
        Tourists: this.touristsData.map((tourist) => {
          return {
            Fio: tourist.fullName,
            Passport: `${tourist.passportSeriesFieldState.value} ${tourist.passportNumberFieldState.value}`,
            BirthDate: tourist.birthDateFieldState.value,
          };
        }),
      }),
    )}`;
  }

  get allCertificates(): Array<CertificateDataStore> {
    const arr: Array<CertificateDataStore> = [];
    this.certificates.forEach((certs) => {
      certs.forEach((cert) => {
        arr.push(cert);
      });
    });
    return arr;
  }

  private get buyOnlineRequest(): CreateClaimExLiteRequest {
    const { selectedFlight } = S.flightOfferStore;
    const request: CreateClaimExLiteRequest = {
      sourceId: this.mainStore.tourSearchParams.sourceId,
      offerId: this.mainStore.tourSearchParams.offerId,
      requestId: this.mainStore.tourSearchParams.requestId,
      initialURL: this.initialURL,
      affiliateProgram: AffiliateProgram.none,
      customer: this.mapCustomerData(this.customerData),
      tourists: this.mapTouristsData(this.touristsData),
      comment: this.userComment,
      customInfo: '',
      host: window.location.hostname,
      checkCacheForPrice: true,
      aviaFlightsPackageId: selectedFlight?.flightsPackageId ?? 0,
      aviaFlightsSurcharge: selectedFlight?.surchargeAmount
        ? Math.ceil(selectedFlight?.surchargeAmount)
        : 0,
      aviaFlightsSurchargeCurrencyId: selectedFlight?.surchargeCurrencyId,
      priceTouristSaw: S.mainStore.fullTourPrice,
      aviaFlights: selectedFlight
        ? prepareFlightsToClaimRequest([selectedFlight.to, selectedFlight.from])
        : [],
      includedServices: S.includedServicesStore.included,
    };

    if (this.isPaymentWithCertificateAvailable) {
      request.comment = `${this.userComment} ${
        // eslint-disable-next-line no-nested-ternary
        this.allCertificates.some((c) => !c.isChecked)
          ? '| Не все сертификаты прошли проверку'
          : this.allCertificates.some((c) => c.isSimpleCheck)
          ? '| Cертификаты были частично проверены автоматически'
          : '| Cертификаты были полностью проверены автоматически'
      }`;
      request.customInfo = `{"MGTCertificates":${JSON.stringify(
        JSON.stringify(this.allCertificates.map((c) => c.toJsonObject)),
      )}}`;
      request.discountAmount = this.certificatesDiscount;
    }

    if (this.buyOnlineSettings.priceModifierSchemeId) {
      request.pricingSchemeId = this.buyOnlineSettings.priceModifierSchemeId;
    }

    const selectedPrepaymentSchema =
      this.computedPrepaymentSchemas[this.selectedPrepaymentSchemaId];

    if (selectedPrepaymentSchema) {
      request.prePayment = selectedPrepaymentSchema.advance;
      request.toPayBefore = formatDateDotted(
        addDays(new Date(), selectedPrepaymentSchema.daysToPay),
      );
    }

    return request;
  }

  private get isModule5(): boolean {
    return this.mainStore.moduleTarget === TARGET;
  }

  private get isModule6(): boolean {
    return this.mainStore.moduleTarget === MODULE6_TARGET;
  }

  private get mainStore(): MainStore {
    return this._mainStore;
  }

  private get initialURL(): string {
    if (this.isModule5) {
      return String(window.location);
    }

    const claimKind = this.buyOnlineSettings.isTwoStepPayment
      ? ClaimKind.Online
      : ClaimKind.FromUrl;

    return (
      `${window.location.origin}${window.location.pathname}` +
      `?${MODULE_TARGET_PARAM_KEY}=${MODULE6_TARGET}` +
      `&${MODULE_CLAIM_KIND_KEY}=${claimKind}`
    );
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

  private mapCustomerData(customerData: CustomerDataStore): CustomerLite {
    const customer: CustomerLite = {
      fullName: customerData.fullName,
      email: customerData.emailFieldState.value,
      phone: customerData.phoneFieldState.value,
      address: customerData.addressFieldState.value,
      passport: `${customerData.passportSeriesFieldState.value} ${customerData.passportNumberFieldState.value}`,
      passportIssuedBy: customerData.passportIssuedByFieldState.value,
    };
    const passportIssuedWhen = parseDateString(
      customerData.passportIssuedWhenFieldState.value,
      'DD.MM.YYYY',
    );

    if (passportIssuedWhen) {
      customer.passportIssuedWhen = passportIssuedWhen;
    }

    return customer;
  }

  private mapTouristsData(
    touristsData: Array<TouristDataStore>,
  ): Array<TouristLite> {
    return touristsData.map((touristStore) => {
      const tourist: TouristLite = {
        passportSeries: touristStore.passportSeriesFieldState.value || '',
        passportNumber: touristStore.passportNumberFieldState.value || '',
        passportIssuedBy: touristStore.passportIssuedByFieldState.value,
        isChild: touristStore.isKid,
      };

      if (S.mainStore.isNoInternationalPassportNeed) {
        tourist.surname = touristStore.cyrillicSurnameFieldState.value || '';
        tourist.name = touristStore.cyrillicFirstNameFieldState.value || '';
        tourist.patronymic =
          touristStore.cyrillicPatronymicFieldState.value || '';
      } else {
        tourist.surname = touristStore.surnameFieldState.value || '';
        tourist.name = touristStore.firstNameFieldState.value || '';
      }

      const birthday = parseDateString(
        touristStore.birthDateFieldState.value,
        'DD.MM.YYYY',
      );
      const passportIssuedWhen = parseDateString(
        touristStore.passportIssuedWhenFieldState.value,
        'DD.MM.YYYY',
      );
      const passportValidUntil = touristStore.passportValidUntilFieldState
        ? parseDateString(
            touristStore.passportValidUntilFieldState.value,
            'DD.MM.YYYY',
          )
        : null;

      if (birthday) {
        tourist.birthday = birthday;
      }

      if (passportIssuedWhen) {
        tourist.passportIssuedWhen = passportIssuedWhen;
      }

      if (passportValidUntil) {
        tourist.passportValidUntil = passportValidUntil;
      }

      if (touristStore.gender !== Gender.unknown) {
        tourist.gender = touristStore.gender as GenderLite;
      }

      return tourist as TouristLite;
    });
  }
}
