import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import {DayOfWeek} from '@density/lib-common-types';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'TIME_FILTER_PICKER': styles.contextTimeFilterPicker,
};

export const DayOfWeekPickerContext = React.createContext<string | null>(null);

const DayOfWeekPicker: React.FC<any> = ({
  daysOfWeek,
  disabled=false,
  onChange,
}) => {
  return (
    <DayOfWeekPickerContext.Consumer>{context => (
      <div className={styles.wrapper}>
        {Object.values(DayOfWeek).map(dayName => (
          <div key={dayName} className={classnames(context && CONTEXT_CLASSES[context], styles.item)}>
          <div
              className={classnames(context && CONTEXT_CLASSES[context], styles.button, {
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
    )}</DayOfWeekPickerContext.Consumer>
  );
}

DayOfWeekPicker.displayName = 'DayOfWeekPicker';
export default DayOfWeekPicker;
