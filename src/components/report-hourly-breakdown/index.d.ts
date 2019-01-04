import {Moment} from 'moment';
import React from 'react';

export declare type ReportHourlyBreakdownProps = {
  title: string;
  startDate: Moment;
  endDate: Moment;
  space: {
    name: string;
  };

  data: [{
    date: Moment;
    values: [number];
  }];

  maxDay: null | string;
  maxHour: number;
  maxValue: number;
  metric?: 'VISITS' | 'PEAKS';
  aggregation?: 'NONE' | 'AVERAGE';

  displayContext?: {
    showExpandControl: boolean;
    onReportExpand?: () => any;

    dataStartTime: Moment;
    dataEndTime: Moment;
  };
};
