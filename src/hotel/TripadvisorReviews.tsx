/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames';


export interface TripAdvisorReviewsProps {
    hotelId: number | null;
    statusHandler: (status: TripAdvisorReviewsStatus) => void;
}

export interface TripAdvisorReviewsStatus {
    needShown: boolean;
}

export interface TripAdvisorReviewsParsedResponse {
    height: number;
    error?: string;
}

export class TripAdvisorReviews extends Component<TripAdvisorReviewsProps> {

    private frameElement: HTMLIFrameElement | null;
    private frameLoaded = false; // был загружен ли фрейм или нет
    private sentStatus = false; // отправлен ли статус в родительский компонент или нет

    // отфильтрованные пропарсенные данные, приходящие от фрейма через post message
    private parsedResponseData: Array<TripAdvisorReviewsParsedResponse> = [];

    /**
     *  если в течение указанного кол-во мс мы так не получили сообщения от фрейма или фрейм не был загружен,
     *  то компонент передаёт в родительский ошибочный статус
     */
    private TIMEOUT_POST_MESSAGES = 10000;
    private timeoutId: number;

    componentDidMount(): void {
        this.getWindow()?.addEventListener('message', this.postMessageHandler);

        // отправить ошибочный статус в родительский компонент при истечении таймаута
        this.timeoutId = window.setTimeout(() => {
            this.abortPostMessage();
        }, this.TIMEOUT_POST_MESSAGES);
    }

    componentWillUnmount(): void {
        this.clearTimeoutHandler();
        this.clearPostMessageHandler();
    }

    /**
     * обрабатывает post messages, приходящие от iframe
     */
    postMessageHandler = (e: MessageEvent): void => {
        let parsedRecievedData: TripAdvisorReviewsParsedResponse;
        let responseError: string | null;
        let frameHeight: number;

        try {
            parsedRecievedData = this.checkPostMessage(e);
            responseError = parsedRecievedData.error || null;
            frameHeight = parsedRecievedData.height;
        } catch (err) {
            return;
        }

        /**
         * если выполнение не попало в catch, значит это валидный ответ, сохраним его.
         * это нужно, когда сначало пришёл post message, а только после загрузился сам фрейм
         */
        this.parsedResponseData.push(parsedRecievedData);

        // если родительский компонент уже получал статут-ответ
        if (this.sentStatus) {
            if (responseError) {
                console.warn(`tripadvisor: фрейм виджета ответил ошибкой: ${responseError}. высота не была обновлена!`);
                return;
            }
            this.setFrameHeight(frameHeight); // обновим высоту фрейма
        } else {
            /**
             * если статус ещё не отправлялся и пришёл ошибочный ответ,
             * то нам не важно, был ли загружен фрейм или нет, т.к. нужно
             * сразу сообщить родительскому компоненту об ошибке
             */
            if (responseError) {
                this.sendErrorStatus();
                return;
            }

            this.setFrameHeight(frameHeight); // установим высоту фрейма

            // если каким-то магическим образом фрейм загрузился раньше, чем пришёл post message
            if (this.frameLoaded) {
                this.sendSuccessStatus();
            }
        }
    }

    /**
     * срабатывает когда произошла загрузка (onload) фрейма
     */
    loadFrameHandler = (): void => {
        this.frameLoaded = true;

        if (this.sentStatus) {
            return;
        }

        // если post message ответы уже поступали от фрейма
        if (this.parsedResponseData.length !== 0) {
            this.sendSuccessStatus();
        }
    }

    setFrameHeight(height: number): void {
        this.frameElement!.height = String(height);
    }

    /**
     * получает объект события от фрейма и проверяет различные кейсы.
     *
     * через post message на одно действие фрейма возвращается ответ в трёх форматах:
     * 1) краткий. когда нет данных: 'TA_widgetError'; всё гуд - 'height=899'.
     * 2) полный. Object типа {frameName: '...',widgetData:{height:number;width:number},error?:string}.
     * 3) полный. аналогичен второму варианту, но только сериализован в виде строки.
     *
     * важно: второй и третий вариант возвращают некорректное значение обновленной высоты
     * после обратного сворачивания отзыва (<< свернуть). поэтому работаем только с первым вариантом.
     *
     * валидных кейса только два:
     *  - всё хорошо, отзывы есть. пример ответа: 'height=123'
     *  - отзывов нет. пример ответа: 'TA_widgetError'
     *
     * все прочие кейсы фильтруются путём throw ошибок из данного метода
     */
    checkPostMessage(e: MessageEvent): TripAdvisorReviewsParsedResponse {
        const VALID_RESPONSE_REGEXP = /^height=\d*$/;

        let receivedData: string = e.data;

        if (e.origin.indexOf('www.tripadvisor.com') === -1) {
            throw new Error('tripadvisor: получены данные от неизвестного источника');
        }

        if (typeof receivedData !== 'string') {
            throw new Error('tripadvisor: получены не строковые данные от фрейма');
        }

        if (receivedData === 'TA_widgetError') {
            return {
                height: 0,
                error: receivedData
            };
        }

        if (!VALID_RESPONSE_REGEXP.test(receivedData)) {
            throw new Error('tripadvisor: не тот формат ответа от фрейма');
        }

        return {
            height: parseInt(receivedData.split('=')[1], 10)
        };
    }

    /**
     * отправляет в родительский компонент статус об успешном завершении
     */
    sendSuccessStatus(): void {
        this.sentStatus = true;
        this.clearTimeoutHandler();
        this.props.statusHandler({ needShown: true });
    }

    /**
     * отправляет в родительский компонент статус об ошибочном завершении
     */
    sendErrorStatus(): void {
        this.sentStatus = true;
        this.clearTimeoutHandler();
        this.props.statusHandler({ needShown: false });
    }

    /**
     * прерывает обработку и отравляет статус об ошибочном выполнении в родительский компонент.
     * это может происходить, например, если прошло слишком много времени.
     */
    abortPostMessage(): void {
        this.clearTimeoutHandler();
        this.clearPostMessageHandler();
        this.sendErrorStatus();
    }

    clearTimeoutHandler(): void {
        clearTimeout(this.timeoutId);
    }

    clearPostMessageHandler(): void {
        this.getWindow()?.removeEventListener('message', this.postMessageHandler);
    }

    getWindow(): Window | null {
        return this.frameElement?.ownerDocument?.defaultView || null;
    }

    getTripadvisorSrc(): string {
        /* tslint:disable-next-line:max-line-length */
        return `https://www.tripadvisor.com/WidgetEmbed-cdspropertydetail?locationId=${this.props.hotelId}&partnerId=E4C48B3234164AF99B6C3C5522BDB43E&lang=ru&display=true&allowMobile=true`;
    }

    render() {
        const hotelId = this.props.hotelId;
        const cx = this.classes();

        return (
            <iframe
                ref={(frameElement) => this.frameElement = frameElement}
                className={cx.tripadvisorFrame}
                onLoad={this.loadFrameHandler}
                name={`hotel${hotelId}`}
                style={{ width: '100%' }}
                src={this.getTripadvisorSrc()}
                scrolling="no"
                height="0"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}>
            </iframe>

        );
    }

    private classes() {
        return {
            tripadvisorFrame: classNames({
                'reviews-tripadvisor-frame': true
            })
        };
    }
}
