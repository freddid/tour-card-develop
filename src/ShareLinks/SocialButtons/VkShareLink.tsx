/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as classNames from 'classnames';


interface VkShareLinkProps {
    tourCardShortUrl: string;
    shareTitle: string;
    shareDescription: string;
    className?: string;
}

const COUNT_OF_ICONS = 4;
const POPUP_WIDTH = 626;
const POPUP_HEIGHT = 436;

export function VkShareLink(props: VkShareLinkProps) {
    const cx = classes();

    return (
        <li className={cx.root} onClick={() => onShare(props)}/>
    );

    function classes() {
        return {
            root: classNames({
                'share-links__item': !props.className,
                'vk-share-link': !props.className,
                [props.className as string]: !!props.className
            })
        };
    }
}

function onShare(props: VkShareLinkProps) {
    openPopupWindow(getSharingUrl(props));
}

function getSharingUrl(props: VkShareLinkProps) {
    return `https://vk.com/share.php?url=${props.tourCardShortUrl}&title=${props.shareTitle}` +
        `&description=${props.shareDescription}&image=${getSharingImageUrl()}&noparse=true`;
}

function getSharingImageUrl() {
    let randomIcon = parseInt(((Math.random() * COUNT_OF_ICONS) + 1).toString(), 10);
    return `https://static.sletat.ru/module-5-0/vk_meta${randomIcon}.jpg`;
}

function openPopupWindow(url: string) {
    let popupName = '_blank',
        left = (screen.width - POPUP_WIDTH) / 2,
        top = (screen.height - POPUP_HEIGHT) / 2,
        popup,
        popupParams;
    popupParams = `scrollbars=0, resizable=1, menubar=0, left=${left}, top=${top}, width=${POPUP_WIDTH}, ` +
        `height=${POPUP_HEIGHT}, toolbar=0, status=0`;
    popup = window.open(url, popupName, popupParams);
    popup!.focus();
    return popup;
}
