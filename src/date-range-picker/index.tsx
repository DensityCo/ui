import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import classnames from 'classnames';
import moment, { Moment } from 'moment';

import styles from './styles.module.scss';
import colors from '../../variables/colors.json';

export const ANCHOR_RIGHT = 'ANCHOR_RIGHT',
  ANCHOR_LEFT = 'ANCHOR_LEFT',
  START_DATE_ACTIVE = 'startDate',
  END_DATE_ACTIVE = 'endDate';

export const DateRangePickerContext = React.createContext<string | null>(null);

function DateDisplay({value, active, onSelect}: {
  value: Moment | string | number,
  active: boolean,
  onSelect: () => void,
}) {
  return (
    <div
      tabIndex={0}
      style={{
        width: 86,
        fontSize: 14,
        borderRadius: 2,
        cursor: 'pointer',
        fontWeight: 'bold',
        padding: '3px 7px',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        userSelect: 'none',
        msUserSelect: 'none',
        WebkitUserSelect: 'none',
        border: `1px solid ${active ? colors.blueLight : colors.gray300}`,
        backgroundColor: active ? colors.blueLight : colors.gray300,
        color: active ? colors.blue : colors.midnight,
      }}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter') { onSelect(); }}}
    >
      {moment(value).format('MMM D, YYYY')}
    </div>
  );
}

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
  focusedInput: 'startDate' | 'endDate' | null,
  anchor?: 'ANCHOR_RIGHT' | 'ANCHOR_LEFT' | null,
  commonRanges?: Array<{ id: any, name: React.ReactNode, label: React.ReactNode }>,
  onChange: Function,
  onFocusChange: (active: 'startDate' | 'endDate' | null) => void,
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
          alignItems: (context === 'SMALL_WIDTH' || anchor === 'ANCHOR_RIGHT') ? 'flex-end' : 'flex-start'
        }}
        onBlur={e => {
          function contains(parent: EventTarget & HTMLElement, child: EventTarget & HTMLElement) {
            if (!child || !child.parentElement) { return false; }
            if (child.parentElement === parent) { return true; }
            return contains(parent, child.parentElement);
          }
          if (!contains(e.currentTarget, e.relatedTarget as EventTarget & HTMLElement)) {
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
          <DateDisplay value={startDate} active={focusedInput === 'startDate'} onSelect={() => onFocusChange('startDate')} />
          <span style={{padding: '0 4px', userSelect: 'none', msUserSelect: 'none', WebkitUserSelect: 'none'}}>—</span>
          <DateDisplay value={endDate} active={focusedInput === 'endDate'} onSelect={() => onFocusChange('endDate')} />
        </div>
        {focusedInput ? <div
          tabIndex={-1}
          style={{
            marginTop: 10,
            border: `1px solid ${colors.gray300}`,
            borderRadius: 4,
            width: (context === 'SMALL_WIDTH' ? 277 : 557) + (commonRanges ? 176 : 0),
            display: 'flex',
          }}
        >
          <div className={styles.commonRangeList}>
            {commonRanges.map(range => (
              <div
                className={styles.commonRangeItem}
                tabIndex={0}
                onClick={() => onSelectCommonRange(range)}
                onKeyDown={e => { if (e.key === 'Enter') { onSelectCommonRange(range); } }}
              >{range.name}</div>
            ))}
          </div>
          <DayPicker
            className="Selectable"
            numberOfMonths={context === 'SMALL_WIDTH' ? 1 : 2}
            selectedDays={{ from: startValue, to: endValue }}
            modifiers={{start: startValue, end: endValue}}
            onDayClick={day => {
              const focus = moment(day).diff(startDate) < 0 ?
                'startDate' :
                moment(day).diff(endDate) > 0 ?
                  'endDate' :
                  focusedInput;
              onChange({
                startDate: focus === 'startDate' ? moment(day) : startDate,
                endDate: focus === 'endDate' ? moment(day) : endDate,
              });
              if (focusedInput !== 'endDate') { onFocusChange('endDate'); }
            }}
          />
        </div> : null}
      </div>
    )}</DateRangePickerContext.Consumer>
  );
}
