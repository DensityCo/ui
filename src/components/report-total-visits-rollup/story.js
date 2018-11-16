import React from 'react';
import { storiesOf } from '@storybook/react';

import moment from 'moment';
import ReportTotalVisitsRollup, { MOST_VISITED, LEAST_VISITED } from './index';

storiesOf('ReportTotalVisitsRollup', module)
  .addWithInfo('With most visited sorting', () => (
    <ReportTotalVisitsRollup
      title="Most visited spaces"
      segmentName="lunch"
      startDate={moment('2018-03-14T00:00:00-04:00')}
      endDate={moment('2018-03-20T00:00:00-04:00')}
      mode={MOST_VISITED}
      counts={[
        {id: 0, name: "Main campus eatery", count: 150},
        {id: 1, name: "My street cafe", count: 100},
        {id: 2, name: "4th floor cafeteria", count: 130},
        {id: 3, name: "18. War St Fish", count: 105},
        {id: 4, name: "Hipster Cafe", count: 199},
        {id: 5, name: "123 S. Olive Cafeteria", count: 96},
        {id: 6, name: "456 E. Rutherford Cafeteria", count: 166},
        {id: 7, name: "SHOULD BE NOT INCLUDED WHEN NOT EXPANDED", count: 80},
        {id: 8, name: "SHOULD ALSO NOT BE INCLUDED WHEN NOT ON DETAILS PAGE", count: 79},
      ]}
    />
  ))
  .addWithInfo('With least visited sorting', () => (
    <ReportTotalVisitsRollup
      title="Least utilized spaces"
      segmentName="dinner"
      startDate={moment('2018-03-14T00:00:00-04:00')}
      endDate={moment('2018-03-20T00:00:00-04:00')}
      mode={LEAST_VISITED}
      counts={[
        {id: 0, name: "THIS SPACE SHOULD NOT BE SHOWN", count: 9999},
        {id: 1, name: "THIS SPACE SHOULD NOT BE SHOWN", count: 1000},
        {id: 2, name: "Main campus eatery", count: 545},
        {id: 3, name: "My street cafe", count: 520},
        {id: 4, name: "4th floor cafeteria", count: 440},
        {id: 5, name: "18. War St Fish", count: 407},
        {id: 6, name: "Hipster Cafe", count: 386},
        {id: 7, name: "123 S. Olive Cafeteria", count: 316},
        {id: 8, name: "456 E. Rutherford Cafeteria", count: 59},
      ]}
    />
  ))
