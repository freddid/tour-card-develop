import React from 'react';
import classNames from 'classnames';
import { HotelInStop } from 'sletat-api-services/lib/Tour';
import { InfoIcon } from './InfoIcon';
import { SVGIcon } from '../../svg-icon';

export interface TicketsAvailabilityInfoProps {
  isActualizationProcess: boolean;
  isDetailActualizationSuccess: boolean;
  areNoPlacesInHotel: boolean;
  placesInHotelExtendedInfo: HotelInStop | null;
  areIncludedFlightTickets: boolean;
  areTicketsToInStock: boolean;
  areTicketsBackInStock: boolean;
  areTicketsToOutOfStock: boolean;
  areTicketsBackOutOfStock: boolean;
}

function PlaneIcon() {
  return <SVGIcon height='20' url='#icon-fly' width='20' />;
}

function HotelIcon() {
  return <SVGIcon height='20' url='#icon-hotel-room' width='20' />;
}

function classes() {
  return {
    tourProps: classNames({
      'tour-properties': true,
    }),
    iconBook: classNames({
      'tour-properties__icon': true,
      'tour-properties__icon_book': true,
    }),
    iconDeparture: classNames({
      'tour-properties__icon': true,
      'tour-properties__icon_departure': true,
    }),
    iconArrival: classNames({
      'tour-properties__icon': true,
      'tour-properties__icon_arrival': true,
    }),
    emptyItem: classNames({
      'tour-properties__item': true,
      'tour-properties__item_empty': true,
    }),
    negativeItem: classNames({
      'tour-properties__item': true,
      'tour-properties__item_negative': true,
    }),
    positiveItem: classNames({
      'tour-properties__item': true,
      'tour-properties__item_positive': true,
    }),
  };
}

export function TicketsAvailabilityInfo({
  areIncludedFlightTickets,
  isActualizationProcess,
  isDetailActualizationSuccess,
  areNoPlacesInHotel,
  placesInHotelExtendedInfo,
  areTicketsToInStock,
  areTicketsToOutOfStock,
  areTicketsBackInStock,
  areTicketsBackOutOfStock,
}: TicketsAvailabilityInfoProps) {
  const cx = classes();

  function getHotelInfoComponent() {
    const hotelIcon = (
      <span className={cx.iconBook}>
        <HotelIcon />
      </span>
    );
    const title = 'Места в отеле';

    // В процессе актуализации.
    if (isActualizationProcess) {
      return (
        <li className={cx.emptyItem}>
          <InfoIcon title={title}>{hotelIcon}</InfoIcon>
        </li>
      );
    }
    if (!isActualizationProcess && !isDetailActualizationSuccess) {
      return (
        <li className={cx.emptyItem}>
          <InfoIcon description='нет информации' title={title}>
            {hotelIcon}
          </InfoIcon>
        </li>
      );
    }
    if (areNoPlacesInHotel) {
      return (
        <li className={cx.negativeItem}>
          <InfoIcon description='мест нет' title={title}>
            {hotelIcon}
          </InfoIcon>
        </li>
      );
    }
    if (placesInHotelExtendedInfo === HotelInStop.hasPlaces) {
      return (
        <li className={cx.positiveItem}>
          <InfoIcon description='есть' title={title}>
            {hotelIcon}
          </InfoIcon>
        </li>
      );
    }
    if (placesInHotelExtendedInfo === HotelInStop.inStop) {
      return (
        <li className={cx.negativeItem}>
          <InfoIcon description='нет' title={title}>
            {hotelIcon}
          </InfoIcon>
        </li>
      );
    }
    return (
      <li className={cx.emptyItem}>
        <InfoIcon description='по запросу' title={title}>
          {hotelIcon}
        </InfoIcon>
      </li>
    );
  }

  function getTicketsToComponent() {
    const flightIcon = (
      <span className={cx.iconDeparture}>
        <PlaneIcon />
      </span>
    );
    const title = 'Билеты туда';

    // В процессе актуализации.
    if (isActualizationProcess) {
      return (
        <li className={cx.emptyItem}>
          <InfoIcon title={title}>{flightIcon}</InfoIcon>
        </li>
      );
    }
    if (!isActualizationProcess && !isDetailActualizationSuccess) {
      return (
        <li className={cx.emptyItem}>
          <InfoIcon description='нет информации' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    // Без перелета.
    if (!areIncludedFlightTickets) {
      return (
        <li className={cx.negativeItem}>
          <InfoIcon description='без перелета' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    // С перелетом.
    if (areTicketsToInStock) {
      return (
        <li className={cx.positiveItem}>
          <InfoIcon description='есть' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    if (areTicketsToOutOfStock) {
      return (
        <li className={cx.negativeItem}>
          <InfoIcon description='нет' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    return (
      <li className={cx.emptyItem}>
        <InfoIcon description='по запросу' title={title}>
          {flightIcon}
        </InfoIcon>
      </li>
    );
  }

  function getTicketsBackComponent() {
    const flightIcon = (
      <span className={cx.iconArrival}>
        <PlaneIcon />
      </span>
    );
    const title = 'Билеты обратно';
    // В процессе актуализации.
    if (isActualizationProcess) {
      return (
        <li className={cx.emptyItem}>
          <InfoIcon title={title}>{flightIcon}</InfoIcon>
        </li>
      );
    }
    if (!isActualizationProcess && !isDetailActualizationSuccess) {
      return (
        <li className={cx.emptyItem}>
          <InfoIcon description='нет информации' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    // Без перелета.
    if (!areIncludedFlightTickets) {
      return (
        <li className={cx.negativeItem}>
          <InfoIcon description='без перелета' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    // С перелетом.
    if (areTicketsBackInStock) {
      return (
        <li className={cx.positiveItem}>
          <InfoIcon description='есть' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    if (areTicketsBackOutOfStock) {
      return (
        <li className={cx.negativeItem}>
          <InfoIcon description='нет' title={title}>
            {flightIcon}
          </InfoIcon>
        </li>
      );
    }
    return (
      <li className={cx.emptyItem}>
        <InfoIcon description='по запросу' title={title}>
          {flightIcon}
        </InfoIcon>
      </li>
    );
  }

  return (
    <ul className={cx.tourProps}>
      {areIncludedFlightTickets && (
        <>
          {getTicketsToComponent()}
          {getTicketsBackComponent()}
        </>
      )}
      {getHotelInfoComponent()}
    </ul>
  );
}
