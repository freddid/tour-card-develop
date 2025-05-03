/* eslint-disable */
import * as React from 'react'
import * as classNames from 'classnames'
import { ClipLoader } from 'react-spinners'

export enum NotificationTypes {
    Fail,
    Success,
    Processing
}

export type NotificationCallback = (
    notificationType?: NotificationTypes
) => void

export class FormNotificationsHandler {
    private callbackOnShow: NotificationCallback | null = null
    private callbackOnHide: NotificationCallback | null = null
    private visibleNotification: JSX.Element | null = null

    public get isVisibleNotification(): boolean {
        return !!this.visibleNotification
    }

    public bindOnShowNotification(callback: NotificationCallback): void {
        this.callbackOnShow = callback
    }

    public unbindOnShowNotification(): void {
        this.callbackOnShow = null
    }

    public bindOnHideNotification(callback: NotificationCallback): void {
        this.callbackOnHide = callback
    }

    public unbindOnHideNotification(): void {
        this.callbackOnHide = null
    }

    public showNotification(
        notificationType: NotificationTypes,
        message?: string
    ): void {
        this.visibleNotification = this.getNotificationElement(
            notificationType,
            message || ''
        )
        if (this.callbackOnShow) {
            this.callbackOnShow(notificationType)
        }
        if (
            notificationType === NotificationTypes.Success ||
            notificationType === NotificationTypes.Fail
        ) {
            setTimeout(() => this.hideNotification(notificationType), 5000)
        }
    }

    public hideNotification(notificationType?: NotificationTypes): void {
        this.visibleNotification = null
        if (this.callbackOnHide) {
            this.callbackOnHide(notificationType)
        }
    }

    public renderVisibleNotification(): JSX.Element | null {
        return this.visibleNotification || null
    }

    private getNotificationElement(
        notificationType: NotificationTypes,
        message: string
    ): JSX.Element {
        switch (notificationType) {
            case NotificationTypes.Processing:
                return this.getProcessingNotificationElement()
            case NotificationTypes.Success:
                return this.getSuccessNotificationElement(message)
            case NotificationTypes.Fail:
                return this.getFailNotificationElement(message)
        }
    }

    private getSuccessNotificationElement(message: string): JSX.Element {
        const cx = this.classes()
        return (
            <div className={cx.feedback}>
                <div className={cx.messageSuccess}>{message}</div>
            </div>
        )
    }

    private getFailNotificationElement(message: string): JSX.Element {
        const cx = this.classes()
        return (
            <div className={cx.feedback}>
                <div className={cx.messageFail}>{message}</div>
            </div>
        )
    }

    private getProcessingNotificationElement(): JSX.Element {
        const cx = this.classes()
        return (
            <div className={cx.feedback}>
                <div className={cx.processingLoader}>
                    <ClipLoader size={32} color='#666' />
                </div>
            </div>
        )
    }

    private classes() {
        const BASE_CLASS = 'general-form'
        return {
            feedback: classNames(`${BASE_CLASS}__feedback`),
            messageSuccess: classNames(`${BASE_CLASS}__message-success`),
            messageFail: classNames(`${BASE_CLASS}__message-fail`),
            processingLoader: classNames(`${BASE_CLASS}__processing-loader`)
        }
    }
}
