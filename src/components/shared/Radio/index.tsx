import * as React from 'react';
import * as classNames from 'classnames';

import c from './index.module.scss';

interface RadioParams {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  wrapperClass?: string;
}

export const Radio = ({
  id,
  wrapperClass = '',
  label,
  checked,
  onChange,
}: RadioParams) => {
  return (
    <div className={classNames(c.container, wrapperClass)}>
      <input
        checked={checked}
        id={id}
        name={id}
        type='radio'
        onChange={onChange}
      />
      <label className={c.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
