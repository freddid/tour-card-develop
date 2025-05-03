/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';
import { rangeRight } from 'lodash';
import { observer } from 'mobx-react';
import { IReactionDisposer, reaction } from 'mobx';
import { Collapse } from 'react-collapse';
import { UiText } from 'sletat-uikit2/dist/js/UiText';
import { UiDatePicker } from '../uikit/UiDatePicker';
import { federalPhoneMask } from 'sletat-uikit2/dist/js/input-masks/federal-phone';
import { emailFormatter } from 'sletat-uikit2/dist/js/input-formatters/email';
import { DateMaskCorrectionType } from 'sletat-uikit2/dist/js/input-masks/date';
import { NAME_VALIDATOR_ID } from 'sletat-uikit2/dist/js/validators';
import { replaceToCyrKeyboardChar } from '../../../utils/transliteration';

import S from '../../../stores';
import { nameFormatter } from '../../../utils/buy-online';


interface CustomerDataFormProps {}


@observer
export class CustomerDataForm extends React.Component<CustomerDataFormProps> {

    private focusedStatesDisposer: IReactionDisposer | null = null;

    private surnameField = 'customer_surname';
    private firstNameField = 'customer_firstname';
    private patronymicField = 'customer_patronymic';
    private phoneField = 'customer_phone';
    private emailField = 'customer_email';
    private passportFieldSeries = 'customer_passport_series';
    private passportFieldNumber = 'customer_passport_number';
    private passportIssuedWhenField = 'customer_date_of_issue';
    private passportIssuedByField = 'customer_passport_issued_by';
    private addressField = 'customer_address';

    private firstNameFieldRef: HTMLInputElement | null = null;
    private surnameFieldRef: HTMLInputElement | null = null;
    private patronymicFieldRef: HTMLInputElement | null = null;
    private phoneFieldRef: HTMLInputElement | null = null;
    private emailFieldRef: HTMLInputElement | null = null;
    private addressFieldRef: HTMLInputElement | null = null;
    private passportSeriesFieldRef: HTMLInputElement | null = null;
    private passportNumberFieldRef: HTMLInputElement | null = null;
    private passportIssuedWhenFieldRef: HTMLInputElement | HTMLTextAreaElement | null = null;
    private passportIssuedByFieldRef: HTMLInputElement | null = null;
    
    state = {
        prevFirstName: '',
        prevSurname: '',
        isCheckedCheckboxPatronymic: false,
        isVisibleCheckboxPatronymic: S.buyOnlineStore.isMgtModule,
      };

    checkboxPatronymicHandler = () => {
        const { customerData } = S.buyOnlineStore;
        const { isCheckedCheckboxPatronymic} = this.state;

        customerData.setIsRequiredPatronymic(!customerData.isRequiredPatronymic)
        customerData.setPatronymicFieldState(
            { value: '', isTouched: false }
        );
        
        this.setState({
            ...this.state,
            isCheckedCheckboxPatronymic: !isCheckedCheckboxPatronymic,
          });
    }

    checkNameAndSurnameFieldsIsNotEmpty = () => {
        const { prevFirstName, prevSurname, isCheckedCheckboxPatronymic} = this.state;
    
        if (!isCheckedCheckboxPatronymic) {
            const { customerData, isMgtModule } = S.buyOnlineStore;
            const { firstNameFieldState, surnameFieldState, isRequiredPatronymic } = S.buyOnlineStore.customerData;

            if (firstNameFieldState.value !== prevFirstName ||
                surnameFieldState.value !== prevSurname) { 
                const isNotEmptyNameAndSurnameFields = !!firstNameFieldState.value && !!surnameFieldState.value;

                if (!isMgtModule && isRequiredPatronymic !== isNotEmptyNameAndSurnameFields) {
                    customerData.setIsRequiredPatronymic(isNotEmptyNameAndSurnameFields)
                };
                
                this.setState({
                    ...this.state,
                    isVisibleCheckboxPatronymic: isMgtModule || isNotEmptyNameAndSurnameFields,
                    prevFirstName: firstNameFieldState.value,
                    prevSurname: surnameFieldState.value
                });
            }
        }
    }

    componentDidUpdate(): void  {
        this.checkNameAndSurnameFieldsIsNotEmpty(); 
      }
    
    componentDidMount(): void {
        const { isMgtModule, customerData } = S.buyOnlineStore;
        
        if (isMgtModule) {
            customerData.setIsRequiredPatronymic(true);
        }  

        this.initFocusedStatesDisposer(); 
    }

    componentWillUnmount(): void {
        if (this.focusedStatesDisposer) {
            this.focusedStatesDisposer();
        }
    }


    render() {
        const blockName = bemCn('customer-data-form');

        return (
            <div className={blockName()}>
                <div className={blockName('title-wrap')()}>
                    <h3 className={blockName('title')()}>Покупатель</h3>
                </div>
                <p className={blockName('subtitle')()}>
                    {S.buyOnlineStore.isMgtModule ? `Для покупки необходимо заполнить все данные по покупателю и туристам` 
                    : `Для покупки достаточно заполнить телефон и эл. почту`}
                </p>
                {this.renderFormRows(blockName)}
            </div>
        );
    }

    renderFormRows(blockName: bemCn.Inner): JSX.Element {
        return (
            <>
                {this.renderFullNameRow(blockName)}
                {this.renderPhoneEmailRow(blockName)}
                {this.renderPassportDataRow(blockName)}
                {this.renderLocationDataRows(blockName)}
            </>
        );
    }

    renderFullNameRow(blockName: bemCn.Inner): JSX.Element {
        return (
            <div className={blockName('row')({ 'name-row': true })()}>
                <div className={blockName('input')({ 'surname': true })()}>
                    <UiText
                        inputName={this.surnameField}
                        inputRef={(elem: HTMLInputElement) => this.surnameFieldRef = elem}
                        controlTitle={'Фамилия'}
                        inputValue={S.buyOnlineStore.customerData.surnameFieldState.value}
                        inputTextFormatter={nameFormatter()}
                        placeholderText={'Иванов'}
                        isError={!!S.buyOnlineStore.customerData.surnameValidation.errorMessage}
                        isValid={S.buyOnlineStore.customerData.surnameValidation.isValidAndTouched}
                        bemModifications={['buy-online']}
                        maxLength={255}
                        useTooltipAnimation={true}
                        onValidationIconClick={() => {
                            this.surnameFieldRef!.focus();
                            S.buyOnlineStore.customerData.setSurnameFieldState({ value: '', isTouched: false });
                        }}
                        onFocus={state => {
                            S.buyOnlineStore.customerData.setSurnameFieldState({ value: state.value, isTouched: false });
                        }}
                        onChange={state => {
                            S.buyOnlineStore.customerData.setSurnameFieldState({ value: state.value, isTouched: false });
                        }}
                        onBlur={state => {
                            S.buyOnlineStore.customerData.setSurnameFieldState({
                                value: state.value.trim(),
                                isTouched: true
                            });
                        }}
                    />
                    {this.renderCustomerSurnameErrorTooltip(blockName)}
                </div>
                <div className={blockName('input')({ 'firstname': true })()}>
                    <UiText
                        inputName={this.firstNameField}
                        inputRef={(elem: HTMLInputElement) => this.firstNameFieldRef = elem}
                        controlTitle={'Имя'}
                        inputValue={S.buyOnlineStore.customerData.firstNameFieldState.value}
                        inputTextFormatter={nameFormatter()}
                        placeholderText={'Иван'}
                        isError={!!S.buyOnlineStore.customerData.firstNameValidation.errorMessage}
                        isValid={S.buyOnlineStore.customerData.firstNameValidation.isValidAndTouched}
                        bemModifications={['buy-online']}
                        maxLength={255}
                        useTooltipAnimation={true}
                        onValidationIconClick={() => {
                            this.firstNameFieldRef!.focus();
                            S.buyOnlineStore.customerData.setFirstNameFieldState({ value: '', isTouched: false });
                        }}
                        onFocus={state => {
                            S.buyOnlineStore.customerData.setFirstNameFieldState({ value: state.value, isTouched: false });
                        }}
                        onChange={state => {
                            S.buyOnlineStore.customerData.setFirstNameFieldState({ value: state.value, isTouched: false });
                        }}
                        onBlur={state => {
                            S.buyOnlineStore.customerData.setFirstNameFieldState({
                                value: state.value.trim(),
                                isTouched: true
                            });
                        }}
                    />
                    {this.renderCustomerFirstNameErrorTooltip(blockName)}
                </div>
                <div className={blockName('input')()}>
                    <UiText
                        inputName={this.patronymicField}
                        inputRef={(elem: HTMLInputElement) => this.patronymicFieldRef = elem}
                        controlTitle={'Отчество'}
                        inputValue={
                            this.state.isVisibleCheckboxPatronymic 
                            && this.state.isCheckedCheckboxPatronymic
                            ? "Отсутствует"
                            : S.buyOnlineStore.customerData.patronymicFieldState.value
                        } 
                        inputTextFormatter={nameFormatter()}
                        placeholderText={'Иванович'}
                        isError={!!S.buyOnlineStore.customerData.patronymicValidation.errorMessage}
                        isValid={S.buyOnlineStore.customerData.patronymicValidation.isValidAndTouched}
                        bemModifications={['buy-online']}
                        maxLength={255}
                        useTooltipAnimation={true}
                        onValidationIconClick={() => {
                            this.patronymicFieldRef!.focus();
                            S.buyOnlineStore.customerData.setPatronymicFieldState({ value: '', isTouched: false });
                        }}
                        onFocus={state => {
                            S.buyOnlineStore.customerData.setPatronymicFieldState({ value: state.value, isTouched: false });
                        }}
                        onChange={state => {
                            S.buyOnlineStore.customerData.setPatronymicFieldState({ value: state.value, isTouched: false });
                        }}
                        onBlur={state => {
                            S.buyOnlineStore.customerData.setPatronymicFieldState({
                                value: state.value.trim(),
                                isTouched: true
                            });
                        }}
                        isDisabled={this.state.isCheckedCheckboxPatronymic && this.state.isVisibleCheckboxPatronymic}
                    />
                    {this.renderCustomerPatronymicErrorTooltip(blockName)}
                    {this.state.isVisibleCheckboxPatronymic && 
                    <div className={blockName('checkboxPatronymic')()}>
                      <input type='checkbox'  onChange={this.checkboxPatronymicHandler} 
                        checked={this.state.isCheckedCheckboxPatronymic}/>
                        &nbsp; Нет отчества  
                    </div>}
                </div>
            </div>
        );
    }

    renderPhoneEmailRow(blockName: bemCn.Inner): JSX.Element {
        return (
            <div className={blockName('row')()}>
                <div className={blockName('input')({ 'phone-input': true })()}>
                    <UiText
                        inputName={this.phoneField}
                        controlTitle={'Телефон'}
                        maskOptions={{
                            mask: federalPhoneMask()
                        }}
                        inputRef={(elem: HTMLInputElement) => this.phoneFieldRef = elem}
                        inputValue={S.buyOnlineStore.customerData.phoneFieldState.value}
                        isError={!!S.buyOnlineStore.customerData.phoneValidation.errorMessage}
                        isValid={S.buyOnlineStore.customerData.phoneValidation.isValidAndTouched}
                        tooltipErrorText={S.buyOnlineStore.customerData.phoneValidation.errorMessage}
                        placeholderText={'+7 xxx xxx xx xx'}
                        wrapperClass={blockName('input')()}
                        bemModifications={['buy-online']}
                        useTooltipAnimation={true}
                        onValidationIconClick={() => {
                            this.phoneFieldRef!.focus();
                            S.buyOnlineStore.customerData.setPhoneFieldState({ value: '', isTouched: false });
                        }}
                        onFocus={state => {
                            S.buyOnlineStore.customerData.setPhoneFieldState({
                                value: state.value,
                                isTouched: false
                            });
                        }}
                        onChange={state => {
                            S.buyOnlineStore.customerData.setPhoneFieldState({ value: state.value, isTouched: false });
                        }}
                        onBlur={state => {
                            S.buyOnlineStore.customerData.setPhoneFieldState({ value: state.value, isTouched: true });
                            S.buyOnlineStore.customerData.setFocusedFieldsStates({ isPhoneFocused: false });
                        }}
                    />
                </div>
                <div className={blockName('input')()}>
                    <UiText
                        inputName={this.emailField}
                        controlTitle={'Эл. почта'}
                        inputValue={S.buyOnlineStore.customerData.emailFieldState.value}
                        inputRef={(elem: HTMLInputElement) => this.emailFieldRef = elem}
                        inputTextFormatter={emailFormatter()}
                        isError={!!S.buyOnlineStore.customerData.emailValidation.errorMessage}
                        isValid={S.buyOnlineStore.customerData.emailValidation.isValidAndTouched}
                        tooltipErrorText={S.buyOnlineStore.customerData.emailValidation.errorMessage}
                        placeholderText={'ivanov-ivan@example.com'}
                        wrapperClass={blockName('input')()}
                        bemModifications={['buy-online']}
                        maxLength={254}
                        useTooltipAnimation={true}
                        onValidationIconClick={() => {
                            this.emailFieldRef!.focus();
                            S.buyOnlineStore.customerData.setEmailFieldState({
                                value: '',
                                isTouched: false
                            });
                        }}
                        onFocus={state => {
                            S.buyOnlineStore.customerData.setEmailFieldState({
                                value: state.value,
                                isTouched: false
                            });
                        }}
                        onChange={state => {
                            S.buyOnlineStore.customerData.setEmailFieldState({
                                value: state.value,
                                isTouched: false
                            });
                        }}
                        onBlur={state => {
                            S.buyOnlineStore.customerData.setEmailFieldState({ value: state.value, isTouched: true });
                            S.buyOnlineStore.customerData.setFocusedFieldsStates({ isEmailFocused: false });
                        }}
                    />
                </div>
            </div>
        );
    }

    renderPassportDataRow(blockName: bemCn.Inner): JSX.Element {
        return (
            <>
                <div className={blockName('row')()}>
                    <div className={blockName('input')({ 'passport-input': true })()}>
                        <UiText
                            inputName={this.passportFieldSeries}
                            controlTitle={'Серия паспорта'}
                            inputValue={S.buyOnlineStore.customerData.passportSeriesFieldState.value}
                            inputRef={(elem: HTMLInputElement) => this.passportSeriesFieldRef = elem}
                            isError={!!S.buyOnlineStore.customerData.passportSeriesValidation.errorMessage}
                            isValid={S.buyOnlineStore.customerData.passportSeriesValidation.isValidAndTouched}
                            tooltipErrorText={S.buyOnlineStore.customerData.passportSeriesValidation.errorMessage}
                            placeholderText={'xxxx'}
                            wrapperClass={blockName('input')()}
                            bemModifications={['buy-online', 'passport-field']}
                            useTooltipAnimation={true}
                            onValidationIconClick={() => {
                                this.passportSeriesFieldRef!.focus();
                                S.buyOnlineStore.customerData.setPassportSeriesFieldState({ value: '', isTouched: false });
                            }}
                            onFocus={state => {
                                S.buyOnlineStore.customerData.setPassportSeriesFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onChange={state => {
                                S.buyOnlineStore.customerData.setPassportSeriesFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onBlur={state => {
                                S.buyOnlineStore.customerData.setPassportSeriesFieldState({
                                    value: state.value,
                                    isTouched: true
                                });
                            }}
                        />
                    </div>
                    <div className={blockName('input')({ 'passport-input': true })()}>
                        <UiText
                            inputName={this.passportFieldNumber}
                            controlTitle={'Номер'}
                            inputValue={S.buyOnlineStore.customerData.passportNumberFieldState.value}
                            inputRef={(elem: HTMLInputElement) => this.passportNumberFieldRef = elem}
                            isError={!!S.buyOnlineStore.customerData.passportNumberValidation.errorMessage}
                            isValid={S.buyOnlineStore.customerData.passportNumberValidation.isValidAndTouched}
                            tooltipErrorText={S.buyOnlineStore.customerData.passportNumberValidation.errorMessage}
                            placeholderText={'xxxxxx'}
                            wrapperClass={blockName('input')()}
                            bemModifications={['buy-online', 'passport-field']}
                            useTooltipAnimation={true}
                            onValidationIconClick={() => {
                                this.passportNumberFieldRef!.focus();
                                S.buyOnlineStore.customerData.setPassportNumberFieldState({ value: '', isTouched: false });
                            }}
                            onFocus={state => {
                                S.buyOnlineStore.customerData.setPassportNumberFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onChange={state => {
                                S.buyOnlineStore.customerData.setPassportNumberFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onBlur={state => {
                                S.buyOnlineStore.customerData.setPassportNumberFieldState({
                                    value: state.value,
                                    isTouched: true
                                });
                            }}
                        />
                    </div>
                    <div className={blockName('input')()}>
                        <UiDatePicker
                            controlTitle={'Когда выдан'}
                            inputName={this.passportIssuedWhenField}
                            inputRef={(elem: HTMLInputElement | HTMLTextAreaElement | null) => this.passportIssuedWhenFieldRef = elem}
                            inputValue={S.buyOnlineStore.customerData.passportIssuedWhenFieldState.value}
                            listOfYears={rangeRight(1992, new Date().getFullYear() + 1)}
                            isError={!!S.buyOnlineStore.customerData.passportIssuedWhenValidation.errorMessage}
                            isValid={S.buyOnlineStore.customerData.passportIssuedWhenValidation.isValidAndTouched}
                            tooltipErrorText={S.buyOnlineStore.customerData.passportIssuedWhenValidation.errorMessage}
                            placeholderText={'дд.мм.гггг'}
                            wrapperClass={blockName('input')()}
                            bemModifications={['buy-online']}
                            useTooltipAnimation={true}
                            onValidationIconClick={() => {
                                this.passportIssuedWhenFieldRef!.focus();
                                S.buyOnlineStore.customerData.setPassportIssuedWhenFieldState({
                                    value: '',
                                    isTouched: false
                                });
                            }}
                            onMaskCorrection={(correctionType) => {
                                if (correctionType === DateMaskCorrectionType.lessThanMinDate) {
                                    S.buyOnlineStore.customerData.setFieldsMaskWarningsCheckers({
                                        isIssuedWhenDateChangedToMin: true
                                    });
                                }
                            }}
                            onFocus={() => {
                                S.buyOnlineStore.customerData.setPassportIssuedWhenFieldState({
                                    value: S.buyOnlineStore.customerData.passportIssuedWhenFieldState.value,
                                    isTouched: false
                                });
                            }}
                            onKeyDown={() => {
                                S.buyOnlineStore.customerData.setFieldsMaskWarningsCheckers({
                                    isIssuedWhenDateChangedToMin: false
                                });
                            }}
                            onInputDate={state => {
                                S.buyOnlineStore.customerData.setPassportIssuedWhenFieldState({
                                    value: state.value,
                                    isTouched: false
                                });

                                if (S.buyOnlineStore.customerData.passportIssuedWhenValidation.isValidAndTouched && state.isValid) {
                                    this.focusPassportIssuedByFieldIfEmpty();
                                }
                            }}
                            onSelectDate={state => {
                                S.buyOnlineStore.customerData.setPassportIssuedWhenFieldState({
                                    value: state.value,
                                    isTouched: true
                                });
                            }}
                            onBlur={() => {
                                S.buyOnlineStore.customerData.setPassportIssuedWhenFieldState({
                                    value: S.buyOnlineStore.customerData.passportIssuedWhenFieldState.value,
                                    isTouched: true
                                });
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }

    renderLocationDataRows(blockName: bemCn.Inner): JSX.Element {
        return(
            <>
                <div className={blockName('row')()}>
                    <div className={blockName('input')()}>
                        <UiText
                            inputName={this.passportIssuedByField}
                            controlTitle={'Кем выдан'}
                            inputValue={S.buyOnlineStore.customerData.passportIssuedByFieldState.value}
                            inputRef={(elem: HTMLInputElement) => this.passportIssuedByFieldRef = elem}
                            isError={!!S.buyOnlineStore.customerData.passportIssuedByValidation.errorMessage}
                            isValid={S.buyOnlineStore.customerData.passportIssuedByValidation.isValidAndTouched}
                            tooltipErrorText={S.buyOnlineStore.customerData.passportIssuedByValidation.errorMessage}
                            placeholderText={'Код и название подразделения'}
                            bemModifications={['buy-online']}
                            maxLength={255}
                            useTooltipAnimation={true}
                            onValidationIconClick={() => {
                                this.passportIssuedByFieldRef!.focus();
                                S.buyOnlineStore.customerData.setPassportIssuedByFieldState({
                                    value: '',
                                    isTouched: false
                                });
                            }}
                            onFocus={state => {
                                S.buyOnlineStore.customerData.setPassportIssuedByFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onChange={state => {
                                S.buyOnlineStore.customerData.setPassportIssuedByFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onBlur={state => {
                                S.buyOnlineStore.customerData.setPassportIssuedByFieldState({
                                    value: state.value,
                                    isTouched: true
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={blockName('row')()}>
                    <div className={blockName('input')()}>
                        <UiText
                            inputName={this.addressField}
                            controlTitle={'Адрес проживания'}
                            inputValue={S.buyOnlineStore.customerData.addressFieldState.value}
                            inputRef={(elem: HTMLInputElement) => this.addressFieldRef = elem}
                            placeholderText={'Город, улица, номер дома и квартиры'}
                            isError={!!S.buyOnlineStore.customerData.addressValidation.errorMessage}
                            isValid={S.buyOnlineStore.customerData.addressValidation.isValidAndTouched}
                            tooltipErrorText={S.buyOnlineStore.customerData.addressValidation.errorMessage}
                            bemModifications={['buy-online']}
                            maxLength={255}
                            useTooltipAnimation={true}
                            onFocus={state => {
                                S.buyOnlineStore.customerData.setAddressFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                            }}
                            onChange={state => {
                                S.buyOnlineStore.customerData.setAddressFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                             }}
                            onBlur={state => {
                                S.buyOnlineStore.customerData.setAddressFieldState({
                                    value: state.value,
                                    isTouched: true
                                });
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }

    renderCustomerSurnameErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorFailed = this.formValidators.surname.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToCyrKeyboardChar(S.buyOnlineStore.customerData.surnameFieldState.value);

        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorFailed}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                        <span className={blockName('tooltip')({ warning: true })()}>
                            <span>Исправить на: </span>
                            <span
                                className={blockName('tooltip')({ action: true })()}
                                onClick={() => {
                                    S.buyOnlineStore.customerData.setSurnameFieldState({
                                        value: name,
                                        isTouched: true
                                    });
                                    S.buyOnlineStore.customerData.validateForm();
                                }}
                            >
                                {name}
                            </span>
                        </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.surname.hasError() && !isNameValidatorFailed}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                        <span className={blockName('tooltip')({ error: true })()}>
                            {this.formValidators.surname.errorMessage()}
                        </span>
                    </div>
                </Collapse>
            </div>
        );
    }

    renderCustomerFirstNameErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorFailed = this.formValidators.firstName.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToCyrKeyboardChar(S.buyOnlineStore.customerData.firstNameFieldState.value);

        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorFailed}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                        <span className={blockName('tooltip')({ warning: true })()}>
                            <span>Исправить на: </span>
                            <span
                                className={blockName('tooltip')({ action: true })()}
                                onClick={() => {
                                    S.buyOnlineStore.customerData.setFirstNameFieldState({
                                        value: name,
                                        isTouched: true
                                    });
                                    S.buyOnlineStore.customerData.validateForm();
                                }}
                            >
                                {name}
                            </span>
                        </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.firstName.hasError() && !isNameValidatorFailed}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                        <span className={blockName('tooltip')({ error: true })()}>
                            {this.formValidators.firstName.errorMessage()}
                        </span>
                    </div>
                </Collapse>
            </div>
        );
    }

    renderCustomerPatronymicErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorFailed = this.formValidators.patronymic.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToCyrKeyboardChar(S.buyOnlineStore.customerData.patronymicFieldState.value);

        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorFailed}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                        <span className={blockName('tooltip')({ warning: true })()}>
                            <span>Исправить на: </span>
                            <span
                                className={blockName('tooltip')({ action: true })()}
                                onClick={() => {
                                    S.buyOnlineStore.customerData.setPatronymicFieldState({
                                        value: name,
                                        isTouched: true
                                    });
                                    S.buyOnlineStore.customerData.validateForm();
                                }}
                            >
                                {name}
                            </span>
                        </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.patronymic.hasError() && !isNameValidatorFailed}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                        <span className={blockName('tooltip')({ error: true })()}>
                            {this.formValidators.patronymic.errorMessage()}
                        </span>
                    </div>
                </Collapse>
            </div>
        );
    }

    private focusPhoneFieldIfEmpty(ifEmptyOnly = true): void {
        if (!!this.phoneFieldRef && (!ifEmptyOnly || !S.buyOnlineStore.customerData.phoneFieldState.value)) {
            this.phoneFieldRef.focus();
            this.phoneFieldRef.selectionStart = S.buyOnlineStore.customerData.phoneFieldState.value.length;
        }
    }

    private focusEmailFieldIfEmpty(ifEmptyOnly = true): void {
        if (!!this.emailFieldRef && (!ifEmptyOnly || !S.buyOnlineStore.customerData.emailFieldState.value)) {
            this.emailFieldRef.focus();
            this.emailFieldRef.selectionStart = S.buyOnlineStore.customerData.emailFieldState.value.length;
        }
    }

    private focusPassportIssuedByFieldIfEmpty(): void {
        if (!!this.passportIssuedByFieldRef && !S.buyOnlineStore.customerData.passportIssuedByFieldState.value) {
            this.passportIssuedByFieldRef.focus();
        }
    }

    private blurPhoneField(): void {
        if (!!this.phoneFieldRef) {
            this.phoneFieldRef.blur();
        }
    }

    private blurEmailField(): void {
        if (!!this.emailFieldRef) {
            this.emailFieldRef.blur();
        }
    }

    private initFocusedStatesDisposer(): void {
        this.focusedStatesDisposer = reaction(
            () => S.buyOnlineStore.customerData.focusedFieldsStates,
            (states) => {
                if (states.isEmailFocused) {
                    this.focusEmailFieldIfEmpty();
                    this.blurPhoneField();
                }

                if (states.isPhoneFocused) {
                    this.focusPhoneFieldIfEmpty();
                    this.blurEmailField();
                }
            }
        );
    }

    private get formValidators() {
        return S.buyOnlineStore.customerData.formValidators;
    }
}
