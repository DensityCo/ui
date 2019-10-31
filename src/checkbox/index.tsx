import React, { useState } from 'react';
import uuid from 'uuid';
import styles from './styles.module.scss';
import colorVariables from '../../variables/colors.json';

function lightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

const Checkbox: React.FC<any> = ({ id, color, checked, disabled=false, onChange, label="" }) => {
  const [idProp] = useState(id || `checkbox-${uuid.v4()}`);
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
          backgroundColor: lightenDarkenColor(color, 40),
          borderColor: lightenDarkenColor(color, -20),
        } : {}}
      >{label}</label>
    </div>
  );
}

Checkbox.defaultProps = {
  id: null,
  checked: false,
  disabled: false,
  color: colorVariables.brandPrimary,
};
export default Checkbox;
