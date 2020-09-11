import React, { useState } from 'react';

import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';

import colorVariables from '../../variables/colors.json';
import InputBox, { ANCHOR_RIGHT, InputBoxContext } from '../input-box';
import DayOfWeekSelector from '../day-of-week-picker';
import { Icons } from '..';

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

function TimePickerInput({value, onChange, disabled, error}) {
  return (
    <InputBox
      width={108}
      value={value}
      onChange={onChange}
      disabled={disabled}
      invalid={error ? 'true' : undefined} />
  );
}

function TimePicker({value, onChange}) {
  return (
    <InputBoxContext.Provider value="COMBO_BOX">
      {/* Renders an InputBox as its input */}
      <KeyboardTimePicker
        mask="__:__ _M"
        placeholder="08:00 AM"
        value={value}
        onChange={onChange}
        TextFieldComponent={TimePickerInput} />
      {/* Renders a SelectBox */}
      <InputBox
        type="select"
        width={40}
        listBoxWidth={148}
        menuMaxHeight={240}
        menu
        anchor={ANCHOR_RIGHT}
        value={{ id: 'caret', label: '' }}
        choices={COMMON_TIMES.map(time => ({ id: time, label: <div style={{width: 114}}>{time}</div> }))}
        onChange={value => onChange(moment(value.id, 'hh:mm A'))}
      />
    </InputBoxContext.Provider>
  );
}

function TimeFilterDisplay({displayTwoDays, shadedStartPercent, shadedWidthPercent, isTomorrow}) {
  return (
    <div style={{
      flex: 1,
      paddingTop: displayTwoDays ? 12 : 24,
      paddingBottom: 56,
      borderRight: (displayTwoDays && !isTomorrow) ? `1px dashed ${colorVariables.gray300}` : undefined,
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
          backgroundColor: isTomorrow ? colorVariables.yellow : colorVariables.blue,
          borderRadius: 4,
        }}></div>
        <div style={{marginTop: 8}}>
          {(displayTwoDays ? isTomorrow ? [0,4,8,12,16,20,24] : [0,4,8,12,16,20] : [0,2,4,6,8,10,12,14,16,18,20,22,24]).map(hours => {
            const tickPercent = hours * 100 / 24;
            return <div key={hours} style={{
              position: 'absolute',
              left: `${tickPercent}%`,
              transform: (isTomorrow && hours === 0) ? undefined : 'translateX(-50%)',
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

function TimeFilterPicker() {
  const [startTimePickerValue, setStartTimePickerValue] = useState(moment('08:00', 'HH:mm'));
  const [endTimePickerValue, setEndTimePickerValue] = useState(moment('17:00', 'HH:mm'));
  const [daysOfWeek, setDaysOfWeek] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  let displayTwoDays = false;
  let endTimeNormalized = endTimePickerValue && endTimePickerValue.clone();
  while (
    endTimeNormalized &&
    endTimeNormalized.diff(startTimePickerValue, 'days') > 0
  ) {
    endTimeNormalized.subtract(1, 'day');
  }
  if (
    endTimeNormalized &&
    endTimeNormalized.diff(startTimePickerValue) <= 0 &&
    endTimeNormalized !== endTimeNormalized.clone().startOf('day')
  ) {
    endTimeNormalized.add(1, 'day');
    displayTwoDays = true;
  }

  // Calculate
  const startOfDay = startTimePickerValue.clone().startOf('day');
  const shadedStartPercent = startTimePickerValue ? 
    startTimePickerValue.diff(startOfDay, 'minutes') * 100 / 1440 : 0;
  const shadedWidthPercent = (startTimePickerValue && endTimeNormalized) ? 
    displayTwoDays ? 
      endTimeNormalized.diff(endTimeNormalized.clone().startOf('day'), 'minutes') * 100 / 1440 :
      endTimeNormalized.diff(startTimePickerValue, 'minutes') * 100 / 1440 : 0;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div style={{
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
      }}>
        <div style={{display: 'flex'}}>
          <TimePicker value={startTimePickerValue} onChange={setStartTimePickerValue} />
          <div style={{lineHeight: '40px', padding: '0px 16px'}}>to</div>
          <TimePicker value={endTimeNormalized} onChange={setEndTimePickerValue} />
          <div style={{flex:1}}></div>
          <div style={{height: 40, display: 'flex', alignItems: 'center'}}>
            <DayOfWeekSelector daysOfWeek={daysOfWeek} onChange={setDaysOfWeek} />
          </div>
        </div>
        <div style={{
          width: 'calc(100% + 48px)',
          height: 1,
          backgroundColor: colorVariables.gray300,
          marginTop: 16,
          marginLeft: -24,
          marginRight: -24,
        }}></div>
        <div style={{display: 'flex'}}>
          <TimeFilterDisplay
            displayTwoDays={displayTwoDays}
            shadedStartPercent={shadedStartPercent}
            shadedWidthPercent={displayTwoDays ? 100 - shadedStartPercent : shadedWidthPercent}
            isTomorrow={false} />
          {displayTwoDays ? <TimeFilterDisplay
            displayTwoDays={displayTwoDays}
            shadedStartPercent={0}
            shadedWidthPercent={shadedWidthPercent}
            isTomorrow={true} /> : null}
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default TimeFilterPicker;
