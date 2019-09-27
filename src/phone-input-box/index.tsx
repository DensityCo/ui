import React from 'react';
import classnames from 'classnames';

import PhoneInput from 'react-phone-number-input';

import './styles.scss';

type PhoneInputBoxProps = {
	value?: string,
	country?: string,
	onChange: (phonenumber: string) => void,
	disabled?: boolean,

	// Other props for react phone number input
	[prop: string]: any,
}

const PhoneInputBox: React.FunctionComponent<PhoneInputBoxProps> = ({
  value = undefined,
  onChange = () => null,
  country = 'US',
  ...props
}) => (
  <PhoneInput
    {...props}
    value={value}
    country={country}
    className={classnames({ 'react-phone-number-input--disabled': props.disabled })}
    onChange={onChange}
  />
);
export default PhoneInputBox;
