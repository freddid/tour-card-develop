import { HttpError } from 'sletat-api-services';

// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { isHttpError } from './utils/http';
import { API_SLETAT_HOST_NAME } from '../config/api-consts';

interface Review {
  hotelId: number;
  title: string;
  url: string;
  sourceKind: number;
}
interface ReviewsResponseError {
  errorCode: number;
  reason: string;
}
interface ReviewsResponseWrapper {
  error: ReviewsResponseError | null;
  data: Review[] | null;
}

export interface YandexReview {
  url: string;
}

export const getYandexReviews = async (
  hotelId: number,
): Promise<YandexReview | null> => {
  try {
    const response = await fetch(
      `https://${API_SLETAT_HOST_NAME}/hotels/${hotelId}/reviews?providersIds=7`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json = (await response.json()) as ReviewsResponseWrapper;

    if (isHttpError(response.status)) {
      throw new HttpError(response.statusText, response.status);
    }

    if (json.error != null) {
      throw new HttpError(json.error.reason, json.error.errorCode);
    }

    const body = json.data;
    if (body != null && body.length > 0) {
      const reviewsYandex = body.filter((r) => r.sourceKind === 7);
      if (reviewsYandex.length > 0) {
        return { url: reviewsYandex[0].url } as YandexReview;
      }
    }

    return null;
  } catch (err) {
    console.error('getYandexReviews failed', err);
    return null;
  }
};
