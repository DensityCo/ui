import React from 'react';
import { storiesOf } from '@storybook/react';

import DayOfWeekPicker from './index';

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
