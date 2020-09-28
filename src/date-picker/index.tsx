import React, { useState } from 'react';
import classnames from 'classnames';
import DayPicker from 'react-day-picker';
import Icons from '../icons';

import colors from '../../variables/colors.json';
import styles from './styles.module.scss';
import moment, { Moment } from 'moment-timezone';

export enum Anchor {
  ANCHOR_LEFT = 'ANCHOR_LEFT',
  ANCHOR_RIGHT = 'ANCHOR_RIGHT',
}

// Legacy exports
export const ANCHOR_RIGHT = Anchor.ANCHOR_LEFT,
  ANCHOR_LEFT = Anchor.ANCHOR_RIGHT;

export const DatePickerContext = React.createContext<string | null>(null);

// Check if a child element is contained by a parent (for "blur"-ing the whole control)
export function elementContains(parent: EventTarget & HTMLElement, child: EventTarget & HTMLElement) {
  if (!child || !child.parentElement) { return false; }
  if (child.parentElement === parent) { return true; }
  return elementContains(parent, child.parentElement);
}

// Component to render a single focusable date display
export function DateDisplay({value, active, onSelect}: {
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

export default function DatePicker({
  date,
  focused,
  anchor,
  arrowLeftDisabled,
  arrowRightDisabled,
  onChange,
  onFocusChange,
}: {
  date: Moment | string | number,
  focused: boolean,
  anchor?: Anchor,
  arrowLeftDisabled?: boolean,
  arrowRightDisabled?: boolean,
  onChange: (date: Moment | string | number) => void,
  onFocusChange: ({focused}: {focused: boolean}) => void,
}) {
  const [mouseMode, setMouseMode] = useState(true);

  return <DatePickerContext.Consumer>{context => (
    <div
      className={classnames(styles.datePicker, {[styles.mouseMode]: mouseMode})}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: anchor === Anchor.ANCHOR_RIGHT ? 'flex-end' : 'flex-start'
      }}
      onBlur={e => {
        if (!elementContains(e.currentTarget, e.relatedTarget as EventTarget & HTMLElement)) {
          onFocusChange({focused: false});
        }
      }}
      onMouseDown={() => setMouseMode(true)}
      onKeyDown={() => setMouseMode(false)}
    >
      <div
        style={{
          width: 192,
          height: 40,
          border: `1px solid ${focused ? colors.blue : colors.gray300}`,
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconLeft,
            {[styles.datePickerIconDisabled]: arrowLeftDisabled},
          )}
          role="button"
          onClick={() => {
            if (!arrowLeftDisabled) {
              const yesterday = moment(date).clone().subtract(1, 'day');
              return onChange(yesterday);
            }
          }}
        >
          <Icons.ArrowLeft
            color={arrowLeftDisabled ? colors.gray400 : colors.midnight}
            width={20}
            height={20}
          />
        </div>
        <DateDisplay value={date} active={focused} onSelect={() => onFocusChange({focused: true})} />
        <div
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconRight,
            {[styles.datePickerIconDisabled]: arrowRightDisabled},
          )}
          role="button"
          onClick={() => {
            if (!arrowRightDisabled) {
              const tomorrow = moment(date).clone().add(1, 'day');
              return onChange(tomorrow);
            }
          }}
        >
          <Icons.ArrowRight
            color={arrowRightDisabled ? colors.gray400 : colors.midnight}
            width={20}
            height={20}
          />
        </div>
      </div>
      {focused ? <div
        style={{
          marginTop: 10,
          border: `1px solid ${colors.gray300}`,
          borderRadius: 4,
          width: 277,
          display: 'flex',
        }}
      >
        <DayPicker
          className="Selectable"
          month={moment(date).toDate()}
          selectedDays={moment(date).toDate()}
          onDayClick={day => {
            onChange(moment(day));
            onFocusChange({focused: false});
          }}
        />
      </div> : null}
    </div>
  )}</DatePickerContext.Consumer>
}
