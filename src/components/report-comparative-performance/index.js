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
    return <span>{start.format('MMM\u00a0D')}{'\u00a0'}- {end.format('MMM\u00a0D')}</span>;
  case COMPARATIVE_MONTH:
    return <span>{start.format('MMM\u00a0\'YY')}</span>;
  case COMPARATIVE_QUARTER:
    return <span>{`Q${start.quarter()} '${start.format('YY')}`}</span>;
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
    throw new Error('Data must contain at least 2 periods.');
  } else if (data.length > 3 && mode !== COMPARATIVE_WEEK) {
    throw new Error('Data cannot contain more than 3 periods except in "Comparative Week" mode.');
  } else if (data.length > 4) {
    throw new Error('Data cannot contain more than 4 periods.');
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
                <strong>{getRangeName(mode, p.startDate, p.endDate)}</strong>
              </th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Total Visits</strong></td>
              {data.map((p, index) => {
                return <td className={classnames('totalVisitsDescriptor', {
                  [styles.tableHighlight]: index % 2 === 0
                })}>
                  <span>{commaNumber(p.totalVisits)}</span>
                </td>;
              })}
            </tr>
            <tr>
              <td><strong>Busiest Day</strong></td>
              {data.map((p, index) => <td className={classnames({
                [styles.tableHighlight]: index % 2 === 0
              })}>
                {p.busiestDays.length === 0 ? '-' : 
                  text.toEnglishList(p.busiestDays.map(i => <span>
                    {data.length > 3 ? i.day.slice(0, 3) : i.day}{mode === COMPARATIVE_WEEK ? '' : 's'}
                  </span>))}
              </td>)}
            </tr>
            <tr>
              <td><strong>Busiest Hour</strong></td>
              {data.map((p, index) => <td className={classnames({
                [styles.tableHighlight]: index % 2 === 0
              })}>
                {p.busiestHours.length === 0 ? '-' : text.toEnglishList(p.busiestHours.map(i => 
                  <span>
                    {data.length > 3 ? i.day.slice(0, 3) : i.day}{mode === COMPARATIVE_WEEK ? '' : 's'}
                    {' '}@{'\u00a0'}{i.hour}
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
