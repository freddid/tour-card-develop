/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { UiPhotoGallery } from 'sletat-uikit2/dist/js/UiPhotoGallery';
import { SourceOptions } from 'sletat-uikit2/dist/js/UiThumbnailsPanel/UiThumbnailsPanel';
import { UiImageWithLoader, UiImageWithLoaderPendingMode } from 'sletat-uikit2/dist/js/UiImageWithLoader';
import { isTouchDevice } from '../utils';


export interface PhotoGalleryProps {
    hotelId: number;
    numImages: number;
    punyCode: string;
}

export class PhotoGallery extends React.Component<PhotoGalleryProps> {

    private static ASPECT_RATIO = 1.5;

    render() {
        return (
            <UiPhotoGallery
                carouselImages={{
                    source: this.carouselImagesSource,
                    isVisibleArrows: true,
                    isInfinity: true
                }}
                count={this.props.numImages}
                carouselThumbnails={this.carouselThumbnails}
                activeSlideIndex={0}
                fullScreenModeIsAvailable={false}
                shouldUpdateOnResize={true}
                bemModifications={['card-module']}
            />
        );
    }

    private get carouselThumbnails(): any {
        // отключаем панель с превью
        if (isTouchDevice()) {
            return undefined;
        }
        return {
            source: this.spriteThumbnailsSource,
            isInfinity: true,
            isSwapping: true,
            slideChangeDuration: 250,
            slidesToShow: 5,
            slidesToScroll: 5,
            slideMargin: 2,
            allowLongSwapping: true,
            isVisibleArrows: true
        };
    }

    private get spriteThumbnailsSource(): (opts: SourceOptions) => JSX.Element {
        return ({ width, i }) => {
            const height = Math.round(width / PhotoGallery.ASPECT_RATIO);
            const sx = {
                width,
                height,
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url("https://hotels.sletat.ru/i/spr/${this.props.hotelId}_${width}_${height}_1.jpg")`,
                backgroundPositionX: 0,
                backgroundPositionY: -i * height
            };

            return (
                <div style={sx}></div>
            );
        };
    }

    private get carouselImagesSource(): (opts: SourceOptions) => JSX.Element {
        return ({ width, i, selectedIndex }) => {
            const height: number = Math.round(width / PhotoGallery.ASPECT_RATIO);
            // TODO selkin: подробности в css/_uikit-gallery_card-module.styl
            const src = selectedIndex === i
                ? `https://hotels.sletat.ru/i/im/${this.props.hotelId}_${i}_1024_569_1.jpg${this.punyCodeQueryString}`
                : null;
            return (
                <UiImageWithLoader
                    src={src}
                    key={i}
                    pendingMode={UiImageWithLoaderPendingMode.once}
                    imgProps={{ alt: `carousel-photo-${i}` }}
                />
            );
        };
    }

    // TODO selkin: т.к. сервис некорректно рендерит watermark для доменов, кроме sletat.ru
    private get punyCodeQueryString(): string {
        return this.props.punyCode ? `?punycode=${this.props.punyCode}` : '';
    }

}
