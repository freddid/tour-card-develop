/* eslint-disable */
/* eslint-disable prettier/prettier */
/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames';

import { UiPagination } from 'sletat-uikit2/dist/js/UiPagination';
import { HotelComment } from 'sletat-api-services/lib/ModuleApiServices/Comments.svc/GetComments/GetCommentsResponse';
import { target } from 'sletat-api-services/lib/types';
import { HotelReviewList } from 'sletat-ui-components/lib/Hotel/Reviews/HotelReviewsList/SletatHotelReviewsList';
import { AddHotelReviewForm, AddHotelReviewFormState } from 'sletat-ui-components/lib/Hotel/Reviews/AddHotelReviewForm';

import { HotelOurReviews } from '../helpers/HotelOurReviews';
import { SorryWeDontHaveHotelInfo } from './SorryWeDontHaveHotelInfo';


export interface OurReviewsStatus {
    needShown: boolean;
}


export interface OurReviewsProps {
    componentKey: number;
    hotelId: number;
    target: target;
    onLoaded: (status: OurReviewsStatus) => void;
}

export interface OurReviewsState {
    reviews: Array<HotelComment>;
    numReviews: number;
    page: number;
    isAddReviewFormVisible: boolean;
    isCommentsAllowed: boolean;
}

export class OurReviews extends Component<OurReviewsProps, OurReviewsState> {

    private REVIEW_FORM_CLOSE_DELAY = 5000;
    private PAGE_SIZE = 5;
    private hotelReviews: HotelOurReviews;

    constructor(props: OurReviewsProps) {
        super(props);

        this.state = {
            reviews: [],
            numReviews: 5,
            page: 1,
            isAddReviewFormVisible: false,
            isCommentsAllowed: false
        } as OurReviewsState;

        this.hotelReviews = new HotelOurReviews(this.props.hotelId, this.PAGE_SIZE, props.target);
    }

    componentDidMount() {
        this.hotelReviews.loadReviews(this.state.page)
            .then(() => {
                this.setState({
                    reviews: this.hotelReviews.reviews,
                    numReviews: this.hotelReviews.numReviews,
                    isCommentsAllowed: this.hotelReviews.isReviewsAllowed
                });
                this.props.onLoaded({ needShown: this.hotelReviews.isReviewsAllowed });
            });
    }

    render() {
        if (this.state.isCommentsAllowed) {
            return this.getGeneralMarkup();
        } else {
            return this.getReviewsAreNotAllowedMarkup();
        }
    }

    private closeReviewFormOnResult() {
        setTimeout(() => {
            this.setState({
                isAddReviewFormVisible: false
            } as any);
        }, this.REVIEW_FORM_CLOSE_DELAY);
    }

    private getGeneralMarkup() {
        const cx = this.classes();

        return (
            <div key={this.props.componentKey} className="reviews-content__sletat">
                <button
                    className={cx.btnSendReportSmall}
                    onClick={() => this.setState({ isAddReviewFormVisible: !this.state.isAddReviewFormVisible } as any)}
                >
                    {this.state.isAddReviewFormVisible ? 'Смотреть отзывы' : 'Оставить отзыв'}
                </button>
                {this.renderAddHotelReviewForm()}
                {this.renderReviewsList()}
            </div>
        );
    }

    private renderAddHotelReviewForm() {
        if (!this.state.isAddReviewFormVisible) {
            return null;
        }

        return (
            <AddHotelReviewForm
                hotelId={this.props.hotelId || -1}
                onSubmitHandler={this.submitForm}
                onSuccessHandler={() => this.closeReviewFormOnResult()}
                onErrorHandler={() => this.closeReviewFormOnResult()}
                onBackToDefault={() => {/*tslint:disable-next-line:no-empty*/}}
                onFormClose={() => {/*tslint:disable-next-line:no-empty*/}}
            />
        );
    }

    private renderReviewsList() {
        const reviews = this.state.reviews || [];

        if (this.state.isAddReviewFormVisible) {
            return null;
        }

        if (!reviews.length) {
            return (
                <div style={{clear: 'both'}}>
                    <SorryWeDontHaveHotelInfo />
                </div>
            );
        }

        const cx = this.classes();
        const pages = Math.ceil(this.state.numReviews / this.PAGE_SIZE);

        return (
            <div>
                <HotelReviewList list={reviews} bemModifications={[cx.cardTourModification]} />
                <UiPagination
                    currentPage={this.state.page}
                    pages={pages}
                    maxPositions={7}
                    bemModifications={[cx.cardTourModification]}
                    onSelectPageHandler={(page: number) => {
                        this.setState({ page });
                        this.hotelReviews.loadReviews(page)
                            .then(() => {
                                this.setState({
                                    reviews: this.hotelReviews.reviews,
                                    numReviews: this.hotelReviews.numReviews,
                                    isCommentsAllowed: this.hotelReviews.isReviewsAllowed
                                });
                            });
                    }}
                />
            </div>
        );
    }

    private getReviewsAreNotAllowedMarkup() {
        return (
            <div>
                <p>К сожалению, отзывы к отелям не доступны</p>
            </div>
        );
    }

    private submitForm = (data: AddHotelReviewFormState) => {
        return this.hotelReviews.addReview(
            this.props.hotelId,
            data.rating,
            data.name,
            data.positive,
            data.negative,
            new Date(data.year, data.month, 1)
        );
    }

    private classes() {
        return {
            btnSendReportSmall: classNames({
                'uis-button': true,
                'uis-button_orange': true,
                'uis-button_middle': true,
                'button-send-report-small': true
            }),
            cardTourModification: classNames({
                'card-tour': true
            })
        };
    }
}
