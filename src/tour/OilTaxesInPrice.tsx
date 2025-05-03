import React from 'react';
import classNames from 'classnames';

interface OilTaxesInPriceProps {
  shouldBeShown: boolean;
}

function classes() {
  return {
    included: classNames({
      'tour-price-included': true,
    }),
  };
}

export const OilTaxesInPrice = ({ shouldBeShown }: OilTaxesInPriceProps) => {
  const cx = classes();

  if (!shouldBeShown) {
    return null;
  }

  return <p className={cx.included}>Топл. сбор включен</p>;
};
