/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';
import { SVGIcon } from './../../svg-icon';


export interface TooltipProps {
    isTourSold: boolean;
    shouldShowResearchButton?: boolean;
    onSimilarToursRequest?: () => void;
    onShowTourInfo?: () => void;
}

export function Tooltip(props: TooltipProps) {

    const TOUR_WAS_SOLD_MSG = 'К&nbsp;сожалению, запрашиваемый тур уже продан, но&nbsp;есть много других';
    const TOUR_NOT_FOUND_MSG = 'К&nbsp;сожалению, запрашиваемого тура больше&nbsp;нет в системе';
    const SHOW_ANYWAY_MSG = 'Я&nbsp;понял, но&nbsp;всё равно покажите';

    const cx = classes();

    return (
        <div className={cx.tooltip}>
            <div className={cx.tooltipWrapper}>
                <span className={cx.tooltipIcon}>
                    <SVGIcon width={'100%'} height={'100%'} url="#icon-departure"/>
                </span>
                <p className={cx.title}>
                    {props.isTourSold ? 'Тур уже продан' : 'Тур не найден'}
                </p>
                <p
                    className={cx.text}
                    dangerouslySetInnerHTML={{ __html: props.isTourSold ? TOUR_WAS_SOLD_MSG : TOUR_NOT_FOUND_MSG }}
                />
                {props.shouldShowResearchButton &&
                    <button className={cx.buttonSimilarToursTooltip} onClick={props.onSimilarToursRequest}>
                        Найти похожие туры
                    </button>
                }
                {props.isTourSold ?
                    <button
                        type="button"
                        className={cx.buttonShowTourFailed}
                        onClick={props.onShowTourInfo}
                        dangerouslySetInnerHTML={{ __html: SHOW_ANYWAY_MSG }}
                    />
                : null}
            </div>
        </div>
    );

    function classes() {
        return {
            tooltip: classNames({
                'tour-failed__tooltip': true
            }),
            tooltipWrapper: classNames({
                'tour-failed__tooltip-wrapper': true
            }),
            tooltipIcon: classNames({
                'tour-failed__tooltip-icon': true
            }),
            title: classNames({
                'tour-failed__title': true
            }),
            text: classNames({
                'tour-failed__text': true
            }),
            buttonSimilarToursTooltip: classNames({
                'button-similar-tours-tooltip': true
            }),
            buttonShowTourFailed: classNames({
                'button-show-tour-failed': true
            })
        };
    }
}
