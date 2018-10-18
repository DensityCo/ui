import React, { Component } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

import styles from './styles.scss';
import ReportWrapper, { ReportCard } from '@density/ui-report-wrapper';
import colorVariables from '@density/ui/variables/colors.json';

export const DAYS = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};

class ReportNextWeekForecastChart extends Component {
  constructor(props) {
    super(props);
    this.state = { width: null, height: 300 };
    this.onResize = this.onResize.bind(this);

    this.barLeftOffset = 50;
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

  render() {
    const { startDate, endDate, data, busiestDay } = this.props;
    const { width, height } = this.state;

    const maximumBarContainerWidthInPx = width ? width - 150 : 0;

    // The total bar width is a combination of the width of the "bar" and a width of the "standard
    // deviation high" sections.
    //               _________
    // ==================
    //               '''''''''
    //                       ^
    //                Total bar width
    //
    //  = represents the "bar"
    //  '/_ represents the "standard deviation section"
    //
    const maximumBarCombinedWidth = Math.max.apply(Math, data.map(v => v.visits + v.high));

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

    return (
      <div ref={r => { this.container = r; }} className={styles.chartContainer}>
        <svg width={width} height={days.length * 40}>
          {days.map((day, index) => {
            if (!data[index]) {
              throw new Error(`No ${index} value found in forecast array prop - does your date range cover a longer period of time then you've passed in forecasts for?`);
            }
            const barPercentage = data[index].visits / maximumBarCombinedWidth;
            const barWidthInPx = barPercentage * maximumBarContainerWidthInPx;

            const barHighWidthInPx = (data[index].high / maximumBarCombinedWidth) * maximumBarContainerWidthInPx;
            const barLowWidthInPx = (data[index].low / maximumBarCombinedWidth) * maximumBarContainerWidthInPx;

            return (
              <g key={day} transform={`translate(0,${(index * 40)+20})`}>
                {/* The day of the week */}
                <text
                  fontSize={12}
                  fontWeight={busiestDay.slice(0, 3) === day ? 'bold' : 'normal'}
                  transform="translate(0,3)"
                >{day}</text>

                {/* The bar that contains the standard deviation info */}
                <rect
                  x={this.barLeftOffset + barWidthInPx - barLowWidthInPx}
                  y={-6}
                  width={barLowWidthInPx + barHighWidthInPx}
                  height={12}
                  fill={colorVariables.brandPrimary}
                  opacity={0.25}
                />

                {/* The main bar */}
                <rect
                  x={this.barLeftOffset}
                  y={-2}
                  width={barWidthInPx}
                  height={4}
                  fill={colorVariables.brandPrimary}
                />

                <text
                  transform={`translate(${this.barLeftOffset + barWidthInPx + barHighWidthInPx + 10},6)`}
                >
                  <tspan
                    fill={colorVariables.brandPrimary}
                    fontWeight="bold"
                  >{data[index].visits}</tspan>
                  <tspan
                    fill={colorVariables.brandPrimary}
                    fontWeight="normal"
                    opacity={0.45}
                  > &plusmn; {data[index].stdDev}</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
}

export default function ReportNextWeekForecast({
  title,
  startDate,
  endDate,
  spaces,
  busiestDay,
  forecasts,
}) {
  return (
    <ReportWrapper
      title={title}
      startDate={startDate}
      endDate={endDate}
      spaces={spaces}
    >
      <ReportCard>
        <span className={styles.timePeriod}>Based on the past 3 months</span>
        <h2 className={styles.header}>
          <span className={styles.headerHighlight}>{busiestDay}</span> will be your busiest day
        </h2>
        <ReportNextWeekForecastChart
          busiestDay={DAYS.SATURDAY}
          startDate={startDate}
          endDate={endDate}
          data={forecasts}
        />
      </ReportCard>
    </ReportWrapper>
  );
}

ReportNextWeekForecast.propTypes = {
  title: propTypes.string,
  startDate: propTypes.instanceOf(moment).isRequired,
  endDate: propTypes.instanceOf(moment).isRequired,
  spaces: propTypes.arrayOf(propTypes.string).isRequired,

  busiestDay: propTypes.oneOf(Object.values(DAYS)).isRequired,
  forecasts: propTypes.arrayOf(propTypes.shape({
    visits: propTypes.number,
    high: propTypes.number,
    low: propTypes.number,
    stdDev: propTypes.number,
  })).isRequired,
};
