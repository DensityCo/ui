import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import moment from 'moment';

import DashboardReportGrid from './index';

const Report = () => (
  <div style={{height: 150, backgroundColor: '#eee'}}>
    Report goes here
  </div>
);

storiesOf('DashboardReportGrid', module)
  .add('One', () => (
    <DashboardReportGrid
      reports={[
        {
          id: 1,
          report: (
            <Report />
          ),
        },
        {
          id: 2,
          report: (
            <Report />
          ),
        },
        {
          id: 3,
          report: (
            <Report />
          ),
        },
        {
          id: 4,
          report: (
            <Report />
          ),
        },
      ]}
    />
  ))
