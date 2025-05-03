/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as classNames from 'classnames';
import { isUndefined } from 'lodash';

import { RequiredTourFormFields } from 'sletat-module-settings/dist/js/module6/model';
import { target } from 'sletat-api-services/lib/types';
import { federalPhoneMask } from 'sletat-uikit2/dist/js/input-masks/federal-phone';
import { City, Office } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetOffices/GetOfficesResponse';
import { UiAdaptiveSingleSelect, UiSingleSelectChangeState } from 'sletat-uikit2/dist/js/selects/UiAdaptiveSingleSelect';
import { UiText } from 'sletat-uikit2/dist/js/UiText';
import {
    Alphabet,
    getRequiredValidator,
    getNameValidator,
    getEmailValidator,
    getMinCountOfNumbersValidator,
    getPhoneValidator
} from 'sletat-uikit2/dist/js/validators';
import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';

import { OfficesInfo, OfficesState } from '../../helpers/OfficesInfo';
import { TourOrderFormCache } from '../FormDataCache';
import { PersonalDataAgreement } from '../PersonalDataAgreement';
import { logMetric, scrollToField } from '../../utils';


export interface TourOrderFormFieldsValidators {
    city: FieldValidator;
    office: FieldValidator;
    name: FieldValidator;
    email: FieldValidator;
    phone: FieldValidator;
}

export interface TourOrderFormSubmittedData {
    cityId?: number;
    cityName: string;
    officeId?: number;
    name: string;
    email: string;
    phone: string;
    comment: string;
}

export interface TourOrderFormProps {
    requiredFields: RequiredTourFormFields,
    useManyOffices: boolean;
    target: target;
    privacyPolicyLink: string;
    statementOfPersonalDataLink: string;
    officeId?: number;
    onSubmit: (submittedData: TourOrderFormSubmittedData) => void;
}

export interface TourOrderFormState {
    cityId: string;
    cityTouched: boolean;
    officeId: string;
    officeTouched: boolean;
    name: string;
    nameTouched: boolean;
    email: string;
    emailTouched: boolean;
    phone: string;
    phoneTouched: boolean;
    comment: string;
    commentTouched: boolean;
}

interface Option {
    inputValue: string;
    label: string;
}


export class TourOrderForm extends React.Component<TourOrderFormProps, TourOrderFormState> {

    private officesInfo: OfficesInfo;
    private validators: TourOrderFormFieldsValidators;

    constructor(props: TourOrderFormProps) {
        super(props);

        this.state = this.getDefaultState();
        this.validators = this.initFieldsValidators();
        this.officesInfo = new OfficesInfo();
    }

    componentDidMount() {
        this.officesInfo.loadOffices(this.props.target)
            .then(() => {
                this.initCachedState();
                if (this.shouldShowOffices) {
                    this.initOfficesFieldsValidators();
                }
            }).catch((err) => {
                console.error(err);
            });
    }

    render() {
        const cx = this.classes();
        this.validateFields();

        return (
            <div className={cx.body}>
                {this.renderOfficesBlock()}
                <div className={cx.table}>
                    <div className={cx.tableCellWidthFull}>
                        <UiText
                            controlTitle={'ФИО кириллицей'}
                            inputName={'user-name-field'}
                            inputValue={this.state.name}
                            isError={this.validators.name.hasError()}
                            tooltipErrorText={this.validators.name.errorMessage()}
                            placeholderText={'Иванов Иван Иванович'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => scrollToField(state.target!)}
                            onBlur={(state) => this.setState({
                                name: state.value,
                                nameTouched: true
                            } as TourOrderFormState)}
                            onChange={(state) => this.setState({
                                name: state.value,
                                nameTouched: true
                            } as TourOrderFormState)}
                        />
                    </div>
                </div>
                <div className={cx.table}>
                    <div className={cx.tableCell}>
                        <UiText
                            controlTitle={'Телефон'}
                            maskOptions={{
                                mask: federalPhoneMask()
                            }}
                            inputName={'user-phone-field'}
                            inputValue={this.state.phone}
                            isError={this.validators.phone.hasError()}
                            tooltipErrorText={this.validators.phone.errorMessage()}
                            bemModifications={[cx.base]}
                            placeholderText={'+7 xxx xxx xx xx'}
                            onFocus={(state) => scrollToField(state.target!)}
                            onBlur={(state) => this.setState({
                                phone: state.value,
                                phoneTouched: true
                            } as TourOrderFormState)}
                            onChange={(state) => this.setState({
                                phone: state.value,
                                phoneTouched: true
                            } as TourOrderFormState)}

                        />
                    </div>
                    <div className={cx.tableCell}>
                        <UiText
                            controlTitle={'Эл. почта'}
                            inputName={'user-email-field'}
                            inputValue={this.state.email}
                            inputType={'email'}
                            isError={this.validators.email.hasError()}
                            tooltipErrorText={this.validators.email.errorMessage()}
                            placeholderText={'ivanov-ivan@example.com'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => scrollToField(state.target!)}
                            onBlur={(state) => this.setState({
                                email: state.value,
                                emailTouched: true
                            } as TourOrderFormState)}
                            onChange={(state) => this.setState({
                                email: state.value,
                                emailTouched: true
                            } as TourOrderFormState)}
                        />
                    </div>
                </div>
                <div className={cx.table}>
                    <div className={cx.tableCellWidthFull}>
                        <UiText
                            controlTitle={'Ваш комментарий'}
                            inputName={'user-comment-field'}
                            inputValue={this.state.comment}
                            bemModifications={[cx.base]}
                            isMultiLine={true}
                            onFocus={(state) => scrollToField(state.target!)}
                            onBlur={(state) => this.setState({
                                comment: state.value,
                                commentTouched: true
                            } as TourOrderFormState)}
                            onChange={(state) => this.setState({
                                comment: state.value,
                                commentTouched: true
                            } as TourOrderFormState)}
                        />
                    </div>
                </div>
                <div className="general-form__controls">
                    <button
                        className={cx.buttonSend}
                        onClick={() => this.onSubmit()}
                    >Отправить заявку
                    </button>
                    <PersonalDataAgreement
                        target={this.props.target}
                        privacyPolicyLink={this.props.privacyPolicyLink}
                        statementOfPersonalDataLink={this.props.statementOfPersonalDataLink}
                    />
                </div>
            </div>
        );
    }

    public onSubmit(): void {
        this.checkIfFormValid()
            .then((isFormValid: boolean) => {
                if (isFormValid) {
                    const city: City | null = this.officesInfo.getCityById(this.state.cityId) || null;
                    TourOrderFormCache.saveFormData(this.state);
                    let submittedState: TourOrderFormSubmittedData = {
                        cityName: city ? city.name : '',
                        name: this.state.name,
                        email: this.state.email,
                        phone: this.state.phone,
                        comment: this.state.comment
                    };
                    if (this.state.officeId) {
                        submittedState.officeId = parseInt(this.state.officeId, 10);
                    }
                    if (this.state.cityId) {
                        submittedState.cityId = parseInt(this.state.cityId, 10);
                    }
                    this.props.onSubmit(submittedState);
                } else {
                    logMetric('tourcard-order_fail', this.getInvalidFieldsData());
                }
            });
    }

    protected classes(): any {
        const BASE_CLASS = 'general-form';
        const tableCell = (modification?: string) => classNames({
            [`${BASE_CLASS}__table-cell`]: true,
            [`${BASE_CLASS}__table-cell_${modification}`]: !!modification
        });

        return {
            base: classNames({
                [BASE_CLASS]: true
            }),
            body: classNames({
                [`${BASE_CLASS}__body`]: true
            }),
            table: classNames({
                [`${BASE_CLASS}__table`]: true
            }),
            tableCell: tableCell(),
            tableCellWidthFull: tableCell('width-full'),
            controls: classNames({
                [`${BASE_CLASS}__controls`]: true
            }),
            buttonSend: classNames({
                [`${BASE_CLASS}__button-send`]: true,
                [`uis-button`]: true,
                [`uis-button_orange`]: true,
                [`uis-button_middle`]: true
            })
        };
    }

    private get shouldShowOffices(): boolean {
        // если многоофисность неразрешена - выходим
        // https://agile.sletat.ru/jiraurl/browse/MODULES-1056
        if (!this.props.useManyOffices) {
            return false;
        }

        // если офисов нет, то показывать нечего
        // если он 1 то тоже смысла нет, т.к. у юзера нет возможности выбора
        if (this.officesInfo.offices.length < 2) {
            return false;
        }

        return true;
    }

    private renderOfficesBlock(): JSX.Element | null {
        const cx = this.classes();

        if (!this.shouldShowOffices) {
            return null;
        }

        const cityOffices = this.officesInfo.cityOffices(this.state.cityId);
        const cityIsDisabled: boolean = !this.officesInfo.cities.length || this.officesInfo.cities.length === 1;
        const officeIsDisabled: boolean = !!this.state.cityId && cityOffices.length === 1;

        return (
            <div className={cx.table}>
                <div className={cx.tableCell}>
                    <UiAdaptiveSingleSelect
                        controlTitle={'Город'}
                        inputName={'order-city-select'}
                        options={this.officesInfo.cities.map((city) => this.getCityOption(city))}
                        inputValue={this.state.cityId}
                        isError={this.validators.city.hasError()}
                        tooltipErrorText={this.validators.city.errorMessage()}
                        isDisabled={cityIsDisabled}
                        placeholderText={'Выберите город'}
                        bemModifications={[cx.base]}
                        onChange={(state) => this.onChangeCity(state)}
                    />
                </div>
                <div className={cx.tableCell}>
                    <UiAdaptiveSingleSelect
                        controlTitle={'Офис'}
                        inputName={'order-office-select'}
                        options={cityOffices.map((office) => this.getOfficeOption(office))}
                        inputValue={this.state.officeId}
                        isError={this.validators.office.hasError()}
                        tooltipErrorText={this.validators.office.errorMessage()}
                        isDisabled={officeIsDisabled}
                        placeholderText={'Выберите офис'}
                        bemModifications={[cx.base]}
                        onChange={(state) => {
                            if (state.selectedValue === this.state.officeId) {
                                return;
                            }
                            this.setState({
                                officeId: state.selectedValue,
                                officeTouched: true
                            } as TourOrderFormState);
                        }}
                    />
                </div>
            </div>
        );
    }

    private getInitialOfficesState(): OfficesState {
        const defaultOfficeId = !isUndefined(this.props.officeId) ? this.props.officeId : '';
        const firstCityId = this.officesInfo.hasCities ? String(this.officesInfo.firstCity.id) : '';
        let results = { cityId: '', officeId: '' };

        if (!!defaultOfficeId && this.officesInfo.hasOfficeWithId(defaultOfficeId)) {
            const defaultCity = this.officesInfo.getCityByOfficeId(defaultOfficeId);
            results.cityId = !!defaultCity ? String(defaultCity.id) : '';
            results.officeId = !!defaultCity ? String(defaultOfficeId) : '';
        } else if (this.officesInfo.onlyOneOffice()) {
            const firstOffice = this.officesInfo.getFirstOffice(firstCityId);
            if (firstOffice) {
                results.cityId = firstCityId;
                results.officeId = String(firstOffice.id);
            }
        } else if (this.officesInfo.onlyOneCity && this.officesInfo.cityHasMoreThanOneOffice(firstCityId)) {
            results.cityId = firstCityId;
        }

        return results;
    }

    private initCachedState(): void {
        const cache = new TourOrderFormCache();
        const { cityId, officeId } = this.getInitialOfficesState();

        cache.loadCachedData()
            .then(() => {
                this.setState({
                    name: cache.name || '',
                    email: cache.email || '',
                    phone: cache.phone || '',
                    cityId: this.officesInfo.hasCities ? cache.cityId || cityId : null,
                    officeId: this.props.useManyOffices ? cache.officeId || officeId : null
                } as TourOrderFormState);
            })
            .catch((ex) => {
                throw new Error(ex);
            });
    }

    private getDefaultState(): TourOrderFormState {
        return {
            cityId: '',
            cityTouched: false,
            officeId: '',
            officeTouched: false,
            name: '',
            nameTouched: false,
            email: '',
            emailTouched: false,
            phone: '',
            phoneTouched: false,
            comment: '',
            commentTouched: false
        };
    }

    private onChangeCity(state: UiSingleSelectChangeState): void {
        if (this.state.cityId === state.selectedValue) {
            return;
        }
        const cityOffices = this.officesInfo.cityOffices(state.selectedValue);
        const checkedOfficeId = cityOffices.length === 1 ? String(cityOffices[0].id) : null;
        this.setState({
            cityId: state.selectedValue,
            officeId: checkedOfficeId,
            cityTouched: true,
            officeTouched: !!checkedOfficeId
        } as TourOrderFormState);
    }

    private getCityOption(city: City): Option {
        return {
            inputValue: String(city.id),
            label: city.name
        };
    }

    private getOfficeOption(office: Office): Option {
        const buildOfficeLabel = (office: Office) => {
            let label = '';

            if (!!office.subway && !!office.subway.name) {
                label += `${office.subway.name}, `;
            }

            label += office.address;
            return label;
        };

        return {
            inputValue: String(office.id),
            label: buildOfficeLabel(office)
        };
    }

    private initFieldsValidators(): TourOrderFormFieldsValidators {
        return {
            name: new FieldValidator([
                getRequiredValidator(),
                getNameValidator('', { alphabet: Alphabet.Cyrillic })
            ]),
            email: new FieldValidator([
                getEmailValidator()
            ]),
            phone: new FieldValidator([
                getPhoneValidator(),
                getMinCountOfNumbersValidator(5)
            ]),
            city: new FieldValidator([]),
            office: new FieldValidator([])
        };
    }

    private initOfficesFieldsValidators(): void {
        this.validators.city = new FieldValidator([
            getRequiredValidator()
        ]);
        this.validators.office = new FieldValidator([
            getRequiredValidator()
        ]);
    }

    private validateFields(): void {
        this.validators.name.validate(this.state.name, this.state.nameTouched);       
        this.validators.city.validate(this.state.cityId, this.state.cityTouched);
        this.validators.office.validate(this.state.officeId, this.state.officeTouched);
        this.validators.email.validate(this.state.email, this.state.emailTouched);
        this.validators.phone.validate(this.state.phone, this.state.phoneTouched);
        switch (this.props.requiredFields) {
            case RequiredTourFormFields.any:
                this.requireEmailOrPhone()
                break;
            case RequiredTourFormFields.both:
                this.requireEmailAndPhone()
                break;
            case RequiredTourFormFields.email:
                this.requireEmail()
                break;
            case RequiredTourFormFields.phone:
                this.requirePhone()
                break;
        }
    }

    private requireEmailOrPhone(): void {
        const EMAIL_OR_PHONE_IS_REQUIRED = 'Хотя бы одно из полей phone или email должно быть заполнено.';
        if (!this.state.email && this.state.emailTouched && !this.state.phone && this.state.phoneTouched) {
            this.validators.email.setErrorMessage(EMAIL_OR_PHONE_IS_REQUIRED);
            this.validators.phone.setErrorMessage(EMAIL_OR_PHONE_IS_REQUIRED);
        }
    }

    private requireEmailAndPhone(): void {
        const EMAIL_AND_PHONE_IS_REQUIRED = 'Поля phone и email должны быть заполнено.';
        if (!this.state.email && this.state.emailTouched) {
            this.validators.email.setErrorMessage(EMAIL_AND_PHONE_IS_REQUIRED);
        }
        if (!this.state.phone && this.state.phoneTouched) {
            this.validators.phone.setErrorMessage(EMAIL_AND_PHONE_IS_REQUIRED);
        }
    }

    private requireEmail(): void {
        const EMAIL_IS_REQUIRED = 'Поле email должно быть заполнено.';      
        if (!this.state.email && this.state.emailTouched) {
            this.validators.email.setErrorMessage(EMAIL_IS_REQUIRED);
        }
    }

    private requirePhone(): void {
        const PHONE_IS_REQUIRED = 'Поле phone должно быть заполнено.';
        if (!this.state.phone && this.state.phoneTouched) {
            this.validators.phone.setErrorMessage(PHONE_IS_REQUIRED);
        }
    }

    private makeFieldsTouched(): Promise<{}> {
        return new Promise(resolve => {
            const touchedFields = Object.getOwnPropertyNames(this.state).reduce((resultData: any, currentValue: string) => {
                if (currentValue.indexOf('Touched') > -1) {
                    resultData[currentValue] = true;
                }
                return resultData;
            }, {} as TourOrderFormState);
            this.setState(touchedFields, resolve);
        });
    }

    private checkIfFormValid(): Promise<boolean> {
        return this.makeFieldsTouched()
            .then(() => Object.getOwnPropertyNames(this.validators)
                .every((key: 'city' | 'office' | 'name' | 'email' | 'phone') => !this.validators[key].hasError()));
    }

    private getInvalidFieldsData(): any {
        const invalidData: any = {};
        if (this.validators.email.hasError()) {
            invalidData.email = this.state.email;
        }
        if (this.validators.name.hasError()) {
            invalidData.name = this.state.name;
        }
        if (this.validators.phone.hasError()) {
            invalidData.phone = this.state.phone;
        }
        if (this.validators.city.hasError()) {
            invalidData.cityId = this.state.cityId;
        }
        if (this.validators.office.hasError()) {
            invalidData.officeId = this.state.officeId;
        }

        return invalidData;
    }
}
