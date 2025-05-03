import { STATIC_HOST_NAME } from '../consts/hosts';

// @ts-ignore
// eslint-disable-next-line import/extensions, import/no-unresolved
import { HOTEL_HOST_PHOTO_STORAGE } from '../config/api-consts';

export function getTourOperatorLogoUrl(operatorId: number): string {
  return `//${STATIC_HOST_NAME}/images/to/${operatorId}.png`;
}

interface transformURLPhotoParams {
  width: number;
  height: number;
}

/**
 *
 * функция нужна преобразования ссылок на фото отоеле вида https://storage.yandexcloud.net/slt-hotels-room-storage/../.. к https://hotels-room.sletat.ru/../..
 */

export const transformURLHotelPhoto = (
  url: string,
  params: transformURLPhotoParams,
) => {
  const search = new URLSearchParams();
  search.set('height', params.height.toString());
  search.set('width', params.width.toString());
  return `${url
    .replace('/slt-hotels-room-storage', '')
    .replace(
      'storage.yandexcloud.net',
      HOTEL_HOST_PHOTO_STORAGE,
    )}?${search.toString()}`;
};
