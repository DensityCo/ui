import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import moment from 'moment';

import ReportNextWeekForecast from './index';

storiesOf('ReportNextWeekForecast', module)
  .addWithInfo('Default view', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportNextWeekForecast
        title="Next week's visits"
        startDate={moment("2018-03-14T00:00:00-04:00")}
        endDate={moment("2018-03-18T00:00:00-04:00")}
        spaces={["Cafe Bruno"]}
        busiestDays={[ moment("2018-03-18T00:00:00-04:00") ]}
        predictiveBasisDuration={moment.duration(3, 'months')}
        forecast={[
          {
            "timestamp": "2018-11-06T19:00:00Z",
            "visits": 30,
            "high": 38,
            "low": 22,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-07T19:00:00Z",
            "visits": 50,
            "high": 51,
            "low": 48,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-08T19:00:00Z",
            "visits": 10,
            "high": 18,
            "low": 6,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-09T19:00:00Z",
            "visits": 35,
            "high": 43,
            "low": 31,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-10T19:00:00Z",
            "visits": 40,
            "high": 48,
            "low": 36,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-11T19:00:00Z",
            "visits": 10,
            "high": 18,
            "low": 6,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-12T19:00:00Z",
            "visits": 20,
            "high": 28,
            "low": 16,
            "stdDev": 2.23,
          },
        ]}
      />
    </div>
  ))
  .addWithInfo('With multiple busiest days', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportNextWeekForecast
        title="Next week's visits"
        startDate={moment("2018-03-14T00:00:00-04:00")}
        endDate={moment("2018-03-18T00:00:00-04:00")}
        spaces={["Cafe Bruno"]}
        busiestDays={[
          moment("2018-03-17T00:00:00-04:00"),
          moment("2018-03-18T00:00:00-04:00"),
          moment("2018-03-15T00:00:00-04:00")
        ]}
        predictiveBasisDuration={moment.duration(3, 'months')}
        forecast={[
          {
            "timestamp": "2018-11-06T19:00:00Z",
            "visits": 30,
            "high": 38,
            "low": 26,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-07T19:00:00Z",
            "visits": 50,
            "high": 58,
            "low": 46,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-08T19:00:00Z",
            "visits": 100,
            "high": 108,
            "low": 96,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-09T19:00:00Z",
            "visits": 40,
            "high": 48,
            "low": 36,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-10T19:00:00Z",
            "visits": 40,
            "high": 48,
            "low": 36,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-11T19:00:00Z",
            "visits": 35,
            "high": 43,
            "low": 31,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-12T19:00:00Z",
            "visits": 20,
            "high": 28,
            "low": 16,
            "stdDev": 2.23,
          },
        ]}
      />
    </div>
  ))
  .addWithInfo('With predictions happening on less than 3 months of data', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportNextWeekForecast
        title="Next week's visits"
        startDate={moment("2018-03-14T00:00:00-04:00")}
        endDate={moment("2018-03-18T00:00:00-04:00")}
        spaces={["Cafe Bruno"]}
        busiestDays={[
          moment("2018-03-17T00:00:00-04:00"),
          moment("2018-03-18T00:00:00-04:00"),
        ]}
        predictiveBasisDuration={moment.duration(2, 'weeks')}
        forecast={[
          {
            "timestamp": "2018-11-06T19:00:00Z",
            "visits": 30,
            "high": 38,
            "low": 26,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-07T19:00:00Z",
            "visits": 50,
            "high": 58,
            "low": 46,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-08T19:00:00Z",
            "visits": 100,
            "high": 108,
            "low": 96,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-09T19:00:00Z",
            "visits": 40,
            "high": 48,
            "low": 36,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-10T19:00:00Z",
            "visits": 40,
            "high": 48,
            "low": 36,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-11T19:00:00Z",
            "visits": 35,
            "high": 43,
            "low": 31,
            "stdDev": 2.23,
          },
          {
            "timestamp": "2018-11-12T19:00:00Z",
            "visits": 20,
            "high": 28,
            "low": 16,
            "stdDev": 2.23,
          },
        ]}
      />
    </div>
  ))
