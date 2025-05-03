import { makeAutoObservable, toJS } from 'mobx';
import * as startOfDay from 'date-fns/startOfDay';
import * as setYear from 'date-fns/setYear';
import * as parseDate from 'date-fns/parse';
import * as differenceInYears from 'date-fns/differenceInYears';

import { parseDateString } from 'sletat-common-utils/lib/date';
import {
  Alphabet,
  ComparisonOperators,
  getAgeLessThanValidator,
  getAgeMoreOrEqualThanValidator,
  getCharsValidator,
  getCustomValidator,
  getDateCompareValidator,
  getIsTrueValidator,
  getNameValidator,
  getRequiredValidator,
} from 'sletat-uikit2/dist/js/validators';
import { compose } from 'sletat-uikit2/dist/js/validators/utils/compose';
import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';

import {
  FormFieldState,
  Gender,
  InitialFormValidatorsParams,
  TouristFieldsMaskCheckers,
  TouristFormFieldsValidators,
  ValidationStatus,
} from '../../models/buy-online';
import { MainStore } from '../main';
import { ModuleTypes } from '../../models/module';
import {
  getBirthCertificateSeriesValidator,
  getBirthCertificateNumberValidator,
  getErrorMessage,
} from '../../utils/validator';
import { checkIsNeedBirthCertificate } from '../../utils/checkIsNeedBirthCertificate';
import { MAX_KID_AGE, NO_PASSPORT_KID_AGE } from '../../consts/ageConstants';

export interface TouristDataFormConstructorParams {
  touristId: number;
  mainStore: MainStore;
}

export class TouristDataStore {
  private readonly touristId: number = 0;

  private mainStore: MainStore;

  isCustomer = false;

  birthDateFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  firstNameFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  cyrillicFirstNameFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  surnameFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  cyrillicSurnameFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  cyrillicPatronymicFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  passportSeriesFieldState: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  passportNumberFieldState: FormFieldState<string> = {
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

  passportValidUntilFieldState?: FormFieldState<string> = {
    isTouched: false,
    value: '',
  };

  gender: Gender = Gender.unknown;

  isFromCache?: boolean;

  isFormCollapsed?: boolean;

  isBirthdayCalendarOpened?: boolean;

  isPassportIssuedWhenCalendarOpened?: boolean;

  isPassportValidUntilCalendarOpened?: boolean;

  formValidators: TouristFormFieldsValidators;

  touristFieldsMaskWarningsCheckers: TouristFieldsMaskCheckers = {
    isIssuedWhenDateChangedToMin: false,
  };

  _forceTouch = false;

  _isRequiredPatronymic = false;

  constructor(params: TouristDataFormConstructorParams) {
    makeAutoObservable(this);
    this.touristId = params.touristId;
    this.mainStore = params.mainStore;
    this.formValidators = this.initialFormValidators();
  }

  get fullName(): string {
    return this.mainStore.isNoInternationalPassportNeed
      ? `${this.cyrillicSurnameFieldState.value} ${this.cyrillicFirstNameFieldState.value} ${this.cyrillicPatronymicFieldState.value}`
      : `${this.surnameFieldState.value} ${this.firstNameFieldState.value}`;
  }

  get isKid(): boolean {
    return this.touristId >= this.mainStore.numAdults;
  }

  get lessThanFourteenYearsOld(): boolean {
    if (!this.isKid || !this.kidAge) {
      return false;
    }

    return this.kidAge < NO_PASSPORT_KID_AGE;
  }

  get needPassport(): boolean | null {
    if (
      !this.birthDateFieldState.value ||
      !this.formValidators.birthday.isTouchedAndValid()
    )
      return null;

    const age = this.Age;
    if (age == null) return null;

    if (checkIsNeedBirthCertificate(age, this.mainStore.countryId)) {
      return false;
    }

    return true;
  }

  get firstNameValidation(): ValidationStatus {
    this.validateFirstName(
      this.firstNameFieldState.value,
      this.firstNameFieldState.isTouched,
    );
    return {
      errorMessage: this.formValidators.firstName.errorMessage(),
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
      errorMessage: this.formValidators.surname.errorMessage(),
      isValidAndTouched:
        !!this.surnameFieldState.value &&
        this.formValidators.surname.isTouchedAndValid(),
    };
  }

  get cyrillicFirstNameValidation(): ValidationStatus {
    this.validateCyrillicFirstName(
      this.cyrillicFirstNameFieldState.value,
      this.cyrillicFirstNameFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.cyrillicFirstName),
      isValidAndTouched:
        !!this.cyrillicFirstNameFieldState.value &&
        this.formValidators.cyrillicFirstName.isTouchedAndValid(),
    };
  }

  get cyrillicSurnameValidation(): ValidationStatus {
    this.validateCyrillicSurname(
      this.cyrillicSurnameFieldState.value,
      this.cyrillicSurnameFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.cyrillicSurname),
      isValidAndTouched:
        !!this.cyrillicSurnameFieldState.value &&
        this.formValidators.cyrillicSurname.isTouchedAndValid(),
    };
  }

  get cyrillicPatronymicValidation(): ValidationStatus {
    this.validateCyrillicPatronymic(
      this.cyrillicPatronymicFieldState.value,
      this.cyrillicPatronymicFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.cyrillicPatronymic),
      isValidAndTouched:
        !!this.cyrillicPatronymicFieldState.value &&
        this.formValidators.cyrillicPatronymic.isTouchedAndValid(),
    };
  }

  get birthdayValidation(): ValidationStatus {
    this.validateBirthday(
      this.birthDateFieldState.value,
      this.birthDateFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.birthday),
      isValidAndTouched:
        !!this.birthDateFieldState.value &&
        this.formValidators.birthday.isTouchedAndValid(),
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
        !!this.passportNumberFieldState.value &&
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

  get passportValidUntilValidation(): ValidationStatus {
    if (
      !this.passportValidUntilFieldState ||
      !this.formValidators.passportValidUntil
    ) {
      return {
        errorMessage: '',
        isValidAndTouched: false,
      };
    }
    this.validatePassportValidUntil(
      this.passportValidUntilFieldState.value,
      this.passportValidUntilFieldState.isTouched,
    );
    return {
      errorMessage: getErrorMessage(this.formValidators.passportValidUntil),
      isValidAndTouched:
        !!this.passportValidUntilFieldState.value &&
        this.formValidators.passportValidUntil.isTouchedAndValid(),
    };
  }

  get Age(): number | null {
    const birthDate = parseDateString(
      this.birthDateFieldState.value,
      'DD.MM.YYYY',
    );
    if (birthDate === null) return null;

    const diffYear = differenceInYears(new Date(), birthDate);
    return diffYear;
  }

  get IsAdult(): boolean {
    const age = this.Age;
    return age == null ? true : age >= 18;
  }

  private get kidAge(): number | null {
    if (!this.isKid) {
      return null;
    }

    return (
      this.mainStore.kidsAges[this.touristId - this.mainStore.numAdults] || null
    );
  }

  get isRequiredPatronymic(): boolean {
    return this._isRequiredPatronymic;
  }

  setFirstNameFieldState(fieldState: Partial<FormFieldState<string>>): void {
    this.firstNameFieldState = {
      ...this.firstNameFieldState,
      ...fieldState,
    };
  }

  setCyrillicFirstNameFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.cyrillicFirstNameFieldState = {
      ...this.cyrillicFirstNameFieldState,
      ...fieldState,
    };
  }

  setSurnameFieldState(fieldState: Partial<FormFieldState<string>>): void {
    this.surnameFieldState = {
      ...this.surnameFieldState,
      ...fieldState,
    };
  }

  setCyrillicSurnameFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.cyrillicSurnameFieldState = {
      ...this.cyrillicSurnameFieldState,
      ...fieldState,
    };
  }

  setCyrillicPatronymicFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.cyrillicPatronymicFieldState = {
      ...this.cyrillicPatronymicFieldState,
      ...fieldState,
    };
  }

  setBirthdayFieldState(fieldState: Partial<FormFieldState<string>>): void {
    this.birthDateFieldState = {
      ...this.birthDateFieldState,
      ...fieldState,
    };
  }

  setGenderValue(gender: Gender): void {
    this.gender = gender;
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
    this.passportNumberFieldState = {
      ...this.passportNumberFieldState,
      ...fieldState,
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

  setPassportValidUntilFieldState(
    fieldState: Partial<FormFieldState<string>>,
  ): void {
    this.passportValidUntilFieldState = {
      ...this.passportValidUntilFieldState,
      ...fieldState,
    } as FormFieldState<string>;
  }

  setIsPassportIssuedWhenCalendarOpened(isOpened: boolean): void {
    this.isPassportIssuedWhenCalendarOpened = isOpened;
  }

  setIsPassportValidUntilCalendarOpened(isOpened: boolean): void {
    this.isPassportValidUntilCalendarOpened = isOpened;
  }

  setAsCustomer(isCustomer: boolean): void {
    this.isCustomer = isCustomer;
  }

  validateForm(): void {
    const validators = this.formValidators;

    this.validateFirstName(
      this.firstNameFieldState.value,
      this.firstNameFieldState.isTouched,
    );
    this.validateSurname(
      this.surnameFieldState.value,
      this.surnameFieldState.isTouched,
    );
    this.validateCyrillicFirstName(
      this.cyrillicFirstNameFieldState.value,
      this.cyrillicFirstNameFieldState.isTouched,
    );
    this.validateCyrillicSurname(
      this.cyrillicSurnameFieldState.value,
      this.cyrillicSurnameFieldState.isTouched,
    );
    this.validateCyrillicPatronymic(
      this.cyrillicPatronymicFieldState.value,
      this.cyrillicPatronymicFieldState.isTouched,
    );
    this.validateBirthday(
      this.birthDateFieldState.value,
      this.birthDateFieldState.isTouched,
    );
    validators.gender.validate(this.gender > 0);
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
    if (
      !!validators.passportValidUntil &&
      !!this.passportValidUntilFieldState
    ) {
      this.validatePassportValidUntil(
        this.passportValidUntilFieldState.value,
        this.passportValidUntilFieldState.isTouched,
      );
    }
  }

  validateFirstName(value: string, isTouched?: boolean): void {
    this.formValidators!.firstName.validate(value, isTouched);
  }

  validateSurname(value: string, isTouched?: boolean): void {
    this.formValidators!.surname.validate(value, isTouched);
  }

  validateCyrillicFirstName(value: string, isTouched?: boolean): void {
    this.formValidators!.cyrillicFirstName.validate(value, isTouched);
  }

  validateCyrillicSurname(value: string, isTouched?: boolean): void {
    this.formValidators!.cyrillicSurname.validate(value, isTouched);
  }

  validateCyrillicPatronymic(value: string, isTouched?: boolean): void {
    this.formValidators!.cyrillicPatronymic.validate(value, isTouched);
  }

  validateBirthday(value: string, isTouched?: boolean): void {
    const birthday = parseDateString(value, 'DD.MM.YYYY');
    this.formValidators!.birthday.validate(
      [{ value }, { value: birthday || null }],
      isTouched,
    );
  }

  validatePassportSeries(value: string, isTouched?: boolean): void {
    this.formValidators!.passportSeries.validate(value, isTouched);
  }

  validatePassportNumber(value: string, isTouched?: boolean): void {
    this.formValidators!.passportNumber.validate(value, isTouched);
  }

  validatePassportIssuedBy(value: string, isTouched?: boolean): void {
    this.formValidators!.passportIssuedBy.validate(value, isTouched);
  }

  validatePassportIssuedWhen(value: string, isTouched?: boolean): void {
    const issuedWhen = parseDateString(value, 'DD.MM.YYYY');
    this.formValidators!.passportIssuedWhen.validate(
      [{ value: issuedWhen || null }, { value }],
      isTouched,
    );

    if (
      !this.formValidators!.passportIssuedWhen.hasError() &&
      this.touristFieldsMaskWarningsCheckers.isIssuedWhenDateChangedToMin
    ) {
      this.formValidators!.passportIssuedWhen.setErrorMessage(
        'Паспорт РФ не выдавали до 1992 г.',
      );
    }
  }

  validatePassportValidUntil(value: string, isTouched?: boolean): void {
    const validators = this.formValidators;
    if (!validators.passportValidUntil) {
      return;
    }

    const validUntil = parseDateString(value, 'DD.MM.YYYY');

    validators.passportValidUntil!.validate(
      [{ value: validUntil || null }, { value }],
      isTouched,
    );
  }

  setFieldsMaskWarningsCheckers(
    checkers: Partial<TouristFieldsMaskCheckers>,
  ): void {
    this.touristFieldsMaskWarningsCheckers = {
      ...this.touristFieldsMaskWarningsCheckers,
      ...checkers,
    };
  }

  toggleFormCollapsed(): void {
    this.isFormCollapsed = !this.isFormCollapsed;
  }

  collapseForm(): void {
    this.isFormCollapsed = true;
  }

  setIsRequiredPatronymic(value: boolean): void {
    this._isRequiredPatronymic = value;
    this.formValidators = this.initialFormValidators({
      isRequiredPatronymic: value,
    });
  }

  setForceTouched(): void {
    if (this._forceTouch) return;
    this._forceTouch = true;

    this.setCyrillicFirstNameFieldState({
      value: this.cyrillicFirstNameFieldState.value,
      isTouched: true,
    });

    this.setCyrillicSurnameFieldState({
      value: this.cyrillicSurnameFieldState.value,
      isTouched: true,
    });

    this.setCyrillicPatronymicFieldState({
      value: this.cyrillicPatronymicFieldState.value,
      isTouched: true,
    });

    this.setBirthdayFieldState({
      value: this.birthDateFieldState.value,
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

  isFormFilled(): boolean {
    return (
      [
        this.birthDateFieldState,
        this.passportSeriesFieldState,
        this.passportNumberFieldState,
        this.passportIssuedByFieldState,
        this.passportIssuedWhenFieldState,
      ]
        .filter(Boolean)
        .every((state) => !!state!.value) && // Поля Имя и Фамилия должны существовать хотя бы в одном формате
      ([this.firstNameFieldState, this.surnameFieldState]
        .filter(Boolean)
        .every((state) => !!state!.value) ||
        [this.cyrillicFirstNameFieldState, this.cyrillicSurnameFieldState]
          .filter(Boolean)
          .every((state) => !!state!.value))
    );
  }

  isFormValid(): boolean {
    const form = toJS(this.formValidators);
    return Object.getOwnPropertyNames(form).every((key) => {
      return (
        !form[key as keyof TouristFormFieldsValidators] ||
        form[key as keyof TouristFormFieldsValidators]!.isValid()
      );
    });
  }

  collapseFormIfValid(): void {
    this.validateForm();

    if (this.isFormValid() && this.isFormFilled()) {
      this.collapseForm();
    }
  }

  updateValidatorsForDocumentType(): void {
    this.formValidators = this.initialFormValidators({
      isBirthCertificateNeeded: checkIsNeedBirthCertificate(
        this.Age,
        this.mainStore.countryId,
      ),
    });
  }

  private initialFormValidators({
    isBirthCertificateNeeded = false,
    isRequiredPatronymic = false,
  }: InitialFormValidatorsParams = {}): TouristFormFieldsValidators {
    const isMgt = this.mainStore.moduleType === ModuleTypes.mgt;

    const firstNameValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные латиницей', {
        alphabet: Alphabet.Latin,
      }),
    ];

    const surnameValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные латиницей', {
        alphabet: Alphabet.Latin,
      }),
    ];

    const cyrillicFirstNameValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные кириллицей', {
        alphabet: Alphabet.Cyrillic,
      }),
    ];

    const cyrillicSurnameValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные кириллицей', {
        alphabet: Alphabet.Cyrillic,
      }),
    ];

    const cyrillicPatronymicValidators = [
      getCustomValidator(/^[^\d]+$/i, 'Цифры недопустимы для ввода'),
      getNameValidator('Введите данные кириллицей', {
        alphabet: Alphabet.Cyrillic,
      }),
    ];

    const birthdayValidators = [
      getCustomValidator(
        /^[\d]{2}\.[\d]{2}\.[\d]{4}$/,
        'Укажите корректную дату дня вашего рождения в формате: ДД.ММ.ГГГГ',
      ),
    ];

    const passportIssuedByValidators = [
      getCharsValidator(
        ['0-9', 'a-z', 'а-яё', ' ', '-', '.', ',', '№', '#', '/'],
        'Укажите корректное наименование органа, выдавшего документ',
      ),
    ];

    const genderValidators = [getIsTrueValidator()];

    const passportSeriesValidators = [];

    const passportNumberValidators = [];

    const passportIssuedWhenValidators = [
      getCustomValidator(
        /^[\d]{2}\.[\d]{2}\.[\d]{4}$/,
        'Укажите корректную дату выдачи документа в формате: ДД.ММ.ГГГГ',
      ),
    ];

    if (isRequiredPatronymic) {
      cyrillicPatronymicValidators.push(getRequiredValidator());
    }

    if (isMgt) {
      cyrillicFirstNameValidators.push(getRequiredValidator());
      cyrillicSurnameValidators.push(getRequiredValidator());
      birthdayValidators.push(getRequiredValidator());
      passportIssuedByValidators.push(getRequiredValidator());
      genderValidators.push(getRequiredValidator());
      passportSeriesValidators.push(getRequiredValidator());
      passportNumberValidators.push(getRequiredValidator());
      passportIssuedWhenValidators.push(getRequiredValidator());

      if (isBirthCertificateNeeded) {
        passportSeriesValidators.push(getBirthCertificateSeriesValidator());
        passportNumberValidators.push(getBirthCertificateNumberValidator());
      }
    }

    let validators: TouristFormFieldsValidators = {
      firstName: new FieldValidator(firstNameValidators),
      surname: new FieldValidator(surnameValidators),
      cyrillicFirstName: new FieldValidator(cyrillicFirstNameValidators),
      cyrillicSurname: new FieldValidator(cyrillicSurnameValidators),
      cyrillicPatronymic: new FieldValidator(cyrillicPatronymicValidators),
      birthday: compose([
        new FieldValidator(birthdayValidators),
        new FieldValidator([
          getDateCompareValidator(
            startOfDay(new Date()),
            { operator: ComparisonOperators.Less },
            'Дата рождения не может быть в будущем',
          ),
          getDateCompareValidator(
            setYear(startOfDay(new Date()), 1900),
            { operator: ComparisonOperators.MoreOrEqual },
            'Скорее всего, вы ошиблись',
          ),
          this.isKid
            ? getAgeLessThanValidator(
                MAX_KID_AGE,
                `Возраст ребенка должен быть менее ${MAX_KID_AGE} лет`,
              )
            : getAgeMoreOrEqualThanValidator(
                MAX_KID_AGE,
                `Возраст туриста должен быть ${MAX_KID_AGE} лет и более`,
              ),
        ]),
      ]),
      gender: new FieldValidator(genderValidators),
      passportSeries: new FieldValidator(passportSeriesValidators),
      passportNumber: new FieldValidator(passportNumberValidators),
      passportIssuedBy: new FieldValidator(passportIssuedByValidators),
      passportIssuedWhen: compose([
        new FieldValidator([
          getDateCompareValidator(
            parseDate('1992-01-01', 'YYYY-MM-DD', startOfDay(new Date())),
            { operator: ComparisonOperators.MoreOrEqual },
            'Паспорт РФ не выдавали до 1992 г.',
          ),
          getDateCompareValidator(
            startOfDay(new Date()),
            { operator: ComparisonOperators.LessOrEqual },
            'Дата выдачи документа не может быть в будущем',
          ),
        ]),
        new FieldValidator(passportIssuedWhenValidators),
      ]),
    };

    if (!this.mainStore.isNoInternationalPassportNeed) {
      validators = {
        ...validators,
        passportValidUntil: compose([
          new FieldValidator([
            getDateCompareValidator(
              new Date(),
              { operator: ComparisonOperators.More },
              'Срок действия документа не может быть в прошлом',
            ),
          ]),
          new FieldValidator([
            getCustomValidator(
              /^[\d]{2}\.[\d]{2}\.[\d]{4}$/,
              'Укажите корректную дату срока действия документа в формате: ДД.ММ.ГГГГ',
            ),
          ]),
        ]),
      };
    }

    return validators;
  }
}
