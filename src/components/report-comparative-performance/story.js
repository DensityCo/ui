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
        data={[{"totalVisits":7814,"busiestDays":[{"day":"Tuesday","entrances":1886}],"busiestHours":[{"day":"Wednesday","hour":"12pm","entrances":520}],"startDate":moment("2018-12-09T08:00:00.000Z"),"endDate":moment("2018-12-16T07:59:59.999Z")},{"totalVisits":6423,"busiestDays":[{"day":"Thursday","entrances":1526}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":515}],"startDate":moment("2018-12-16T08:00:00.000Z"),"endDate":moment("2018-12-23T07:59:59.999Z")},{"totalVisits":266,"busiestDays":[{"day":"Wednesday","entrances":74}],"busiestHours":[{"day":"Thursday","hour":"9am","entrances":32}],"startDate":moment("2018-12-23T08:00:00.000Z"),"endDate":moment("2018-12-30T07:59:59.999Z")},{"totalVisits":3605,"busiestDays":[{"day":"Thursday","entrances":1289}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":452}],"startDate":moment("2018-12-30T08:00:00.000Z"),"endDate":moment("2019-01-06T07:59:59.999Z")}]}
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
        data={[{"totalVisits":30280,"busiestDays":[{"day":"Tuesday","entrances":7968}],"busiestHours":[{"day":"Tuesday","hour":"12pm","entrances":2589}],"startDate":moment("2018-10-01T07:00:00.000Z"),"endDate":moment("2018-11-01T06:59:59.999Z")},{"totalVisits":28230,"busiestDays":[{"day":"Tuesday","entrances":6875}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":2001}],"startDate":moment("2018-11-01T07:00:00.000Z"),"endDate":moment("2018-12-01T07:59:59.999Z")},{"totalVisits":20432,"busiestDays":[{"day":"Wednesday","entrances":4682}],"busiestHours":[{"day":"Wednesday","hour":"12pm","entrances":1519}],"startDate":moment("2018-12-01T08:00:00.000Z"),"endDate":moment("2019-01-01T07:59:59.999Z")}]}
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
        data={[{"totalVisits":205980,"busiestDays":[{"day":"Thursday","entrances":43988}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":9672}],"startDate":moment("2018-04-01T07:00:00.000Z"),"endDate":moment("2018-07-01T06:59:59.999Z")},{"totalVisits":209891,"busiestDays":[{"day":"Thursday","entrances":44240}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":10002}],"startDate":moment("2018-07-01T07:00:00.000Z"),"endDate":moment("2018-10-01T06:59:59.999Z")},{"totalVisits":200032,"busiestDays":[{"day":"Tuesday","entrances":42977}],"busiestHours":[{"day":"Monday","hour":"12pm","entrances":9112}],"startDate":moment("2018-10-01T07:00:00.000Z"),"endDate":moment("2019-01-01T07:59:59.999Z")}]}
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
        data={[{"totalVisits":205980,"busiestDays":[{"day":"Thursday","entrances":43988}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":9672}],"startDate":moment("2018-04-01T07:00:00.000Z"),"endDate":moment("2018-07-01T06:59:59.999Z")},{"totalVisits":209891,"busiestDays":[{"day":"Thursday","entrances":44240}],"busiestHours":[{"day":"Thursday","hour":"12pm","entrances":10002}],"startDate":moment("2018-07-01T07:00:00.000Z"),"endDate":moment("2018-10-01T06:59:59.999Z")},{"totalVisits":209891,"busiestDays":[{"day":"Tuesday","entrances":44231}],"busiestHours":[{"day":"Monday","hour":"12pm","entrances":10111}],"startDate":moment("2018-10-01T07:00:00.000Z"),"endDate":moment("2019-01-01T07:59:59.999Z")}]}
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
        data={[{"totalVisits":0,"busiestDays":[],"busiestHours":[],"startDate":moment("2018-04-01T07:00:00.000Z"),"endDate":moment("2018-07-01T06:59:59.999Z")},{"totalVisits":0,"busiestDays":[],"busiestHours":[],"startDate":moment("2018-07-01T07:00:00.000Z"),"endDate":moment("2018-10-01T06:59:59.999Z")},{"totalVisits":209891,"busiestDays":[{"day":"Tuesday","entrances":44231}],"busiestHours":[{"day":"Monday","hour":"12pm","entrances":10111}],"startDate":moment("2018-10-01T07:00:00.000Z"),"endDate":moment("2019-01-01T07:59:59.999Z")}]}
      />
    </div>
  ))
