/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import * as bemCn from 'bem-cn';
import { observer } from 'mobx-react';
import { debounce, rangeRight } from 'lodash';
import AnimateHeight from 'react-animate-height';

import { currency } from 'sletat-api-services/lib/types';
import { setBodyOverflow } from 'sletat-common-utils/lib/dom';
import { TourService } from 'sletat-api-services/lib/module/tourActualization/models';
import { PrepaymentSchema } from 'sletat-api-services/lib/ClaimApiServices/Main.svc/GetSettings/PrepaymentSchema';
import { UiCheckbox } from 'sletat-uikit2/dist/js/UiCheckbox';
import { UiLoader } from 'sletat-uikit2/dist/js/UiLoader';
import { UiPopup } from 'sletat-uikit2/dist/js/UiPopup';
import { UiText } from 'sletat-uikit2/dist/js/UiText';

import { parseDateString } from 'sletat-common-utils/lib/date';
import { TouristDataForm } from './TouristDataForm';
import { CustomerDataForm } from './CustomerDataForm';
import { TourShortInfo } from './TourShortInfo';
import { PaymentOptions } from './PaymentOptions';
import { TourActualizationState } from '../../models/actualization';
import {
    BaseBuyOnlineParams,
    BuyOnlineCreateClaimStatus,
} from '../../models/buy-online';
import { getScrollWidth } from '../../utils/adaptive';
import { MODULE6_TARGET } from '../../types-and-consts';
import { isIPhone } from '../../utils';
import { Module5PrivacyPolicyLoadingStatus } from '../../stores/buy-online';
import S from '../../stores';
import { CertificatePaymentsBlock } from './CertificatePaymentsBlock';
import { COUNTRIES_IDS } from '../../consts';

import { TouristDataStore } from '../../stores/buy-online/tourist-data';

export interface BuyOnlineProps {
    areIncludedFlightTickets: boolean;
    requestId: number;
    sourceId: number;
    offerId: number;
    priceModifierSchemeId: string | null;
    isTwoStepPayment: boolean;
    tourData: BuyOnlineTourData;
    tourActualization: TourActualizationState;
    prepaymentSchemas: Array<PrepaymentSchema>;
    offerAgreementLink: string;
    privacyPolicyLink: string;
    statementOfPersonalDataLink: string;
    onError: (error: string) => void;
    onSubmit: () => void;
    onSuccess: (request: BaseBuyOnlineParams) => void;
}

export interface BuyOnlineTourData {
    price: number;
    priceCurrency: currency;
    departureDate: string | null;
    arrivalDate: string | null;
    tourNumNights: number | null;
    arrivalCountryName: string;
    departureCityName: string;
    resortName: string | null;
    hotelName: string | null;
    hotelStarsName: string | null;
    hotelMealTypeDescription: string | null;
    hotelRoomTypeDescription: string | null;
    tourOperatorName: string | null;
    adultsCount: number;
    kidsCount: number;
    includedServices: Array<TourService>;
}

interface BuyOnlineState {
    isModule5PrivacyPolicyPopupVisible: boolean;
}

@observer
export class BuyOnline extends React.Component<BuyOnlineProps, BuyOnlineState> {
    constructor(props: BuyOnlineProps) {
        super(props);
        this.state = {
            isModule5PrivacyPolicyPopupVisible: false,
        };
    }

    private resizeHandler = debounce(() => {
        const viewportWidth = this.viewportWidth;
        const viewportHeight = this.viewportHeight;

        if (viewportWidth !== S.buyOnlineAdaptiveStore.viewportWidth) {
            S.buyOnlineAdaptiveStore.setViewportWidth(viewportWidth);
        }

        if (viewportHeight !== S.buyOnlineAdaptiveStore.viewportHeight) {
            S.buyOnlineAdaptiveStore.setViewportHeight(viewportHeight);
        }
    }, 100);

    componentDidMount(): void {
        S.mainStore.setTourPrice(this.props.tourData.price);
        S.mainStore.setCheckIn(
            parseDateString(
                this.props.tourData.departureDate || '',
                'DD.MM.YYYY',
            ),
        );
        S.mainStore.setCheckOut(
            parseDateString(
                this.props.tourData.arrivalDate || '',
                'DD.MM.YYYY',
            ),
        );
        S.mainStore.setNumAdults(this.props.tourData.adultsCount);
        S.mainStore.setNumKids(this.props.tourData.kidsCount);
        S.buyOnlineStore.setBuyOnlineSettings({
            priceModifierSchemeId: this.props.priceModifierSchemeId,
            isTwoStepPayment: this.props.isTwoStepPayment,
            prepaymentSchemas: this.props.prepaymentSchemas,
        });
        window.addEventListener('resize', this.resizeHandler);
        S.buyOnlineAdaptiveStore.setViewportWidth(this.viewportWidth);
        S.buyOnlineAdaptiveStore.setViewportHeight(this.viewportHeight);
    }

    componentWillReceiveProps(nextProps: Readonly<BuyOnlineProps>): void {
        if (nextProps.tourData.price !== this.props.tourData.price) {
            S.mainStore.setTourPrice(nextProps.tourData.price);
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.resizeHandler);
        S.buyOnlineStore.setModule5PrivacyPolicyDocumentLoadingStatus(
            Module5PrivacyPolicyLoadingStatus.Initial,
        );
    }

    render() {
        const blockName = bemCn('buy-online');
        S.buyOnlineStore.customerData.validateForm();
        S.buyOnlineStore.touristsData.forEach((touristStore) =>
            touristStore.validateForm(),
        );

        return (
            <div className={blockName()}>
                {this.renderContent(blockName)}
                {this.renderCreateClaimStatusInfo(blockName)}
                {this.renderPrivacyPolicyPopup(blockName)}
            </div>
        );
    }

    renderContent(blockName: bemCn.Inner): JSX.Element | null {
        if (
            S.buyOnlineStore.createClaimStatus !==
            BuyOnlineCreateClaimStatus.Initial
        ) {
            return null;
        }

        return (
            <>
                <TourShortInfo
                    areIncludedFlightTickets={
                        this.props.areIncludedFlightTickets
                    }
                    tourData={this.props.tourData}
                    certificatesDiscount={S.buyOnlineStore.certificatesDiscount}
                    tourOperatorId={this.props.sourceId}
                    tourActualization={this.props.tourActualization}
                />
                <section id={'buy-online-form'} className={blockName('form')()}>
                    <CustomerDataForm />
                    {this.renderCommentBlock(blockName)}
                    {this.renderTouristsList(blockName)}
                    {this.shouldShowPaymentOptions && (
                        <PaymentOptions
                            price={this.props.tourData.price}
                            currency={this.props.tourData.priceCurrency}
                            wrapperClass={blockName('payment-options')()}
                        />
                    )}
                    <div className={blockName('agreement')()}>
                        {S.buyOnlineStore.isMgtModule &&
                            S.mainStore.countryId === COUNTRIES_IDS.Russia && (
                                <span
                                    className={blockName('MGT-cert-warning')()}
                                >
                                    Убедитесь, что при заполнении заявки вы
                                    ввели данные на всех лиц, указанных в
                                    сертификате.
                                    <br /> Обращаем внимание, что после
                                    подтверждения и оплаты бронирования добавить
                                    в заявку ранее не указанных лиц из
                                    сертификата не представляется возможным.
                                </span>
                            )}
                        <UiCheckbox
                            id={'offer-agreement'}
                            inputName={'offer-agreement'}
                            isChecked={
                                S.buyOnlineStore.customerData.isAgreeWithOffer
                            }
                            label={this.renderAgreementLabel(blockName)}
                            bemModifications={['buy-online', 'agreement-label']}
                            onChange={(state) => {
                                rangeRight(
                                    S.buyOnlineStore.touristsData.length,
                                ).forEach((idx) =>
                                    S.buyOnlineStore.touristsData[
                                        idx
                                    ].collapseFormIfValid(),
                                );
                                S.buyOnlineStore.customerData.checkIsAgreeWithOffer(
                                    state.checked,
                                );
                            }}
                        />
                    </div>
                    {this.renderPaymentInfo(blockName)}
                    {this.renderPaymentAttention(blockName)}
                </section>
            </>
        );
    }

    renderCommentBlock(blockName: bemCn.Inner): JSX.Element {
        return (
            <div className={blockName('comment-block')()}>
                <UiText
                    controlTitle={'Ваш комментарий'}
                    inputName={'user-comment-field'}
                    inputValue={S.buyOnlineStore.userComment}
                    bemModifications={['buy-online']}
                    isMultiLine={true}
                    placeholderText={
                        'Здесь вы можете оставить свои пожелания. При планировании поездки группой укажите в комментарии «совместная заявка».'
                    }
                    rows={2}
                    onChange={(state) =>
                        S.buyOnlineStore.setUserComment(state.value)
                    }
                />
            </div>
        );
    }

    renderTouristsList(blockName: bemCn.Inner): JSX.Element {
        return (
            <div className={blockName('tourists-list')()}>
                <div className={blockName('title-wrap')()}>
                    <h3 className={blockName('title')()}>Туристы</h3>
                </div>
                {this.renderTouristToggleBlock(blockName)}

                <div
                    id={'tourists-form'}
                    className={blockName('tourists-form')()}
                >
                    <AnimateHeight
                        duration={300}
                        height={
                            S.buyOnlineStore.isMgtModule
                                ? 'auto'
                                : !S.buyOnlineUiStore.isTouristsBlockVisible
                                ? 0
                                : 'auto'
                        }
                        applyInlineTransitions={true}
                        easing={'ease'}
                        onAnimationEnd={() => {
                            // TODO create sticky tour short info block
                            // S.tourShortInfoStickyStore.updateStickyBlockPosition();
                        }}
                    >
                        {S.buyOnlineStore.touristsData.map((_store, idx) => (
                            <React.Fragment key={`tourist-block-${idx}`}>
                                <TouristDataForm key={idx} touristId={idx} />
                                { S.buyOnlineStore.isMgtModule &&
                                    S.mainStore.countryId === COUNTRIES_IDS.Russia && (
                                        <CertificatePaymentsBlock
                                            touristKey={idx}
                                        />
                                    )} 
                            </React.Fragment>
                        ))}
                    </AnimateHeight>
                </div>
            </div>
        );
    }

    renderTouristToggleBlock(blockName: bemCn.Inner): JSX.Element {
        const switcherTitle = () => {
            if (S.buyOnlineUiStore.isTouristsBlockVisible) {
                return S.mainStore.isNoInternationalPassportNeed
                    ? 'Заполнить данные туристов позже'
                    : 'Заполнить данные загранпаспортов позже';
            }
            return S.mainStore.isNoInternationalPassportNeed
                ? 'Заполнить данные туристов'
                : 'Заполнить данные загранпаспортов';
        };

        if (S.buyOnlineStore.isMgtModule) {
            return <></>;
        }
        return (
            <>
                <p className={blockName('subtitle')()}>
                    Если документы под рукой, заполните сейчас
                </p>
                <button
                    className={blockName('collapse-button')({
                        expand: S.buyOnlineUiStore.isTouristsBlockVisible,
                    })()}
                    onClick={() => {
                        S.buyOnlineUiStore.toggleTouristsBlockVisible();
                    }}
                >
                    {switcherTitle()}
                </button>
            </>
        );
    }

    renderPaymentInfo(blockName: bemCn.Inner): JSX.Element {
        const buyBtnMods = {
            disabled: this.isBuyButtonDisabled,
            shake: S.buyOnlineUiStore.isBuyButtonShaking,
        };

        return (
            <div className={blockName('payment-info')()}>
                <div
                    className={blockName('submit-button-wrapper')()}
                    onMouseEnter={() =>
                        S.buyOnlineUiStore.setIsBuyButtonHovered(true)
                    }
                    onMouseLeave={() =>
                        S.buyOnlineUiStore.setIsBuyButtonHovered(false)
                    }
                >
                    <button
                        className={blockName('submit-button')(buyBtnMods)()}
                        onClick={() => this.clickBuyButton()}
                    >
                        {S.buyOnlineStore.buyOnlineSettings.isTwoStepPayment
                            ? 'К оплате'
                            : 'Заказать'}
                    </button>
                    <div
                        className={blockName('submit-button-warning')({
                            visible: this.isBuyButtonWarningVisible,
                        })()}
                    >
                        {this.renderSubmitButtonWarningText()}
                    </div>
                </div>
            </div>
        );
    }

    renderPaymentAttention(blockName: bemCn.Inner): JSX.Element | null {
        const text = S.buyOnlineStore.buyOnlineSettings.isTwoStepPayment
            ? 'После нажатия вы перейдете на страницу банка-партнера, чтобы совершить безопасный платеж. Потом вам перезвонит менеджер и подтвердит покупку. Деньги спишутся только после этого.'
            : 'Заявка на тур будет передана вашему менеджеру. Ссылка на оплату придет на указанный электронный адрес.';

        return <p className={blockName('payment-attention')()}>{text}</p>;
    }

    renderSubmitButtonWarningText(): JSX.Element | null {
        const isEmailValid =
            !!S.buyOnlineStore.customerData.emailFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.email.isValid();

        const isPhoneValid =
            !!S.buyOnlineStore.customerData.phoneFieldState.value &&
            S.buyOnlineStore.customerData.formValidators.phone.isValid();

        if (this.props.tourActualization.isActualizationInProcess) {
            return <span>Уточняем стоимость, подождите...</span>;
        }

        if (
            !isEmailValid &&
            !isPhoneValid &&
            !S.buyOnlineStore.customerData.isAgreeWithOffer
        ) {
            return (
                <span>
                    Введите{' '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                {
                                    isPhoneFocused: true,
                                },
                            )
                        }
                    >
                        телефон
                    </b>
                    {' и '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                {
                                    isEmailFocused: true,
                                },
                            )
                        }
                    >
                        эл.&nbsp;почту
                    </b>
                    ,
                    <br />и согласитесь на обработку персональных данных
                </span>
            );
        }

        if (!isEmailValid && !S.buyOnlineStore.customerData.isAgreeWithOffer) {
            return (
                <span>
                    Введите{' '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                { isEmailFocused: true },
                            )
                        }
                    >
                        эл.&nbsp;почту
                    </b>
                    {' и '}
                    согласитесь на обработку персональных данных
                </span>
            );
        }

        if (!isPhoneValid && !S.buyOnlineStore.customerData.isAgreeWithOffer) {
            return (
                <span>
                    Введите{' '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                { isPhoneFocused: true },
                            )
                        }
                    >
                        телефон
                    </b>
                    {' и '}
                    согласитесь на обработку персональных данных
                </span>
            );
        }

        if (!isEmailValid && !isPhoneValid) {
            return (
                <span>
                    Введите{' '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                {
                                    isPhoneFocused: true,
                                },
                            )
                        }
                    >
                        телефон
                    </b>
                    {' и '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                {
                                    isEmailFocused: true,
                                },
                            )
                        }
                    >
                        эл.&nbsp;почту
                    </b>
                </span>
            );
        }

        if (!isEmailValid) {
            return (
                <span>
                    Введите{' '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                {
                                    isEmailFocused: true,
                                },
                            )
                        }
                    >
                        эл.&nbsp;почту
                    </b>
                </span>
            );
        }

        if (!isPhoneValid) {
            return (
                <span>
                    Введите{' '}
                    <b
                        onClick={() =>
                            S.buyOnlineStore.customerData.setFocusedFieldsStates(
                                {
                                    isPhoneFocused: true,
                                },
                            )
                        }
                    >
                        телефон
                    </b>
                </span>
            );
        }

        if (!S.buyOnlineStore.customerData.isAgreeWithOffer) {
            return <span>Согласитесь на обработку персональных данных</span>;
        }

        if (S.buyOnlineStore.isMgtModule) {
            S.buyOnlineStore.customerData.setForceTouched(); //Есть потребность подсвеичивать все не введённые поля
            S.buyOnlineStore.touristsData.forEach((s) => s.setForceTouched());
            S.buyOnlineStore.customerData.validateForm();

            if (!S.buyOnlineStore.customerData.isAllFieldsFilledAndValid()) {
                return (
                    <span>
                        Все данные заказчика должны быть заполнены. Необходимо
                        проверить корректность заполнения.
                    </span>
                );
            }

            if (
                S.buyOnlineStore.allCertificates.some(
                    (c) => !c.isFormValidAndTouched,
                )
            ) {
                return (
                    <span>
                        Данные сертификатов не заполнены или заполнены
                        некорректно
                    </span>
                );
            }

            if (S.buyOnlineStore.allCertificates.some((c) => !c.isApplied)) {
                return (
                    <span>
                        Не все добавленные сертификаты применены. Необходимо
                        применить все сертификаты или удалить лишние
                    </span>
                );
            }

            if (!S.buyOnlineStore.touristsData) {
                return <span>Данные туристов не заполнены.</span>;
            }

            const notValidTourists = S.buyOnlineStore.touristsData.filter(
                (c) => !c.isFormFilled() || !c.isFormValid(),
            );
            if (notValidTourists.length > 0) {
                let errorField = this.checkNotValidField(notValidTourists[0]);

                return (
                    <span>
                        Данные не всех туристов заполнены.
                        {!!notValidTourists[0].cyrillicSurnameFieldState
                            .value &&
                            ` Необходимо заполнить ${errorField} по туристу: ${notValidTourists[0].cyrillicSurnameFieldState.value} ${notValidTourists[0].cyrillicFirstNameFieldState.value}`}
                    </span>
                );
            }
        }

        return null;
    }

    checkNotValidField(t: TouristDataStore): string {
        let errorFields = [];
        if (
            (t.cyrillicFirstNameFieldState.value &&
                t.cyrillicFirstNameValidation.isValid) ||
            (t.firstNameFieldState.value && t.firstNameValidation.isValid)
        )
            errorFields.push('имя');
        if (
            (t.cyrillicSurnameFieldState.value &&
                t.cyrillicSurnameValidation.isValid) ||
            (t.surnameFieldState.value && t.surnameValidation.isValid)
        )
            errorFields.push('фамилию');
        if (!(t.birthDateFieldState.value && t.birthdayValidation.isValid))
            errorFields.push('дату рождения');
        if (
            !(
                t.passportNumberFieldState.value &&
                t.passportNumberValidation.isValid
            )
        )
            errorFields.push('номер паспорта');
        if (
            !(
                t.passportSeriesFieldState.value &&
                t.passportSeriesValidation.isValid
            )
        )
            errorFields.push('серию паспорта');
        if (
            !(
                t.passportIssuedByFieldState.value &&
                t.passportIssuedByValidation.isValid
            )
        )
            errorFields.push('кем выдан паспорт');
        if (
            !(
                t.passportIssuedWhenFieldState.value &&
                t.passportIssuedWhenValidation.isValid
            )
        )
            errorFields.push('когда выдан паспорт');
        return errorFields.join(', ');
    }

    renderPrivacyPolicyPopup(blockName: bemCn.Inner): JSX.Element | null {
        if (!this.state.isModule5PrivacyPolicyPopupVisible) {
            return null;
        }

        return (
            <UiPopup
                isVisible={this.state.isModule5PrivacyPolicyPopupVisible}
                showCloseButton={true}
                fixedContentWidth={Math.min(
                    document.documentElement.clientWidth,
                    980,
                )}
                onClose={() => {
                    this.setState({
                        isModule5PrivacyPolicyPopupVisible: false,
                    });
                }}
                bemModifications={['tour-card']}
            >
                {this.renderPrivacyPolicyPopupContent(blockName)}
            </UiPopup>
        );
    }

    renderPrivacyPolicyPopupContent(
        blockName: bemCn.Inner,
    ): JSX.Element | null {
        switch (S.buyOnlineStore.module5PrivacyPolicyDocumentLoadingStatus) {
            case Module5PrivacyPolicyLoadingStatus.Loading:
                return this.renderModule5PrivacyPolicyLoadingStatus(blockName);
            case Module5PrivacyPolicyLoadingStatus.Failed:
                return this.renderModule5PrivacyPolicyFailMessage(blockName);
            case Module5PrivacyPolicyLoadingStatus.Success:
                return this.renderModule5PrivacyPolicyPopupContent();
            default:
                return null;
        }
    }

    renderAgreementLabel(blockName: bemCn.Inner): JSX.Element {
        return (
            <span className={blockName('agreement-label')()}>
                Согласен с&nbsp;{this.renderPrivatePolicyLink(blockName)},&nbsp;
                <a
                    className={blockName('link')()}
                    href={
                        this.props.offerAgreementLink ||
                        S.buyOnlineStore.offerLink
                    }
                    target='_blank'
                    tabIndex={-1}
                >
                    условиями&nbsp;
                    {S.buyOnlineStore.isMgtModule ? `договора` : `оферты`}
                </a>
                ,&nbsp;
                {this.renderPrivacyPolicyLink(blockName)}
            </span>
        );
    }

    renderModule5PrivacyPolicyPopupContent(): JSX.Element {
        // TODO selkin: на айфоне при рендере содержимого, скроллинг находится посередине
        if (isIPhone()) {
            window.scrollTo(0, 0);
        }

        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: S.buyOnlineStore.module5PrivacyPolicyDocument,
                }}
            />
        );
    }

    renderModule5PrivacyPolicyFailMessage(blockName: bemCn.Inner): JSX.Element {
        return (
            <div className={blockName('feedback')()}>
                <div className={blockName('messageFail')()}>
                    Ошибка загрузки соглашения! Попробуйте позже!
                </div>
            </div>
        );
    }

    renderModule5PrivacyPolicyLoadingStatus(
        blockName: bemCn.Inner,
    ): JSX.Element {
        return (
            <div className={blockName('feedback')()}>
                <div className={blockName('processingLoader')()}>
                    <UiLoader bemModifications={['big']} />
                </div>
            </div>
        );
    }

    renderPrivatePolicyLink(blockName: bemCn.Inner): JSX.Element {
        const text = 'обработкой персональных данных';
        let href = S.buyOnlineStore.isMgtModule
            ? 'https://online.mosgortur.ru/documents/Consent_processing.pdf'
            : this.props.statementOfPersonalDataLink;

        if (href) {
            return (
                <a
                    className={blockName('link')()}
                    href={href}
                    target='_blank'
                    tabIndex={-1}
                >
                    {text}
                </a>
            );
        }
        return <span>{text}</span>;
    }

    renderPrivacyPolicyLink(blockName: bemCn.Inner): JSX.Element {
        const text = 'политикой конфиденциальности';

        if (S.mainStore.moduleTarget === MODULE6_TARGET) {
            if (!!this.props.privacyPolicyLink) {
                return (
                    <a
                        className={blockName('link')()}
                        href={this.props.privacyPolicyLink}
                        target='_blank'
                        tabIndex={-1}
                    >
                        {text}
                    </a>
                );
            }

            return <span>{text}</span>;
        }

        return (
            <span
                className={blockName('link')()}
                onClick={() => {
                    this.setState({ isModule5PrivacyPolicyPopupVisible: true });
                    S.buyOnlineStore.loadPrivacyPolicyDocument();
                }}
            >
                {text}
            </span>
        );
    }

    renderCreateClaimStatusInfo(blockName: bemCn.Inner): JSX.Element | null {
        switch (S.buyOnlineStore.createClaimStatus) {
            case BuyOnlineCreateClaimStatus.Loading:
                return (
                    <div className={blockName('feedback')()}>
                        <div className={blockName('processing-loader')()}>
                            <UiLoader bemModifications={['big']} />
                        </div>
                    </div>
                );
            case BuyOnlineCreateClaimStatus.Success:
                return (
                    <div className={blockName('feedback')()}>
                        <div className={blockName('message-success')()}>
                            Ваша заявка успешно отправлена
                        </div>
                    </div>
                );
            case BuyOnlineCreateClaimStatus.Failed:
                this.props.onError(
                    S.buyOnlineStore.createClaimErrorMessage ??
                        'Ошибка при покупке',
                );
                return (
                    <div className={blockName('feedback')()}>
                        <div className={blockName('message-fail')()}>
                            К сожалению, произошла ошибка: <br />
                            {S.buyOnlineStore.createClaimErrorMessage}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    private clickBuyButton(): void {
        if (this.isBuyButtonDisabled) {
            // Для проставления модификатора тряски задизабеной кнопки по клику
            S.buyOnlineUiStore.setIsBuyButtonShaking(true);
            setTimeout(
                () => S.buyOnlineUiStore.setIsBuyButtonShaking(false),
                1000,
            );
        } else {
            this.props.onSubmit();
            const paramsBaseOnline = {
                amount: S.mainStore.fullTourPrice,
                country: this.props.tourData.arrivalCountryName,
                townFrom: this.props.tourData.departureCityName,
            } as BaseBuyOnlineParams;
            if (S.buyOnlineStore.isMgtModule)
                S.buyOnlineStore.buyTourOnlineTourOffice(() =>
                    this.props.onSuccess(paramsBaseOnline),
                );
            else if (S.buyOnlineStore.isLetsFlyModule)
                S.buyOnlineStore.buyTourOnlineTourOfficeLetsFly(() =>
                    this.props.onSuccess(paramsBaseOnline),
                );
            else
                S.buyOnlineStore.buyTourOnline(() =>
                    this.props.onSuccess(paramsBaseOnline),
                );

            setBodyOverflow('hidden', 'hidden');
        }
    }

    private get isBuyButtonDisabled(): boolean {
        return (
            this.props.tourActualization.isActualizationInProcess ||
            !S.buyOnlineStore.customerData.isFormValid(
                !S.buyOnlineStore.isMgtModule,
            ) ||
            (S.buyOnlineStore.isMgtModule &&
                (!S.buyOnlineStore.customerData.isAllFieldsFilledAndValid() ||
                    S.buyOnlineStore.allCertificates.some(
                        (c) => !c.isFormValidAndTouched,
                    ) ||
                    S.buyOnlineStore.allCertificates.some(
                        (c) => !c.isApplied,
                    ) ||
                    S.buyOnlineStore.touristsData.some(
                        (c) => !c.isFormFilled() || !c.isFormValid(),
                    )))
        );
    }

    private get isBuyButtonWarningVisible(): boolean {
        return (
            this.isBuyButtonDisabled && S.buyOnlineUiStore.isBuyButtonHovered
        );
    }

    private get shouldShowPaymentOptions(): boolean {
        return !S.buyOnlineStore.buyOnlineSettings.prepaymentSchemas.length
            ? false
            : S.buyOnlineStore.buyOnlineSettings.prepaymentSchemas.some(
                  (schema) =>
                      this.props.tourData.price >= schema.minPrice &&
                      this.props.tourData.price <= schema.maxPrice,
              );
    }

    private get viewportWidth(): number {
        return getScrollWidth() + document.documentElement.clientWidth;
    }

    private get viewportHeight(): number {
        return document.documentElement.clientHeight;
    }
}
