/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';


export interface ActualizationProgressProps {
    isActualizationProcess: boolean;
    isActualizationSuccess: boolean;
}

export function ActualizationProgress(props: ActualizationProgressProps) {
    const cx = classes();

    const content = () => {
        if (props.isActualizationSuccess) {
            return <div className={cx.textOn}>Цена проверена онлайн</div>;
        } else if (props.isActualizationProcess) {
            return (
                <div className={cx.textProcess}>
                    <div className={cx.uisLoader}>
                        <div className={cx.loader}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div className={cx.textOff}>Не удалось проверить цену</div>;
        }
    };

    return (
        <div className={cx.root}>
            {content()}
        </div>
    );

    function classes() {
        const BASE_CLASS = 'price-checked-online';

        return {
            root: classNames({
                [BASE_CLASS]: true
            }),
            textOn: classNames({
                [`${BASE_CLASS}__text-on`]: true
            }),
            textOff: classNames({
                [`${BASE_CLASS}__text-off`]: true
            }),
            textProcess: classNames({
                [`${BASE_CLASS}__text-process`]: true
            }),
            uisLoader: classNames({
                'uis-loader': true,
                'uis-loader_micro': true,
                'uis-loader_gray': true
            }),
            loader: classNames({
                'loader': true,
                'loader_micro': true,
                'loader_gray': true
            })
        };
    }
}
