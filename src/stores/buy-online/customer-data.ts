import { makeAutoObservable, toJS } from 'mobx';
import { isNil, isUndefined } from 'lodash';
import { parseDateString } from 'sletat-common-utils/lib/date/lib/parseDateString';
import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';
import {
  Alphabet,
  ComparisonOperators,
  getCharsValidator,
  getCustomValidator,
  getDateCompareValidator,
  getEmailValidator,
  getFederalPhoneValidator,
  getIsTrueValidator,
  getNameValidator,
  getRequiredValidator,
} from 'sletat-uikit2/dist/js/validators';
import { compose } from 'sletat-uikit2/dist/js/validators/utils/compose';
import {
  CustomerFieldsMaskCheckers,
  CustomerFormFieldsValidators,
  FormFieldState,
  ValidationStatus,
} from '../../models/buy-online';
import { getErrorMessage } from '../../utils/validator';

interface CustomerDataFocusedFieldsStates {
  isEmailFocused: boolean;
  isPhoneFocused: boolean;
}

export class CustomerDataStore {
  focusedFieldsStates: CustomerDataFocusedFieldsStates = {
    isEmailFocused: false,
    isPhoneFocused: false,
  };

  firstNameFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  surnameFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  patronymicFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  phoneFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  emailFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  addressFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  passportNumberFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  passportSeriesFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  passportIssuedByFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  passportIssuedWhenFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  isAgreeWithOffer = false;

  formValidators: CustomerFormFieldsValidators = this.initialFormValidators;

  fieldsMaskWarningsCheckers = {
    isIssuedWhenDateChangedToMin: false,
  };

  private _isMgtModule = false;

  private _forceTouched = false;

  private _isRequiredPatronymic = false;

  constructor() {
    makeAutoObservable(this);
  }

  get fullName(): string {
    return this._isRequiredPatronymic
      ? `${this.surnameFieldState.value} ${this.firstNameFieldState.value} ${this.patronymicFieldState.value}`
      : `${this.surnameFieldState.value} ${this.firstNameFieldState.value}`;
  }

  get firstNameValidation(): ValidationStatus {
    this.validateFirstName(
      this.firstNameFieldState.value,
      this.firstNameFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.firstName),
      isValidAndTouched:
        !!this.firstNameFieldState.value &&
        this.formValidators.firstName.isTouchedAndValid(),
    };
  }

  get surnameValidation(): ValidationStatus {
    this.validateSurname(
      this.surnameFieldState.value,
      this.surnameFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.surname),
      isValidAndTouched:
        !!this.surnameFieldState.value &&
        this.formValidators.surname.isTouchedAndValid(),
    };
  }

  get patronymicValidation(): ValidationStatus {
    this.validatePatronymic(
      this.patronymicFieldState.value,
      this.patronymicFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.patronymic),
      isValidAndTouched:
        !!this.patronymicFieldState.value &&
        this.formValidators.patronymic.isTouchedAndValid(),
    };
  }

  get emailValidation(): ValidationStatus {
    this.validateEmail(
      this.emailFieldState.value,
      this.emailFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.email),
      isValidAndTouched:
        !!this.emailFieldState.value &&
        this.formValidators.email.isTouchedAndValid(),
    };
  }

  get phoneValidation(): ValidationStatus {
    this.validatePhone(
      this.phoneFieldState.value,
      this.phoneFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.phone),
      isValidAndTouched:
        !!this.phoneFieldState.value &&
        this.formValidators.phone.isTouchedAndValid(),
    };
  }

  get passportSeriesValidation(): ValidationStatus {
    this.validatePassportSeries(
      this.passportSeriesFieldState.value,
      this.passportSeriesFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.passportSeries),
      isValidAndTouched:
        !!this.passportSeriesFieldState.value &&
        this.formValidators.passportSeries.isTouchedAndValid(),
    };
  }

  get passportNumberValidation(): ValidationStatus {
    this.validatePassportNumber(
      this.passportNumberFieldState.value,
      this.passportNumberFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.passportNumber),
      isValidAndTouched:
        !!this.passportNumberFieldState.value &&
        this.formValidators.passportNumber.isTouchedAndValid(),
    };
  }

  get passportIssuedWhenValidation(): ValidationStatus {
    this.validatePassportIssuedWhen(
      this.passportIssuedWhenFieldState.value,
      this.passportIssuedWhenFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.passportIssuedWhen),
      isValidAndTouched:
        !!this.passportIssuedWhenFieldState.value &&
        this.formValidators.passportIssuedWhen.isTouchedAndValid(),
    };
  }

  get passportIssuedByValidation(): ValidationStatus {
    this.validatePassportIssuedBy(
      this.passportIssuedByFieldState.value,
      this.passportIssuedByFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.passportIssuedBy),
      isValidAndTouched:
        !!this.passportIssuedByFieldState.value &&
        this.formValidators.passportIssuedBy.isTouchedAndValid(),
    };
  }

  get addressValidation(): ValidationStatus {
    this.validateAddress(
      this.addressFieldState.value,
      this.addressFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.address),
      isValidAndTouched:
        !!this.addressFieldState.value &&
        this.formValidators.address.isTouchedAndValid(),
    };
  }

  get isMgtModule(): boolean {
    return this._isMgtModule;
  }

  get isRequiredPatronymic(): boolean {
    return this._isRequiredPatronymic;
  }

  setFirstNameFieldState(fieldState: Partial<FormFieldState<string>>): void {
    const value = !isUndefined(fieldState.value)
      ? fieldState.value
      : this.firstNameFieldState.value;

    this.firstNameFieldState = {
      ...this.firstNameFieldState,
      ...fieldState,
      value: value!,
    };
  }

  setSurnameFieldState(fieldState: Partial<FormFieldState<string>>): void {
    const value = !isUndefined(fieldState.value)
      ? fieldState.value
      : this.surnameFieldState.value;

    this.surnameFieldState = {
      ...this.surnameFieldState,
      ...fieldState,
      value: value!,
    };
  }

  setPatronymicFieldState(fieldState: Partial<FormFieldState<string>>): void {
    const value = !isUndefined(fieldState.value)
      ? fieldState.value
      : this.patronymicFieldState.value;

    this.patronymicFieldState = {
      ...this.patronymicFieldState,
      ...fieldState,
      value: value!,
    };
  }

  setPhoneFieldState(fieldState: Partial<FormFieldState<string>>): void {
    let value = !isUndefined(fieldState.value)
      ? fieldState.value
      : this.patronymicFieldState.value;
    if (value?.length >= 1 && (value[0] === '7' || value[0] === '8')) {
      value = `+7${value.slice(1)}`;
    }

    this.phoneFieldState = {
      ...this.phoneFieldState,
      ...fieldState,
      value: value!,
    };
  }

  setEmailFieldState(fieldState: Partial<FormFieldState<string>>): void {
    this.emailFieldState = {
      ...this.emailFieldState,
      ...fieldState,
    };
  }

  setAddressFieldState(fieldState: Partial<FormFieldState<string>>): void {
    this.addressFieldState = {
      ...this.addressFieldState,
      ...fieldState,
    };
  }

  setPassportSeriesFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.passportSeriesFieldState = {
      ...this.passportSeriesFieldState,
      ...fieldState,
    };
  }

  setPassportNumberFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    const value = !isUndefined(fieldState.value)
      ? fieldState.value
      : this.patronymicFieldState.value;

    this.passportNumberFieldState = {
      ...this.passportNumberFieldState,
      ...fieldState,
      value: value!,
    };
  }

  setPassportIssuedByFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.passportIssuedByFieldState = {
      ...this.passportIssuedByFieldState,
      ...fieldState,
    };
  }

  setPassportIssuedWhenFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.passportIssuedWhenFieldState = {
      ...this.passportIssuedWhenFieldState,
      ...fieldState,
    };
  }

  checkIsAgreeWithOffer(isChecked: boolean): void {
    this.isAgreeWithOffer = isChecked;
  }

  /**
   * Валидация полей заказчика
   */

  validateForm(): void {
    this.validateFirstName(
      this.firstNameFieldState.value,
      this.firstNameFieldState.isTouched,
    );
    this.validateSurname(
      this.surnameFieldState.value,
      this.surnameFieldState.isTouched,
    );
    this.validatePatronymic(
      this.patronymicFieldState.value,
      this.patronymicFieldState.isTouched,
    );
    this.validatePhone(
      this.phoneFieldState.value,
      this.phoneFieldState.isTouched,
    );
    this.validateEmail(
      this.emailFieldState.value,
      this.emailFieldState.isTouched,
    );
    this.validateAddress(
      this.addressFieldState.value,
      this.addressFieldState.isTouched,
    );

    this.validatePassportSeries(
      this.passportSeriesFieldState.value,
      this.passportSeriesFieldState.isTouched,
    );
    this.validatePassportNumber(
      this.passportNumberFieldState.value,
      this.passportNumberFieldState.isTouched,
    );
    this.validatePassportIssuedBy(
      this.passportIssuedByFieldState.value,
      this.passportIssuedByFieldState.isTouched,
    );
    this.validatePassportIssuedWhen(
      this.passportIssuedWhenFieldState.value,
      this.passportIssuedWhenFieldState.isTouched,
    );

    this.formValidators.isAgreeWithOffer.validate(this.isAgreeWithOffer, false);
  }

  setForceTouched(): void {
    if (this._forceTouched) return;
    this._forceTouched = true;

    this.setFirstNameFieldState({
      value: this.firstNameFieldState.value,
      isTouched: true,
    });

    this.setSurnameFieldState({
      value: this.surnameFieldState.value,
      isTouched: true,
    });

    this.setPatronymicFieldState({
      value: this.patronymicFieldState.value,
      isTouched: true,
    });

    this.setAddressFieldState({
      value: this.addressFieldState.value,
      isTouched: true,
    });

    this.setPassportSeriesFieldState({
      value: this.passportSeriesFieldState.value,
      isTouched: true,
    });

    this.setPassportNumberFieldState({
      value: this.passportNumberFieldState.value,
      isTouched: true,
    });

    this.setPassportIssuedByFieldState({
      value: this.passportIssuedByFieldState.value,
      isTouched: true,
    });

    this.setPassportIssuedWhenFieldState({
      value: this.passportIssuedWhenFieldState.value,
      isTouched: true,
    });
  }

  validateFirstName(value: string, isTouched?: boolean): void {
    this.formValidators.firstName.validate(value, isTouched);
  }

  validateSurname(value: string, isTouched?: boolean): void {
    this.formValidators.surname.validate(value, isTouched);
  }

  validatePatronymic(value: string, isTouched?: boolean): void {
    this.formValidators.patronymic.validate(value, isTouched);
  }

  validatePhone(value: string, isTouched?: boolean): void {
    this.formValidators.phone.validate(value, isTouched);
  }

  validateEmail(value: string, isTouched?: boolean): void {
    this.formValidators.email.validate(value, isTouched);
  }

  validateAddress(value: string, isTouched?: boolean): void {
    this.formValidators.address.validate(value, isTouched);
  }

  validatePassportSeries(value: string, isTouched?: boolean): void {
    this.formValidators.passportSeries.validate(value, isTouched);
  }

  validatePassportNumber(value: string, isTouched?: boolean): void {
    this.formValidators.passportNumber.validate(value, isTouched);
  }

  validatePassportIssuedBy(value: string, isTouched?: boolean): void {
    this.formValidators.passportIssuedBy.validate(value, isTouched);
  }

  validatePassportIssuedWhen(value: string, isTouched?: boolean): void {
    const issuedWhen = parseDateString(value, 'DD.MM.YYYY');
    this.formValidators.passportIssuedWhen.validate(
      [{ value: issuedWhen || null }, { value }],
      isTouched,
    );

    if (
      !this.formValidators.passportIssuedWhen.hasError() &&
      this.fieldsMaskWarningsCheckers.isIssuedWhenDateChangedToMin
    ) {
      this.formValidators.passportIssuedWhen.setErrorMessage(
        'Паспорт РФ не выдавали до 1992 г.',
      );
    }
  }

  setFieldsMaskWarningsCheckers(
    checkers: Partial<CustomerFieldsMaskCheckers>,
  ): void {
    this.fieldsMaskWarningsCheckers = {
      ...this.fieldsMaskWarningsCheckers,
      ...checkers,
    };
  }

  setFocusedFieldsStates(
    states: Partial<CustomerDataFocusedFieldsStates>,
  ): void {
    this.focusedFieldsStates = {
      ...this.focusedFieldsStates,
      ...states,
    };
  }

  setInitialFormState(): void {
    this.firstNameFieldState = {
      value: '',
      isTouched: false,
    };

    this.surnameFieldState = {
      value: '',
      isTouched: false,
    };

    this.patronymicFieldState = {
      value: '',
      isTouched: false,
    };

    this.phoneFieldState = {
      value: '',
      isTouched: false,
    };

    this.emailFieldState = {
      value: '',
      isTouched: false,
    };

    this.addressFieldState = {
      value: '',
      isTouched: false,
    };

    this.passportSeriesFieldState = {
      value: '',
      isTouched: false,
    };

    this.passportNumberFieldState = {
      value: '',
      isTouched: false,
    };

    this.passportIssuedByFieldState = {
      value: '',
      isTouched: false,
    };

    this.passportIssuedWhenFieldState = {
      value: '',
      isTouched: false,
    };

    this.isAgreeWithOffer = false;
  }

  setIsMgtModule(): void {
    this._isMgtModule = true;
    this.formValidators = this.initialFormValidators;
  }

  setIsRequiredPatronymic(value: boolean): void {
    this._isRequiredPatronymic = value;
    this.formValidators = this.initialFormValidators;
  }

  isFormValid(checkRequiredFieldsOnly = false): boolean {
    const formValidators = toJS(this.formValidators);
    return Object.getOwnPropertyNames(formValidators).every((key) => {
      const value = formValidators[key as keyof CustomerFormFieldsValidators];
      return (
        value.isValid() || (checkRequiredFieldsOnly && !value.isFieldRequired())
      );
    });
  }

  isAllFieldsFilledAndValid(): boolean {
    const isEmptyField = (value: string): boolean =>
      isNil(value) || !value.length;

    if (
      isEmptyField(this.surnameFieldState.value) ||
      isEmptyField(this.firstNameFieldState.value) ||
      (this.isRequiredPatronymic &&
        isEmptyField(this.patronymicFieldState.value)) ||
      isEmptyField(this.phoneFieldState.value) ||
      isEmptyField(this.emailFieldState.value) ||
      isEmptyField(this.passportNumberFieldState.value) ||
      isEmptyField(this.passportSeriesFieldState.value) ||
      isEmptyField(this.passportIssuedWhenFieldState.value) ||
      isEmptyField(this.passportIssuedByFieldState.value) ||
      isEmptyField(this.addressFieldState.value)
    ) {
      return false;
    }
    return this.isFormValid(true);
  }

  private get initialFormValidators(): CustomerFormFieldsValidators {
    const firstNameValidators = [
      getCustomValidator(/[^\d]+/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные кириллицей.', {
        alphabet: Alphabet.Cyrillic,
      }),
    ];

    const surnameValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные кириллицей.', {
        alphabet: Alphabet.Cyrillic,
      }),
    ];
    const patronymicValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные кириллицей.', {
        alphabet: Alphabet.Cyrillic,
      }),
    ];
    const passportIssuedByValidators = [
      getCharsValidator(
        ['0-9', 'a-z', 'а-яё', ' ', '-', '.', ',', '№', '#', '/'],
        'Укажите корректное наименование органа, выдавшего паспорт',
      ),
    ];
    const addressValidators = [];

    if (this.isRequiredPatronymic) {
      patronymicValidators.push(
        getRequiredValidator(
          'Отчество необходимо, чтобы мы смогли сразу оформить билеты',
        ),
      );
    }

    if (this.isMgtModule) {
      firstNameValidators.push(
        getRequiredValidator(
          'Имя необходимо, чтобы мы смогли сразу оформить билеты',
        ),
      );
      surnameValidators.push(
        getRequiredValidator(
          'Фамилия необходима, чтобы мы смогли сразу оформить билеты',
        ),
      );
      passportIssuedByValidators.push(
        getRequiredValidator(
          'Организация, выдавшая документ, необходима для корректного оформления билетов',
        ),
      );
      addressValidators.push(
        getRequiredValidator(
          'Адрес проживания необходим для корректного оформления билетов',
        ),
      );
    }

    return {
      firstName: new FieldValidator(firstNameValidators),
      surname: new FieldValidator(surnameValidators),
      patronymic: new FieldValidator(patronymicValidators),
      phone: new FieldValidator([
        getRequiredValidator(
          'Телефон нужен, чтобы подтвердить покупку. Без него никак',
        ),
        getFederalPhoneValidator('Некорректный номер'),
      ]),
      email: new FieldValidator([
        getRequiredValidator(
          'Почта нужна, чтобы отправить вам договор, чек и памятку туриста',
        ),
        getEmailValidator('Некорректный адрес'),
      ]),
      passportSeries: this.isMgtModule
        ? new FieldValidator([
            getRequiredValidator(
              'Паспортные данные необходимы для подтверждения права использования сертификата',
            ),
            getCustomValidator(/^\d{4}$/i, 'Должно быть 4 цифры'),
          ])
        : new FieldValidator([]),
      passportNumber: this.isMgtModule
        ? new FieldValidator([
            getRequiredValidator(
              'Паспортные данные необходимы для подтверждения права использования сертификата',
            ),
            getCustomValidator(/^\d{6}$/i, 'Должно быть 6 цифр'),
          ])
        : new FieldValidator([]),
      passportIssuedWhen: compose([
        new FieldValidator([
          getDateCompareValidator(
            new Date(),
            { operator: ComparisonOperators.LessOrEqual },
            'Дата выдачи паспорта не может быть позже текущей даты',
          ),
        ]),
        new FieldValidator([
          getCustomValidator(
            /^[\d]{2}\.[\d]{2}\.[\d]{4}$/,
            'Укажите корректную дату выдачи паспорта РФ в формате: ДД.ММ.ГГГГ',
          ),
        ]),
      ]),
      passportIssuedBy: new FieldValidator(passportIssuedByValidators),
      address: new FieldValidator(addressValidators),
      isAgreeWithOffer: new FieldValidator([
        getRequiredValidator(),
        getIsTrueValidator(),
      ]),
    };
  }
}
