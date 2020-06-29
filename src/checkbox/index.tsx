import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.scss';
import colorVariables from '../../variables/colors.json';

type CheckboxProps = {
  checked: boolean,
  id?: string,
  color?: string
  disabled?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  label?: React.ReactNode,
};

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ id, color, checked, disabled=false, onChange, label="" }) => {
  const [idProp] = useState(id || `checkbox-${uuidv4()}`);
  return (
    <div
      // Required so that clicking on the checkbox doesn't produce an `onClick` event in parent
      // elements, only an `onChange`.
      onClick={e => e.stopPropagation()}
    >
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        className={styles.checkbox}
        id={idProp}
        onChange={onChange}
      />
      <label
        className={styles.label}
        htmlFor={idProp}
        style={checked && !disabled ? {
          color: color,
          backgroundColor: color,
          borderColor: color,
        } : {}}
      >{label}</label>
    </div>
  );
}

Checkbox.defaultProps = {
  id: undefined,
  checked: false,
  disabled: false,
  color: colorVariables.midnight,
};
export default Checkbox;
