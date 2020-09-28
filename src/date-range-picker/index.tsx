import React, { useState } from 'react';
import classnames from 'classnames';
import moment, { Moment } from 'moment-timezone';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import styles from './styles.module.scss';
import colors from '../../variables/colors.json';
import { CompatibleDateValue, DateDisplay, elementContains } from '../date-picker';

export type ActiveDate = 'startDate' | 'endDate' | null;
export type CommonRange = {
  id: React.ReactNode,
  name: React.ReactNode,
  startDate: CompatibleDateValue,
  endDate: CompatibleDateValue,
};

export const DateRangePickerContext = React.createContext<string | null>(null);

export default function DateRangePicker({
  startDate,
  endDate,
  focusedInput,
  anchor,
  commonRanges,
  numberOfMonths,
  onChange,
  onFocusChange,
  onSelectCommonRange,
  isOutsideRange,
}: {
  startDate: CompatibleDateValue,
  endDate: CompatibleDateValue,
  // This should be renamed to "activeDate" or some such in a future version
  focusedInput?: ActiveDate,
  anchor?: 'ANCHOR_LEFT' | 'ANCHOR_RIGHT',
  commonRanges?: Array<CommonRange>,
  numberOfMonths?: 1 | 2,
  onChange: (values: {startDate: CompatibleDateValue, endDate: CompatibleDateValue}) => void,
  onFocusChange?: (active: ActiveDate) => void,
  onSelectCommonRange?: (range: any) => void,
  isOutsideRange?: (date: CompatibleDateValue) => boolean,
}) {
  const [mouseMode, setMouseMode] = useState(true);
  const [uncontrolledActiveDate, setUncontrolledActiveDate] = useState<ActiveDate>(null);
  const startValue = moment(startDate).toDate();
  const endValue = moment(endDate).toDate();

  // Either controlled or uncontrolled "active date" state
  const activeDate = focusedInput === undefined ? uncontrolledActiveDate : focusedInput;
  const setActiveDate = onFocusChange === undefined ? setUncontrolledActiveDate : onFocusChange;

  return (
    <DateRangePickerContext.Consumer>{context => (
      <div
        className={classnames(styles.dateRangePicker, {[styles.mouseMode]: mouseMode})}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: anchor === 'ANCHOR_RIGHT' ? 'flex-end' : 'flex-start'
        }}
        onBlur={e => {
          if (!elementContains(e.currentTarget, e.relatedTarget as EventTarget & HTMLElement)) {
            setActiveDate(null);
          }
        }}
        onMouseDown={() => setMouseMode(true)}
        onKeyDown={() => setMouseMode(false)}
      >
        <div
          style={{
            width: 240,
            height: 38,
            backgroundColor: colors.white,
            border: `1px solid ${activeDate ? colors.blue : colors.gray300}`,
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DateDisplay
            value={startDate}
            active={activeDate === 'startDate'}
            onSelect={() => setActiveDate('startDate')} />
          <span style={{padding: '0 4px', userSelect: 'none', msUserSelect: 'none', WebkitUserSelect: 'none'}}>—</span>
          <DateDisplay
            value={endDate}
            active={activeDate === 'endDate'}
            onSelect={() => setActiveDate('endDate')} />
        </div>
        {activeDate ? <div
          style={{
            marginTop: 10,
            border: `1px solid ${colors.gray300}`,
            borderRadius: 4,
            width: (numberOfMonths === 1 ? 277 : 568) + (commonRanges ? 176 : 0),
            display: 'flex',
          }}
        >
          {commonRanges ? <div className={styles.commonRangeList}>
            {commonRanges.map(range => (
              <div
                className={styles.commonRangeItem}
                tabIndex={0}
                onClick={() => onSelectCommonRange(range)}
                onKeyDown={e => { if (e.key === 'Enter') { onSelectCommonRange(range); } }}
              >{range.name}</div>
            ))}
          </div> : null}
          <DayPicker
            className="Selectable"
            selectedDays={{from: startValue, to: endValue}}
            modifiers={{
              start: startValue,
              end: endValue,
              disabled: isOutsideRange ? (day: Date) => isOutsideRange(moment(day)) : undefined,
            }}
            numberOfMonths={numberOfMonths || 2}
            month={activeDate === 'endDate' ? endValue : startValue}
            onDayClick={day => {
              if (!isOutsideRange || !isOutsideRange(moment(day))) {
                const active = moment(day).diff(startDate) < 0 ? 'startDate' : activeDate
                onChange({
                  startDate: active === 'startDate' ? moment(day) : startDate,
                  endDate: moment(day),
                });
                if (active === 'startDate') {
                  setActiveDate('endDate');
                } else if (active === 'endDate') {
                  setActiveDate('startDate');
                }
              }
            }}
          />
        </div> : null}
      </div>
    )}</DateRangePickerContext.Consumer>
  );
}
