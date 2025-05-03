import * as React from 'react';
import classNames from 'classnames';
import c from './index.module.scss';

interface FacilityProps {
  groupName: string;
  facility?: string[];
}

export const Facilities = ({ groupName, facility }: FacilityProps) => {
  return (
    <>
      <p className={c.facility_group}>{groupName}</p>
      {facility?.length ? (
        <p className={c.facility}>{facility.join(', ')}</p>
      ) : (
        <p className={classNames(c.facility, c.facility_no_info)}>
          Нет подробной информации от туроператора
        </p>
      )}
    </>
  );
};
