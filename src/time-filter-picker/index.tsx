import React, { useState, useEffect, useRef } from 'react';

import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { DayOfWeek } from '@density/lib-common-types';

import colorVariables from '../../variables/colors.json';
import DayOfWeekPicker, { DayOfWeekPickerContext } from '../day-of-week-picker';
import InputBox from '../input-box';

import styles from './styles.module.scss';
import { elementContains } from '../date-picker';

const COMMON_TIMES = [
  '12:00 AM',
  '01:00 AM',
  '02:00 AM',
  '03:00 AM',
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '11:00 PM',
]

function TimePickerInput({value, onBlur, onChange, disabled, error}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const ref = useRef<HTMLInputElement>();
  useEffect(() => setTempValue(value), [value]);
  return <div
    style={{zIndex: 1, height: 40}}
    onFocus={() => setDropdownOpen(true)}
    onBlur={e => {
      const relatedTarget = e.relatedTarget || document.activeElement;
      if (!elementContains(e.currentTarget, relatedTarget as EventTarget & HTMLElement)) {
        const newValue = moment(tempValue, 'hh:mm A').toISOString() ||
          moment('12:00 AM', 'hh:mm A').toISOString();
        setTempValue(moment(newValue).format('hh:mm A'));
        onBlur(moment(newValue));
        setDropdownOpen(false);
      }
    }}
  >
    <InputBox
      ref={ref}
      width={110}
      value={tempValue}
      onChange={event => setTempValue(event.target.value)}
      onKeyDown={e => {
        console.log(e.key);
        if (e.key === 'Enter') {
          onChange(e);
          setDropdownOpen(false);
        } else if (e.key === 'Tab') {
          setDropdownOpen(true);
        } else if (e.key === ':') {
          const value = e.target.value;
          if (value.length === 1 && parseInt(value, 10).toString() === value) {
            e.target.value = '0' + value;
          }
        }
      }}
      disabled={disabled}
      invalid={error ? 'true' : undefined} />
    {dropdownOpen ? <div className={styles.commonTimeMenu}>
      {COMMON_TIMES.map(time => {
        function select() {
          setTempValue(time);
          onBlur(moment(time, 'hh:mm A'));
          setDropdownOpen(false);
          ref.current?.blur();
        }
        return <div
          key={time}
          tabIndex={0}
          className={styles.commonTimeMenuItem}
          onKeyDown={e => e.key === 'Enter' && select()}
          onClick={select}
        >{time}</div>
      })}
    </div> : null}
  </div>;
}

function TimePicker({value, onChange, disabled}) {
  return (
    <KeyboardTimePicker
      mask="__:__ _M"
      placeholder="08:00 AM"
      value={value}
      onBlur={onChange}
      onChange={value => onChange(value || moment('12:00 AM', 'hh:mm A'))}
      disabled={disabled}
      TextFieldComponent={TimePickerInput} />
  );
}

function TimeFilterDisplay({displayTwoDays, shadedStartPercent, shadedWidthPercent, isTomorrow, disabled}) {
  return (
    <div style={{
      flex: 1,
      paddingTop: displayTwoDays ? 12 : 24,
      paddingBottom: 32,
      borderRight: (displayTwoDays && !isTomorrow) ? `1px dashed ${colorVariables.gray200}` : undefined,
    }}>
      {displayTwoDays ? <div style={{
          display: 'flex',
          color: colorVariables.gray400,
          fontSize: 11,
          fontWeight: 500,
          marginBottom: 16,
        }}>
          {isTomorrow ? <div style={{flex: 1, marginLeft: 12}}>TOMORROW</div> : <div style={{flex: 1}}>TODAY</div>}
        </div> : null}
      <div style={{position: 'relative'}}>
        <div style={{
          width: '100%',
          height: 5,
          backgroundColor: colorVariables.gray300,
          borderTopLeftRadius: displayTwoDays ? isTomorrow ? 0 : 3 : 3,
          borderBottomLeftRadius: displayTwoDays ? isTomorrow ? 0 : 3 : 3,
          borderTopRightRadius: displayTwoDays ? isTomorrow ? 3 : 0 : 3,
          borderBottomRightRadius: displayTwoDays ? isTomorrow ? 3 : 0 : 3,
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          height: 5,
          left: `${shadedStartPercent}%`,
          width: `${isNaN(shadedWidthPercent) ? 0 : shadedWidthPercent}%`,
          backgroundColor: disabled ? colorVariables.gray400 : isTomorrow ? colorVariables.yellow : colorVariables.blue,
          borderTopLeftRadius: displayTwoDays ? isTomorrow ? 0 : 3 : 3,
          borderBottomLeftRadius: displayTwoDays ? isTomorrow ? 0 : 3 : 3,
          borderTopRightRadius: displayTwoDays ? isTomorrow ? 3 : 0 : 3,
          borderBottomRightRadius: displayTwoDays ? isTomorrow ? 3 : 0 : 3,
        }}></div>
        <div style={{marginTop: 8}}>
          {(displayTwoDays ? isTomorrow ? [0,4,8,12,16,20,24] : [0,4,8,12,16,20] : [0,2,4,6,8,10,12,14,16,18,20,22,24]).map(hours => {
            const tickPercent = hours * 100 / 24;
            return <div key={hours} style={{
              position: 'absolute',
              left: `${tickPercent}%`,
              transform: hours === 0 ? undefined : `translateX(${hours === 24 ? '-100%' : '-50%'})`,
              fontSize: 12,
              fontWeight: 500,
              color: (tickPercent >= shadedStartPercent && tickPercent <= shadedStartPercent + shadedWidthPercent) ?
                colorVariables.gray400 :
                colorVariables.gray200
            }}>{moment().startOf('day').add(hours, 'hours').format('ha').slice(0, -1)}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * @param startTime       A moment instance that represents the start time-of-day, in the user's local tz, e.g. the return value of moment()
 * @param endTime         A moment instance that represents the end time-of-day
 * @param daysOfWeek      The days of the week that this segment should apply to
 * @param setStartTime    Setter function for the start time-of-day, that accepts a moment in the user's local tz
 * @param setEndTime      Setter function for the end time-of-day
 * @param setDaysOfWeek   Setter function for the days-of-week array
 * @param disabled        If true, disable the whole picker
 */
export default function TimeFilterPicker({
  startTime,
  endTime,
  daysOfWeek,
  setStartTime,
  setEndTime,
  setDaysOfWeek,
  disabled = false,
}: {
  startTime: moment.Moment,
  endTime: moment.Moment,
  daysOfWeek: Array<DayOfWeek>,
  setStartTime: (value: moment.Moment) => void,
  setEndTime: (value: moment.Moment) => void,
  setDaysOfWeek: (value: Array<DayOfWeek>) => void,
  disabled?: boolean,
}) {
  let displayTwoDays = false;
  let endTimeNormalized = endTime && endTime.clone();
  while (endTimeNormalized && endTimeNormalized.diff(startTime, 'days') > 0) {
    endTimeNormalized.subtract(1, 'day');
  }
  if (endTimeNormalized && endTimeNormalized.diff(startTime) <= 0) {
    endTimeNormalized.add(1, 'day');
    if (endTimeNormalized.diff(endTimeNormalized.clone().startOf('day')) !== 0) {
      displayTwoDays = true;
    }
  }

  // Calculate
  const startOfDay = startTime.clone().startOf('day');
  const shadedStartPercent = startTime ? 
    startTime.diff(startOfDay, 'minutes') * 100 / 1440 : 0;
  const shadedWidthPercent = (startTime && endTimeNormalized) ? 
    displayTwoDays ? 
      endTimeNormalized.diff(endTimeNormalized.clone().startOf('day'), 'minutes') * 100 / 1440 :
      endTimeNormalized.diff(startTime, 'minutes') * 100 / 1440 : 0;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <div style={{
          display: 'flex',
          paddingBottom: 24,
          borderBottom: `1px dashed ${colorVariables.gray200}`
        }}>
          <TimePicker disabled={disabled} value={startTime} onChange={setStartTime} />
          <div style={{lineHeight: '40px', padding: '0px 16px'}}>to</div>
          <TimePicker disabled={disabled} value={endTimeNormalized} onChange={setEndTime} />
          <div style={{flex:1}}></div>
          <div style={{height: 40, display: 'flex', alignItems: 'center'}}>
            <DayOfWeekPickerContext.Provider value="TIME_FILTER_PICKER">
              <DayOfWeekPicker disabled={disabled} daysOfWeek={daysOfWeek} onChange={setDaysOfWeek} />
            </DayOfWeekPickerContext.Provider>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <TimeFilterDisplay
            displayTwoDays={displayTwoDays}
            shadedStartPercent={shadedStartPercent}
            shadedWidthPercent={displayTwoDays ? 100 - shadedStartPercent : shadedWidthPercent}
            isTomorrow={false}
            disabled={disabled} />
          {displayTwoDays ? <TimeFilterDisplay
            displayTwoDays={displayTwoDays}
            shadedStartPercent={0}
            shadedWidthPercent={shadedWidthPercent}
            isTomorrow={true}
            disabled={disabled} /> : null}
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}
