/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';
import { AgencyContact } from './config/Module5Config';


export interface AgencyContactBannerProps {
    isModule6: boolean;
    bannerData?: AgencyContact;
}

export function AgencyContactBanner(props: AgencyContactBannerProps) {
    const cx = classes();

    return (
        <div className={cx.agency}>
            {renderHeader()}
            {renderLogo()}
            {renderPhone()}
            {renderEmail()}
            {renderContent()}
        </div>
    );

    function renderHeader(): JSX.Element | null {
        if (!props.isModule6 || !props.bannerData || !props.bannerData.header) {
            return null;
        }

        return (
            <h2 className={cx.agencyHeader}>
                {props.bannerData.header}
            </h2>
        );
    }

    function renderLogo(): JSX.Element | null {
        if (!props.bannerData || typeof props.bannerData.logo !== 'string' || props.bannerData.logo.indexOf('http') === -1) {
            return null;
        }

        return (
            <img src={props.bannerData.logo} alt={''} className={cx.agencyLogo} />
        );
    }

    function renderPhone(): JSX.Element | null {
        if (!props.bannerData || typeof props.bannerData.phone !== 'string') {
            return null;
        }

        return (
            <p className={cx.agencyItem}>
                <a href={`tel:${props.bannerData.phone}`} className={cx.agencyLink}>
                    {props.bannerData.phone}
                </a>
            </p>
        );
    }

    function renderEmail(): JSX.Element | null {
        if (!props.bannerData || typeof props.bannerData.email !== 'string' || props.bannerData.email.indexOf('@') === -1) {
            return null;
        }

        return (
            <p className={cx.agencyItem}>
                <a href={`mailto:${props.bannerData.email}`} className={cx.agencyLink}>
                    {props.bannerData.email}
                </a>
            </p>
        );
    }

    function renderContent(): JSX.Element | null {
        if (!props.bannerData || typeof props.bannerData.content !== 'string') {
            return null;
        }

        return (
            <p className={cx.agencyItemDesc} dangerouslySetInnerHTML={{ __html: props.bannerData.content }} />
        );
    }

    function classes() {
        return {
            agency: classNames({
                'agency': true
            }),
            agencyHeader: classNames({
                'agency__header': true
            }),
            agencyLogo: classNames({
                'agency__logotype': true
            }),
            agencyItem: classNames({
                'agency__item': true
            }),
            agencyLink: classNames({
                'agency__link': true
            }),
            agencyItemDesc: classNames({
                'agency__item': true,
                'agency__item_description': true
            })
        };
    }
}
