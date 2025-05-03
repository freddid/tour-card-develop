/* eslint-disable */
/* eslint-disable prettier/prettier */
import { getComments } from 'sletat-api-services/lib/ModuleApiServices/Comments.svc/GetComments/GetComments';
import {
    GetCommentsResponse, HotelComment
} from 'sletat-api-services/lib/ModuleApiServices/Comments.svc/GetComments/GetCommentsResponse';
import { target } from 'sletat-api-services/lib/types';
import { addLargeComment } from 'sletat-api-services/lib/ModuleApiServices/Comments.svc/AddLargeComment/AddLargeComment';
import { Protocols } from 'sletat-api-services/lib/http/HttpClient';


export class HotelOurReviews {

    private _isReviewsAllowed: boolean;
    private _averageRate: number | null;
    private _numReviews: number;
    private _reviews: Array<HotelComment>;

    private readonly hotelId: number;
    private readonly pageSize: number;
    private readonly target: target;

    constructor(hotelId: number | string | null, pageSize: number, target: target) {
        this.hotelId = !!hotelId ? parseInt(String(hotelId), 10) : -1;
        this.pageSize = pageSize;
        this.target = target;
    }

    get isReviewsAllowed(): boolean {
        return this._isReviewsAllowed;
    }

    get averageRate(): number | null {
        return this._averageRate;
    }

    get numReviews(): number {
        return this._numReviews;
    }

    get reviews(): Array<HotelComment> {
        return this._reviews;
    }

    loadReviews(page: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const params = {
                hotelId: this.hotelId,
                page,
                pageSize: this.pageSize,
                target: this.target
            };

            getComments(params, { protocol: Protocols.HTTPS })
                .then((response: GetCommentsResponse) => {
                    this._isReviewsAllowed = response.isCommentsAllowed;
                    this._averageRate = response.isCommentsAllowed ? response.averageRate : null;
                    this._numReviews = response.isCommentsAllowed ? response.commentsCount : 0;
                    this._reviews = response.isCommentsAllowed ? response.comments : [];
                    resolve();
                })
                .catch((err) => reject(err));
        });
    }

    addReview(
        hotelId: number, rate: number, touristName: string,
        positiveReview: string, negativeReview: string, restStartDate: Date
    ) {
        const params = {
            commentData: { rate, touristName, positiveReview, negativeReview, restStartDate },
            hotelId: hotelId || -1,
            target: this.target
        };

        return addLargeComment(params, { protocol: Protocols.HTTPS });
    }
}
