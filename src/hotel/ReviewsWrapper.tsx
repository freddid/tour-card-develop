/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames';

import { UiHorizontalDynamicTabs, UiDynamicTabItem, TabStatus } from 'sletat-uikit2/dist/js/UiHorizontalDynamicTabs';

import { OurReviews } from './OurReviews';
import { TripAdvisorReviews } from './TripadvisorReviews';
import { HotelOurReviews } from '../helpers/HotelOurReviews';
import { SorryWeDontHaveHotelInfo } from './SorryWeDontHaveHotelInfo';
import { target } from 'sletat-api-services';
import { YandexReviews } from './YandexReviews';


export interface ReviewsWrapperProps {
    hotelId: number | null;
    isTripAdvisorCommentsEnabled: boolean;
    target: target;
}

export interface ReviewsWrapperState {
    activeTabIndex: number;
    tripAdvisorStatus: TabStatus;
    ourReviewStatus: TabStatus;
    yandexStatus: TabStatus;
}

export class ReviewsWrapper extends Component<ReviewsWrapperProps, ReviewsWrapperState> {

    private TRIP_ADVISOR_TAB_TITLE = 'Отзывы TripAdvisor';
    private OUR_REVIEWS_TAB_TITLE = 'Наши отзывы';
    private YANDEX_REVIEWS_TAB_TITLE = 'Отзывы Yandex';
    private OUR_REVIEWS_PAGE_SIZE = 5;
    private hotelReviews: HotelOurReviews;

    constructor(props: ReviewsWrapperProps) {
        super(props);
        this.state = {
            activeTabIndex: 0,
            tripAdvisorStatus: TabStatus.notYetLoaded,
            ourReviewStatus: TabStatus.notYetLoaded,
            yandexStatus: TabStatus.notYetLoaded,
        };
        this.hotelReviews = new HotelOurReviews(this.props.hotelId, this.OUR_REVIEWS_PAGE_SIZE, props.target);
    }

    private get availableTabItems(): Array<UiDynamicTabItem> {
        const tabItems = [
            {
               title: this.YANDEX_REVIEWS_TAB_TITLE,
               content: this.renderYandexController(),
               status: this.state.yandexStatus
            },
            {
                title: this.TRIP_ADVISOR_TAB_TITLE,
                content: this.renderTripAdvisorReviews(),
                status: this.state.tripAdvisorStatus
            },
            {
                title: this.OUR_REVIEWS_TAB_TITLE,
                content: this.renderReviewsController(),
                status: this.state.ourReviewStatus
            },
        ];
        return tabItems.reduce(((resultData, currentValue) => {
            switch (currentValue.title) {
                case this.TRIP_ADVISOR_TAB_TITLE:
                    if (this.props.isTripAdvisorCommentsEnabled) {
                        resultData.push(currentValue);
                    }
                    break;
                default:
                    resultData.push(currentValue);
            }
            return resultData;
        }), [] as Array<UiDynamicTabItem>);
    }

    render() {
        const cx = this.classes();

        return (
            <div className={cx.reviewsContent}>
                <UiHorizontalDynamicTabs
                    activeIndex={this.state.activeTabIndex}
                    items={this.availableTabItems}
                    loadingText={'Загружаем отзывы...'}
                    emptyWarning={<SorryWeDontHaveHotelInfo />}
                    bemModifications={[cx.tabsModification]}
                    onChangeActiveIndex={(index: number) => {
                        if (this.state.activeTabIndex !== index) {
                            this.setState({ activeTabIndex: index });
                        }
                    }}
                />
            </div>
        );
    }

    // componentKey - временный костыль-фикс для того, чтобы высота комментов корректно схлопывалась
    renderReviewsController(): JSX.Element {
        return (
            <OurReviews
                componentKey={Math.random() * 1000000}
                hotelId={this.props.hotelId || -1}
                target={this.props.target}
                onLoaded={(status) => {
                    this.setState({
                        ourReviewStatus: status.needShown ? TabStatus.isVisible : TabStatus.isNotVisible
                    });
                }}
            />
        );
    }

    renderYandexController(): JSX.Element {
        return (
            <YandexReviews
                hotelId={this.props.hotelId || -1}
                onLoaded={(status) => {
                    this.setState({
                        yandexStatus: status.needShown ? TabStatus.isVisible : TabStatus.isNotVisible
                    });
                } } 
             />
        );
    }

    renderTripAdvisorReviews() {
        return (
            <TripAdvisorReviews
                hotelId={this.props.hotelId || -1}
                statusHandler={(status) => {
                    this.setState({
                        tripAdvisorStatus: status.needShown ? TabStatus.isVisible : TabStatus.isNotVisible
                    });
                }}
            />
        );
    }

    private classes() {
        return {
            reviewsContent: classNames({
                'reviews-content': true
            }),
            loaderBigModification: classNames({
                'big': true
            }),
            tabsModification: classNames({
                'hotel-forms': true
            })
        };
    }
}
