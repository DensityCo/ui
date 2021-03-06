import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';

import styles from './styles.module.scss';

const Switch: React.FC<any> = ({value, disabled, onChange}) => {
  const uniqueId = uuidv4();

  return (
    <div className={classnames(styles['switch'], {[styles.disabled]: disabled})}>
      <input
        type="checkbox"
        id={`switch-${uniqueId}`}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={`switch-${uniqueId}`}></label>
    </div>
  );
}

Switch.displayName = 'Switch';
export default Switch;
