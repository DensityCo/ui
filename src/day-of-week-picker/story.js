import React from 'react';
import { storiesOf } from '@storybook/react';

import DayOfWeekPicker, { DayOfWeekPickerContext } from './index';

storiesOf('DayOfWeekPicker', module)
  .add('Default', () => (
    <DayOfWeekPicker
      daysOfWeek={['Monday', 'Tuesday', 'Wednesday']}
      onChange={console.log}
    />
  ))
  .add('Disabled', () => (
    <DayOfWeekPicker
      daysOfWeek={['Monday', 'Tuesday', 'Wednesday']}
      onChange={console.log}
      disabled={true}
    />
  ))
  .add('TIME_FILTER_PICKER context', () => (
    <DayOfWeekPickerContext.Provider value="TIME_FILTER_PICKER">
      <DayOfWeekPicker
        daysOfWeek={['Monday', 'Tuesday', 'Wednesday']}
        onChange={console.log}
        disabled={false}
      />
      <br />
      <DayOfWeekPicker
        daysOfWeek={['Monday', 'Tuesday', 'Wednesday']}
        onChange={console.log}
        disabled={true}
      />
    </DayOfWeekPickerContext.Provider>
  ))
