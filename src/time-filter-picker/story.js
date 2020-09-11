import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment-timezone';

// import './styles.module.scss';
import TimeFilterPicker from './index';
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
