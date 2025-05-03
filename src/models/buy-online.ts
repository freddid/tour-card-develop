import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';
import { ComposeValidator } from 'sletat-uikit2/dist/js/validators/utils/compose';
import { PrepaymentSchema, PrepaymentType } from 'sletat-api-services';

export enum Gender {
  unknown = 0,
  male = 1,
  female = 2,
}

export enum BuyOnlineCreateClaimStatus {
  Initial = 'initial',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

export interface FormFieldState<T> {
  value: T;
  isTouched: boolean;
}

export interface ValidationStatus {
  isValidAndTouched: boolean;
  errorMessage: string;
  isValid?: boolean;
}

export interface CustomerFormFieldsValidators {
  firstName: FieldValidator;
  surname: FieldValidator;
  patronymic: FieldValidator;
  phone: FieldValidator;
  email: FieldValidator;
  address: FieldValidator;
  passportSeries: FieldValidator;
  passportNumber: FieldValidator;
  passportIssuedBy: FieldValidator;
  passportIssuedWhen: ComposeValidator;
  isAgreeWithOffer: FieldValidator;
}

export interface CertificateDataValidators {
  snilsChildren: FieldValidator;
  snilsDeclarant: FieldValidator;
  snilsSupport: FieldValidator;
  certificateNumber: FieldValidator;
  issueDate: FieldValidator;
  cyrillicFirstname: FieldValidator;
  cyrillicSurname: FieldValidator;
  cyrillicPatronymic: FieldValidator;
}

export interface TouristFormFieldsValidators {
  firstName: FieldValidator;
  surname: FieldValidator;
  cyrillicFirstName: FieldValidator;
  cyrillicSurname: FieldValidator;
  cyrillicPatronymic: FieldValidator;
  birthday: ComposeValidator;
  gender: FieldValidator;
  passportSeries: FieldValidator;
  passportNumber: FieldValidator;
  passportIssuedBy: FieldValidator;
  passportIssuedWhen: ComposeValidator;
  passportValidUntil?: ComposeValidator;
}

// Нужно для скрытия полей при дублировании данных заказчика для 1-го туриста.
export interface FirstTouristsFieldsVisibility {
  isFullNameVisible: boolean;
  isPassportVisible: boolean;
  isPassportIssuedByVisible: boolean;
  isPassportIssuedWhenVisible: boolean;
}

export interface CustomerFieldsMaskCheckers {
  isIssuedWhenDateChangedToMin: boolean;
}

export interface TouristFieldsMaskCheckers {
  isIssuedWhenDateChangedToMin: boolean;
}

export interface BuyOnlineSettings {
  priceModifierSchemeId: string | null;
  isTwoStepPayment: boolean;
  prepaymentSchemas: Array<PrepaymentSchema>;
}

export interface ComputedPrepaymentSchema {
  advance: number;
  percents: number | null;
  type: PrepaymentType;
  daysToPay: number;
}

export interface TourSearchParams {
  requestId: number;
  sourceId: number;
  offerId: number;
}

export interface BaseBuyOnlineParams {
  amount: number;
  country: string;
  townFrom: string;
}

export enum FormSubmissionStatus {
  initial,
  pending,
  success,
  fail,
}

export interface InitialFormValidatorsParams {
  isBirthCertificateNeeded?: boolean;
  isRequiredPatronymic?: boolean;
}
