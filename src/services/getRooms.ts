import { HttpError } from 'sletat-api-services';

// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { API_CMS_HOST } from '../config/api-consts';
import { isHttpError } from './utils/http';
import { BaseResponse } from './utils/baseResponse';

export interface RoomFacility {
  id: number;
  groupName: string;
  groupId: number;
  name: string;
}

export interface RoomPhoto {
  id: number;
  url: string;
  name: string;
}

export interface SleepingPlace {
  count: number;
  defaultName: string;
  name: string;
}

export interface HotelRoom {
  area: number;
  roomCount: number;
  id: number;
  description: string;
  facilities: RoomFacility[];
  name: string;
  maxPersonCount: number;
  photos: RoomPhoto[];
  sleepingPlaces?: SleepingPlace[];
}

export const getRooms = async (hotelId: number): Promise<HotelRoom[]> => {
  try {
    const response = await fetch(
      `https://${API_CMS_HOST}/concierge/rooms/data/${hotelId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = (await response.json()) as BaseResponse<HotelRoom[]>;

    if (isHttpError(response.status)) {
      throw new HttpError(response.statusText, response.status);
    }

    if (json.error) {
      throw new HttpError(json.error);
    }

    return json.result;
  } catch (err) {
    console.error('getRooms failed', err);
    return [];
  }
};
