import * as React from 'react';
import { MouseEvent, useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Portal } from '../shared/Portal';
import { HotelRoom, RoomFacility, getRooms } from '../../services/getRooms';
import c from './index.module.scss';

import { IconCrossModal } from '../../icons/IconCrossModal';
import { PhotoSlider } from '../PhotoSlider';
import { getVerbalPeople, getVerbalPlacements } from '../../utils/format';
import { Facilities } from './Facilities';
import { useHideScrollBody } from '../../utils/useHideScroll';
import { transformURLHotelPhoto } from '../../utils/url';

interface RoomInfoFullProps {
  hotelId: number;
  hotelRoomId: number;
  isOpen: boolean;
  onClose: () => void;
  onCheckRoom: (status: boolean) => void;
}

enum FacilityGroup {
  Bathroom = 1,
  Technical = 2,
  Bath = 3,
  Balcony = 4,
  Furniture = 5,
  Special = 6,
  View = 7,
}

const columnFacility1 = [
  [FacilityGroup.Bathroom, 'Санузел'],
  [FacilityGroup.Balcony, 'Балкон'],
  [FacilityGroup.View, 'Вид из окна'],
  [FacilityGroup.Furniture, 'Мебель'],
] as [FacilityGroup, string][];

const columnFacility2 = [
  [FacilityGroup.Technical, 'Техника'],
  [FacilityGroup.Bath, 'Ванная'],
  [FacilityGroup.Special, 'Особенности'],
] as [FacilityGroup, string][];

export const RoomInfoFull = ({
  hotelId,
  hotelRoomId,
  isOpen,
  onCheckRoom,
  onClose,
}: RoomInfoFullProps) => {
  const [roomInfo, setRoomInfo] = useState<HotelRoom | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [heightSlider, setHeightSlider] = useState(0);

  const [hideScroll, resetScroll] = useHideScrollBody();

  const facilitiesMap = useMemo(() => {
    const facilitiesMap = new Map<number, RoomFacility[]>();
    roomInfo?.facilities.forEach((facility) => {
      facilitiesMap.set(facility.groupId, [
        ...(facilitiesMap.get(facility.groupId) ?? []),
        facility,
      ]);
    });
    return facilitiesMap;
  }, [roomInfo?.facilities]);

  useEffect(() => {
    if (isOpen && isChecked) {
      hideScroll();
    }

    return () => {
      if (isOpen) {
        resetScroll();
      }
    };
  }, [isOpen, hideScroll, resetScroll]);

  useEffect(() => {
    if (hotelId)
      getRooms(hotelId).then((rooms) => {
        const roomInfo = rooms.find((room) => room.id === hotelRoomId) ?? null;

        onCheckRoom(!!roomInfo);
        if (roomInfo) {
          setIsChecked(true);
          setRoomInfo(roomInfo);
        }
      });
  }, [hotelId]);

  const photos = useMemo(
    () =>
      roomInfo?.photos.map((photo) => ({
        ...photo,
        url: transformURLHotelPhoto(photo.url, { height: 220, width: 390 }),
      })),
    [roomInfo?.photos],
  );

  if (!roomInfo || !isOpen || !photos) return null;

  const onClickModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className={c.modalContainer}
        role='presentation'
        onClick={onClickModal}
      >
        <div className={c.modalContainerInner}>
          <div className={c.head}>
            <button
              className={classNames('button-style-clear', c.crossbtn)}
              type='button'
              onClick={onClose}
            >
              Закрыть
              <span className={c.iconCross}>
                <IconCrossModal />
              </span>
            </button>
          </div>

          <div className={c.main}>
            <div className={c.header}>
              <div
                style={{ height: heightSlider || undefined }}
                className={classNames(c.slider, {
                  [c.noPhotos]: !photos.length,
                })}
              >
                {!!photos.length && (
                  <PhotoSlider
                    isDesktop
                    photos={photos}
                    adaptiveHeight={(height) =>
                      height !== heightSlider && setHeightSlider(height)
                    }
                  />
                )}
              </div>
              <div>
                <h2 className={c.content_head}>{roomInfo.name}</h2>
                <div className={c.property}>
                  {!!roomInfo.area && <span>{roomInfo.area} м2</span>}
                  {!!roomInfo.roomCount && (
                    <span>
                      {roomInfo.roomCount}{' '}
                      {getVerbalPlacements(roomInfo.roomCount)}
                    </span>
                  )}
                  {!!roomInfo.maxPersonCount && (
                    <span>
                      Размещение: максимум {roomInfo.maxPersonCount}{' '}
                      {getVerbalPeople(roomInfo.maxPersonCount)}
                    </span>
                  )}
                </div>
                <p className={c.description}>{roomInfo.description}</p>
              </div>
            </div>
            <div className={c.footer}>
              <div className={c.column}>
                <Facilities
                  groupName='Спальные места'
                  facility={roomInfo.sleepingPlaces?.map(
                    (fac) => fac.name || fac.defaultName,
                  )}
                />

                {columnFacility2.map((column) => {
                  const facility = facilitiesMap.get(column[0]);

                  return (
                    <Facilities
                      key={`${column[0]}`}
                      facility={facility?.map((fac) => fac.name)}
                      groupName={column[1]}
                    />
                  );
                })}
              </div>
              <div className={c.column}>
                {columnFacility1.map((column) => {
                  const facility = facilitiesMap.get(column[0]);

                  return (
                    <Facilities
                      key={`${column[0]}`}
                      facility={facility?.map((fac) => fac.name)}
                      groupName={column[1]}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
