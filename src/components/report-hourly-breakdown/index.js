import moment from 'moment';
import React from 'react';
import propTypes from 'prop-types';
import ReportWrapper, { ReportCard, ReportSubHeader, ReportExpandController } from '@density/ui-report-wrapper';
import styles from './styles.scss';
import colorVariables from '@density/ui/variables/colors.json';
import { addAlphaToHex } from '../../helpers/color';

export default function ReportHourlyBreakdown({
  title,
  startDate,
  endDate,
  space,

  data,
  metric = 'VISITS',
  aggregation = 'NONE',

  cellColorThreshold,

  displayContext: {
    showExpandControl,
    onReportExpand,

    dataStartTime,
    dataEndTime,
  },
}) {

  // calculate max values
  let maxValue = 0;
  let maxValues = [];
  data.forEach(({date, values}) => {
    values.forEach((value, index) => {
      if (value > maxValue) {
        maxValue = value;
        maxValues = [{
          day: date.format('dddd'),
          hour: index,
          value: value
        }];
      } else if (value === maxValue) {
        maxValues.push({
          day: date.format('dddd'),
          hour: index,
          value: value
        })
      }
    })
  });

  return (
    <ReportWrapper
      title={title}
      startDate={startDate}
      endDate={endDate}
      spaces={[space.name]}
    >
      <ReportSubHeader
        title={(
          maxValue === 0 ?
            <span><strong>No events</strong> for this time range.</span> : 
            maxValues.map(({day, hour, value}) => {
              // Prepare labels for max start/end times
              // Doesn't need to be in the space's tz because it's just for rendering a number of hours
              let maxTimeStart = moment().startOf('day').add(hour, 'hour');
              let maxTimeEnd = moment(maxTimeStart).add(1, 'hour');
              maxTimeEnd = maxTimeEnd.format('ha');
              maxTimeStart = maxTimeStart.format('ha');

              // Remove 'am'/'pm' from start hour ONLY if both are the same
              if (maxTimeStart.endsWith(maxTimeEnd.slice(-2))) {
                maxTimeStart = maxTimeStart.slice(0, -2);
              }
              return <span key={`${day}-${hour}`}>
              <strong>{day}</strong> from {' '}
              <strong>{maxTimeStart}</strong>-<strong>{maxTimeEnd}</strong> had{' '}
              {aggregation === 'AVERAGE' ? 
                (metric === 'PEAKS' ? 'an average peak count of ': 'an average of ') :
                (metric === 'PEAKS' ? 'a peak count of ' : '')}
              <strong>{value}</strong>{metric === 'VISITS' ? ' visits. ' : '. '}
            </span>})
        )}
      />
      <ReportCard>
        <table className={styles.reportHourlyBreakdown}>
          <thead>
            <tr>
              <th> {/* always empty */} </th>
              {data.map(i => (
                <th key={i.date.format()}>
                  <span className={styles.headerLineOne}>{i.date.format('ddd')}</span>
                  {aggregation === 'NONE' ? 
                    <span className={styles.headerLineTwo}>{i.date.format('M/DD')}</span> : 
                    null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(() => {
              const rows = [];
              for (let index = 0; index < Math.max.apply(Math, data.map(d => d.values.length)); index++) {
                // Add the row number we are at to the start of the day to figure out the current
                // "hour" for this row.
                const rowTime = dataStartTime.clone().startOf('day').add(index, 'hours');

                // If the given row isn't within the time range specified
                // (ie, dateStartTime <= rowTime <= dateEndTime is not true), then don't render it
                // and move on to the next row.
                if (rowTime.isBefore(dataStartTime) || rowTime.isAfter(dataEndTime)) {
                  continue;
                }

                rows.push(
                  <tr key={index}>
                    <td>
                      {rowTime.hours() % 2 === 0 ? rowTime.format('ha').slice(0, -1) : null}
                    </td>
                    {data.map(d => (
                      <td
                        key={d.date.format()}
                        style={{
                          backgroundColor: addAlphaToHex(
                            colorVariables.brandPrimaryNew,
                            0.1 + ((d.values[index] / maxValue) * 0.9)
                          ),
                          color: (d.values[index] / maxValue) < cellColorThreshold ? colorVariables.brandPrimaryNew : '#fff',
                        }}
                      >
                        {d.values[index]}
                      </td>
                    ))}
                  </tr>
                );
              }
              return rows;
            })()}
          </tbody>
        </table>
      </ReportCard>
      { showExpandControl ? <ReportExpandController onClick={onReportExpand} /> : null }
    </ReportWrapper>
  );
}
ReportHourlyBreakdown.propTypes = {
  title: propTypes.string.isRequired,
  startDate: propTypes.instanceOf(moment).isRequired,
  endDate: propTypes.instanceOf(moment).isRequired,
  space: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,

  data: propTypes.arrayOf(
    propTypes.shape({
      date: propTypes.instanceOf(moment).isRequired,
      values: propTypes.arrayOf(propTypes.number.isRequired).isRequired,
    }),
  ).isRequired,

  metric: propTypes.string,
  aggregation: propTypes.string,

  displayContext: propTypes.shape({
    showExpandControl: propTypes.bool.isRequired,
    onReportExpand: propTypes.func,

    dataStartTime: propTypes.instanceOf(moment).isRequired,
    dataEndTime: propTypes.instanceOf(moment).isRequired,
  }).isRequired,
};
ReportHourlyBreakdown.defaultProps = {
  cellColorThreshold: 0.25,
  displayContext: {
    showExpandControl: false,
  },
};
