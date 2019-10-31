import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function DayOfWeekSelector({
  daysOfWeek,
  disabled=false,
  onChange,
}) {
  return (
    <div className={styles.wrapper}>
      {DAYS_OF_WEEK.map(dayName => (
        <div key={dayName} className={styles.item}>
         <div
            className={classnames(styles.button, {
              [styles.active]: daysOfWeek.includes(dayName),
              [styles.disabled]: disabled,
            })}
            onClick={() => {
              if (!daysOfWeek.includes(dayName)) {
                // Add day
                onChange([...daysOfWeek, dayName]);
              } else {
                // Ensure the user doesn't deselect the last day
                if (daysOfWeek.length <= 1) { return; }

                // Remove day
                onChange(daysOfWeek.filter(day => day !== dayName));
              }
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
