import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import * as d3Scale from 'd3-scale'; /* note: this package doesn't have a `default` export */

import ReportWrapper, { ReportCard, ReportSubHeader, ReportOptionBar } from '@density/ui-report-wrapper';

import styles from './styles.scss';
import colorVariables from '@density/ui/variables/colors.json';
import spacingVariables from '@density/ui/variables/spacing.json';

const OVER_CAPACITY_COLOR = '#D0021B',
      BUSY_COLOR = '#FF7988',
      QUIET_COLOR = '#FFDCE1';

function getMaximumsByKey(data, keyFunction) {
  const keyedData = data.map(keyFunction);
  const maxValue = Math.max.apply(Math, keyedData);

  return data.filter((_, index) => {
    return keyedData[index] === maxValue;
  });
}

function calculateColorForBucket(count, capacity, {quietBusyThreshold, busyOverCapacityThreshold}) {
  const percent = count / capacity;

  if (0 <= percent && percent < quietBusyThreshold) {
    return QUIET_COLOR;
  } else if (quietBusyThreshold <= percent && percent < busyOverCapacityThreshold) {
    return BUSY_COLOR;
  } else {
    return OVER_CAPACITY_COLOR;
  }
}

class SurpassedCapacityChart extends Component {
  constructor(props) {
    super(props);

    this.state = { width: 300 };
    this.onResize = this.onResize.bind(this);

    this.columnHeight = spacingVariables.reportRowHeight;
    this.xAxisMarkFontSize = 16;
    this.yAxisMarkFontSize = 14;
    this.barSpacingLeft = 48;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const width = this.container.clientWidth;
    this.setState({width});
  }

  convertTimeToSeconds(time) {
    return moment.duration(time).asSeconds();
  }

  // Generate an array of "marks" for below the graph, starting at the beginning of the time segment
  // and ending at the end of the time segment.
  generateXAxisMarks() {
    const { timeSegment } = this.props;

    const start = moment.duration(timeSegment.start);
    const end = moment.duration(timeSegment.end);

    const marks = [];
    for (let i = start; i.hours() <= end.hours(); i = i.clone().add(1, 'hour')) {
      let label = i.hours();
      marks.push({
        value: label * 3600, // convert label to seconds
        label: moment.utc().startOf('day').add(label, 'hours').format('ha').slice(0, -1),
      });
    }

    return marks;
  }

  render() {
    const {
      data,
      startDate,
      endDate,
      timeSegment,

      daysWithPeakCount,
      capacity,

      quietBusyThreshold,
      busyOverCapacityThreshold,
    } = this.props;
    const { width } = this.state;

    if (quietBusyThreshold > 1) {
      throw new Error('quietBusyThreshold is greater than one, it must be within 0...1');
    }
    if (busyOverCapacityThreshold > 1) {
      throw new Error('busyOverCapacityThreshold is greater than one, it must be within 0...1');
    }

    const xScale = d3Scale.scaleLinear()
      .domain([
        this.convertTimeToSeconds(timeSegment.start),
        this.convertTimeToSeconds(timeSegment.end),
      ])
      .range([this.barSpacingLeft, width]);

    // Return a list of all distinct days of the week within the time period passed.
    const days = (function() {
      const days = [];
      for (let day = startDate.clone(); day.isSameOrBefore(endDate); day = day.clone().add(1, 'day')) {
        const shortDay = day.format('ddd');
        if (days.indexOf(shortDay) === -1) {
          days.push(shortDay);
        }
      }
      return days;
    })();

    const daysOfData = days.filter((_, index) => data[index] !== null);
    const height = daysOfData.length * this.columnHeight - (this.columnHeight/4) + 5;

    let dayPositionIndex = -1;

    return (
      <div ref={r => { this.container = r; }} className={styles.chartContainer}>
        <svg width={width} height={height + 24 + this.xAxisMarkFontSize}>
          {/* Render bottom axis every hour */}
          {this.generateXAxisMarks().map(({value, label}, index, xAxisMarks) => (
            <text
              key={value}
              fill={colorVariables.grayDarker}
              transform={`translate(${xScale(value)}, ${height+32})`}
              fontSize={this.xAxisMarkFontSize}
              style={{userSelect: 'none'}}
              textAnchor={(function() {
                if (index === 0) {
                  return 'start';
                } else if (index === xAxisMarks.length-1) {
                  return 'end';
                } else {
                  return 'middle';
                }
              })()}
            >{label}</text>
          ))}

          {/* Render a bar for each row */}
          {days.map((day, index) => {
            // If the day has data that is null, then don't render the day
            if (data[index] === null) { return null; }

            // Because of the case above, we have to keep track of the index used to draw the bar
            // seperately as `index` will still increment even when a day has no data.
            dayPositionIndex += 1;

            // Some accounting variables to construct same-colored rectangles as we scan through data
            const rectangles = [];
            const peaks = [];
            let lastStartXPos = null;
            let lastEndXPos = null;
            let lastColor = null;

            // Loop through the buckets and split into contiguous color groups
            data[index].forEach(({start, end, count}) => {
              const startXPos = xScale(this.convertTimeToSeconds(start));

              let color = calculateColorForBucket(
                count, capacity,
                {quietBusyThreshold, busyOverCapacityThreshold},
              );
              if (lastColor !== color) {
                rectangles.push(<g key={`${lastStartXPos},${end}`}>
                  <rect
                    x={lastStartXPos}
                    y={0}
                    width={lastEndXPos - lastStartXPos}
                    height={8}
                    fill={lastColor}
                    stroke={lastColor}
                    strokeWidth={0.5}
                  />
                </g>);
                lastStartXPos = startXPos;
              }

              lastEndXPos = xScale(this.convertTimeToSeconds(end));
              lastColor = color;

              const highestCapacityLabel = color === OVER_CAPACITY_COLOR && daysWithPeakCount.find(h => (
                h.day.startsWith(day) && h.peak.timestamp === start
              ));
              if (highestCapacityLabel) {
                peaks.push(<text
                  fontSize="11"
                  transform={`translate(${startXPos+((lastEndXPos - startXPos)/2)},-4)`}
                  textAnchor="middle"
                  fill={OVER_CAPACITY_COLOR}
                >{highestCapacityLabel.peak.count}</text>);
              }
            });

            return (
              <g key={day} transform={`translate(0,${(dayPositionIndex * this.columnHeight)+(this.columnHeight/2)+5})`}>
                <text
                  transform="translate(0,3)"
                  fontSize={this.yAxisMarkFontSize}
                >{day}</text>

                <g transform="translate(0,-6)">
                  {/* "background" color of each bar*/}
                  <rect
                    x={this.barSpacingLeft}
                    y={0}
                    width={width - this.barSpacingLeft}
                    height={8}
                    fill={QUIET_COLOR}
                  />

                  {/* color each region of interest */}
                  {rectangles}
                  {peaks}
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
}

const MODE_QUIET = 'MODE_QUIET',
      MODE_BUSY = 'MODE_BUSY',
      MODE_OVER = 'MODE_OVER';

export default function ReportSurpassedCapacity({
  title,
  startDate,
  endDate,
  spaces,
  timeSegment,
  timeSegmentGroup,
  data,
  capacity,
  quietBusyThreshold,
  busyOverCapacityThreshold,
}) {
  // For each day, calculate all metrics this report needs:
  // - Peak count and timestamp of that peak count
  // - Total number of seconds that of time that we were either over capacity, busy, or quiet.
  // - name of the day.
  let overCapacityOnChart = false;
  let busyOnChart = false;
  const metricsPerDayInSeconds = data.map((day, index) => {
    if (day === null) { return null; }

    const analytics = day.reduce(({quiet, busy, over}, bucket) => {
      const color = calculateColorForBucket(
        bucket.count,
        capacity,
        {quietBusyThreshold, busyOverCapacityThreshold}
      );

      const bucketLengthInSeconds = (
        moment.duration(bucket.end).asSeconds() -
        moment.duration(bucket.start).asSeconds()
      )

      if (color == QUIET_COLOR) {
        return {quiet: quiet + bucketLengthInSeconds, busy, over};
      } else if (color === BUSY_COLOR) {
        busyOnChart = true;
        return {quiet, busy: busy + bucketLengthInSeconds, over};
      } else {
        overCapacityOnChart = true;
        return {quiet, busy, over: over + bucketLengthInSeconds};
      }
    }, {quiet: 0, busy: 0, over: 0});

    const peak = day.reduce(({timestamp, count}, bucket) => {
      if (bucket.count > count) {
        return {timestamp: bucket.start, count: bucket.count};
      } else {
        return {timestamp, count};
      }
    }, {timestamp: null, count: 0});

    return {
      day: startDate.clone().startOf('day').add(index, 'days').format('dddd'),
      peak,
      analytics,
    };
  }).filter(i => i !== null);

  let renderMode = MODE_QUIET;
  if (overCapacityOnChart) {
    renderMode = MODE_OVER;
  } else if (busyOnChart) {
    renderMode = MODE_BUSY;
  }

  const daysWithPeakCount = getMaximumsByKey(metricsPerDayInSeconds, d => d.peak.count);

  return (
    <ReportWrapper
      title={title}
      startDate={startDate}
      endDate={endDate}
      spaces={spaces}
    >
      <ReportSubHeader
        title={(() => {
          switch (renderMode) {
          case MODE_QUIET:
            return (
              // No places where the count goes over the capacity.
              <span className={styles.header}>
                It was quiet this week during <strong>{timeSegmentGroup.name}</strong>.
              </span>
            );
          case MODE_BUSY:
            return (
              <span>
                {daysWithPeakCount.map(metrics => {
                  return (
                    <span key={metrics.day} className={styles.header}>
                      <strong>{metrics.day}</strong>{' '}
                      was busy for{' '}
                      <strong>{moment.duration(metrics.analytics.busy, 'seconds').humanize()}</strong>
                      , peaking at{' '}
                      <strong>{metrics.peak.count}</strong>
                      {' '}visitors.
                    </span>
                  );
                })}
              </span>
            );
          case MODE_OVER:
            return (
              <span>
                {daysWithPeakCount.map(metrics => {
                  return (
                    <span key={metrics.day} className={styles.header}>
                      <strong>{metrics.day}</strong>{' '}
                      was over capacity for{' '}
                      <strong>{moment.duration(metrics.analytics.over, 'seconds').humanize()}</strong>
                      , peaking at{' '}
                      <strong>{metrics.peak.count}</strong>
                      {' '}visitors.
                    </span>
                  );
                })}
              </span>
            );
          default:
            return null;
          }
        })()}
      >
        {renderMode !== MODE_QUIET ? (
          <ReportOptionBar
            options={[
              {
                id: 0,
                label: `Quiet (0-${Math.round(quietBusyThreshold*100)-1})`,
                color: QUIET_COLOR,
              },
              {
                id: 1,
                label: `Busy (${Math.round(quietBusyThreshold*100)}-${Math.round(busyOverCapacityThreshold*100)-1})`,
                color: BUSY_COLOR,
              },
              {
                id: 2,
                label: `Over Capacity (${Math.round(busyOverCapacityThreshold*100)}+)`,
                color: OVER_CAPACITY_COLOR,
              },
            ]}
          />
        ) : null}
      </ReportSubHeader>
      <ReportCard>
        <SurpassedCapacityChart
          data={data}
          startDate={startDate}
          endDate={endDate}
          timeSegment={timeSegment}

          capacity={capacity}
          daysWithPeakCount={daysWithPeakCount}

          quietBusyThreshold={quietBusyThreshold}
          busyOverCapacityThreshold={busyOverCapacityThreshold}
        />
      </ReportCard>
    </ReportWrapper>
  )
}

ReportSurpassedCapacity.propTypes = {
  title: propTypes.string.isRequired,
  startDate: propTypes.instanceOf(moment).isRequired,
  endDate: propTypes.instanceOf(moment).isRequired,
  spaces: propTypes.arrayOf(propTypes.string).isRequired,

  timeSegment: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    start: propTypes.string.isRequired,
    end: propTypes.string.isRequired,
    days: propTypes.arrayOf(propTypes.string).isRequired,
    spaces: propTypes.arrayOf(propTypes.any).isRequired,
  }).isRequired,
  timeSegmentGroup: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
  }).isRequired,
  capacity: propTypes.number.isRequired,

  quietBusyThreshold: propTypes.number.isRequired,
  busyOverCapacityThreshold: propTypes.number.isRequired,

  data: propTypes.arrayOf(
    propTypes.oneOfType([
      propTypes.arrayOf(
        propTypes.shape({
          count: propTypes.number.isRequired,
          start: propTypes.string.isRequired,
          end: propTypes.string.isRequired,
        }).isRequired,
      ),
      propTypes.oneOf([null]), /* if the day shouldn't be included */
    ]),
  ).isRequired,
};
