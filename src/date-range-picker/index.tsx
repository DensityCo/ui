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
  focusedInput: ActiveDate,
  anchor?: 'ANCHOR_LEFT' | 'ANCHOR_RIGHT',
  commonRanges?: Array<CommonRange>,
  numberOfMonths?: 1 | 2,
  onChange: (values: {startDate: CompatibleDateValue, endDate: CompatibleDateValue}) => void,
  onFocusChange: (active: ActiveDate) => void,
  onSelectCommonRange?: (range: any) => void,
  isOutsideRange?: (date: CompatibleDateValue) => boolean,
}) {
  const [mouseMode, setMouseMode] = useState(true);
  const startValue = moment(startDate).toDate();
  const endValue = moment(endDate).toDate();

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
            onFocusChange(null);
          }
        }}
        onMouseDown={() => setMouseMode(true)}
        onKeyDown={() => setMouseMode(false)}
      >
        <div
          style={{
            width: 242,
            height: 40,
            border: `1px solid ${focusedInput ? colors.blue : colors.gray300}`,
            borderRadius: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DateDisplay
            value={startDate}
            active={focusedInput === 'startDate'}
            onSelect={() => onFocusChange('startDate')} />
          <span style={{padding: '0 4px', userSelect: 'none', msUserSelect: 'none', WebkitUserSelect: 'none'}}>—</span>
          <DateDisplay
            value={endDate}
            active={focusedInput === 'endDate'}
            onSelect={() => onFocusChange('endDate')} />
        </div>
        {focusedInput ? <div
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
            month={focusedInput === 'endDate' ?
              moment(endValue).subtract(1, 'months').toDate() :
              startValue}
            onDayClick={day => {
              if (!isOutsideRange || !isOutsideRange(moment(day))) {
                const focus = moment(day).diff(startDate) < 0 ?
                  'startDate' :
                  moment(day).diff(endDate) > 0 ?
                    'endDate' :
                    focusedInput;
                onChange({
                  startDate: focus === 'startDate' ? moment(day) : startDate,
                  endDate: focus === 'endDate' ? moment(day) : endDate,
                });
                if (focusedInput !== 'endDate') {
                  onFocusChange('endDate');
                }
              }
            }}
          />
        </div> : null}
      </div>
    )}</DateRangePickerContext.Consumer>
  );
}
