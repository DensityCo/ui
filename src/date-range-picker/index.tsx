import React, { useState } from 'react';
import classnames from 'classnames';
import moment, { Moment } from 'moment-timezone';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import styles from './styles.module.scss';
import colors from '../../variables/colors.json';
import { Anchor, DateDisplay, elementContains } from '../date-picker';

enum ActiveDateMode {
  START_DATE_ACTIVE = 'startDate',
  END_DATE_ACTIVE = 'endDate',
}
export type ActiveDate = ActiveDateMode.START_DATE_ACTIVE | ActiveDateMode.END_DATE_ACTIVE | null;

// Legacy exports
export const ANCHOR_LEFT = Anchor.ANCHOR_LEFT,
  ANCHOR_RIGHT = Anchor.ANCHOR_RIGHT,
  START_DATE_ACTIVE = ActiveDateMode.START_DATE_ACTIVE,
  END_DATE_ACTIVE = ActiveDateMode.END_DATE_ACTIVE;

export const DateRangePickerContext = React.createContext<string | null>(null);

export default function DateRangePicker({
  startDate,
  endDate,
  focusedInput,
  anchor,
  commonRanges,
  onChange,
  onFocusChange,
  onSelectCommonRange,
}: {
  startDate: Moment | string | number,
  endDate: Moment | string | number,
  focusedInput: ActiveDate,
  anchor?: Anchor.ANCHOR_LEFT | Anchor.ANCHOR_RIGHT,
  commonRanges?: Array<{ id: any, name: React.ReactNode, label: React.ReactNode }>,
  onChange: Function,
  onFocusChange: (active: ActiveDate) => void,
  onSelectCommonRange?: (range: any) => void,
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
          alignItems: (context === 'SMALL_WIDTH' || anchor === Anchor.ANCHOR_RIGHT) ?
            'flex-end' :
            'flex-start'
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
            active={focusedInput === ActiveDateMode.START_DATE_ACTIVE}
            onSelect={() => onFocusChange(ActiveDateMode.START_DATE_ACTIVE)} />
          <span style={{padding: '0 4px', userSelect: 'none', msUserSelect: 'none', WebkitUserSelect: 'none'}}>—</span>
          <DateDisplay
            value={endDate}
            active={focusedInput === ActiveDateMode.END_DATE_ACTIVE}
            onSelect={() => onFocusChange(ActiveDateMode.END_DATE_ACTIVE)} />
        </div>
        {focusedInput ? <div
          style={{
            marginTop: 10,
            border: `1px solid ${colors.gray300}`,
            borderRadius: 4,
            width: (context === 'SMALL_WIDTH' ? 277 : 557) + (commonRanges ? 176 : 0),
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
            month={startValue}
            numberOfMonths={context === 'SMALL_WIDTH' ? 1 : 2}
            selectedDays={{ from: startValue, to: endValue }}
            modifiers={{start: startValue, end: endValue}}
            onDayClick={day => {
              const focus = moment(day).diff(startDate) < 0 ?
                ActiveDateMode.START_DATE_ACTIVE :
                moment(day).diff(endDate) > 0 ?
                  ActiveDateMode.END_DATE_ACTIVE :
                  focusedInput;
              onChange({
                startDate: focus === ActiveDateMode.START_DATE_ACTIVE ? moment(day) : startDate,
                endDate: focus === ActiveDateMode.END_DATE_ACTIVE ? moment(day) : endDate,
              });
              if (focusedInput !== ActiveDateMode.END_DATE_ACTIVE) {
                onFocusChange(ActiveDateMode.END_DATE_ACTIVE);
              }
            }}
          />
        </div> : null}
      </div>
    )}</DateRangePickerContext.Consumer>
  );
}
