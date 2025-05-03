/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';
import { observer } from 'mobx-react';

import { UiText } from 'sletat-uikit2/dist/js/UiText';

import { snilsMask } from './masks/snilsMask';
import { certificateMask } from './masks/certificateNumber';
import S from '../../../stores';
import { CertificateDataStore } from '../../../stores/buy-online/certificate-data';
import { Collapse } from 'react-collapse';

import { UiAdaptiveSingleSelect } from 'sletat-uikit2/dist/js/selects/UiAdaptiveSingleSelect/UiAdaptiveSingleSelect';
import { UiCheckbox } from 'sletat-uikit2/dist/js/UiCheckbox/UiCheckbox';
import { UiDatePicker } from '../uikit/UiDatePicker';
import { MgtCertificateType } from '../../../models/module';


const VerbalNumbers = ['Первый', 'Второй', 'Третий', 'Четвертый', 'Пятый', 'Шестой', 'Седьмой', 'Восьмой', 'Девятый'];

interface CertificatePaymentsBlockProps {
    touristKey: number
}


@observer
export class CertificatePaymentsBlock extends React.Component<CertificatePaymentsBlockProps> {

    private snilsChildrenRef: HTMLInputElement | null = null;
    private snilsDeclarantRef: HTMLInputElement | null = null;
    private snilsSupportRef: HTMLInputElement | null = null;
    private certificateNumberRef: HTMLInputElement | null = null;
    private issueDateRef: HTMLInputElement | null = null;

    render() {
        const blockName = bemCn('certificate-payments-block');

        return (
            <div className={blockName()}>
                <div className={blockName('certificate-error-message')()}>
                    {((S.buyOnlineStore.addCertificateErrorMessage.get(this.props.touristKey)?.length ?? 0) > 0) ? `${S.buyOnlineStore.addCertificateErrorMessage.get(this.props.touristKey)}` : ``}
                </div>
                {(this.renderCertificatesList(blockName, this.props.touristKey))}                
            </div>
        );
    }

    renderCertificatesList(blockName: bemCn.Inner, touristKey: number): JSX.Element {
            
        const certificat = S.buyOnlineStore.certificates.get(touristKey);
        return (
            <>
                {(!!certificat && !!certificat[0]) && (
                    this.renderCertificateBlock(certificat[0],  touristKey, blockName)
                  )}
                {(!certificat || !certificat[0]) && (
                <div
                    className={blockName('add-certificate-button')()}
                    onClick={() => S.buyOnlineStore.addCertificateData(touristKey)}
                >
                    + Добавить сертификат
                </div>
                )}
            </>
        );
    }

    renderCertificateBlock(certificate: CertificateDataStore, touristKey: number, blockName: bemCn.Inner): JSX.Element {
        const keyBlock = touristKey * 100;
        return (
            <div
                key={keyBlock}
                className={blockName('certificate-fields')()}
            >
                <div className={blockName('input')()}>
                    <UiText
                        inputName={`cert-number-${keyBlock}`}
                        inputRef={(elem: HTMLInputElement) => this.certificateNumberRef = elem}
                        controlTitle={'Номер сертификата'}
                        maskOptions={{
                            mask: certificateMask()
                        }}
                        inputValue={certificate.certificateNumber.value}
                        placeholderText={'х-xxxxxx/xx'}
                        isError={!!certificate.certificateNumberValidation.errorMessage}
                        isValid={certificate.certificateNumberValidation.isValidAndTouched}
                        bemModifications={['buy-online']}
                        useTooltipAnimation={true}
                        onValidationIconClick={() => {
                            this.certificateNumberRef!.focus();
                            certificate.setCertificateNumber({ value: '', isTouched: false });
                        }}
                        onFocus={state => {
                            certificate.setCertificateNumber({ value: state.value, isTouched: false });
                        }}
                        onChange={state => {
                            certificate.setCertificateNumber({ value: state.value, isTouched: false });
                        }}
                        onBlur={state => {
                            certificate.setCertificateNumber({ value: state.value, isTouched: true });
                        }}
                    />
                    <div>
                        <Collapse
                            isOpened={!!certificate.certificateNumberValidation.errorMessage}
                            springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                        >
                            <div className={blockName('tooltip-box')()}>
                                <span className={blockName('tooltip')({ error: true })()}>
                                    {certificate.certificateNumberValidation.errorMessage}
                                </span>
                            </div>
                        </Collapse>
                    </div>
                </div>
                
                {(certificate.certificateType === MgtCertificateType.type1 || !S.buyOnlineStore.touristsData[touristKey].IsAdult) && (
                    <>
                        <div className={blockName('input')()}>
                            <UiText
                                inputName={`snils-${keyBlock}`}
                                inputRef={(elem: HTMLInputElement) => this.snilsChildrenRef = elem}
                                controlTitle={'СНИЛС ребенка'}
                                maskOptions={{
                                    mask: snilsMask()
                                }}
                                inputValue={certificate.snilsChildren?.value}
                                placeholderText={'xxx-xxx-xxx-xx'}
                                isError={!!certificate.snilsChildrenValidation.errorMessage}
                                isValid={certificate.snilsChildrenValidation.isValidAndTouched}
                                bemModifications={['buy-online']}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.snilsChildrenRef!.focus();
                                    certificate.setSnilsChildren({ value: '', isTouched: false });
                                }}
                                onFocus={state => {
                                    certificate.setSnilsChildren({ value: state.value, isTouched: false });
                                }}
                                onChange={state => {
                                    certificate.setSnilsChildren({ value: state.value, isTouched: false });
                                }}
                                onBlur={state => {
                                    certificate.setSnilsChildren({ value: state.value, isTouched: true });
                                }}
                            />
                            <div>
                                <Collapse
                                    isOpened={!!certificate.snilsChildrenValidation.errorMessage}
                                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                                >
                                    <div className={blockName('tooltip-box')()}>
                                        <span className={blockName('tooltip')({ error: true })()}>
                                            {certificate.snilsChildrenValidation.errorMessage}
                                        </span>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                            { certificate.certificateType !== MgtCertificateType.type3 && 
                        (  
                        <div className={blockName('input')()}>
                            <div className={blockName('support-title')()}>В сертификате есть сопровождающий</div>
                            <div className={blockName('support-checkbox')({'active': certificate.isSupportSertificate.value})()}>
                                <UiCheckbox
                                    id={`is-support-${keyBlock}`}
                                    inputName={`is-support-${keyBlock}`}
                                    label={``}
                                    controlTitle={''}
                                    isChecked={certificate.isSupportSertificate.value}
                                    bemModifications={['buy-online']}
                                    tooltipHelpText={`Если в сертификате указан сопровождающий, просим заполнить поля`}
                                    onChange={(state) => {
                                        certificate.setIsSupportSertificate({ value: Boolean(state.checked), isTouched: false });
                                    }}
                                />
                            </div>
                            <div className={blockName('support-select')()}>
                                {certificate.isSupportSertificate.value && (
                                <UiAdaptiveSingleSelect
                                    controlTitle={''}
                                    inputName={`support-certificat-${keyBlock}`}
                                    inputValue={String(certificate.touristSupportIndex.value)}
                                    onChange={(state) => {
                                        certificate.setTouristSupportIndex({ value: parseInt(state.selectedValue,10), isTouched: false });
                                    }}
                                    options={S.buyOnlineStore.touristsData.filter(c => !c.isKid).map((t, i) => {
                                        return {
                                            label: /[\S]+/.test(t.fullName) ? t.fullName : `${VerbalNumbers[i]} турист`, 
                                            inputValue: i.toString()
                                    }})}
                                    placeholderText="Выберите сопровождающего"
                                    bemModifications={['buy-online']}
                                />)
                            }  
                            </div>                
                        </div>
                        )}
                        <div className={blockName('input')()}>
                        { certificate.isSupportSertificate.value && (
                            <>
                            <UiText
                                inputName={`snils-support-${keyBlock}`}
                                inputRef={(elem: HTMLInputElement) => this.snilsSupportRef = elem}
                                controlTitle={'СНИЛС сопровождающего'}
                                maskOptions={{
                                    mask: snilsMask()
                                }}
                                inputValue={certificate.snilsSupport.value}
                                placeholderText={'xxx-xxx-xxx-xx'}
                                isError={!!certificate.snilsSupportValidation.errorMessage}
                                isValid={certificate.snilsSupportValidation.isValidAndTouched}
                                bemModifications={['buy-online']}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.snilsSupportRef!.focus();
                                    certificate.setSnilsSupport({ value: '', isTouched: false });
                                }}
                                onFocus={state => {
                                    certificate.setSnilsSupport({ value: state.value, isTouched: false });
                                }}
                                onChange={state => {
                                    certificate.setSnilsSupport({ value: state.value, isTouched: false });
                                }}
                                onBlur={state => {
                                    certificate.setSnilsSupport({ value: state.value, isTouched: true });
                                }}
                            />
                            <div>
                                <Collapse
                                    isOpened={!!certificate.snilsSupportValidation.errorMessage}
                                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                                >
                                    <div className={blockName('tooltip-box')()}>
                                        <span className={blockName('tooltip')({ error: true })()}>
                                            {certificate.snilsSupportValidation.errorMessage}
                                        </span>
                                    </div>
                                </Collapse>
                            </div>
                            </>
                        )}
                        </div>
                            </>
                        )}
                        
                        
                        <div className={blockName('input')()}>
                            <UiDatePicker
                                controlTitle={'Дата выдачи сертификата'}
                                inputName={`date-issue-field-${keyBlock}`}
                                inputRef={(elem: HTMLInputElement | null) => this.issueDateRef = elem}
                                placeholderText={'дд.мм.гггг'}
                                inputValue={certificate.issueDate.value}
                                listOfYears={[2024, 2025]}
                                isError={!!certificate.issueDateValidation.errorMessage}
                                tooltipErrorText={certificate.issueDateValidation.errorMessage}
                                isValid={certificate.issueDateValidation.isValidAndTouched}
                                wrapperClass={blockName('input')()}
                                bemModifications={['buy-online']}
                                useTooltipAnimation={true}
                                min={'30.12.2023'}
                                onValidationIconClick={() => {
                                    this.issueDateRef!.focus();
                                    certificate.setIssueDate({
                                        value: '',
                                        isTouched: false
                                    });
                                }}
                                onFocus={() => {
                                    certificate.setIssueDate({
                                        value: certificate.issueDate.value,
                                        isTouched: false
                                    });
                                }}
                                onInputDate={state => {
                                    certificate.setIssueDate({
                                        value: state.value,
                                        isTouched: false
                                    });
                                }}
                                onSelectDate={state => {
                                    certificate.setIssueDate({
                                        value: state.value,
                                        isTouched: true
                                    });
                                }}
                                onBlur={() => {
                                    certificate.setIssueDate({
                                        value: certificate.issueDate.value,
                                        isTouched: true
                                    });
                                }}
                            />
                        </div>
                        <div className={blockName('input')()}>
                            <UiText
                                inputName={`snils-${keyBlock}`}
                                inputRef={(elem: HTMLInputElement) => this.snilsDeclarantRef = elem}
                                controlTitle={'СНИЛС заявителя'}
                                maskOptions={{
                                    mask: snilsMask()
                                }}
                                inputValue={certificate.snilsDeclarant.value}
                                placeholderText={'xxx-xxx-xxx-xx'}
                                isError={!!certificate.snilsDeclarantValidation.errorMessage}
                                isValid={certificate.snilsDeclarantValidation.isValidAndTouched}
                                bemModifications={['buy-online']}
                                useTooltipAnimation={true}
                                onValidationIconClick={() => {
                                    this.snilsDeclarantRef!.focus();
                                    certificate.setSnilsDeclarant({ value: '', isTouched: false });
                                }}
                                onFocus={state => {
                                    certificate.setSnilsDeclarant({ value: state.value, isTouched: false });
                                }}
                                onChange={state => {
                                    certificate.setSnilsDeclarant({ value: state.value, isTouched: false });
                                }}
                                onBlur={state => {
                                    certificate.setSnilsDeclarant({ value: state.value, isTouched: true });
                                }}
                            />
                            <div>
                                <Collapse
                                    isOpened={!!certificate.snilsDeclarantValidation.errorMessage}
                                    springConfig={{ stiffness: 190, damping: 25, precision: 5 }}
                                >
                                    <div className={blockName('tooltip-box')()}>
                                        <span className={blockName('tooltip')({ error: true })()}>
                                            {certificate.snilsDeclarantValidation.errorMessage}
                                        </span>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        {(certificate.certificateType === MgtCertificateType.type1 || !S.buyOnlineStore.touristsData[touristKey].IsAdult) && (
                            <>
                                <div className={blockName('input')()}>
                                    <UiText
                                        controlTitle={'Фамилия заявителя кириллицей'}
                                        inputName={`tourist-lname-field-${keyBlock}`}
                                        inputValue={certificate.decantCyrillicSurname.value}
                                        placeholderText={'Иванов'}
                                        bemModifications={['buy-online']}
                                        isError={!!certificate.cyrillicSurnameValidation.errorMessage}
                                        isValid={certificate.cyrillicSurnameValidation.isValidAndTouched}
                                        onValidationIconClick={() => {
                                            certificate.setDecantSurname({ value: '', isTouched: false });
                                        }}
                                        onFocus={state => {
                                            certificate.setDecantSurname({ value: state.value, isTouched: false });
                                        }}
                                        onChange={state => {
                                            certificate.setDecantSurname({ value: state.value, isTouched: false });
                                        }}
                                        onBlur={state => {
                                            certificate.setDecantSurname({ value: state.value, isTouched: true });
                                        }}
                                    />
                                </div>
                                <div className={blockName('input')()}>
                                    <UiText
                                        controlTitle={'Имя заявителя кириллицей'}
                                        inputName={`tourist-fname-field-${keyBlock}`}
                                        inputValue={certificate.decantCyrillicFirstname.value}
                                        placeholderText={'Иван'}
                                        isError={!!certificate.cyrillicFirstnameValidation.errorMessage}
                                        isValid={certificate.cyrillicFirstnameValidation.isValidAndTouched}
                                        bemModifications={['buy-online']}
                                        onValidationIconClick={() => {
                                            certificate.setDecantFirstname({ value: '', isTouched: false });
                                        }}
                                        onFocus={state => {
                                            certificate.setDecantFirstname({ value: state.value, isTouched: false });
                                        }}
                                        onChange={state => {
                                            certificate.setDecantFirstname({ value: state.value, isTouched: false });
                                        }}
                                        onBlur={state => {
                                            certificate.setDecantFirstname({ value: state.value, isTouched: true });
                                        }}
                                    />
                                </div>
                                <div className={blockName('input')()}>
                                    <UiText
                                        controlTitle={'Отчество заявителя кириллицей'}
                                        inputName={`tourist-pname-field-${keyBlock}`}
                                        inputValue={certificate.decantCyrillicPatronymic.value}
                                        placeholderText={'Иванович'}
                                        isError={!!certificate.cyrillicPatronymicValidation.errorMessage}
                                        isValid={certificate.cyrillicPatronymicValidation.isValidAndTouched}
                                        bemModifications={['buy-online']}
                                        onValidationIconClick={() => {
                                            certificate.setDecantPatronymic({ value: '', isTouched: false });
                                        }}
                                        onFocus={state => {
                                            certificate.setDecantPatronymic({ value: state.value, isTouched: false });
                                        }}
                                        onChange={state => {
                                            certificate.setDecantPatronymic({ value: state.value, isTouched: false });
                                        }}
                                        onBlur={state => {
                                            certificate.setDecantPatronymic({ value: state.value, isTouched: true });
                                        }}
                                    />
                                </div>
                            </>
                )}
                
                <div className={blockName('certificate-buttons')()}>
                    <div
                        className={
                            blockName('apply-certificate-button')({
                                disabled: !certificate.isFormValid || certificate.isApplied || certificate.isLoadingState
                            })()
                        }
                        onClick={async () => {
                            try{
                                certificate.setIsLoading(true);
                                await S.buyOnlineStore.applyCertificateData(touristKey);
                            } finally {
                                certificate.setIsLoading(false);
                            }                            
                        }}
                    >
                        Применить
                    </div>
                    <div
                        className={blockName('delete-certificate-button')()}
                        onClick={() => S.buyOnlineStore.removeCertificateData(touristKey)}
                    >
                        Удалить
                    </div>
                </div>
            </div>
        );
    }
}
