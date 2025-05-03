/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import { SyntheticEvent } from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';

import { logMetric } from '../utils';


export interface HotelImagePreviewProps extends React.HTMLProps<HTMLDivElement> {
    hotelId: number | null;
    isHotelLoadedSuccess: boolean;
    imagesCount: number | null;
    onClick: (ev: SyntheticEvent<any>) => void;
}

export function HotelImagePreview(props: HotelImagePreviewProps) {
    /* tslint:disable-next-line:max-line-length */
    const DEFAULT_SRC = 'data:image/png;base64,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';
    const imgSrcByHotelId = (hotelId: number) => `https://hotels.sletat.ru/i/p/${hotelId}_0_170_225_1.jpg`;
    const cx = classes();
    const sx = styles();

    function renderPreviewImage() {
        if (props.imagesCount && typeof props.hotelId === 'number') {
            return (
                <a
                    className={cx.link}
                    style={sx.link}
                    onClick={(e: SyntheticEvent<HTMLElement>) => {
                        if (props.isHotelLoadedSuccess) {
                            props.onClick(e);
                        }
                    }}
                >
                    <img
                        src={imgSrcByHotelId(props.hotelId)}
                        className={cx.image}
                        onClick={() => logMetric('click-upperpic')}
                    />
                    {renderMorePhoto()}
                </a>
            );
        } else {
            return <img src={DEFAULT_SRC} />;
        }
    }

    function renderMorePhoto(): JSX.Element | null {
        if (!props.isHotelLoadedSuccess) {
            return null;
        }

        return (
            <span className={cx.countImage}>
                <span onClick={() => logMetric('click-more_photo')}>
                    Ещё {props.imagesCount || ''} фото
                </span>
            </span>
        );
    }

    return (
        <div className={cx.root}>
            {renderPreviewImage()}
        </div>
    );

    function classes() {
        const BASE_CLASS = 'tour-preview';

        return {
            root: classNames({
                [BASE_CLASS]: true
            }),
            link: classNames({
                [`${BASE_CLASS}__link`]: true
            }),
            image: classNames({
                [`${BASE_CLASS}__image`]: true
            }),
            countImage: classNames({
                [`${BASE_CLASS}__count-image`]: true
            }),
        };
    }

    function styles() {
        const link = !props.isHotelLoadedSuccess
            ? { cursor: 'default' }
            : undefined;

        return { link };
    }
}
