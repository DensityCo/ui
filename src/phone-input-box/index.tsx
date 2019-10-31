import React from 'react';
import classnames from 'classnames';

import PhoneInput from 'react-phone-number-input';

import './styles.scss';

export default function PhoneInputBox({
  value = undefined,
  onChange = () => null,
  country = 'US',
  ...props
}) {
  return <PhoneInput
    {...props}
    value={value}
    country={country}
    className={classnames(props.className, {
      'react-phone-number-input--disabled': props.disabled
    })}
    onChange={onChange}
  />;
}
