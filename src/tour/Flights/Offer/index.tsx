import React from 'react';
import { observer } from 'mobx-react-lite';
import cl from 'classnames';
import { useMainStore } from '../../../stores';
import { FlightCard } from './FlightCard';
import { OfferLoadingPlaceholder } from './OfferLoadingPlaceholder';
import { OfferHeader } from './Header';
import { NoFlightCase } from './NoFlightCase';
import { TransparentButton } from '../../../components/shared/TransparentButton';
import { Target } from '../../../types-and-consts';
import { smoothScrollDefault } from '../../../utils/smoothScroll';
import c from './index.module.scss';

export const OFFER_CONTAINER_ID = 'flight-offer';

interface OfferProps {
  target: Target;
}

export const Offer = observer(function Offer({ target }: OfferProps) {
  const S = useMainStore().flightOfferStore;
  const UI = S.ui;
  const status = S.actualizationStatus;
  const list = UI.flightToShow;

  const shouldShowShowMoreButton = UI.flightsLeft > 0;
  const shouldShowCollapseButton = list.length > UI.FLIGHTS_CHUNK;

  const onFlightItemSelect = (packageId: number) => {
    S.setSelectFlightsPackage(packageId);
    smoothScrollDefault('sletat-tour-card-buy-online-form-container', target);
  };

  const onShowMoreHandle = () => {
    UI.increaseVisibleFlightsAmount();
  };

  const onCollapseHandle = () => {
    UI.collapseList();
  };

  if (status.isActualizationInProgress) {
    return <OfferLoadingPlaceholder />;
  }

  if (!list.length) {
    return <NoFlightCase />;
  }

  return (
    <div className={c.container} id={OFFER_CONTAINER_ID}>
      <OfferHeader />
      <ul className={cl(c.list, { [c.animation]: S.ui.isAnimated })}>
        {list.map((f) => (
          <FlightCard
            key={f.flightsPackageId}
            isSelected={S.selectedFlightsPackageId === f.flightsPackageId}
            isTourHasFlightsWithConcretization={S.hasFlightsWithConcretization}
            operatorId={S.actualizedInfo.tour?.sourceId}
            originalPrice={S.actualizedInfo.tourPrice!}
            pack={f}
            surchargeAmount={f.surchargeAmount}
            onFlightItemSelect={() => onFlightItemSelect(f.flightsPackageId!)}
          />
        ))}
      </ul>

      {shouldShowShowMoreButton && (
        <TransparentButton
          caption={UI.showMoreButtonCaption}
          onClick={onShowMoreHandle}
        />
      )}
      {shouldShowCollapseButton && (
        <TransparentButton
          caption='Свернуть перелёты'
          className={c.collapseBtn}
          onClick={onCollapseHandle}
        />
      )}
    </div>
  );
});
