import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import ReportComparativePerformance, {
  COMPARATIVE_WEEK,
  COMPARATIVE_MONTH,
  COMPARATIVE_QUARTER,
} from './index';

const nowAtSpace = moment.utc();
const unit = moment.duration('1w');

const lastStartDate = moment.utc().startOf(unit).subtract(1, 'week');
const lastEndDate = lastStartDate.clone().endOf(unit);

const previousStartDate = lastStartDate.clone().subtract(1, unit);
const previousEndDate = previousStartDate.clone().endOf(unit);

storiesOf('ReportComparativePerformance', module)
  .addWithInfo('Comparative week', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportComparativePerformance
        title="Comparative Performance Example"
        space={{
          id: 'spc_XXX',
          name: 'My space',
          timeZone: 'America/New_York',
        }}

        mode={COMPARATIVE_WEEK}
        lastStartDate={moment.utc().startOf('week').subtract(1, 'week')}
        lastEndDate={moment.utc().startOf('week').subtract(1, 'week').clone().endOf('week')}
        previousStartDate={moment.utc().startOf('week').subtract(1, 'week').clone().subtract(1, 'week')}
        previousEndDate={moment.utc().startOf('week').subtract(1, 'week').clone().subtract(1, 'week').clone().endOf('week')}


        lastData={{
          totalVisits: 8570,
          averagePeakCount: 233,
          averagePeakTime: moment.duration('17:03:00'),
        }}
        previousData={{
          totalVisits: 10301,
          averagePeakCount: 258,
          averagePeakTime: moment.duration('11:37:00'),
        }}
      />
    </div>
  ))
  .addWithInfo('Comparative month', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportComparativePerformance
        title="Comparative Performance Example"
        space={{
          id: 'spc_XXX',
          name: 'My space',
          timeZone: 'America/New_York',
        }}

        mode={COMPARATIVE_MONTH}
        lastStartDate={moment.utc().startOf('month').subtract(1, 'month')}
        lastEndDate={moment.utc().startOf('month').subtract(1, 'month').clone().endOf('month')}
        previousStartDate={moment.utc().startOf('month').subtract(1, 'month').clone().subtract(1, 'month')}
        previousEndDate={moment.utc().startOf('month').subtract(1, 'month').clone().subtract(1, 'month').clone().endOf('month')}


        lastData={{
          totalVisits: 8570,
          averagePeakCount: 233,
          averagePeakTime: moment.duration('17:03:00'),
        }}
        previousData={{
          totalVisits: 10301,
          averagePeakCount: 258,
          averagePeakTime: moment.duration('11:37:00'),
        }}
      />
    </div>
  ))
  .addWithInfo('Comparative quarter', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportComparativePerformance
        title="Comparative Performance Example"
        space={{
          id: 'spc_XXX',
          name: 'My space',
          timeZone: 'America/New_York',
        }}

        mode={COMPARATIVE_QUARTER}
        lastStartDate={moment.utc().startOf('quarter').subtract(1, 'quarter')}
        lastEndDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().endOf('quarter')}
        previousStartDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().subtract(1, 'quarter')}
        previousEndDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().subtract(1, 'quarter').clone().endOf('quarter')}


        lastData={{
          totalVisits: 8570,
          averagePeakCount: 233,
          averagePeakTime: moment.duration('17:03:00'),
        }}
        previousData={{
          totalVisits: 10301,
          averagePeakCount: 258,
          averagePeakTime: moment.duration('11:37:00'),
        }}
      />
    </div>
  ))
  .addWithInfo('Comparative quarter, with zero percent change', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportComparativePerformance
        title="Comparative Performance Example"
        space={{
          id: 'spc_XXX',
          name: 'My space',
          timeZone: 'America/New_York',
        }}

        mode={COMPARATIVE_QUARTER}
        lastStartDate={moment.utc().startOf('quarter').subtract(1, 'quarter')}
        lastEndDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().endOf('quarter')}
        previousStartDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().subtract(1, 'quarter')}
        previousEndDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().subtract(1, 'quarter').clone().endOf('quarter')}


        lastData={{
          totalVisits: 8570,
          averagePeakCount: 233,
          averagePeakTime: moment.duration('17:03:00'),
        }}
        previousData={{
          totalVisits: 8570,
          averagePeakCount: 233,
          averagePeakTime: moment.duration('11:37:00'),
        }}
      />
    </div>
  ))
  .addWithInfo('Infinity percent', () => (
    <div style={{width: '100%', paddingTop: 100}}>
      <ReportComparativePerformance
        title="Comparative Performance Example"
        space={{
          id: 'spc_XXX',
          name: 'My space',
          timeZone: 'America/New_York',
        }}

        mode={COMPARATIVE_QUARTER}
        lastStartDate={moment.utc().startOf('quarter').subtract(1, 'quarter')}
        lastEndDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().endOf('quarter')}
        previousStartDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().subtract(1, 'quarter')}
        previousEndDate={moment.utc().startOf('quarter').subtract(1, 'quarter').clone().subtract(1, 'quarter').clone().endOf('quarter')}


        lastData={{
          totalVisits: 8570,
          averagePeakCount: 233,
          averagePeakTime: moment.duration('17:03:00'),
        }}
        previousData={{
          totalVisits: 0,
          averagePeakCount: 0,
          averagePeakTime: moment.duration('11:37:00'),
        }}
      />
    </div>
  ))
