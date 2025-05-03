import * as React from 'react'
import { observer } from 'mobx-react'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import { getJuridicalData } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetJuridicalData'
import { target } from 'sletat-api-services/lib/types'
import { WrappedResponseData } from 'sletat-api-services/lib/ModuleApiServices/Main.svc/GetJuridicalData/GetJuridicalDataResponse'

import S from '../stores'
import { isIPhone } from '../utils'
import { MODULE6_TARGET, LoadingState } from '../types-and-consts'

UIkit.use(Icons)

export interface PersonalDataAgreementProps {
    target: target
    privacyPolicyLink: string | null
    statementOfPersonalDataLink: string | null
}

interface State {
    isVisible: boolean
    loadingState: LoadingState
    content: string | null
}

@observer
export class PersonalDataAgreement extends React.Component<
    PersonalDataAgreementProps,
    State
> {
    private rootElem: HTMLDivElement | null = null

    constructor (props: PersonalDataAgreementProps) {
        super(props)
        this.state = {
            isVisible: false,
            loadingState: LoadingState.notYetLoaded,
            content: null
        }
    }

    render () {
        return (
            <div>
                {this.renderNote()}
                {this.renderPopup()}
            </div>
        )
    }

    renderNote () {
        return (
            <div ref={el => (this.rootElem = el)} className='uk-text-small'>
                <span>
                    Нажимая на кнопку, вы даёте согласие на{' '}
                    {this.renderPrivatePolicyLink()} и соглашаетесь с{' '}
                </span>
                {this.renderPrivacyPolicyLink()}
            </div>
        )
    }

    renderPrivatePolicyLink () {
        const text = 'обработку персональных данных'
        const href = S.buyOnlineStore.isMgtModule
            ? 'https://online.mosgortur.ru/documents/Consent_processing.pdf'
            : this.props.statementOfPersonalDataLink

        return href ? (
            <a
                className='uk-link-text'
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                tabIndex={-1}
            >
                {text}
            </a>
        ) : (
            <span>{text}</span>
        )
    }

    renderPrivacyPolicyLink () {
        const text = 'политикой конфиденциальности'

        if (this.props.target === MODULE6_TARGET) {
            if (this.props.privacyPolicyLink) {
                return (
                    <a
                        className='uk-link-text'
                        href={this.props.privacyPolicyLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {text}
                    </a>
                )
            }
            return <span>{text}</span>
        }

        return (
            <a
                href='#'
                className='uk-link-text'
                onClick={e => {
                    e.preventDefault()
                    if (document?.body?.style) {
                        document.body.style.overflow = 'hidden'
                    }
                    this.setState({ isVisible: true })
                    this.loadAgreementHTML()
                }}
            >
                {text}
            </a>
        )
    }

    renderPopup () {
        const { isVisible } = this.state

        return (
            <div
                className={`uk-modal${isVisible ? ' uk-open' : ''}`}
                style={{ display: isVisible ? 'block' : 'none' }}
                onClick={() => this.closePopup()}
            >
                <div
                    className='uk-modal-dialog uk-modal-body'
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        className='uk-modal-close-default'
                        type='button'
                        aria-label='Close'
                        onClick={() => this.closePopup()}
                    />
                    {this.renderPopupContent()}
                </div>
            </div>
        )
    }

    renderPopupContent () {
        const { loadingState } = this.state

        switch (loadingState) {
            case LoadingState.loading:
                return (
                    <div
                        className='uk-flex uk-flex-center uk-flex-middle'
                        style={{ height: 200 }}
                    >
                        <div uk-spinner='ratio: 2' />
                    </div>
                )
            case LoadingState.fail:
                return (
                    <div className='uk-alert-danger' uk-alert='true'>
                        <p>Ошибка загрузки соглашения! Попробуйте позже.</p>
                    </div>
                )
            case LoadingState.success:
                return this.renderAgreementHTML()
            default:
                return null
        }
    }

    renderAgreementHTML () {
        if (isIPhone() && this.state.isVisible) {
            window.scrollTo(0, 0)
        }
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: this.state.content ?? ''
                }}
            />
        )
    }

    loadAgreementHTML () {
        this.setState({ loadingState: LoadingState.loading })

        getJuridicalData()
            .then((data: WrappedResponseData) => {
                this.setState({
                    loadingState: LoadingState.success,
                    content: data.Data || ''
                })
            })
            .catch(() => {
                this.setState({ loadingState: LoadingState.fail })
            })
    }

    closePopup () {
        this.setState({ isVisible: false })
        if (document?.body?.style) {
            document.body.style.overflow = ''
        }
    }
}
