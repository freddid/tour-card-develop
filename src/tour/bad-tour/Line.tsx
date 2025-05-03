/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';


export interface LineProps {
    onSimilarToursRequest: () => void;
}

export function Line(props: LineProps) {
    const TOUR_WAS_SEND_MSG = 'К&nbsp;сожалению, запрашиваемый тур уже продан, но&nbsp;у&nbsp;нас есть много других';
    const cx = classes();

    return (
        <div className={cx.tourFailed}>
            <p className={cx.tourFailedText} dangerouslySetInnerHTML={{ __html: TOUR_WAS_SEND_MSG }}/>
            <button className={cx.btnSimilarTours} onClick={props.onSimilarToursRequest}>
                Найти похожие туры
            </button>
        </div>
    );

    function classes() {
        return {
            tourFailed: classNames({
                'tour-failed__line': true
            }),
            tourFailedText: classNames({
                'tour-failed__line-text': true
            }),
            btnSimilarTours: classNames({
                'button-similar-tours-line': true
            }),
        };
    }
}
