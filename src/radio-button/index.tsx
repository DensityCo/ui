import React from 'react';
import { v4 } from 'uuid';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'LEGACY': styles.contextLegacy,
};

export const RadioButtonContext = React.createContext<keyof typeof CONTEXT_CLASSES>(null);

type RadioButtonProps = {
	text?: React.ReactNode,
	name: string,
	value: string,
	defaultChecked?: boolean,
	checked: boolean,
	disabled?: boolean,
	onChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
};

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
	text=null,
	name,
	value,
	defaultChecked,
	checked,
	disabled,
	onChange,
}) => {
  const unique: string = v4();
  return <RadioButtonContext.Consumer>{context => (
    <div className={classnames(CONTEXT_CLASSES[context], styles.radioButton, {
      [styles.noText]: text === null,
    })}>
      <input
        type="radio"
        className={styles.radioButtonInput}
        id={`radio-button-${unique}`}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        className={classnames(CONTEXT_CLASSES[context], styles.radioButtonLabel)}
        htmlFor={`radio-button-${unique}`}
      >{text}</label>
    </div>
  )}</RadioButtonContext.Consumer>;
}
RadioButton.displayName = 'RadioButton';
export default RadioButton;
