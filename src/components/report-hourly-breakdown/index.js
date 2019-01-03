import moment from 'moment';
import React from 'react';
import ReportWrapper, { ReportCard, ReportSubHeader, ReportExpandController } from '@density/ui-report-wrapper';
import styles from './styles.scss';
import colorVariables from '@density/ui/variables/colors.json';
import propTypes from 'prop-types';

// From 'hex-rgb' npm package
// The package isn't pre-compiled by default, which means that create react app v1 doesn't know how
// ot use it.
const hexChars = 'a-f\\d';
const match3or4Hex = `#?[${hexChars}]{3}[${hexChars}]?`;
const match6or8Hex = `#?[${hexChars}]{6}([${hexChars}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexChars}]`, 'gi');
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');

function hexRgb(hex, options = {}) {
  if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
    throw new TypeError('Expected a valid hex string');
  }

  hex = hex.replace(/^#/, '');
  let alpha = 255;

  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.substring(0, 6);
  }

  if (hex.length === 4) {
    alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.substring(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const num = parseInt(hex, 16);
  const red = num >> 16;
  const green = (num >> 8) & 255;
  const blue = num & 255;

  return options.format === 'array' ?
    [red, green, blue, alpha] :
    {red, green, blue, alpha};
}

function addAlphaToHex(hex, alpha) {
  const color = hexRgb(hex);
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;
}

export default function ReportHourlyBreakdown({
  title,
  startDate,
  endDate,
  space,

  data,
  maxDay,
  maxHour,
  maxValue,
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

  // Prepare labels for max start/end times
  let maxTimeStart = moment().startOf('day').add(maxHour, 'hour');
  let maxTimeEnd = moment(maxTimeStart).add(1, 'hour');
  maxTimeEnd = maxTimeEnd.format('Ha');
  maxTimeStart = maxTimeStart.format('Ha');

  // Remove 'am'/'pm' from start hour ONLY if both are the same
  if (maxTimeStart.endsWith(maxTimeEnd.slice(-2))) {
    maxTimeStart = maxTimeStart.slice(0, -2);
  }

  return (
    <ReportWrapper
      title={title}
      startDate={startDate}
      endDate={endDate}
      spaces={[space.name]}
    >
      <ReportSubHeader
        title={(
          <span>
            <strong>{maxDay}</strong> between {' '}
            <strong>{maxTimeStart}</strong> and <strong>{maxTimeEnd}</strong> had{' '}
            {aggregation === 'AVERAGE' ? 
              (metric === 'PEAKS' ? 'an average peak count of ': 'an average of ') :
              (metric === 'PEAKS' ? 'a peak count of ' : '')}
            <strong>{maxValue}</strong>{metric === 'VISITS' ? ' visits.' : '.'}
          </span>
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
                  <span className={styles.headerLineTwo}>{i.date.format('M/DD')}</span>
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

  maxDay: propTypes.string.isRequired,
  maxHour: propTypes.number.isRequired,
  maxValue: propTypes.number.isRequired,
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
