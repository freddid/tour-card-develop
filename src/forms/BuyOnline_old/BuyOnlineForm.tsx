/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as classNames from 'classnames';
import { range, rangeRight, pick } from 'lodash';

import { UiText } from 'sletat-uikit2/dist/js/UiText';
import { UiAdaptiveSingleSelect/*, UiAdaptiveSingleSelectState */} from 'sletat-uikit2/dist/js/selects/UiAdaptiveSingleSelect';
import { UiRadioList, UiRadioListItem } from 'sletat-uikit2/dist/js/UiRadioList';
import { Price } from 'sletat-ui-components/lib/Price/Price';
import { getCurrencySymbol } from 'sletat-ui-components/lib/Price/utils';
import { PrepaymentType } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { currency } from 'sletat-api-services/lib/types';
import { numberFormat } from 'sletat-common-utils/lib/format';
import { UiCheckbox } from 'sletat-uikit2/dist/js/UiCheckbox';
import { UiDatePicker } from 'sletat-uikit2/dist/js/UiDatePicker';
import { UiIdentityDocument } from 'sletat-uikit2/dist/js/UiIdentityDocument';
import { federalPhoneMask } from 'sletat-uikit2/dist/js/input-masks/federal-phone';
import { FieldValidator } from 'sletat-uikit2/dist/js/validators/FieldValidator';
import {
    Alphabet,
    ComparisonOperators,
    UiComponentValidator,
    getRequiredValidator,
    getNameValidator,
    getAgeLessThanValidator,
    getAgeMoreThanValidator,
    getPassportSeriesValidator,
    getPassportNumberValidator,
    getDateCompareValidator,
    getEmailValidator,
    getMinCountOfNumbersValidator,
    getPhoneValidator, getIsTrueValidator
} from 'sletat-uikit2/dist/js/validators';

import { BuyOnlineFormCache } from '../FormDataCache';
import { getOfferLink } from './get-offer-link';
import { BuyOnlinePaymentOptions } from './index';
import { scrollToField, logMetric, getMonthNameByIndex } from '../../utils';


interface BuyOnlinePaymentSchema {
    advance: number;
    type: PrepaymentType;
    daysToPay: number;
}

export interface Tourist {
    firstName: string;
    secondName: string;
    birthdate: Date | null;
    sex: string;
    passportSeries: string;
    passportNumber: string;
    passportValidFrom: Date | null;
    passportValidUntil: Date | null;
    citizenship: string;
    issuedBy: string;
}

export type TouristFields = Tourist & {
    firstNameTouched: boolean;
    secondNameTouched: boolean;
    birthdateTouched: boolean;
    sexTouched: boolean;
    passportSeriesTouched: boolean;
    passportNumberTouched: boolean;
    passportValidFromTouched: boolean;
    passportValidUntilTouched: boolean;
    citizenshipTouched: boolean;
    issuedByTouched: boolean;
};

export interface Customer {
    fio: string;
    email: string;
    phone: string;
    address: string;
    passportSeries: string;
    passportNumber: string;
    passportValidFrom: Date | null;
    issuedBy: string;
}

export type CustomerFields = Customer & {
    fioTouched: boolean;
    emailTouched: boolean;
    phoneTouched: boolean;
    addressTouched: boolean;
    passportSeriesTouched: boolean;
    passportNumberTouched: boolean;
    passportValidFromTouched: boolean;
    issuedByTouched: boolean;
};

export interface BuyOnlineFormFieldsValidators {
    tourists: [{
        firstName: FieldValidator,
        secondName: FieldValidator,
        birthdate: FieldValidator,
        sex: FieldValidator,
        passportSeries: FieldValidator,
        passportNumber: FieldValidator,
        passportValidFrom: FieldValidator,
        passportValidUntil: FieldValidator,
        citizenship: FieldValidator,
        issuedBy: FieldValidator
    }];
    customer: {
        fio: FieldValidator,
        email: FieldValidator,
        phone: FieldValidator,
        address: FieldValidator,
        passportSeries: FieldValidator,
        passportNumber: FieldValidator,
        passportValidFrom: FieldValidator,
        issuedBy: FieldValidator
    };
    agreement: FieldValidator;
}

export interface BuyOnlineFormSubmittedData {
    tourists: Array<Tourist>;
    customer: Customer;
    comment: string;
    availableSchemas: Array<BuyOnlinePaymentSchema>;
    selectedSchema: number;
}

export interface BuyOnlineFormProps {
    adults: number;
    kids: number;
    isTwoStepsMode: boolean;
    paymentOptions: BuyOnlinePaymentOptions;
    target: string;
    onSubmit: any;
}

export interface BuyOnlineFormState {
    tourists: Array<TouristFields>;
    customer: CustomerFields;
    comment: string;
    commentTouched: boolean;
    isAgreementAccepted: boolean;
    isAgreementAcceptedTouched: boolean;
    selectedSchema?: number;
}

export class BuyOnlineForm extends React.Component<BuyOnlineFormProps, BuyOnlineFormState> {

    /**
     * Параметр, отключающий скролл к элементу при его фокусе. Используется, т.к на мобильных устройствах
     * скролл работает криво.
     */
    private preventScrollToField = true;
    private validators: BuyOnlineFormFieldsValidators;

    constructor(props: BuyOnlineFormProps) {
        super(props);

        this.state = this.getDefaultState();
        this.validators = this.initFieldsValidators();

        this.initCachedState();
    }

    private get adultsCount(): number {
        return this.props.adults || 0;
    }

    private get kidsCount(): number {
        return this.props.kids || 0;
    }

    private get touristsCount(): number {
        return this.adultsCount + this.kidsCount;
    }

    render() {
        const cx = this.classes();
        const isChild = (touristIdx: number) => touristIdx >= this.adultsCount;
        this.validateFields();

        return (
            <div className={cx.body}>
                {range(0, this.touristsCount).map(idx => this.renderTouristBlock(idx, isChild(idx)))}
                {this.renderCustomerBlock()}
                {this.renderCommentBlock()}
                {this.renderPaymentBlock()}
                <div className={cx.buttonsWithOffer}>
                    <UiCheckbox
                        id={'agreement-checkbox'}
                        label={this.renderOfferLabel(this.state.customer, this.state.tourists, this.props.target)}
                        inputName={'agreement-checkbox'}
                        isError={this.validators.agreement.hasError()}
                        tooltipErrorText={this.validators.agreement.errorMessage()}
                        isChecked={this.state.isAgreementAccepted}
                        onChange={() => {
                            this.setState({
                                isAgreementAccepted: !this.state.isAgreementAccepted,
                                isAgreementAcceptedTouched: true
                            } as BuyOnlineFormState);
                        }}
                    />
                    { this.renderPaymentSummary() }
                    <button
                        className={cx.buttonSendFormComment}
                        onClick={() => {
                            logMetric('click-buyonline_down');
                            this.onSubmit();
                        }}
                    >
                        {this.props.isTwoStepsMode ? 'Купить' : 'Заказать'}
                    </button>
                </div>
                {/*<p className={cx.fieldGroupSubTitle}>
                    Персональные данные обрабатываются в соответствии с действующим законодательством РФ
                    (Федеральный закон РФ от 27 июля 2006 года № 152-ФЗ «О персональных данных»).
                </p>*/}
                {/*<PersonalDataAgreement />*/}
            </div>
        );
    }

    protected classes() {
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
            fieldGroup: classNames({
                [`${BASE_CLASS}__field-group`]: true
            }),
            fieldGroupTitle: classNames({
                [`${BASE_CLASS}__field-group-title`]: true
            }),
            fieldGroupSubTitle: classNames({
                [`${BASE_CLASS}__field-group-subtitle`]: true
            }),
            table: classNames({
                [`${BASE_CLASS}__table`]: true
            }),
            tableCell: tableCell(),
            tableCellWidthThird: tableCell('width-third'),
            tableCellWidthFull: tableCell('width-full'),
            tableCellWidthSex: tableCell('width-sex'),
            tableCellWidthCitizenship: tableCell('width-citizenship'),
            offerLink: classNames({
                'tour-buy-online__link': true
            }),
            prepayment: classNames({
                'prepayment': true
            }),
            prepaymentNow: classNames({
                'prepayment-now': true
            }),
            prepaymentNowPrice: classNames({
                'prepayment-now__price': true
            }),
            prepaymentTourPrice: classNames({
                'prepayment__tour-price': true
            }),
            prepaymentScheme: classNames({
                'prepayment__scheme': true
            }),
            prepaymentSchemeTitle: classNames({
                'prepayment__scheme-title': true
            }),
            prepaymentParameters:  classNames({
                'prepayment__parameters': true
            }),
            prepaymentParametersItem:  classNames({
                'prepayment__parameters-item': true
            }),
            prepaymentParametersName:  classNames({
                'prepayment__parameters-name': true
            }),
            prepaymentParametersValue:  classNames({
                'prepayment__parameters-value': true
            }),
            prepaymentParametersTimeDate:  classNames({
                'prepayment__parameters-time-date': true
            }),
            prepaymentSchemeDescription: classNames({
                'prepayment__scheme-description': true
            }),
            buttonsWithOffer: classNames({
                [`${BASE_CLASS}__buttons`]: true,
                [`${BASE_CLASS}__buttons_with-offer`]: true
            }),
            buttonSendFormComment: classNames({
                'button-send-form-comment': true
            })
        };
    }

    private renderTouristBlock(index: number, isChild?: boolean): JSX.Element {
        const cx = this.classes();
        const tourists = this.state.tourists.slice();
        const tourist = tourists[index];
        const validator = this.validators.tourists[index];
        const blockTitle = `Турист ${index + 1} (${isChild ? 'ребенок' : 'взрослый'})`;

        return (
            <div key={index} className={cx.fieldGroup}>
                <div className={cx.fieldGroupTitle}>{blockTitle}</div>
                <div className={cx.table}>
                    <div className={cx.tableCellWidthThird}>
                        <UiText
                            controlTitle={'Имя латиницей'}
                            inputName={'tourist' + (index + 1) + 'fname-field'}
                            inputValue={tourist.firstName}
                            isError={validator.firstName.hasError()}
                            tooltipErrorText={validator.firstName.errorMessage()}
                            placeholderText={'Ivan'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                tourist.firstName = state.value;
                                tourist.firstNameTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                tourist.firstName = state.value;
                                tourist.firstNameTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiText
                            controlTitle={'Фамилия латиницей'}
                            inputName={'tourist' + (index + 1) + 'lname-field'}
                            inputValue={tourist.secondName}
                            isError={validator.secondName.hasError()}
                            tooltipErrorText={validator.secondName.errorMessage()}
                            placeholderText={'Ivanov'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                tourist.secondName = state.value;
                                tourist.secondNameTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                tourist.secondName = state.value;
                                tourist.secondNameTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiDatePicker
                            controlTitle={'Дата рождения'}
                            inputName={'tourist' + (index + 1) + 'birthday-field'}
                            inputValue={tourist.birthdate || undefined}
                            listOfYears={rangeRight(1900, (new Date()).getFullYear() + 1)}
                            isError={validator.birthdate.hasError()}
                            tooltipErrorText={validator.birthdate.errorMessage()}
                            isEditable={false}
                            placeholderText={'дд.мм.гггг'}
                            bemModifications={[cx.base]}
                            onChange={(state) => {
                                tourist.birthdate = state.date;
                                tourist.birthdateTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthSex}>
                        <UiAdaptiveSingleSelect
                            controlTitle={'Пол'}
                            inputName={'tourist' + (index + 1) + 'sex-field'}
                            options={[
                                { inputValue: 'М', label: 'M' },
                                { inputValue: 'Ж', label: 'Ж' }
                            ]}
                            inputValue={tourist.sex}
                            isError={validator.sex.hasError()}
                            tooltipErrorText={validator.sex.errorMessage()}
                            bemModifications={[cx.base]}
                            onChange={(state) => {
                                tourist.sex = state.selectedValue;
                                tourist.sexTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                </div>
                <div className={cx.table}>
                    <div className={cx.tableCellWidthThird}>
                        <UiIdentityDocument
                            controlTitle={'Серия и номер ' + (isChild ? 'документа' : 'загранпаспорта')}
                            inputName={'tourist' + (index + 1) + 'identity-field'}
                            seriesValue={tourist.passportSeries}
                            numberValue={tourist.passportNumber}
                            isSeriesError={validator.passportSeries.hasError()}
                            isNumberError={validator.passportNumber.hasError()}
                            errorMessage={
                                validator.passportSeries.hasError() && validator.passportSeries.errorMessage() ||
                                validator.passportNumber.hasError() && validator.passportNumber.errorMessage() || ''
                            }
                            bemModifications={[cx.base]}
                            onFocus={state => this.scrollToField(state.target)}
                            seriesPlaceholder={'12'}
                            numberPlaceholder={'789234'}
                            onSeriesBlur={(state) => {
                                tourist.passportSeries = state.value;
                                tourist.passportSeriesTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onNumberBlur={(state) => {
                                tourist.passportNumber = state.value;
                                tourist.passportNumberTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onSeriesChange={(state) => {
                                tourist.passportSeries = state.value;
                                tourist.passportSeriesTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onNumberChange={(state) => {
                                tourist.passportNumber = state.value;
                                tourist.passportNumberTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiDatePicker
                            controlTitle={'Дата выдачи'}
                            inputName={'tourist' + (index + 1) + 'passport-valid-from-field'}
                            inputValue={tourist.passportValidFrom || undefined}
                            listOfYears={rangeRight((new Date()).getFullYear() - 20, (new Date()).getFullYear() + 1)}
                            isEditable={false}
                            placeholderText={'дд.мм.гггг'}
                            isError={validator.passportValidFrom.hasError()}
                            tooltipErrorText={validator.passportValidFrom.errorMessage()}
                            bemModifications={[cx.base]}
                            onChange={(state) => {
                                tourist.passportValidFrom = state.date;
                                tourist.passportValidFromTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiDatePicker
                            controlTitle={'Действителен до'}
                            inputName={'tourist' + (index + 1) + 'passport-valid-until-field'}
                            inputValue={tourist.passportValidUntil || undefined}
                            listOfYears={rangeRight((new Date()).getFullYear(), (new Date()).getFullYear() + 20)}
                            isEditable={false}
                            placeholderText={'дд.мм.гггг'}
                            isError={validator.passportValidUntil.hasError()}
                            tooltipErrorText={validator.passportValidUntil.errorMessage()}
                            bemModifications={[cx.base]}
                            onChange={(state) => {
                                tourist.passportValidUntil = state.date;
                                tourist.passportValidUntilTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthCitizenship}>
                        <UiText
                            controlTitle={'Гражд.'}
                            inputName={'tourist' + (index + 1) + 'citizenship-field'}
                            inputValue={tourist.citizenship}
                            placeholderText={'RU'}
                            isError={validator.citizenship.hasError()}
                            tooltipErrorText={validator.citizenship.errorMessage()}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                tourist.citizenship = state.value;
                                tourist.citizenshipTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                tourist.citizenship = state.value;
                                tourist.citizenshipTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                </div>
                <div className={cx.table}>
                    <div className={cx.tableCellWidthFull}>
                        <UiText
                            controlTitle={'Кем выдан'}
                            inputName={'tourist' + (index + 1) + 'issued-by-field'}
                            inputValue={tourist.issuedBy}
                            isError={validator.issuedBy.hasError()}
                            tooltipErrorText={validator.issuedBy.errorMessage()}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                tourist.issuedBy = state.value;
                                tourist.issuedByTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                tourist.issuedBy = state.value;
                                tourist.issuedByTouched = true;
                                this.setState({ tourists } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                </div>
            </div >
        );
    };

    private renderCustomerBlock(): JSX.Element {
        const cx = this.classes();
        const customer = this.state.customer;
        const validator = this.validators.customer;

        return (
            <div className={cx.fieldGroup}>
                <div className={cx.fieldGroupTitle}>Заказчик</div>
                <div className={cx.fieldGroupSubTitle}>Тот, на кого будет оформлен договор</div>
                <div className={cx.table}>
                    <div className={cx.tableCell}>
                        <UiText
                            controlTitle={'ФИО кириллицей'}
                            inputName={'customer-fio-field'}
                            inputValue={customer.fio}
                            isError={validator.fio.hasError()}
                            tooltipErrorText={validator.fio.errorMessage()}
                            placeholderText={'Иванов Иван Иванович'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                customer.fio = state.value;
                                customer.fioTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                customer.fio = state.value;
                                customer.fioTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiText
                            controlTitle={'Эл. почта'}
                            inputName={'customer-email-field'}
                            inputValue={customer.email}
                            inputType={'email'}
                            isError={validator.email.hasError()}
                            tooltipErrorText={validator.email.errorMessage()}
                            placeholderText={'ivanov-ivan@example.com'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                customer.email = state.value;
                                customer.emailTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                customer.email = state.value;
                                customer.emailTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiText
                            controlTitle={'Телефон'}
                            maskOptions={{
                                mask: federalPhoneMask()
                            }}
                            inputName={'customer-phone-field'}
                            inputValue={customer.phone}
                            isError={validator.phone.hasError()}
                            tooltipErrorText={validator.phone.errorMessage()}
                            placeholderText={'+7 xxx xxx xx xx'}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                customer.phone = state.value;
                                customer.phoneTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                customer.phone = state.value;
                                customer.phoneTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                </div>
                <div className={cx.table}>
                    <div className={cx.tableCell}>
                        <UiText
                            controlTitle={'Адрес'}
                            inputName={'customer-address-field'}
                            inputValue={customer.address}
                            maxLength={100}
                            isError={validator.address.hasError()}
                            tooltipErrorText={validator.address.errorMessage()}
                            bemModifications={[cx.base]}
                            onFocus={(state) => this.scrollToField(state.target!)}
                            onBlur={(state) => {
                                customer.address = state.value;
                                customer.addressTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onChange={(state) => {
                                customer.address = state.value;
                                customer.addressTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiIdentityDocument
                            controlTitle={'Серия и номер паспорта'}
                            inputName={'customer-identity-field'}
                            seriesValue={customer.passportSeries}
                            numberValue={customer.passportNumber}
                            seriesPlaceholder={'3006'}
                            numberPlaceholder={'315476'}
                            isSeriesError={validator.passportSeries.hasError()}
                            isNumberError={validator.passportNumber.hasError()}
                            errorMessage={
                                validator.passportSeries.hasError() && validator.passportSeries.errorMessage() ||
                                validator.passportNumber.hasError() && validator.passportNumber.errorMessage() || ''
                            }
                            bemModifications={[cx.base]}
                            onFocus={state => this.scrollToField(state.target)}
                            onSeriesBlur={(state) => {
                                customer.passportSeries = state.value;
                                customer.passportSeriesTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onNumberBlur={(state) => {
                                customer.passportNumber = state.value;
                                customer.passportNumberTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onSeriesChange={(state) => {
                                customer.passportSeries = state.value;
                                customer.passportSeriesTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                            onNumberChange={(state) => {
                                customer.passportNumber = state.value;
                                customer.passportNumberTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                    <div className={cx.tableCellWidthThird}>
                        <UiDatePicker
                            controlTitle={'Когда выдан'}
                            inputName={'customer-passport-valid-from-field'}
                            inputValue={customer.passportValidFrom || undefined}
                            listOfYears={rangeRight((new Date()).getFullYear() - 20, (new Date()).getFullYear() + 1)}
                            isError={validator.passportValidFrom.hasError()}
                            tooltipErrorText={validator.passportValidFrom.errorMessage()}
                            isEditable={false}
                            placeholderText={'дд.мм.гггг'}
                            bemModifications={[cx.base]}
                            onChange={(state) => {
                                customer.passportValidFrom = state.date;
                                customer.passportValidFromTouched = true;
                                this.setState({ customer } as BuyOnlineFormState);
                            }}
                        />
                    </div>
                </div>
                <UiText
                    controlTitle={'Кем выдан'}
                    inputName={'customer-issued-by-field'}
                    inputValue={customer.issuedBy}
                    isError={validator.issuedBy.hasError()}
                    tooltipErrorText={validator.issuedBy.errorMessage()}
                    bemModifications={[cx.base]}
                    onFocus={(state) => this.scrollToField(state.target!)}
                    onBlur={(state) => {
                        customer.issuedBy = state.value;
                        customer.issuedByTouched = true;
                        this.setState({ customer } as BuyOnlineFormState);
                    }}
                    onChange={(state) => {
                        customer.issuedBy = state.value;
                        customer.issuedByTouched = true;
                        this.setState({ customer } as BuyOnlineFormState);
                    }}
                />
            </div>
        );
    }

    private renderCommentBlock(): JSX.Element {
        const cx = this.classes();

        return (
            <div>
                <div className={cx.fieldGroupTitle}>Комментарий</div>
                <div className={cx.fieldGroupSubTitle}>Если у Вас есть особые пожелания</div>
                <UiText
                    controlTitle={''}
                    inputName={'comment-field'}
                    inputValue={this.state.comment}
                    maxLength={300}
                    isMultiLine={true}
                    bemModifications={[cx.base]}
                    onFocus={(state) => this.scrollToField(state.target!)}
                    onBlur={(state) => {
                        this.setState({
                            comment: state.value,
                            commentTouched: true
                        } as BuyOnlineFormState);
                    }}
                    onChange={(state) => {
                        this.setState({
                            comment: state.value,
                            commentTouched: true
                        } as BuyOnlineFormState);
                    }}
                />
            </div>
        );
    }

    private renderPaymentBlock(): JSX.Element | null {
        if (!this.props.paymentOptions || !this.props.paymentOptions.schemas || typeof this.state.selectedSchema !== 'number') {
            return null;
        }

        const cx = this.classes();
        let selectedIndex: number = this.state.selectedSchema;

        return (
            <div className={cx.prepayment}>
                <p className={cx.prepaymentTourPrice}>
                    <span>Цена за тур: </span>
                    <Price
                        price={this.props.paymentOptions.price}
                        currency={this.props.paymentOptions.currency as any}
                    />
                </p>
                <div className={cx.prepaymentScheme}>
                    <p className={cx.prepaymentSchemeTitle}>Способ оплаты</p>
                    <UiRadioList
                        inputName={'payment_schema'}
                        radioList={this.getPaymentRadio()}
                        checkedValue={String(selectedIndex)}
                        bemModifications={[cx.prepayment]}
                        onChange={(state) => {
                            this.setState({ selectedSchema: parseInt(state.checkedValue, 10) } as any);
                        }}
                    />
                </div>
                {this.renderPaymentDetails(selectedIndex)}
            </div>
        );
    }

    private getPaymentRadio(): UiRadioListItem[] {
        let schemas: Array<BuyOnlinePaymentSchema> = this.props.paymentOptions.schemas || [];
        let tourPrice: number = this.props.paymentOptions.price;
        let currency: currency = this.props.paymentOptions.currency;

        const formatPaymentLabel = (schema: BuyOnlinePaymentSchema, isLast: boolean): string => {
            if (isLast) {
                return `Полная оплата`;
            } else if (schema.type === PrepaymentType.percent) {
                // tslint:disable-next-line:max-line-length
                return `Предоплата ${Math.round(schema.advance / tourPrice * 100)}% (${numberFormat(schema.advance)} ${getCurrencySymbol(currency as any)})`;
            } else {
                return `Предоплата (${numberFormat(schema.advance)} ${getCurrencySymbol(currency as any)})`;
            }
        };

        return schemas.map((schema: BuyOnlinePaymentSchema, i: number) => {
            let isLast: boolean = schemas.length - 1 === i;

            return {
                label: formatPaymentLabel(schema, isLast),
                inputValue: String(i)
            };
        });
    }

    private renderPaymentDetails(selectedIndex: number): JSX.Element | null {
        const cx = this.classes();
        if (!this.props.paymentOptions.schemas) {
            return null;
        }
        let tourPrice: number = this.props.paymentOptions.price;
        let selectedSchema: BuyOnlinePaymentSchema | null = this.props.paymentOptions.schemas[selectedIndex];
        let daysToPay: Date = new Date();
        let remainingPrice: number = tourPrice - selectedSchema.advance;

        daysToPay.setDate(daysToPay.getDate() + selectedSchema.daysToPay);
        const payToDate = daysToPay.getDate();
        const payToMonth = getMonthNameByIndex(daysToPay.getMonth());

        if (remainingPrice === 0) {
            return null;
        }

        return (
            <div className={cx.prepaymentSchemeDescription}>
                <div className={cx.prepaymentParameters}>
                    <dl className={cx.prepaymentParametersItem}>
                        <dt className={cx.prepaymentParametersName}>Размер аванса</dt>
                        <dd className={cx.prepaymentParametersValue}>
                            <Price
                                price={selectedSchema.advance}
                                currency={this.props.paymentOptions.currency as any}
                            />
                        </dd>
                    </dl>
                    <dl className={cx.prepaymentParametersItem}>
                        <dt className={cx.prepaymentParametersName}>Оставшаяся часть</dt>
                        <dd className={cx.prepaymentParametersValue}>
                            <Price
                                price={remainingPrice}
                                currency={this.props.paymentOptions.currency as any}
                            />
                        </dd>
                    </dl>
                </div>
                <p className={cx.prepaymentParametersItem}>
                    <span>оплатить </span>
                    <b className={cx.prepaymentParametersTimeDate}>до {`${payToDate} ${payToMonth}`}</b>
                </p>
            </div>
        );
    }

    private renderOfferLabel(customer: CustomerFields, tourists: Array<TouristFields>, target: string): JSX.Element {
        const cx = this.classes();

        return (
            <span>
                {`я согласен с условиями `}
                <a id="offer-link"
                   target="_blank"
                   className={cx.offerLink}
                   href={getOfferLink(customer, tourists, target)}>
                    оферты
                </a>
            </span>
        );
    }

    private renderPaymentSummary(): JSX.Element | null {
        if (!this.props.paymentOptions || !this.props.paymentOptions.schemas) {
            return null;
        }

        const cx = this.classes();
        let schemas: Array<BuyOnlinePaymentSchema> = this.props.paymentOptions.schemas;
        const price: number = schemas && typeof this.state.selectedSchema === 'number'
            ? schemas[this.state.selectedSchema].advance
            : this.props.paymentOptions.price;

        return (
            <p className={cx.prepaymentNow}>
                <span>{schemas ? 'К оплате сейчас' : 'К оплате'}: </span>
                <span className={cx.prepaymentNowPrice}>
                    <Price
                        price={price}
                        currency={this.props.paymentOptions.currency as any}
                    />
                </span>
            </p>
        );
    }

    private onSubmit(): void {
        this.checkIfFormValid()
            .then((isFormValid: boolean) => {
                if (isFormValid) {
                    BuyOnlineFormCache.saveFormData(this.state);

                    this.props.onSubmit({
                        tourists: this.state.tourists.map(tourist => pick(tourist, [
                            'firstName', 'secondName', 'birthdate', 'sex', 'passportSeries', 'passportNumber',
                            'passportValidFrom', 'passportValidUntil', 'citizenship', 'issuedBy'])
                        ),
                        customer: pick(this.state.customer, [
                            'fio', 'email', 'phone', 'address', 'passportSeries', 'passportNumber',
                            'passportValidFrom', 'issuedBy']
                        ),
                        comment: this.state.comment,
                        availableSchemas: this.props.paymentOptions.schemas,
                        selectedSchema: this.state.selectedSchema
                    } as BuyOnlineFormSubmittedData);
                }
            });
    }

    private initCachedState(): void {
        const cache = new BuyOnlineFormCache();
        cache.loadCachedData()
            .then(() => {
                if (!cache.customer) {
                    return;
                }
                this.setState({
                    customer: cache.customer
                } as any);
            })
            .catch((ex) => {
                throw new Error(ex);
            });
    }

    private getDefaultState(): BuyOnlineFormState {
        let selectedSchema = null;

        if (this.props.paymentOptions && this.props.paymentOptions.schemas) {
            selectedSchema = this.props.paymentOptions.schemas.length - 1;
        }

        return {
            tourists: range(0, this.touristsCount).map(item => this.getDefaultTouristState()),
            customer: this.getDefaultCustomerState(),
            comment: '',
            commentTouched: false,
            isAgreementAccepted: false,
            isAgreementAcceptedTouched: false,
            selectedSchema
        } as BuyOnlineFormState;
    }

    private getDefaultTouristState(): TouristFields {
        return {
            firstName: '',
            firstNameTouched: false,
            secondName: '',
            secondNameTouched: false,
            birthdate: null,
            birthdateTouched: false,
            sex: 'М',
            sexTouched: false,
            passportSeries: '',
            passportSeriesTouched: false,
            passportNumber: '',
            passportNumberTouched: false,
            passportValidFrom: null,
            passportValidFromTouched: false,
            passportValidUntil: null,
            passportValidUntilTouched: false,
            citizenship: '',
            citizenshipTouched: false,
            issuedBy: '',
            issuedByTouched: false
        };
    }

    private getDefaultCustomerState(): CustomerFields {
        return {
            fio: '',
            fioTouched: false,
            email: '',
            emailTouched: false,
            phone: '',
            phoneTouched: false,
            passportSeries: '',
            passportSeriesTouched: false,
            passportNumber: '',
            passportNumberTouched: false,
            address: '',
            addressTouched: false,
            passportValidFrom: null,
            passportValidFromTouched: false,
            issuedBy: '',
            issuedByTouched: false
        };
    }

    private initFieldsValidators(): BuyOnlineFormFieldsValidators {
        const isChild = (idx: number) => idx >= this.adultsCount;
        const PASSPORT_REQUIRED_VALIDATOR_MESSAGE = 'Серия и номер паспорта обязательны для заполнения!';

        return {
            tourists: this.state.tourists.map((tourist, idx) => {
                return {
                    firstName: new FieldValidator([
                        getRequiredValidator(),
                        getNameValidator(undefined, { alphabet: Alphabet.Latin })
                    ]),
                    secondName: new FieldValidator([
                        getRequiredValidator(),
                        getNameValidator(undefined, { alphabet: Alphabet.Latin })
                    ]),
                    birthdate: new FieldValidator([
                        getRequiredValidator(),
                        isChild(idx)
                            ? getAgeLessThanValidator(18)
                            : getAgeMoreThanValidator(17)
                    ]),
                    sex: new FieldValidator([]),
                    passportSeries: new FieldValidator([
                        getRequiredValidator(PASSPORT_REQUIRED_VALIDATOR_MESSAGE),
                        getPassportSeriesValidator(undefined, {
                            isChild: isChild(idx)
                        })
                    ]),
                    passportNumber: new FieldValidator([
                        getRequiredValidator(PASSPORT_REQUIRED_VALIDATOR_MESSAGE),
                        getPassportNumberValidator()
                    ]),
                    passportValidFrom: this.getPassportValidFromValidator(undefined),
                    passportValidUntil: new FieldValidator([
                        getRequiredValidator(),
                        getDateCompareValidator(new Date(), { operator: ComparisonOperators.MoreOrEqual })
                    ]),
                    citizenship: new FieldValidator([ getRequiredValidator() ]),
                    issuedBy: new FieldValidator([ getRequiredValidator() ]),
                };
            }),
            customer: {
                fio: new FieldValidator([
                    getRequiredValidator(),
                    getNameValidator(undefined, { alphabet: Alphabet.Cyrillic })
                ]),
                email: new FieldValidator([
                    getRequiredValidator(),
                    getEmailValidator()
                ]),
                phone: new FieldValidator([
                    getRequiredValidator(),
                    getPhoneValidator(),
                    getMinCountOfNumbersValidator(5)
                ]),
                passportSeries: new FieldValidator([
                    getRequiredValidator(PASSPORT_REQUIRED_VALIDATOR_MESSAGE),
                    getPassportSeriesValidator()
                ]),
                passportNumber: new FieldValidator([
                    getRequiredValidator(PASSPORT_REQUIRED_VALIDATOR_MESSAGE),
                    getPassportNumberValidator()
                ]),
                passportValidFrom: this.getPassportValidFromValidator(undefined),
                address: new FieldValidator([ getRequiredValidator() ]),
                issuedBy: new FieldValidator([ getRequiredValidator() ])
            },
            agreement: new FieldValidator([
                getIsTrueValidator('Подтвердите, что Вы согласны с условиями оферты!')
            ])
        } as BuyOnlineFormFieldsValidators;
    }

    private getPassportValidFromValidator(dataToCompare: Date | undefined): FieldValidator {
        let validators: Array<UiComponentValidator> = [
            getRequiredValidator(),
            getDateCompareValidator(new Date(), { operator: ComparisonOperators.LessOrEqual })
        ];
        if (dataToCompare) {
            validators.push(
                getDateCompareValidator(dataToCompare, { operator: ComparisonOperators.MoreOrEqual })
            );
        }
        return new FieldValidator(validators);
    }

    private validateFields(): void {
        this.state.tourists.forEach((tourist, idx) => {
            const touristValidators = this.validators.tourists[idx];
            if (!!touristValidators) {
                touristValidators.firstName.validate(tourist.firstName, tourist.firstNameTouched);
                touristValidators.secondName.validate(tourist.secondName, tourist.secondNameTouched);
                touristValidators.birthdate.validate(tourist.birthdate, tourist.birthdateTouched);
                touristValidators.sex.validate(tourist.sex, tourist.sexTouched);
                touristValidators.passportSeries.validate(tourist.passportSeries, tourist.passportSeriesTouched);
                touristValidators.passportNumber.validate(tourist.passportNumber, tourist.passportNumberTouched);

                touristValidators.passportValidFrom = this.getPassportValidFromValidator(tourist.birthdate || undefined);
                touristValidators.passportValidFrom.validate(tourist.passportValidFrom, tourist.passportValidFromTouched);

                touristValidators.passportValidUntil.validate(tourist.passportValidUntil, tourist.passportValidUntilTouched);
                touristValidators.citizenship.validate(tourist.citizenship, tourist.citizenshipTouched);
                touristValidators.issuedBy.validate(tourist.issuedBy, tourist.issuedByTouched);
            }
        });

        const customer = this.state.customer;
        const customerValidator = this.validators.customer;
        if (!!customerValidator) {
            customerValidator.fio.validate(customer.fio, customer.fioTouched);
            customerValidator.email.validate(customer.email, customer.emailTouched);
            customerValidator.phone.validate(customer.phone, customer.phoneTouched);
            customerValidator.passportSeries.validate(customer.passportSeries, customer.passportSeriesTouched);
            customerValidator.passportNumber.validate(customer.passportNumber, customer.passportNumberTouched);
            customerValidator.passportValidFrom.validate(customer.passportValidFrom, customer.passportValidFromTouched);
            customerValidator.address.validate(customer.address, customer.addressTouched);
            customerValidator.issuedBy.validate(customer.issuedBy, customer.issuedByTouched);
        }

        this.validators.agreement.validate(this.state.isAgreementAccepted, this.state.isAgreementAcceptedTouched);
    }

    private makeFieldsTouched(): Promise<{}> {
        const makeFieldsInObjectTouched = (data: any): BuyOnlineFormState => {
            return Object.getOwnPropertyNames(data).reduce((resultData: any, currentValue: string) => {
                if (data[currentValue] instanceof Array) {
                    resultData[currentValue] = data[currentValue].map((item: string) => makeFieldsInObjectTouched(item));
                } else if ((data[currentValue] instanceof Object) && !(data[currentValue] instanceof Date)) {
                    resultData[currentValue] = makeFieldsInObjectTouched(data[currentValue]);
                } else if (currentValue.indexOf('Touched') > -1) {
                    resultData[currentValue] = true;
                } else {
                    resultData[currentValue] = data[currentValue];
                }

                return resultData;
            }, {} as BuyOnlineFormState);
        };

        return new Promise(resolve => {
            const touchedFields = makeFieldsInObjectTouched(this.state);
            this.setState(touchedFields, resolve);
        });
    }

    private checkIfFormValid(): Promise<boolean> {
        const checkIfFieldsValid = (entityToValidate: any): boolean => {
            return Object.getOwnPropertyNames(entityToValidate).every(key => {
                if (entityToValidate[key] instanceof Array) {
                    return entityToValidate[key].every((item: any) => checkIfFieldsValid(item));
                } else if (entityToValidate[key] instanceof FieldValidator) {
                    return !entityToValidate[key].hasError();
                } else {
                    return checkIfFieldsValid(entityToValidate[key]);
                }
            });
        };

        return this.makeFieldsTouched()
            .then(() => checkIfFieldsValid(this.validators));
    }

    private scrollToField(target: HTMLElement) {
        if (!this.preventScrollToField) {
            scrollToField(target);
        }
    }
}
