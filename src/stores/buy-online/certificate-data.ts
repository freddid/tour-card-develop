/* eslint-disable consistent-return */
import {
  getCustomValidator,
  getRequiredValidator,
} from 'sletat-uikit2/dist/js/validators';
import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';
import { makeAutoObservable } from 'mobx';
import { BuyOnlineStore } from '.';
import {
  CertificateDataValidators,
  FormFieldState,
  ValidationStatus,
} from '../../models/buy-online';
import { getErrorMessage } from '../../utils/validator';
import { MgtCertificateType } from '../../models/module';
import {
  MAX_KID_AGE,
  MAX_MGT_AGE_FOR_CERT_STARTS_WITH_TWO,
} from '../../consts/ageConstants';

export class CertificateDataStore {
  private _buyOnlineStore: BuyOnlineStore;

  private _needRussianPassport: boolean;

  touristId: number | null = null;

  constructor(
    buyOnlineStore: BuyOnlineStore,
    needRussianPassport: boolean,
    touristId: number,
  ) {
    makeAutoObservable(this);
    this._buyOnlineStore = buyOnlineStore;
    this._needRussianPassport = needRussianPassport;
    this.touristId = touristId;
  }

  isApplied = false;

  isChecked = false;

  isSimpleCheck = false;

  attemptCheckCount = 0;

  isLoading = false;

  certificateNumber: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  issueDate: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  snilsChildren: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  snilsDeclarant: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  snilsSupport: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  decantCyrillicFirstname: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  decantCyrillicSurname: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  decantCyrillicPatronymic: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  childrenIndex: FormFieldState<number> = {
    isTouched: false,
    value: 0,
  };

  touristSupportIndex: FormFieldState<number> = {
    isTouched: false,
    value: 0,
  };

  isSupportSertificate: FormFieldState<boolean> = {
    isTouched: false,
    value: false,
  };

  formValidators: CertificateDataValidators = this.initialFormValidators;

  get certificateNumberValidation(): ValidationStatus {
    this.validateCertificateNumber(
      this.certificateNumber.value,
      this.certificateNumber.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.certificateNumber),
      isValid: this.formValidators.certificateNumber.isValid(),
      isValidAndTouched:
        this.formValidators.certificateNumber.isTouchedAndValid(),
    };
  }

  get issueDateValidation(): ValidationStatus {
    this.validateIssueDate(this.issueDate.value, this.issueDate.isTouched);
    return {
      errorMessage: getErrorMessage(this.formValidators.issueDate),
      isValid: this.formValidators.issueDate.isValid(),
      isValidAndTouched: this.formValidators.issueDate.isTouchedAndValid(),
    };
  }

  get snilsChildrenValidation(): ValidationStatus {
    this.validateSnilsChildren(
      this.snilsChildren.value,
      this.snilsChildren.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.snilsChildren),
      isValid: this.formValidators.snilsChildren.isValid(),
      isValidAndTouched: this.formValidators.snilsChildren.isTouchedAndValid(),
    };
  }

  get snilsDeclarantValidation(): ValidationStatus {
    this.validateSnilsDeclarant(
      this.snilsDeclarant.value,
      this.snilsDeclarant.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.snilsDeclarant),
      isValid: this.formValidators.snilsDeclarant.isValid(),
      isValidAndTouched: this.formValidators.snilsDeclarant.isTouchedAndValid(),
    };
  }

  get snilsSupportValidation(): ValidationStatus {
    this.validateSnilsSupport(
      this.snilsSupport.value,
      this.snilsSupport.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.snilsSupport),
      isValid: this.formValidators.snilsSupport.isValid(),
      isValidAndTouched: this.formValidators.snilsSupport.isTouchedAndValid(),
    };
  }

  get cyrillicFirstnameValidation(): ValidationStatus {
    this.validateСyrillicFirstname(
      this.decantCyrillicFirstname.value,
      this.decantCyrillicFirstname.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.cyrillicFirstname),
      isValid: this.formValidators.cyrillicFirstname.isValid(),
      isValidAndTouched:
        this.formValidators.cyrillicFirstname.isTouchedAndValid(),
    };
  }

  get cyrillicSurnameValidation(): ValidationStatus {
    this.validateСyrillicSurname(
      this.decantCyrillicSurname.value,
      this.decantCyrillicSurname.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.cyrillicSurname),
      isValid: this.formValidators.cyrillicSurname.isValid(),
      isValidAndTouched:
        this.formValidators.cyrillicSurname.isTouchedAndValid(),
    };
  }

  get cyrillicPatronymicValidation(): ValidationStatus {
    this.validateСyrillicPatronymic(
      this.decantCyrillicPatronymic.value,
      this.decantCyrillicPatronymic.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.cyrillicPatronymic),
      isValid: this.formValidators.cyrillicPatronymic.isValid(),
      isValidAndTouched:
        this.formValidators.cyrillicPatronymic.isTouchedAndValid(),
    };
  }

  get isFormValidAndTouched(): boolean {
    return (
      this.snilsDeclarantValidation.isValidAndTouched &&
      this.certificateNumberValidation.isValidAndTouched &&
      (!this._needRussianPassport ||
        this.certificateType === MgtCertificateType.type2 ||
        this.certificateType === MgtCertificateType.type3 ||
        (this.snilsChildrenValidation.isValidAndTouched &&
          this.cyrillicFirstnameValidation.isValidAndTouched &&
          this.cyrillicSurnameValidation.isValidAndTouched &&
          this.cyrillicPatronymicValidation.isValidAndTouched))
    );
  }

  get isFormValid(): boolean {
    return (
      !!this.snilsDeclarantValidation.isValid &&
      !!this.certificateNumberValidation.isValid &&
      !!(
        !this._needRussianPassport ||
        this.certificateType === MgtCertificateType.type2 ||
        this.certificateType === MgtCertificateType.type3 ||
        (!!this.snilsChildrenValidation.isValid &&
          !!this.cyrillicFirstnameValidation.isValid &&
          !!this.cyrillicSurnameValidation.isValid &&
          !!this.cyrillicPatronymicValidation.isValid)
      )
    );
  }

  get isLoadingState(): boolean {
    return this.isLoading;
  }

  get toJsonObject(): any {
    return {
      CertificateNumber: this.certificateNumber.value,
      IssueDate: this.issueDate.value,
      ChildrenSnils: this.snilsChildren.value,
      ChildrenFirstname:
        this._buyOnlineStore.touristsData[this.childrenIndex.value]
          .cyrillicFirstNameFieldState.value,
      ChildrenSurname:
        this._buyOnlineStore.touristsData[this.childrenIndex.value]
          .cyrillicSurnameFieldState.value,
      ChildrenPatronymic:
        this._buyOnlineStore.touristsData[this.childrenIndex.value]
          .cyrillicPatronymicFieldState.value,
      ChildrenPassportNumber:
        this._buyOnlineStore.touristsData[this.childrenIndex.value]
          .passportNumberFieldState.value,
      ChildrenPassportSeries:
        this._buyOnlineStore.touristsData[this.childrenIndex.value]
          .passportSeriesFieldState.value,
      DecantSnils: this.snilsDeclarant.value,
      DecantFirstname: this.decantCyrillicFirstname.value,
      DecantSurname: this.decantCyrillicSurname.value,
      DecantPatronymic: this.decantCyrillicPatronymic.value,
      IsSupport: this.isSupportSertificate.value,
      SupportSnils: this.isSupportSertificate.value
        ? this.snilsSupport.value
        : '',
      SupportFirstname: this.isSupportSertificate.value
        ? this._buyOnlineStore.touristsData[this.touristSupportIndex.value]
            .cyrillicFirstNameFieldState.value
        : '',
      SupportSurname: this.isSupportSertificate.value
        ? this._buyOnlineStore.touristsData[this.touristSupportIndex.value]
            .cyrillicSurnameFieldState.value
        : '',
      SupportPatronymic: this.isSupportSertificate.value
        ? this._buyOnlineStore.touristsData[this.touristSupportIndex.value]
            .cyrillicPatronymicFieldState.value
        : '',
      SupportPassportNumber: this.isSupportSertificate.value
        ? this._buyOnlineStore.touristsData[this.touristSupportIndex.value]
            .passportNumberFieldState.value
        : '',
      SupportPassportSeries: this.isSupportSertificate.value
        ? this._buyOnlineStore.touristsData[this.touristSupportIndex.value]
            .passportSeriesFieldState.value
        : '',
    };
  }

  get certificateType(): MgtCertificateType {
    if (this.certificateNumber?.value.startsWith(MgtCertificateType.type1))
      return MgtCertificateType.type1;

    if (this.certificateNumber?.value.startsWith(MgtCertificateType.type2))
      return MgtCertificateType.type2;

    if (this.certificateNumber?.value.startsWith(MgtCertificateType.type3))
      return MgtCertificateType.type3;

    return MgtCertificateType.type1;
  }

  setCertificateNumber(data: Partial<FormFieldState<string>>): void {
    this.certificateNumber = {
      ...this.certificateNumber,
      ...data,
    };
  }

  setIssueDate(data: Partial<FormFieldState<string>>): void {
    this.issueDate = {
      ...this.issueDate,
      ...data,
    };
  }

  setSnilsChildren(data: Partial<FormFieldState<string>>): void {
    this.snilsChildren = {
      ...this.snilsChildren,
      ...data,
    };
  }

  setSnilsDeclarant(data: Partial<FormFieldState<string>>): void {
    this.snilsDeclarant = {
      ...this.snilsDeclarant,
      ...data,
    };
  }

  setSnilsSupport(data: Partial<FormFieldState<string>>): void {
    this.snilsSupport = {
      ...this.snilsSupport,
      ...data,
    };
  }

  setDecantFirstname(data: Partial<FormFieldState<string>>): void {
    this.decantCyrillicFirstname = {
      ...this.decantCyrillicFirstname,
      ...data,
    };
  }

  setDecantSurname(data: Partial<FormFieldState<string>>): void {
    this.decantCyrillicSurname = {
      ...this.decantCyrillicSurname,
      ...data,
    };
  }

  setDecantPatronymic(data: Partial<FormFieldState<string>>): void {
    this.decantCyrillicPatronymic = {
      ...this.decantCyrillicPatronymic,
      ...data,
    };
  }

  setTouristSupportIndex(data: Partial<FormFieldState<number>>): void {
    this.touristSupportIndex = {
      ...this.touristSupportIndex,
      ...data,
    };
  }

  setIsSupportSertificate(data: Partial<FormFieldState<boolean>>): void {
    this.isSupportSertificate = {
      ...this.isSupportSertificate,
      ...data,
    };
  }

  setIsApplied(isApplied: boolean): void {
    this.isApplied = isApplied;
  }

  setIsChecked(
    isChecked: boolean,
    isSimple: boolean,
    errorMessage: string | null,
  ): void {
    this.attemptCheckCount = isChecked ? 0 : this.attemptCheckCount + 1;
    if ((errorMessage?.indexOf('сертификат уже захолдирован') ?? 0) > 0)
      this.attemptCheckCount = Math.max(0, this.attemptCheckCount - 1);
    this.isChecked = isChecked;
    this.isSimpleCheck = isSimple;
  }

  validateForm(): void {
    this.validateCertificateNumber(
      this.certificateNumber.value,
      this.certificateNumber.isTouched,
    );
    this.validateSnilsChildren(
      this.snilsChildren?.value ?? '',
      this.snilsChildren?.isTouched ?? false,
    );
    this.validateSnilsDeclarant(
      this.snilsDeclarant.value,
      this.snilsDeclarant.isTouched,
    );
    this.validateSnilsSupport(
      this.snilsSupport.value,
      this.snilsSupport.isTouched,
    );
    this.validateСyrillicFirstname(
      this.decantCyrillicFirstname.value,
      this.decantCyrillicFirstname.isTouched,
    );
    this.validateСyrillicSurname(
      this.decantCyrillicSurname.value,
      this.decantCyrillicSurname.isTouched,
    );
    this.validateСyrillicPatronymic(
      this.decantCyrillicPatronymic.value,
      this.decantCyrillicPatronymic.isTouched,
    );
  }

  validateCertificateNumber(value: string, isTouched?: boolean): void {
    this.formValidators!.certificateNumber.validate(value, isTouched);
  }

  validateIssueDate(value: string, isTouched?: boolean): void {
    this.formValidators!.issueDate.validate(value, isTouched);
  }

  validateSnilsChildren(value: string, isTouched?: boolean): void {
    this.formValidators!.snilsChildren.validate(value, isTouched);
  }

  validateSnilsDeclarant(value: string, isTouched?: boolean): void {
    this.formValidators!.snilsDeclarant.validate(value, isTouched);
  }

  validateSnilsSupport(value: string, isTouched?: boolean): void {
    this.formValidators!.snilsSupport.validate(value, isTouched);
  }

  validateСyrillicFirstname(value: string, isTouched?: boolean): void {
    this.formValidators!.cyrillicFirstname.validate(value, isTouched);
  }

  validateСyrillicSurname(value: string, isTouched?: boolean): void {
    this.formValidators!.cyrillicSurname.validate(value, isTouched);
  }

  validateСyrillicPatronymic(value: string, isTouched?: boolean): void {
    this.formValidators!.cyrillicPatronymic.validate(value, isTouched);
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  // eslint-disable-next-line class-methods-use-this
  private get initialFormValidators(): CertificateDataValidators {
    return {
      snilsChildren: new FieldValidator([
        getCustomValidator(
          /^\d{3}-\d{3}-\d{3}-\d{2}$/i,
          'Введен некорректный СНИЛС',
        ),
        getRequiredValidator('Поле является обязательным'),
      ]),
      snilsDeclarant: new FieldValidator([
        getCustomValidator(
          /^\d{3}-\d{3}-\d{3}-\d{2}$/i,
          'Введен некорректный СНИЛС',
        ),
        getRequiredValidator('Поле является обязательным'),
      ]),
      snilsSupport: new FieldValidator([
        getCustomValidator(
          /^\d{3}-\d{3}-\d{3}-\d{2}$/i,
          'Введен некорректный СНИЛС',
        ),
        getRequiredValidator('Поле является обязательным'),
      ]),
      certificateNumber: new FieldValidator(
        [
          getCustomValidator(() => {
            if (this.touristId === null) return false;
            const age = this._buyOnlineStore.touristsData[this.touristId].Age;
            if (
              (this.certificateNumber?.value.startsWith(
                MgtCertificateType.type2,
              ) ||
                this.certificateNumber?.value.startsWith(
                  MgtCertificateType.type3,
                )) &&
              age &&
              age > MAX_MGT_AGE_FOR_CERT_STARTS_WITH_TWO + 1
            ) {
              return false;
            }

            return true;
          }, `Сертификат с таким номером можно добавить только туристу до ${MAX_MGT_AGE_FOR_CERT_STARTS_WITH_TWO} лет включительно`),
          getCustomValidator(() => {
            if (this.touristId === null) return false;
            const age = this._buyOnlineStore.touristsData[this.touristId].Age;
            if (
              this.certificateNumber?.value.startsWith(
                MgtCertificateType.type1,
              ) &&
              age &&
              age > MAX_KID_AGE
            ) {
              return false;
            }

            return true;
          }, 'Сертификат с таким номером можно добавить только ребенку. Добавьте сертификат к данным ребенка и внесите данные сопровождающего, если они есть в сертификате.'),
          getCustomValidator(
            /^\d{1}\-\d{6}\/\d{2}$/i,
            'Введен некорректный номер сертификата',
          ),
          getRequiredValidator('Поле является обязательным'),
        ].filter(Boolean),
      ),
      issueDate: new FieldValidator([
        getCustomValidator(
          /^[\d]{2}\.[\d]{2}\.[\d]{4}$/,
          'Укажите корректную дату выдачи сертификата в формате: ДД.ММ.ГГГГ',
        ),
        getRequiredValidator('Поле является обязательным'),
      ]),
      cyrillicFirstname: new FieldValidator([
        getCustomValidator(/^[а-яА-ЯёЁ]+$/i, 'Введено некорректное имя'),
        getRequiredValidator('Поле является обязательным'),
      ]),
      cyrillicSurname: new FieldValidator([
        getCustomValidator(/^[а-яА-ЯёЁ]+$/i, 'Введена некорректная фамилия'),
        getRequiredValidator('Поле является обязательным'),
      ]),
      cyrillicPatronymic: new FieldValidator([
        getCustomValidator(/^[а-яА-ЯёЁ]+$/i, 'Введена некорректная фамилия'),
        getRequiredValidator('Поле является обязательным'),
      ]),
    };
  }
}
