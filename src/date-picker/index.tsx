import React, { useState } from 'react';
import classnames from 'classnames';
import DayPicker from 'react-day-picker';
import Icons from '../icons';

import colors from '../../variables/colors.json';
import styles from './styles.module.scss';
import moment, { Moment } from 'moment-timezone';

export type CompatibleDateValue = Moment | string | number;

export const DatePickerContext = React.createContext<string | null>(null);

// Check if a child element is contained by a parent (for "blur"-ing the whole control)
export function elementContains(parent: EventTarget & HTMLElement, child: EventTarget & HTMLElement) {
  if (!child || !child.parentElement) { return false; }
  if (child.parentElement === parent) { return true; }
  return elementContains(parent, child.parentElement);
}

// Component to render a single focusable date display
export function DateDisplay({value, active, onSelect}: {
  value: CompatibleDateValue,
  active: boolean,
  onSelect: (active: boolean) => void,
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
      onClick={() => onSelect(!active)}
      onKeyDown={e => { if (e.key === 'Enter') { onSelect(!active); }}}
    >
      {moment(value).format('MMM D, YYYY')}
    </div>
  );
}

export default function DatePicker({
  date,
  focused,
  anchor = 'ANCHOR_LEFT',
  floating = true,
  arrowLeftDisabled = false,
  arrowRightDisabled = false,
  numberOfMonths = 1,
  onChange,
  onFocusChange,
  isOutsideRange,
}: {
  date: CompatibleDateValue,
  focused?: boolean,
  anchor?: 'ANCHOR_LEFT' | 'ANCHOR_RIGHT',
  floating?: boolean,
  arrowLeftDisabled?: boolean,
  arrowRightDisabled?: boolean,
  numberOfMonths?: 1 | 2,
  onChange: (date: CompatibleDateValue) => void,
  onFocusChange: (focused: boolean) => void,
  isOutsideRange?: (date: CompatibleDateValue) => boolean,
}) {
  const [mouseMode, setMouseMode] = useState(true);
  const [uncontrolledFocus, setUncontrolledFocus] = useState<boolean>(false);
  const value = moment(date).toDate();

  // Either controlled or uncontrolled "focus" state
  const focus = focused === undefined ? uncontrolledFocus : focused;
  const setFocus = onFocusChange === undefined ? setUncontrolledFocus : onFocusChange;

  function scrubDays(days: number) {
    const newDate = moment(date).clone().add(days, 'days');
    return onChange(newDate);
  }

  return <DatePickerContext.Consumer>{context => (
    <div
      className={classnames(styles.datePicker, {[styles.mouseMode]: mouseMode})}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: anchor === 'ANCHOR_RIGHT' ? 'flex-end' : 'flex-start',
        width: floating ? 194 : undefined,
        height: floating ? 40 : undefined,
      }}
      onBlur={e => {
        const relatedTarget = e.relatedTarget || document.activeElement;
        if (!elementContains(e.currentTarget, relatedTarget as EventTarget & HTMLElement)) {
          setFocus(false);
        }
      }}
      onMouseDown={() => setMouseMode(true)}
      onKeyDown={() => setMouseMode(false)}
    >
      <div
        style={{
          width: 192,
          height: 38,
          backgroundColor: colors.white,
          border: `1px solid ${focused ? colors.blue : colors.gray300}`,
          borderRadius: 4,
          flexShrink: floating ? 0 : undefined,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          tabIndex={0}
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconLeft,
            {[styles.datePickerIconDisabled]: arrowLeftDisabled},
          )}
          role="button"
          onKeyDown={e => e.key === 'Enter' && !arrowLeftDisabled && scrubDays(-1)}
          onClick={() => !arrowLeftDisabled && scrubDays(-1)}
        >
          <Icons.ArrowLeft
            color={arrowLeftDisabled ? colors.gray400 : colors.midnight}
            width={20}
            height={20}
          />
        </div>
        <DateDisplay value={date} active={focus} onSelect={setFocus} />
        <div
          tabIndex={0}
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconRight,
            {[styles.datePickerIconDisabled]: arrowRightDisabled},
          )}
          role="button"
          onKeyDown={e => e.key === 'Enter' && !arrowRightDisabled && scrubDays(1)}
          onClick={() => !arrowRightDisabled && scrubDays(1)}
        >
          <Icons.ArrowRight
            color={arrowRightDisabled ? colors.gray400 : colors.midnight}
            width={20}
            height={20}
          />
        </div>
      </div>
      {focus ? <div
        style={{
          width: numberOfMonths === 2 ? 557 : 277,
          backgroundColor: colors.white,
          marginTop: 8,
          border: `1px solid ${colors.gray300}`,
          borderRadius: 4,
          flexShrink: floating ? 0 : undefined,
          display: 'flex',
          boxShadow: `0px 2px 4px ${colors.midnightOpaque10}`,
        }}
      >
        <DayPicker
          month={value}
          selectedDays={value}
          numberOfMonths={numberOfMonths || 1}
          modifiers={{
            disabled: isOutsideRange ? (day: Date) => isOutsideRange(moment(day)) : undefined,
          }}
          onDayClick={day => {
            if (!isOutsideRange || !isOutsideRange(moment(day))) {
              onChange(moment(day));
              setFocus(false);
            }
          }}
        />
      </div> : null}
    </div>
  )}</DatePickerContext.Consumer>
}
