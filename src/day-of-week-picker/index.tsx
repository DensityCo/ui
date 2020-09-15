import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {DayOfWeek} from '@density/lib-common-types';

const DayOfWeekSelector: React.FC<any> = ({
  daysOfWeek,
  disabled=false,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      {Object.values(DayOfWeek).map(dayName => (
        <div key={dayName} className={styles.item}>
         <div
            className={classnames(styles.button, {
              [styles.active]: daysOfWeek.includes(dayName),
              [styles.disabled]: disabled,
            })}
            onClick={() => {
              // Add or remove the selected day
              const selectedDays = !daysOfWeek.includes(dayName) ?
                [...daysOfWeek, dayName] :
                daysOfWeek.length > 1 ?
                  daysOfWeek.filter(x => x !== dayName) :
                  daysOfWeek;  // Don't remove the last selected day

              // Always emit changed value in consistent order
              onChange(Object.values(DayOfWeek).filter(x => selectedDays.includes(x)));
            }}
            tabIndex={0}
          >
            {dayName[0].toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}

DayOfWeekSelector.displayName = 'DayOfWeekSelector';
export default DayOfWeekSelector;
