import React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';

import styles from './styles.scss';

export default function Switch({value, disabled, onChange}) {
  const uniqueId = uuid.v4();

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
