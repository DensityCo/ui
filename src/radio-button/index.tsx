import React from 'react';
import { v4 } from 'uuid';
import propTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.module.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'LEGACY': styles.contextLegacy
};

export const RadioButtonContext = React.createContext<string | null>(null);

const RadioButton: React.FC<any> = ({text=null, name, value, defaultChecked, checked, disabled, onChange}) => {
  const unique = v4();
  return <RadioButtonContext.Consumer>{context => (
    <div className={classnames(context && CONTEXT_CLASSES[context], styles.radioButton, {
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
        className={classnames(context && CONTEXT_CLASSES[context], styles.radioButtonLabel)}
        htmlFor={`radio-button-${unique}`}
      >{text}</label>
    </div>
  )}</RadioButtonContext.Consumer>;
}

RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = {
  text: propTypes.node,
  name: propTypes.string,
  value: propTypes.string,
  checked: propTypes.bool,
  disabled: propTypes.bool,
};
export default RadioButton;
