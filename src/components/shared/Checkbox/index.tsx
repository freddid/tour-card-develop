import React, { HTMLProps } from 'react';
import classNames from 'classnames';

import c from './index.module.scss';

interface CheckboxParams extends HTMLProps<HTMLInputElement> {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  wrapperClass?: string;
}

export const Checkbox = ({
  id,
  wrapperClass = '',
  label,
  checked,
  onChange,
  ...props
}: CheckboxParams) => {
  return (
    <div className={classNames(c.container, wrapperClass)}>
      <input
        checked={checked}
        disabled={props.disabled}
        id={id}
        name={id}
        type='checkbox'
        onChange={onChange}
        {...props}
      />
      {label && (
        <label className={c.label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};
