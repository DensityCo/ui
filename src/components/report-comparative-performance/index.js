import React from 'react';
import classnames from 'classnames';
import commaNumber from 'comma-number';

import styles from './styles.scss';
import colors from '../../variables/colors';

import { text } from '@density/ui';
import { IconArrowUp, IconArrowDown } from '@density/ui-icons';
import ReportWrapper, { ReportCard, ReportSubHeader } from '@density/ui-report-wrapper';

export const COMPARATIVE_WEEK = 'WEEK',
             COMPARATIVE_MONTH = 'MONTH',
             COMPARATIVE_QUARTER = 'QUARTER';

function getRangeLastUnitValue(mode) {
  switch (mode) {
  case COMPARATIVE_WEEK:
    return 'Last Week';
  case COMPARATIVE_MONTH:
    return 'Last Month';
  case COMPARATIVE_QUARTER:
    return 'Last Quarter';
  default:
    return null;
  }
}
function getRangePreviousUnitValue(mode) {
  switch (mode) {
  case COMPARATIVE_WEEK:
    return 'the previous week';
  case COMPARATIVE_MONTH:
    return 'the previous month';
  case COMPARATIVE_QUARTER:
    return 'the previous quarter';
  default:
    return null;
  }
}
function getRangeName(mode, start, end=null) {
  switch (mode) {
  case COMPARATIVE_WEEK:
    return <span>
      <span className={styles.dateRangeStart}>{start.format('MMM D')} -</span>
      <span className={styles.dateRangeEnd}>{end.format('MMM D')}</span>
    </span>;
  case COMPARATIVE_MONTH:
    return <strong>{start.format('MMMM')}</strong>;
  case COMPARATIVE_QUARTER:
    return <strong>{`Q${start.quarter()}`}</strong>;
  default:
    return null;
  }
}

export default function ReportComparativePerformance({
  title,
  space,
  mode,
  data,
}) {

  if (data.length < 2) {
    throw new Error('Data must be at least 2 periods in length.');
  }

  const getPercentageDifference = index => (
    data[index].totalVisits - data[index - 1].totalVisits
  ) / data[index - 1].totalVisits;

  const lastPercentageDifference = getPercentageDifference(data.length - 1);

  return (
    <ReportWrapper
      title={title}
      spaces={[space.name]}
    >
      <ReportSubHeader
        title={(
          <span>
            <strong>{getRangeLastUnitValue(mode)}</strong> had{' '}
            <strong>{lastPercentageDifference === Infinity ?
              <span>&infin;</span> :
              commaNumber(lastPercentageDifference >= 1 ?
                Math.round(Math.abs(lastPercentageDifference * 100)) :
                Math.round(Math.abs(lastPercentageDifference * 100) * 10) / 10
              )
            }%</strong>{' '}
            {lastPercentageDifference >= 0 ? 'more' : 'fewer'} visits{' '}
            than {getRangePreviousUnitValue(mode)}.
          </span>
        )}
      />
      <ReportCard noPadding>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              {data.map((p, index) => <th className={classnames({
                [styles.tableHighlight]: index % 2 === 0
              })}>
                {getRangeName(mode, p.startDate, p.endDate)}
              </th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Visits</td>
              {data.map((p, index) => {
                const percentageDifference = index > 0 ? getPercentageDifference(index) : null;
                return <td style={{position: 'relative'}} className={classnames('totalVisitsDescriptor', {
                  [styles.tableHighlight]: index % 2 === 0
                })}>
                  <strong>{commaNumber(p.totalVisits)}</strong>
                  {percentageDifference > 0 ? <span className={styles.deltaArrow}>
                    <IconArrowUp height={10} color={colors.reportGreen} />
                  </span> : null}
                  {percentageDifference < 0 ?  <span className={styles.deltaArrow}>
                    <IconArrowDown height={10} color={colors.reportRed} />
                  </span> : null}
                </td>;
              })}
            </tr>
            <tr>
              <td>Busiest Day</td>
              {data.map((p, index) => <td className={classnames({
                [styles.tableHighlight]: index % 2 === 0
              })}>
                {text.toEnglishList(p.busiestDays.map(i => <strong>{i.day}</strong>))}
              </td>)}
            </tr>
            <tr>
              <td>Busiest Hour</td>
              {data.map((p, index) => <td className={classnames({
                [styles.tableHighlight]: index % 2 === 0
              })}>
                {text.toEnglishList(p.busiestHours.map(i => 
                  <span>
                    <span className={styles.peakHourLabel}><strong>{i.hour}</strong></span>{' '}
                    <span className={styles.peakHourDayLabel}>on <strong>{i.day}</strong></span>
                  </span>
                ))}
              </td>)}
            </tr>
          </tbody>
        </table>
      </ReportCard>
    </ReportWrapper>
  );
}
