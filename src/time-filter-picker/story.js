import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment-timezone';

// import './styles.module.scss';
import TimeFilterPicker, { TimeFilterPickerContext } from './index';
import {DayOfWeek} from '@density/lib-common-types';
import colorVariables from '../../variables/colors.json';


storiesOf('TimeFilterPicker', module)
  .add('Default', () => {
    const [startTime, setStartTime] = useState(moment('08:00', 'HH:mm'));
    const [endTime, setEndTime] = useState(moment('17:00', 'HH:mm'));
    const [daysOfWeek, setDaysOfWeek] = useState([DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY]);
    return <TimeFilterPicker
      startTime={startTime}
      endTime={endTime}
      daysOfWeek={daysOfWeek}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      setDaysOfWeek={setDaysOfWeek}
    />
  })
  .add('Overnight', () => {
    const [startTime, setStartTime] = useState(moment('19:00', 'HH:mm'));
    const [endTime, setEndTime] = useState(moment('02:00', 'HH:mm'));
    const [daysOfWeek, setDaysOfWeek] = useState([DayOfWeek.MONDAY]);
    return <TimeFilterPicker
      startTime={startTime}
      endTime={endTime}
      daysOfWeek={daysOfWeek}
      setStartTime={setStartTime}
      setEndTime={setEndTime}
      setDaysOfWeek={setDaysOfWeek}
    />
  })
  .add('Disabled', () => {
    return <TimeFilterPicker
      disabled={true}
      startTime={moment('17:00', 'HH:mm')}
      endTime={moment('08:00', 'HH:mm')}
      daysOfWeek={[DayOfWeek.MONDAY, DayOfWeek.TUESDAY]}
      setStartTime={() => undefined}
      setEndTime={() => undefined}
      setDaysOfWeek={() => undefined}
    />
  })
  .add('With TIME_RANGE_CONTROL_BAR context', () => {
    const [startTime, setStartTime] = useState(moment('08:00', 'HH:mm'));
    const [endTime, setEndTime] = useState(moment('17:00', 'HH:mm'));
    const [daysOfWeek, setDaysOfWeek] = useState([DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY]);
    return <TimeFilterPickerContext.Provider value="TIME_RANGE_CONTROL_BAR">
      <TimeFilterPicker
        startTime={startTime}
        endTime={endTime}
        daysOfWeek={daysOfWeek}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setDaysOfWeek={setDaysOfWeek}
      />
    </TimeFilterPickerContext.Provider>
  })
