/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';
import { observer } from 'mobx-react';
import { rangeRight } from 'lodash';
import { Collapse } from 'react-collapse';
import AnimateHeight from 'react-animate-height';

import { SimpleTransition } from 'sletat-uikit2/dist/js/SimpleTransition';
import { UiText } from 'sletat-uikit2/dist/js/UiText';
import { UiButtonGroup } from 'sletat-uikit2/dist/js/UiButtonGroup';
import { DateMaskCorrectionType } from 'sletat-uikit2/dist/js/input-masks/date';
import { NAME_VALIDATOR_ID } from 'sletat-uikit2/dist/js/validators';

import { UiDatePicker } from '../uikit/UiDatePicker';
import { Gender, TouristFormFieldsValidators } from '../../../models/buy-online';
import {
    replaceToCyrKeyboardChar,
    replaceToLatKeyboardChar,
    transliterateToCyr,
    transliterateToLat
} from '../../../utils/transliteration';
import { detectGender } from '../../../utils/gender-detector';
import { nameFormatter } from '../../../utils/buy-online';
import S from '../../../stores';
import { TouristDataStore } from '../../../stores/buy-online/tourist-data';


export interface TouristDataFormProps {
    touristId: number;
}


@observer
export class TouristDataForm extends React.Component<TouristDataFormProps> {
    private firstNameFieldRef: HTMLInputElement | null = null;
    private surnameFieldRef: HTMLInputElement | null = null;
    private cyrillicFirstNameFieldRef: HTMLInputElement | null = null;
    private cyrillicSurnameFieldRef: HTMLInputElement | null = null;
    private cyrillicPatronymicFieldRef: HTMLInputElement | null = null;
    private birthdayFieldRef: HTMLInputElement | HTMLTextAreaElement | null | null = null;
    private passportSeriesFieldRef: HTMLInputElement | null = null;
    private passportNumberFieldRef: HTMLInputElement | null = null;
    private passportIssuedWhenFieldRef: HTMLInputElement | HTMLTextAreaElement | null = null;
    private passportValidUntilFieldRef: HTMLInputElement | HTMLTextAreaElement | null = null;
    private passportIssuedByFieldRef: HTMLInputElement | null = null;

    state = {
        prevCyrillicFirstName: '',
        prevCyrillicSurname: '',
        isCheckedCheckboxPatronymic: false,
        isVisibleCheckboxPatronymic: S.buyOnlineStore.isMgtModule,
    };

    checkboxPatronymicHandler = () => {
        const { isCheckedCheckboxPatronymic } = this.state;
        
        this.touristData.setIsRequiredPatronymic(!this.touristData.isRequiredPatronymic)
        this.touristData.setCyrillicPatronymicFieldState(
            { value: '', isTouched: false }
        );

        this.setState({
            ...this.state,
            isCheckedCheckboxPatronymic: !isCheckedCheckboxPatronymic,
        });
    };

    checkNameAndSurnameFieldsIsNotEmpty = () => {
        const { isCheckedCheckboxPatronymic, prevCyrillicFirstName, prevCyrillicSurname } = this.state;
    
        if (isCheckedCheckboxPatronymic) {
            const {cyrillicFirstNameFieldState, cyrillicSurnameFieldState} = this.touristData;

            if (cyrillicFirstNameFieldState.value  !== prevCyrillicFirstName ||
                cyrillicSurnameFieldState.value  !== prevCyrillicSurname) {
                const { isMgtModule } = S.buyOnlineStore;
                const isNotEmptyNameAndSurnameFields = !!cyrillicFirstNameFieldState.value  && !!cyrillicSurnameFieldState.value;

                if (!isMgtModule && this.touristData.isRequiredPatronymic !== isNotEmptyNameAndSurnameFields) {
                    this.touristData.setIsRequiredPatronymic(isNotEmptyNameAndSurnameFields);
                } 

                this.setState({
                    ...this.state,
                    isVisibleCheckboxPatronymic: isMgtModule || isNotEmptyNameAndSurnameFields,
                    prevCyrillicFirstName: cyrillicFirstNameFieldState.value,
                    prevCyrillicSurname: cyrillicSurnameFieldState.value 
                });
            }
        }
    }

    componentDidMount(): void {
        const { isMgtModule} = S.buyOnlineStore;
        
        if (isMgtModule) {
            this.touristData.setIsRequiredPatronymic(true);
        }  
    }

    componentDidUpdate(): void {
        this.checkNameAndSurnameFieldsIsNotEmpty();
      }
      
    render() {
        const blockName = bemCn('tourist-data-form');
        return (
            <div className={blockName()}>
                {this.renderTouristTitle(blockName)}
                {this.renderFormContent(blockName)}
            </div>
        );
    }

    renderTouristTitle(blockName: bemCn.Inner): JSX.Element {
        const verbalNumbers = ['Первый', 'Второй', 'Третий', 'Четвертый', 'Пятый', 'Шестой', 'Седьмой', 'Восьмой', 'Девятый'];
        return (
            <div className={blockName('title')({ valid: this.isFormFilledCorrect })()}>
                <b>{`${verbalNumbers[this.touristId]} ${this.touristData.isKid ? '(ребёнок)' : ''}`}</b>
                {this.renderExpandFormButton(blockName)}
                {/*{this.renderDublicateCustomerDataButton(blockName)}*/}
            </div>
        );
    }

    renderFormContent(blockName: bemCn.Inner): JSX.Element | null {
        return (
            <AnimateHeight
                duration={300}
                height={
                    this.isFormContentCollapsed
                        ? 0
                        : 'auto'
                }
                applyInlineTransitions={true}
                easing={'ease'}
                onAnimationEnd={() => {
                    // S.tourShortInfoStickyStore.updateStickyBlockPosition();
                }}
            >
                <div
                    id={`tourist-${this.touristId}-form-content`}
                    className={blockName('form-content')()}
                >
                    { !S.mainStore.isNoInternationalPassportNeed &&
                    <div className={blockName('row')()}>
                        <div className={blockName('input')({ 'surname': true })()}>
                            <UiText
                                inputName={this.surnameField}
                                inputRef={(elem: HTMLInputElement| null) => this.surnameFieldRef = elem}
                                controlTitle={'Фамилия латиницей'}
                                inputValue={this.touristData.surnameFieldState.value}
                                inputTextFormatter={nameFormatter()}
                                isError={!!this.touristData.surnameValidation.errorMessage}
                                isValid={this.touristData.surnameValidation.isValidAndTouched}
                                placeholderText={'Ivanov'}
                                bemModifications={['buy-online'].concat(this.isNameHidden ? 'hidden' : [])}
                                maxLength={255}
                                tabIndex={this.defaultFieldTabIndex}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.surnameFieldRef!.focus();
                                    this.touristData.setSurnameFieldState({
                                        value: '',
                                        isTouched: false
                                    });
                                }}
                                onFocus={state => {
                                    this.touristData.setSurnameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                    this.collapsePreviousTouristsFormsIfValid();
                                }}
                                onChange={state => {
                                    this.touristData.setSurnameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                }}
                                onBlur={state => {
                                    this.touristData.setSurnameFieldState({
                                        value: state.value,
                                        isTouched: true
                                    });

                                    this.touristData.setGenderValue(
                                        this.detectTouristGender(this.touristData.surnameFieldState.value,
                                            this.touristData.firstNameFieldState.value)
                                    );
                                }}
                            />
                            {this.renderSurnameTip(blockName)}
                            {this.renderSurnameErrorTooltip(blockName)}
                        </div>
                        <div className={blockName('input')({ 'firstname': true })()}>
                            <UiText
                                inputName={this.firstNameField}
                                inputRef={(elem: HTMLInputElement| null) => this.firstNameFieldRef = elem}
                                controlTitle={'Имя латиницей'}
                                inputValue={this.touristData.firstNameFieldState.value}
                                inputTextFormatter={nameFormatter()}
                                isError={!!this.touristData.firstNameValidation.errorMessage}
                                isValid={this.touristData.firstNameValidation.isValidAndTouched}
                                placeholderText={'Ivan'}
                                bemModifications={['buy-online'].concat(this.isNameHidden ? 'hidden' : [])}
                                maxLength={255}
                                tabIndex={this.defaultFieldTabIndex}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.firstNameFieldRef!.focus();
                                    this.touristData.setFirstNameFieldState({
                                        value: '',
                                        isTouched: false
                                    });
                                }}
                                onFocus={state => {
                                    this.touristData.setFirstNameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                    this.collapsePreviousTouristsFormsIfValid();
                                }}
                                onChange={state => {
                                    this.touristData.setFirstNameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                }}
                                onBlur={state => {
                                    this.touristData.setFirstNameFieldState({
                                        value: state.value,
                                        isTouched: true
                                    });

                                    this.touristData.setGenderValue(
                                        this.detectTouristGender(this.touristData.surnameFieldState.value,
                                            this.touristData.firstNameFieldState.value)
                                    );
                                }}
                            />
                            {this.renderFirstNameTip(blockName)}
                            {this.renderFirstNameErrorTooltip(blockName)}
                        </div>
                    </div>
                    }
                    { (S.buyOnlineStore.isMgtModule || S.mainStore.isNoInternationalPassportNeed ) && 
                        <div className={blockName('row')()}>
                        <div className={blockName('input')({ 'surname': true })()}>
                            <UiText
                                inputName={this.cyrillicSurnameField}
                                inputRef={(elem: HTMLInputElement| null) => this.cyrillicSurnameFieldRef = elem}
                                controlTitle={'Фамилия кириллицей'}
                                inputValue={this.touristData.cyrillicSurnameFieldState.value}
                                inputTextFormatter={nameFormatter()}
                                isError={!!this.touristData.cyrillicSurnameValidation.errorMessage}
                                isValid={this.touristData.cyrillicSurnameValidation.isValidAndTouched}
                                placeholderText={'Иванов'}
                                bemModifications={['buy-online'].concat(this.isNameHidden ? 'hidden' : [])}
                                maxLength={255}
                                tabIndex={this.defaultFieldTabIndex}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.cyrillicSurnameFieldRef!.focus();
                                    this.touristData.setCyrillicSurnameFieldState({
                                        value: '',
                                        isTouched: false
                                    });
                                }}
                                onFocus={state => {
                                    this.touristData.setCyrillicSurnameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                    this.collapsePreviousTouristsFormsIfValid();
                                }}
                                onChange={state => {
                                    this.touristData.setCyrillicSurnameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                }}
                                onBlur={state => {
                                    this.touristData.setCyrillicSurnameFieldState({
                                        value: state.value,
                                        isTouched: true
                                    });

                                    this.touristData.setGenderValue(
                                        this.detectTouristGender(this.touristData.cyrillicSurnameFieldState.value,
                                            this.touristData.cyrillicFirstNameFieldState.value)
                                    );
                                }}
                            />
                            {this.renderCyrillicSurnameTip(blockName)}
                            {this.renderCyrillicSurnameErrorTooltip(blockName)}
                        </div>
                        <div className={blockName('input')({ 'firstname': true })()}>
                            <UiText
                                inputName={this.cyrillicFirstNameField}
                                inputRef={(elem: HTMLInputElement| null) => this.cyrillicFirstNameFieldRef = elem}
                                controlTitle={'Имя кириллицей'}
                                inputValue={this.touristData.cyrillicFirstNameFieldState.value}
                                inputTextFormatter={nameFormatter()}
                                isError={!!this.touristData.cyrillicFirstNameValidation.errorMessage}
                                isValid={this.touristData.cyrillicFirstNameValidation.isValidAndTouched}
                                placeholderText={'Иван'}
                                bemModifications={['buy-online'].concat(this.isNameHidden ? 'hidden' : [])}
                                maxLength={255}
                                tabIndex={this.defaultFieldTabIndex}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.cyrillicFirstNameFieldRef!.focus();
                                    this.touristData.setCyrillicFirstNameFieldState({
                                        value: '',
                                        isTouched: false
                                    });
                                }}
                                onFocus={state => {
                                    this.touristData.setCyrillicFirstNameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                    this.collapsePreviousTouristsFormsIfValid();
                                }}
                                onChange={state => {
                                    this.touristData.setCyrillicFirstNameFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                }}
                                onBlur={state => {
                                    this.touristData.setCyrillicFirstNameFieldState({
                                        value: state.value,
                                        isTouched: true
                                    });

                                    this.touristData.setGenderValue(
                                        this.detectTouristGender(this.touristData.cyrillicSurnameFieldState.value,
                                            this.touristData.cyrillicFirstNameFieldState.value)
                                    );
                                }}
                            />
                            {this.renderCyrillicFirstNameTip(blockName)}
                            {this.renderCyrillicFirstNameErrorTooltip(blockName)}
                        </div>
                        <div className={blockName('input')()}>
                            <UiText
                                inputName={this.cyrillicPatronymicField}
                                inputRef={(elem: HTMLInputElement| null) => this.cyrillicPatronymicFieldRef = elem}
                                controlTitle={'Отчество кириллицей'}
                                inputValue={
                                    this.state.isVisibleCheckboxPatronymic 
                                    && this.state.isCheckedCheckboxPatronymic 
                                    ? "Отсутствует"
                                    : this.touristData.cyrillicPatronymicFieldState.value}
                                inputTextFormatter={nameFormatter()}
                                isError={!!this.touristData.cyrillicPatronymicValidation.errorMessage}
                                isValid={this.touristData.cyrillicPatronymicValidation.isValidAndTouched}
                                placeholderText={'Иванович'}
                                bemModifications={['buy-online'].concat(this.isNameHidden ? 'hidden' : [])}
                                maxLength={255}
                                tabIndex={this.defaultFieldTabIndex}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.cyrillicPatronymicFieldRef!.focus();
                                    this.touristData.setCyrillicPatronymicFieldState({
                                        value: '',
                                        isTouched: false
                                    });
                                }}
                                onFocus={state => {
                                    this.touristData.setCyrillicPatronymicFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                    this.collapsePreviousTouristsFormsIfValid();
                                }}
                                onChange={state => {
                                    this.touristData.setCyrillicPatronymicFieldState({
                                        value: state.value,
                                        isTouched: false
                                    });
                                }}
                                onBlur={state => {
                                    this.touristData.setCyrillicPatronymicFieldState({
                                        value: state.value,
                                        isTouched: true
                                    });
                                }}
                                isDisabled={this.state.isCheckedCheckboxPatronymic && this.state.isVisibleCheckboxPatronymic}
                            />
                            {this.renderCyrillicPatronymicTip(blockName)}
                            {this.renderCyrillicPatronymicErrorTooltip(blockName)}
                            {this.state.isVisibleCheckboxPatronymic && 
                            <div className={blockName('checkboxPatronymic')()}>
                                <input type='checkbox'  onChange={this.checkboxPatronymicHandler} checked={this.state.isCheckedCheckboxPatronymic}/>
                                &nbsp; Нет отчества  
                            </div>}
                        </div>
                    </div>
                    }
                    <div className={blockName('row')()}>
                        <UiDatePicker
                            controlTitle={'Дата рождения'}
                            inputName={this.birthdayField}
                            inputRef={(elem: HTMLInputElement | HTMLTextAreaElement | null) => this.birthdayFieldRef = elem}
                            placeholderText={'дд.мм.гггг'}
                            inputValue={this.touristData.birthDateFieldState.value}
                            listOfYears={rangeRight((new Date()).getFullYear() - 100, (new Date()).getFullYear())}
                            isError={!!this.touristData.birthdayValidation.errorMessage}
                            tooltipErrorText={this.touristData.birthdayValidation.errorMessage}
                            isValid={this.touristData.birthdayValidation.isValidAndTouched}
                            wrapperClass={blockName('input')({ 'birthdate-input': true })()}
                            bemModifications={['buy-online']}
                            tabIndex={this.defaultFieldTabIndex}
                            useTooltipAnimation={true}
                            onValidationIconClick={() => {
                                this.birthdayFieldRef!.focus();
                                this.touristData.setBirthdayFieldState({
                                    value: '',
                                    isTouched: false
                                });
                            }}
                            onFocus={() => {
                                this.touristData.setBirthdayFieldState({
                                    value: this.touristData.birthDateFieldState.value,
                                    isTouched: false
                                });
                            }}
                            onInputDate={state => {
                                this.touristData.setBirthdayFieldState({
                                    value: state.value,
                                    isTouched: false
                                });
                                
                                if (this.touristData.birthdayValidation.isValidAndTouched && !!state.value) {
                                    this.focusPassportSeriesFieldIfEmptyAndGenderIsUnknown();
                                }
                            }}
                            onSelectDate={state => {
                                this.touristData.setBirthdayFieldState({
                                    value: state.value,
                                    isTouched: true
                                });
                            }}
                            onBlur={() => {
                                this.touristData.setBirthdayFieldState({
                                    value: this.touristData.birthDateFieldState.value,
                                    isTouched: true
                                });
                                this.touristData.updateValidatorsForDocumentType();
                            }}
                        />
                        <div className={blockName('button-group')()}>
                            <label className={blockName('button-group-title')()}>Пол</label>
                            <UiButtonGroup
                                buttons={[{
                                    text: 'М',
                                    isChecked: this.touristData.gender === Gender.male,
                                    isDisabled: false,
                                }, {
                                    text: 'Ж',
                                    isChecked: this.touristData.gender === Gender.female,
                                    isDisabled: false,
                                }]}
                                bemModifications={['tourist-data-form']}
                                tabIndex={this.defaultFieldTabIndex}
                                onClick={state => {
                                    this.touristData.setGenderValue(
                                        !state.index ? Gender.male : Gender.female
                                    );
                                }}
                            />
                        </div>
                    </div>
                    {this.renderPassportFields(blockName)}
                </div>
            </AnimateHeight>
        );
    }

    renderPassportFields(blockName: bemCn.Inner): JSX.Element {
        const needPassport = this.touristData.needPassport;
        const textForBlock = needPassport === true ?  'Серия паспорта' :
                             needPassport === false ? 'Серия св. о рождении' : 
                             'Серия документа';

        const passportSeriesDataField = (
            <div>
                <UiText
                    inputName={this.passportField}
                    inputRef={(elem: HTMLInputElement | null) => this.passportSeriesFieldRef = elem}
                    controlTitle={textForBlock}
                    inputValue={this.touristData.passportSeriesFieldState.value}
                    isError={!!this.touristData.passportSeriesValidation.errorMessage}
                    isValid={this.touristData.passportSeriesValidation.isValidAndTouched}
                    tooltipErrorText={this.touristData.passportSeriesValidation.errorMessage}
                    placeholderText={'xxxx'}
                    wrapperClass={blockName('input')()}
                    bemModifications={['buy-online', 'passport-field'].concat(this.isPassportHidden ? 'hidden' : [])}
                    tabIndex={this.defaultFieldTabIndex}
                    useTooltipAnimation={true}
                    onValidationIconClick={() => {
                        this.passportSeriesFieldRef!.focus();
                        this.touristData.setPassportSeriesFieldState({value: '', isTouched: false});
                    }}
                    onFocus={state => {
                        this.touristData.setPassportSeriesFieldState({
                            value: state.value,
                            isTouched: false
                        });
                    }}
                    onChange={state => {
                        this.touristData.setPassportSeriesFieldState({
                            value: state.value,
                            isTouched: false
                        });
                    }}
                    onBlur={state => {
                        this.touristData.setPassportSeriesFieldState({
                            value: state.value,
                            isTouched: true
                        });

                        this.collapsePreviousTouristsFormsIfValid();
                    }}
                />
                {this.renderSeriesTip(blockName)}
            </div>
        );

        const passportNumberDataField = (
            <div>
                <UiText
                    inputName={this.passportField}
                    inputRef={(elem: HTMLInputElement | null) => this.passportNumberFieldRef = elem}
                    controlTitle={'Номер'}
                    inputValue={this.touristData.passportNumberFieldState.value}
                    isError={!!this.touristData.passportNumberValidation.errorMessage}
                    isValid={this.touristData.passportNumberValidation.isValidAndTouched}
                    tooltipErrorText={this.touristData.passportNumberValidation.errorMessage}
                    placeholderText={'xxxxxx'}
                    wrapperClass={blockName('input')()}
                    bemModifications={['buy-online', 'passport-field'].concat(this.isPassportHidden ? 'hidden' : [])}
                    tabIndex={this.defaultFieldTabIndex}
                    useTooltipAnimation={true}
                    onValidationIconClick={() => {
                        this.passportNumberFieldRef!.focus();
                        this.touristData.setPassportNumberFieldState({ value: '', isTouched: false });
                    }}
                    onFocus={state => {
                        this.touristData.setPassportNumberFieldState({
                            value: state.value,
                            isTouched: false
                        });
                    }}
                    onChange={state => {
                        this.touristData.setPassportNumberFieldState({
                            value: state.value,
                            isTouched: false
                        });
                    }}
                    onBlur={state => {
                        this.touristData.setPassportNumberFieldState({
                            value: state.value,
                            isTouched: true
                        });

                        this.collapsePreviousTouristsFormsIfValid();
                    }}
                />
                {this.renderDocNumberTip(blockName)}
            </div>
        );

        const issuedWhenField = (
            <div>
                <UiDatePicker
                    controlTitle={'Когда выдан'}
                    inputName={this.passportIssuedWhenField}
                    inputRef={(elem: HTMLInputElement | HTMLTextAreaElement | null) => this.passportIssuedWhenFieldRef = elem}
                    inputValue={this.touristData.passportIssuedWhenFieldState.value}
                    listOfYears={rangeRight(1992, new Date().getFullYear() + 1)}
                    isError={!!this.touristData.passportIssuedWhenValidation.errorMessage}
                    isValid={this.touristData.passportIssuedWhenValidation.isValidAndTouched}
                    placeholderText={'дд.мм.гггг'}
                    tooltipErrorText={this.touristData.passportIssuedWhenValidation.errorMessage}
                    wrapperClass={blockName('input')({ 'passport-issued-when-input': true })()}
                    bemModifications={['buy-online'].concat(this.isPassportIssuedWhenHidden ? 'hidden' : [])}
                    tabIndex={this.defaultFieldTabIndex}
                    useTooltipAnimation={true}
                    onValidationIconClick={() => {
                        this.passportIssuedWhenFieldRef!.focus();
                        this.touristData.setPassportIssuedWhenFieldState({
                            value: '',
                            isTouched: false
                        });
                    }}
                    onMaskCorrection={correctionType => {
                        if (correctionType === DateMaskCorrectionType.lessThanMinDate) {
                            this.touristData.setFieldsMaskWarningsCheckers({
                                isIssuedWhenDateChangedToMin: true
                            });
                        }
                    }}
                    onOpenCalendar={() => this.touristData.setIsPassportIssuedWhenCalendarOpened(true)}
                    onHideCalendar={() => this.touristData.setIsPassportIssuedWhenCalendarOpened(false)}
                    onFocus={() => {
                        this.touristData.setFieldsMaskWarningsCheckers({
                            isIssuedWhenDateChangedToMin: false
                        });
                        this.touristData.setPassportIssuedWhenFieldState({
                            value: this.touristData.passportIssuedWhenFieldState.value,
                            isTouched: false
                        });
                    }}
                    onKeyDown={() => {
                        this.touristData.setFieldsMaskWarningsCheckers({
                            isIssuedWhenDateChangedToMin: false
                        });
                    }}
                    onInputDate={state => {
                        this.touristData.setPassportIssuedWhenFieldState({
                            value: state.value,
                            isTouched: false
                        });

                        if (this.touristData.passportIssuedWhenValidation.isValidAndTouched && !!state.value) {
                            this.formValidators.passportValidUntil
                                ? this.focusPassportValidUntilFieldIfEmpty()
                                : this.focusIssuedByFieldIfEmpty();
                        }
                    }}
                    onSelectDate={state => {
                        this.touristData.setPassportIssuedWhenFieldState({
                            value: state.value,
                            isTouched: true
                        });
                    }}
                    onBlur={() => {
                        this.touristData.setPassportIssuedWhenFieldState({
                            value: this.touristData.passportIssuedWhenFieldState.value,
                            isTouched: true
                        });

                        this.touristData.setFieldsMaskWarningsCheckers({
                            isIssuedWhenDateChangedToMin: false
                        });
                    }}
                />
                {
                    this.renderDocIssuedWhenInTip(blockName)
                }
            </div>
        );

        const validUntilField = () => {
            if (S.mainStore.isNoInternationalPassportNeed) {
                return null;
            }

            return (
                <UiDatePicker
                    controlTitle={'Дата окончания'}
                    inputName={this.passportValidUntilField}
                    inputRef={(elem) => this.passportValidUntilFieldRef = elem}
                    placeholderText="дд.мм.гггг"
                    inputValue={this.touristData.passportValidUntilFieldState!.value}
                    listOfYears={rangeRight((new Date()).getFullYear(), (new Date()).getFullYear() + 20)}
                    isError={!!this.touristData.passportValidUntilValidation.errorMessage}
                    isValid={this.touristData.passportValidUntilValidation.isValidAndTouched}
                    tooltipErrorText={this.touristData.passportValidUntilValidation.errorMessage}
                    wrapperClass={blockName('input')()}
                    bemModifications={['buy-online']}
                    tabIndex={this.defaultFieldTabIndex}
                    useTooltipAnimation={true}
                    onValidationIconClick={() => {
                        this.passportValidUntilFieldRef!.focus();
                        this.touristData.setPassportValidUntilFieldState({
                            value: '',
                            isTouched: false
                        });
                    }}
                    onOpenCalendar={() => this.touristData.setIsPassportValidUntilCalendarOpened(true)}
                    onHideCalendar={() => this.touristData.setIsPassportValidUntilCalendarOpened(false)}
                    onFocus={() => {
                        this.touristData.setPassportValidUntilFieldState({
                            value: this.touristData.passportValidUntilFieldState!.value,
                            isTouched: false
                        });
                    }}
                    onInputDate={state => {
                        this.touristData.setPassportValidUntilFieldState({
                            value: state.value,
                            isTouched: false
                        });

                        if (this.touristData.passportValidUntilValidation.isValidAndTouched && !!state.value) {
                            this.focusIssuedByFieldIfEmpty();
                        }
                    }}
                    onSelectDate={state => {
                        this.touristData.setPassportValidUntilFieldState({
                            value: state.value,
                            isTouched: true
                        });
                    }}
                    onBlur={() => {
                        this.touristData.setPassportValidUntilFieldState({
                            value: this.touristData.passportValidUntilFieldState!.value,
                            isTouched: true
                        });
                    }}
                />
            );
        };

        const issuedByField = (
            <div>
                <UiText
                    inputName={this.passportIssuedByField}
                    inputRef={(elem: HTMLInputElement | null) => this.passportIssuedByFieldRef = elem}
                    controlTitle={'Кем выдан'}
                    inputValue={this.touristData.passportIssuedByFieldState.value}
                    isError={!!this.touristData.passportIssuedByValidation.errorMessage}
                    isValid={this.touristData.passportIssuedByValidation.isValidAndTouched}
                    tooltipErrorText={this.touristData.passportIssuedByValidation.errorMessage}
                    placeholderText={'Код и название подразделения'}
                    wrapperClass={blockName('input')()}
                    bemModifications={['buy-online'].concat(this.isPassportIssuedByHidden ? 'hidden' : [])}
                    maxLength={255}
                    tabIndex={this.defaultFieldTabIndex}
                    useTooltipAnimation={true}
                    onValidationIconClick={() => {
                        this.passportIssuedByFieldRef!.focus();
                        this.touristData.setPassportIssuedByFieldState({
                            value: '',
                            isTouched: false
                        });
                    }}
                    onFocus={state => {
                        this.touristData.setPassportIssuedByFieldState({
                            value: state.value,
                            isTouched: false
                        });
                    }}
                    onChange={state => {
                        this.touristData.setPassportIssuedByFieldState({
                            value: state.value,
                            isTouched: false
                        });
                    }}
                    onBlur={state => {
                        this.touristData.setPassportIssuedByFieldState({
                            value: state.value,
                            isTouched: true
                        });
                    }}
                />
                {this.renderDocIssuedByInTip(blockName)}
            </div>

        );

        if (S.mainStore.isNoInternationalPassportNeed) {
            return (
                <div>
                    <div className={blockName('row')()}>
                        {passportSeriesDataField}
                        {passportNumberDataField}
                        {issuedWhenField}
                    </div>
                    <div className={blockName('row')()}>
                        {issuedByField}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className={blockName('row')()}>
                    {passportSeriesDataField}
                    {passportNumberDataField}
                </div>
                <div className={blockName('row')({ 'foreign-passport': true })()}>
                    {issuedWhenField}
                    {validUntilField()}
                </div>
                <div className={blockName('row')()}>
                    {issuedByField}
                </div>
            </div>
        );
    }


    renderExpandFormButton(blockName: bemCn.Inner): JSX.Element | null {
        
        const surname = this.touristData.surnameFieldState?.value ?? this.touristData.cyrillicSurnameFieldState?.value;
        const firstname = this.touristData.cyrillicFirstNameFieldState?.value ?? this.touristData.cyrillicFirstNameFieldState?.value;
        
        const showButton = this.isFormFilledCorrect &&
            this.touristData.isFormCollapsed &&
            !!surname &&
            !!firstname;

        return (
            <SimpleTransition
                isVisible={!!showButton}
                renderData={() => (
                    <button
                        className={blockName('collapse-button')({
                            collapsed: !!this.touristData.isFormCollapsed
                        })()}
                        onClick={() => {
                            this.touristData.toggleFormCollapsed();
                            // if (this.touristId === 0) {
                            //     S.buyOnlineUiStore.setInitialFirstTouristFieldsVisibility();
                            // }
                        }}
                    >
                        {`${surname} ${firstname}`}
                    </button>
                )}
            />
        );
    }

    renderSurnameTip(blockName: bemCn.Inner): JSX.Element | null {
        const isFirstTourist = this.touristId === 0;
        const nameAvailable = !!S.buyOnlineStore.customerData.surnameFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.surname.isValid();
        const alreadyHasName = !!this.touristData.surnameFieldState.value;
        const nameTip = transliterateToLat(S.buyOnlineStore.customerData.surnameFieldState.value);
        return (
            <Collapse
                isOpened={isFirstTourist && nameAvailable && !alreadyHasName}
                springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({ action: true })()}
                    onClick={() => {
                        this.touristData.setSurnameFieldState({
                            value: nameTip,
                            isTouched: true
                        });
                        this.touristData.setGenderValue(
                            this.detectTouristGender(this.touristData.surnameFieldState.value,
                                this.touristData.firstNameFieldState.value)
                        );
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {nameTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderFirstNameTip(blockName: bemCn.Inner): JSX.Element | null {
        const isFirstTourist = this.touristId === 0;
        const nameAvailable = !!S.buyOnlineStore.customerData.firstNameFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.firstName.isValid();
        const alreadyHasName = !!this.touristData.firstNameFieldState.value;
        const nameTip = transliterateToLat(S.buyOnlineStore.customerData.firstNameFieldState.value);
        return (
            <Collapse
                isOpened={isFirstTourist && nameAvailable && !alreadyHasName}
                springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({ action: true })()}
                    onClick={() => {
                        this.touristData.setFirstNameFieldState({
                            value: nameTip,
                            isTouched: true
                        });
                        this.touristData.setGenderValue(
                            this.detectTouristGender(this.touristData.surnameFieldState.value,
                                this.touristData.firstNameFieldState.value)
                        );
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {nameTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderCyrillicSurnameTip(blockName: bemCn.Inner): JSX.Element | null {
        const isFirstTourist = this.touristId === 0;
        const nameAvailable = !!S.buyOnlineStore.customerData.surnameFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.surname.isValid();
        const alreadyHasName = !!this.touristData.cyrillicSurnameFieldState.value;
        const nameTip = transliterateToCyr(S.buyOnlineStore.customerData.surnameFieldState.value);
        return (
            <Collapse
                isOpened={isFirstTourist && nameAvailable && !alreadyHasName}
                springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({ action: true })()}
                    onClick={() => {
                        this.touristData.setCyrillicSurnameFieldState({
                            value: nameTip,
                            isTouched: true
                        });
                        this.touristData.setGenderValue(
                            this.detectTouristGender(this.touristData.cyrillicSurnameFieldState.value,
                                this.touristData.cyrillicFirstNameFieldState.value)
                        );
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {nameTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderCyrillicFirstNameTip(blockName: bemCn.Inner): JSX.Element | null {
        const isFirstTourist = this.touristId === 0;
        const nameAvailable = !!S.buyOnlineStore.customerData.firstNameFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.firstName.isValid();
        const alreadyHasName = !!this.touristData.cyrillicFirstNameFieldState.value;
        const nameTip = transliterateToCyr(S.buyOnlineStore.customerData.firstNameFieldState.value);
        return (
            <Collapse
                isOpened={isFirstTourist && nameAvailable && !alreadyHasName}
                springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({ action: true })()}
                    onClick={() => {
                        this.touristData.setCyrillicFirstNameFieldState({
                            value: nameTip,
                            isTouched: true
                        });
                        this.touristData.setGenderValue(
                            this.detectTouristGender(this.touristData.cyrillicSurnameFieldState.value,
                                this.touristData.cyrillicFirstNameFieldState.value)
                        );
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {nameTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderCyrillicPatronymicTip(blockName: bemCn.Inner): JSX.Element | null {
        const isFirstTouristWithoutPatronymic = !this.state.isCheckedCheckboxPatronymic && this.touristId === 0;
        const nameAvailable = !!S.buyOnlineStore.customerData.patronymicFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.patronymic.isValid();
        const alreadyHasName = !!this.touristData.cyrillicPatronymicFieldState.value;
        const nameTip = transliterateToCyr(S.buyOnlineStore.customerData.patronymicFieldState.value);
        return (
            <Collapse
                isOpened={isFirstTouristWithoutPatronymic && nameAvailable && !alreadyHasName}
                springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({ action: true })()}
                    onClick={() => {
                        this.touristData.setCyrillicPatronymicFieldState({
                            value: nameTip,
                            isTouched: true
                        });
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {nameTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderSeriesTip(blockName: bemCn.Inner) {
        const isFirstTourist = this.touristId === 0;
        const valueAvailable = !!S.buyOnlineStore.customerData.passportSeriesFieldState.value && S.buyOnlineStore.customerData.formValidators.passportSeries.isValid();
        const alreadyHasValue = !!this.touristData.passportSeriesFieldState.value;
        const valueTip = transliterateToCyr(S.buyOnlineStore.customerData.passportSeriesFieldState.value);

        return (
            <Collapse
                isOpened={isFirstTourist && valueAvailable && !alreadyHasValue}
                springConfig={{stiffness: 190, damping: 25, precision: 5}}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({action: true})()}
                    onClick={() => {
                        this.touristData.setPassportSeriesFieldState({
                            value: valueTip,
                            isTouched: true
                        });
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {valueTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderDocNumberTip(blockName: bemCn.Inner) {
        const isFirstTourist = this.touristId === 0;
        const valueAvailable = !!S.buyOnlineStore.customerData.passportNumberFieldState.value && S.buyOnlineStore.customerData.formValidators.passportNumber.isValid();
        const alreadyHasValue = !!this.touristData.passportNumberFieldState.value;
        const valueTip = transliterateToCyr(S.buyOnlineStore.customerData.passportNumberFieldState.value);

        return (
            <Collapse
                isOpened={isFirstTourist && valueAvailable && !alreadyHasValue}
                springConfig={{stiffness: 190, damping: 25, precision: 5}}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({action: true})()}
                    onClick={() => {
                        this.touristData.setPassportNumberFieldState({
                            value: valueTip,
                            isTouched: true
                        });
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {valueTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderDocIssuedWhenInTip(blockName: bemCn.Inner) {

        const isFirstTourist = this.touristId === 0;
        const valueAvailable = !!S.buyOnlineStore.customerData.passportIssuedWhenFieldState.value && S.buyOnlineStore.customerData.formValidators.passportIssuedWhen.isValid();
        const alreadyHasValue = !!this.touristData.passportIssuedWhenFieldState.value;
        const valueTip = transliterateToCyr(S.buyOnlineStore.customerData.passportIssuedWhenFieldState.value);

        return (
            <Collapse
                isOpened={isFirstTourist && valueAvailable && !alreadyHasValue}
                springConfig={{stiffness: 190, damping: 25, precision: 5}}
            >
                <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({action: true})()}
                    onClick={() => {
                        this.touristData.setPassportIssuedWhenFieldState({
                            value: valueTip,
                            isTouched: true
                        });
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {valueTip}
                </span>
                </div>
            </Collapse>
        );
    }

    renderDocIssuedByInTip(blockName: bemCn.Inner){

        const isFirstTourist = this.touristId === 0;
        const valueAvailable = !!S.buyOnlineStore.customerData.passportIssuedByFieldState.value && S.buyOnlineStore.customerData.formValidators.passportIssuedBy.isValid();
        const alreadyHasValue = !!this.touristData.passportIssuedByFieldState.value
        const valueTip = transliterateToCyr(S.buyOnlineStore.customerData.passportIssuedByFieldState.value);

        return (
            <Collapse
                isOpened={isFirstTourist && valueAvailable && !alreadyHasValue}
                springConfig={{stiffness: 190, damping: 25, precision: 5}}
            >
                <div className={blockName('when-gived')()}>
                    <div className={blockName('tooltip-box')()}>
                <span
                    className={blockName('tooltip')({action: true})()}
                    onClick={() => {
                        this.touristData.setPassportIssuedByFieldState({
                            value: valueTip,
                            isTouched: true
                        });
                        this.touristData.setAsCustomer(true);
                    }}
                >
                    {valueTip}
                </span>
                    </div>
                </div>
            </Collapse>
        );
    }

    renderSurnameErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorError = this.formValidators.surname.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToLatKeyboardChar(this.touristData.surnameFieldState.value);
        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorError}
                    springConfig={{stiffness: 190, damping: 25, precision: 5}}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ warning: true })()}>
                        <span>Исправить на:</span>
                        <span
                            className={blockName('tooltip')({ action: true })()}
                            onClick={() => {
                                this.touristData.setSurnameFieldState({
                                    value: name,
                                    isTouched: true
                                });

                                this.touristData.setGenderValue(
                                    this.detectTouristGender(this.touristData.surnameFieldState.value,
                                        this.touristData.firstNameFieldState.value)
                                );

                                this.touristData.validateForm();
                            }}
                        >
                            {name}
                        </span>
                    </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.surname.hasError() && !isNameValidatorError}
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

    renderFirstNameErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorError = this.formValidators.firstName.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToLatKeyboardChar(this.touristData.firstNameFieldState.value);
        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ warning: true })()}>
                        <span>Исправить на: </span>
                        <span
                            className={blockName('tooltip')({ action: true })()}
                            onClick={() => {
                                this.touristData.setFirstNameFieldState({
                                    value: name,
                                    isTouched: true
                                });

                                this.touristData.setGenderValue(
                                    this.detectTouristGender(this.touristData.surnameFieldState.value,
                                        this.touristData.firstNameFieldState.value)
                                );

                                this.touristData.validateForm();
                            }}
                        >
                            {name}
                        </span>
                    </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.firstName.hasError() && !isNameValidatorError}
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

    renderCyrillicSurnameErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorError = this.formValidators.cyrillicSurname.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToCyrKeyboardChar(this.touristData.cyrillicSurnameFieldState.value);
        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ warning: true })()}>
                        <span>Исправить на:</span>
                        <span
                            className={blockName('tooltip')({ action: true })()}
                            onClick={() => {
                                this.touristData.setCyrillicSurnameFieldState({
                                    value: name,
                                    isTouched: true
                                });

                                this.touristData.setGenderValue(
                                    this.detectTouristGender(this.touristData.cyrillicSurnameFieldState.value,
                                        this.touristData.cyrillicFirstNameFieldState.value)
                                );

                                this.touristData.validateForm();
                            }}
                        >
                            {name}
                        </span>
                    </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.cyrillicSurname.hasError() && !isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ error: true })()}>
                        {this.formValidators.cyrillicSurname.errorMessage()}
                    </span>
                    </div>
                </Collapse>
            </div>
        );
    }

    renderCyrillicFirstNameErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorError = this.formValidators.cyrillicFirstName.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToCyrKeyboardChar(this.touristData.cyrillicFirstNameFieldState.value);
        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ warning: true })()}>
                        <span>Исправить на: </span>
                        <span
                            className={blockName('tooltip')({ action: true })()}
                            onClick={() => {
                                this.touristData.setCyrillicFirstNameFieldState({
                                    value: name,
                                    isTouched: true
                                });

                                this.touristData.setGenderValue(
                                    this.detectTouristGender(this.touristData.cyrillicFirstNameFieldState.value,
                                        this.touristData.cyrillicFirstNameFieldState.value)
                                );

                                this.touristData.validateForm();
                            }}
                        >
                            {name}
                        </span>
                    </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.cyrillicFirstName.hasError() && !isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ error: true })()}>
                        {this.formValidators.cyrillicFirstName.errorMessage()}
                    </span>
                    </div>
                </Collapse>
            </div>
        );
    }

    renderCyrillicPatronymicErrorTooltip(blockName: bemCn.Inner): JSX.Element | null {
        const isNameValidatorError = this.formValidators.cyrillicPatronymic.failedValidatorId() === NAME_VALIDATOR_ID;
        const name = replaceToCyrKeyboardChar(this.touristData.cyrillicPatronymicFieldState.value);
        return (
            <div>
                <Collapse
                    isOpened={isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ warning: true })()}>
                        <span>Исправить на: </span>
                        <span
                            className={blockName('tooltip')({ action: true })()}
                            onClick={() => {
                                this.touristData.setCyrillicPatronymicFieldState({
                                    value: name,
                                    isTouched: true
                                });

                                this.touristData.validateForm();
                            }}
                        >
                            {name}
                        </span>
                    </span>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={this.formValidators.cyrillicPatronymic.hasError() && !isNameValidatorError}
                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                >
                    <div className={blockName('tooltip-box')()}>
                    <span className={blockName('tooltip')({ error: true })()}>
                        {this.formValidators.cyrillicPatronymic.errorMessage()}
                    </span>
                    </div>
                </Collapse>
            </div>
        );
    }

    private detectTouristGender(surName: string, firstName: string): Gender {
        const name = transliterateToCyr(firstName || '');
        const surname = transliterateToCyr(surName || '');

        return (this.touristData.gender === Gender.unknown)
            ? detectGender(name, surname)
            : this.touristData.gender;
    }

    private focusPassportSeriesFieldIfEmptyAndGenderIsUnknown(): void {
        const isGenderUnknown = this.touristData.gender === Gender.unknown;
        if (!!this.passportSeriesFieldRef && !this.touristData.passportSeriesFieldState.value && !isGenderUnknown) {
            this.passportSeriesFieldRef.focus();
        }
    }

    private focusPassportNumberFieldIfEmptyAndGenderIsUnknown(): void {
        const isGenderUnknown = this.touristData.gender === Gender.unknown;
        if (!!this.passportNumberFieldRef && !this.touristData.passportNumberFieldState.value && !isGenderUnknown) {
            this.passportNumberFieldRef.focus();
        }
    }


    private focusPassportValidUntilFieldIfEmpty(): void {
        if (!!this.passportValidUntilFieldRef && !!this.touristData.passportValidUntilFieldState && !this.touristData.passportValidUntilFieldState!.value) {
            this.passportValidUntilFieldRef.focus();
        }
    }

    private focusIssuedByFieldIfEmpty(): void {
        if (!!this.passportIssuedByFieldRef && !this.touristData.passportIssuedByFieldState.value) {
            this.passportIssuedByFieldRef.focus();
        }
    }

    private collapsePreviousTouristsFormsIfValid(): void {
        if (this.touristId === 0) {
            return;
        }
        rangeRight(this.touristId)
            .forEach(idx => S.buyOnlineStore.touristsData[idx].collapseFormIfValid());
    }

    private get firstNameField(): string {
        return `tourist_${this.touristId + 1}_firstname`;
    }

    private get surnameField(): string {
        return `tourist_${this.touristId + 1}_surname`;
    }

    private get cyrillicFirstNameField(): string {
        return `tourist_${this.touristId + 1}_cyrillic_firstname`;
    }

    private get cyrillicSurnameField(): string {
        return `tourist_${this.touristId + 1}_cyrillic_surname`;
    }

    private get cyrillicPatronymicField(): string {
        return `tourist_${this.touristId + 1}_cyrillic_patronymic`;
    }

    private get birthdayField(): string {
        return `tourist_${this.touristId + 1}_birthday`;
    }

    private get passportField(): string {
        if (this.showBirthCertificate) {
            return `tourist_${this.touristId + 1}_birth_certificate`;
        }
        return `tourist_${this.touristId + 1}_passport`;
    }

    private get passportIssuedWhenField(): string {
        return `tourist_${this.touristId + 1}_date_of_issue`;
    }

    private get passportValidUntilField(): string {
        return `tourist_${this.touristId + 1}_expiry_date`;
    }

    private get passportIssuedByField(): string {
        return `tourist_${this.touristId + 1}_issued_by`;
    }

    private get touristId(): number {
        return this.props.touristId;
    }

    private get showBirthCertificate(): boolean {
        return S.mainStore.isNoInternationalPassportNeed && this.touristData.lessThanFourteenYearsOld;
    }


    // TODO uncomment when corresponding functionality added
    // Кейс с дублированием данных заказчика
    private get isNameHidden(): boolean {
        // return (this.touristId === 0) && !S.buyOnlineUiStore.firstTouristsFieldsVisibility.isFullNameVisible;
        return false;
    }

    // Кейс с дублированием данных заказчика
    private get isPassportHidden(): boolean {
        // return (this.touristId === 0) && !S.buyOnlineUiStore.firstTouristsFieldsVisibility.isPassportVisible;
        return false;
    }

    // Кейс с дублированием данных заказчика
    private get isPassportIssuedWhenHidden(): boolean {
        // return (this.touristId === 0) && !S.buyOnlineUiStore.firstTouristsFieldsVisibility.isPassportIssuedWhenVisible;
        return false;
    }

    // Кейс с дублированием данных заказчика
    private get isPassportIssuedByHidden(): boolean {
        // return (this.touristId === 0) && !S.buyOnlineUiStore.firstTouristsFieldsVisibility.isPassportIssuedByVisible;
        return false;
    }

    private get defaultFieldTabIndex(): number {
        // return S.buyOnlineStore.touristsData[this.touristId].isTouristsBlockVisible ? 0 : -1;
        return 0;
    }

    private get isFormValid(): boolean {
        return this.touristData.isFormValid();
    }

    private get isFormFilledCorrect(): boolean {
        return this.isFormValid && this.touristData.isFormFilled();
    }

    private get isFormContentCollapsed(): boolean {
        return !!this.touristData.isFormCollapsed;
    }

    private get formValidators(): TouristFormFieldsValidators {
        return this.touristData.formValidators;
    }

    private get touristData(): TouristDataStore {
        return S.buyOnlineStore.touristsData[this.touristId]
     }
}
