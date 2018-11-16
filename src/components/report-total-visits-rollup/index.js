import React, { Component } from 'react';
import ReportWrapper, { ReportSubHeader, ReportCard } from '@density/ui-report-wrapper';
import propTypes from 'prop-types';

import { text } from '@density/ui';
import moment from 'moment';

import styles from './styles.scss';

export const MOST_VISITED = 'MOST_VISITED';
export const LEAST_VISITED = 'LEAST_VISITED';

export default class ReportTotalVisitsRollup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
    };
    this.onResize = this.onResize.bind(this);
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
    const {
      title,
      segmentName,
      startDate,
      endDate,
      counts,
      mode,
    } = this.props;
    const { width } = this.state;

    if (mode !== MOST_VISITED && mode !== LEAST_VISITED) {
      throw new Error(`Total visits rollup report mode must either be MOST_VISITED or LEAST_VISITED (got ${mode})`);
    }

    if (counts.length === 0) {
      throw new Error('No space visit counts were specified when rendering the report, please define at least one.');
    }

    if (counts.some(i => i.count < 0)) {
      throw new Error('Count values cannot be negative (received a value outside of that range)');
    }

    // Calculate maximum number of rows to render
    let maxNumberOfCounts = null; /* Infinity rows permitted when on detail page */
    if (width < 800) {
      maxNumberOfCounts = 7; /* normally, only 7 rows shown */
    }

    let sortedCounts = counts.sort((a, b) => {
      return mode === LEAST_VISITED ? a.count - b.count : b.count - a.count;
    });

    // Remove counts from list if a limit was defined
    if (maxNumberOfCounts) {
      sortedCounts = sortedCounts.slice(0, maxNumberOfCounts);
    }

    // Calculate all spaces to feature in the reportsubheader. This is done by finding the first
    // count in the sorted count list (as this either has the max or the minimum
    // count) and finding all other rows that also have that count value.
    const minCount = Math.min.apply(Math, sortedCounts.map(i => i.count));
    const maxCount = Math.max.apply(Math, sortedCounts.map(i => i.count));
    const headerCounts = sortedCounts.filter(u => {
      return u.count === (mode === LEAST_VISITED ? minCount : maxCount);
    });

    return (
      <ReportWrapper
        title={title}
        startDate={startDate}
        endDate={endDate}
        spaces={counts.map(i => i.name)}
      >
        <ReportSubHeader
          title={mode === LEAST_VISITED ? (
            // Least visited
            <span>
              {text.toEnglishJsxList(headerCounts.map(u => <strong>{u.name}</strong>))}{' '}
              {headerCounts.length === 1 ? 'was' : 'were'} the <strong>least</strong>{' '}
              used space{headerCounts.length > 1 ? 's' : ''} during <strong>{segmentName}</strong>{' '}
              with <strong>{minCount}</strong> visits.
            </span>
          ) : (
            // Most visited
            <span>
              {text.toEnglishJsxList(headerCounts.map(u => <strong>{u.name}</strong>))}{' '}
              {headerCounts.length === 1 ? 'was' : 'were'} the <strong>most</strong>{' '}
              used space{headerCounts.length > 1 ? 's' : ''} during <strong>{segmentName}</strong>{' '}
              with <strong>{maxCount}</strong> visits.
            </span>
          )}
        />
        <ReportCard>
          <div ref={r => { this.container = r; }} className={styles.rollupWrapper}>
            {sortedCounts.map(item => {
              return (
                <div key={item.id} className={styles.rollupRow}>
                  <div className={styles.rollupRowText}>{item.name}</div>
                  <div className={styles.rollupRowBar}>
                    <div
                      className={styles.rollupRowBarInner}
                      style={{width: `${maxCount ? item.count / maxCount * 100 : 0}%`}}
                    />
                  </div>
                  <div className={styles.rollupRowBarText}>{item.count}</div>
                </div>
              );
            })}
          </div>
        </ReportCard>
      </ReportWrapper>
    );
  }
}
ReportTotalVisitsRollup.propTypes = {
  title: propTypes.string.isRequired,
  timeSegment: propTypes.string.isRequired,
  startDate: propTypes.instanceOf(moment).isRequired,
  endDate: propTypes.instanceOf(moment).isRequired,
  mode: propTypes.oneOf([MOST_VISITED, LEAST_VISITED]).isRequired,
  counts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.any.isRequired,
      name: propTypes.node.isRequired,
      count: propTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
