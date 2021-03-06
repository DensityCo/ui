import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment-timezone';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import styles from './styles.module.scss';
import colors from '../../variables/colors.json';
import { CompatibleDateValue, DateDisplay, elementContains } from '../date-picker';
import Icons from '../icons';

export type ActiveDate = 'startDate' | 'endDate' | null;
export type CommonRange = {
  id: string,
  name: React.ReactNode,
  startDate: CompatibleDateValue,
  endDate: CompatibleDateValue,
};

export const DateRangePickerContext = React.createContext<string | null>(null);

export default function DateRangePicker({
  startDate,
  endDate,
  focusedInput,
  anchor = 'ANCHOR_LEFT',
  floating = true,
  autoClose = false,
  commonRanges = [],
  numberOfMonths = 2,
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
  floating?: boolean,
  autoClose?: boolean,
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
    <DateRangePickerContext.Consumer>{context => {
      const isTimeRangeControlBar = context === 'TIME_RANGE_CONTROL_BAR';
      const isNoHeader = context === 'NO_HEADER';

      return <div
        className={classnames(styles.dateRangePicker, {[styles.mouseMode]: mouseMode})}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: anchor === 'ANCHOR_RIGHT' ? 'flex-end' : 'flex-start',
          width: floating ? 242 : undefined,
          height: floating ? 40 : undefined,
        }}
        onBlur={e => {
          const relatedTarget = e.relatedTarget || document.activeElement;
          if (!elementContains(e.currentTarget, relatedTarget as EventTarget & HTMLElement)) {
            setActiveDate(null);
          }
        }}
        onMouseDown={() => setMouseMode(true)}
        onKeyDown={() => setMouseMode(false)}
      >
        {!isNoHeader ? <div
          style={{
            width: isTimeRangeControlBar ? undefined : 240,
            height: isTimeRangeControlBar ? 40 : 38,
            backgroundColor: isTimeRangeControlBar ? undefined : colors.white,
            border: isTimeRangeControlBar ? 'none' : `1px solid ${activeDate ? colors.blue : colors.gray300}`,
            borderRadius: 4,
            flexShrink: floating ? 0 : undefined,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isTimeRangeControlBar ? <div style={{height: 20, width: 20, marginRight: 4}}>
            <Icons.Calendar
              color={colors.gray500}
              width={20}
              height={20}
            />&nbsp;
          </div> : null}
          <DateDisplay
            value={startDate}
            active={activeDate === 'startDate'}
            onSelect={(focused: boolean) => setActiveDate(focused ? 'startDate' : null)} />
          <span style={{padding: '0 4px', userSelect: 'none', msUserSelect: 'none', WebkitUserSelect: 'none'}}>—</span>
          <DateDisplay
            value={endDate}
            active={activeDate === 'endDate'}
            onSelect={(focused: boolean) => setActiveDate(focused ? 'endDate' : null)} />
        </div> : null }
        {activeDate ? <div
          style={{
            width: (numberOfMonths === 1 ? 277 : 568) + (commonRanges.length ? 156 : 0),
            backgroundColor: colors.white,
            marginTop: isTimeRangeControlBar ? -1 : 8,
            marginLeft: isTimeRangeControlBar ? 24 : 0,
            border: `1px solid ${colors.gray300}`,
            borderRadius: 4,
            flexShrink: floating ? 0 : undefined,
            display: 'flex',
            boxShadow: `0px 2px 4px ${colors.midnightOpaque10}`,
          }}
        >
          {commonRanges.length ? <div className={styles.commonRangeList}>
            <div style={{
              fontSize: '1.15em',
              fontWeight: 500,
              color: colors.midnightOpaque80,
              marginLeft: 12,
              marginBottom: 8,
            }}>Range</div>
            {commonRanges.map(range => (
              <div
                key={range.id}
                tabIndex={0}
                className={styles.commonRangeItem}
                onClick={() => onSelectCommonRange(range)}
                onKeyDown={e => { if (e.key === 'Enter') { onSelectCommonRange(range); } }}
              >{range.name}</div>
            ))}
          </div> : null}
          <DayPicker
            selectedDays={{from: startValue, to: endValue}}
            modifiers={{
              start: startValue,
              end: endValue,
              disabled: isOutsideRange ? (day: Date) => isOutsideRange(moment(day)) : undefined,
            }}
            numberOfMonths={numberOfMonths || 2}
            initialMonth={activeDate === 'endDate' ? endValue : startValue}
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
                  setActiveDate(autoClose ? null : 'startDate');
                }
              }
            }}
          />
        </div> : null}
      </div>
    }}</DateRangePickerContext.Consumer>
  );
}
