import React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import classnames from 'classnames';

import { IconArrowRight, IconCalendar } from '@density/ui-icons';
import colorVariables from '@density/ui/variables/colors.json';

import styles from './styles.scss';

export function ReportPadding({children}) {
  return (
    <div className={styles.reportPadding}>{children}</div>
  );
}
ReportPadding.propTypes = {
  children: propTypes.node.isRequired,
};

export function ReportCard({children, noPadding}) {
  return (
    <div className={styles.reportCard}>
      {noPadding ? children : <ReportPadding>{children}</ReportPadding>}
    </div>
  );
}
ReportCard.propTypes = {
  noPadding: propTypes.bool,
  children: propTypes.node.isRequired,
};

export function ReportSubHeader({
  title,
  children
}) {
  const titleNode = title ? (
    <h2 className={classnames(
      styles.reportSubHeaderTitle,
      {[styles.noBody]: !children}
    )}>{title}</h2>
  ) : null;

  return <div className={styles.reportSubHeader}>
    {titleNode}
    <div className={styles.reportSubHeaderContent}>{children}</div>
  </div>;
}
ReportSubHeader.propTypes = {
  title: propTypes.node,
  children: propTypes.node
};

export function ReportOptionBar({options}) {
  return (
    <ul className={styles.reportOptionBarList}>
      {options.map(({id, label, color}) => (
        <li key={id} className={styles.reportOptionBarItem}>
          <div
            className={styles.reportOptionBarCircle}
            style={{backgroundColor: color}}
          />
          <span className={styles.reportOptionBarLabel}>{label}</span>
        </li>
      ))}
    </ul>
  );
}
ReportOptionBar.propTypes = {
  options: propTypes.arrayOf(propTypes.shape({
    id: propTypes.any.isRequired,
    label: propTypes.node.isRequired,
    color: propTypes.string.isRequired,
  })).isRequired,
};

export function ReportError() {
  return (
    <ReportCard>
      <div className={styles.reportError}>
        <h3 className={styles.reportErrorHeader}>Whoops!</h3>
        <span className={styles.reportErrorBody}>There was an issue loading this report.</span>
        <span className={styles.reportErrorBody}>
          Contact <a href="mailto:support@density.io">support</a>{' '}
          and we'll get you up and running.
        </span>
      </div>
    </ReportCard>
  );
}



// Render the date range for the report wrapper
// IMPORTANT: The end date is exclusive, so we need to subtract 1 day from it for rendering
function ReportWrapperHeaderDateRange({startDate, endDate}) {
  if (!startDate || !endDate) {
    return (
      <div className={styles.reportHeaderDateRange} />
    );
  } else {
    return (
      <div className={styles.reportHeaderDateRange}>
        <span><IconCalendar width={12} height={12} color={colorVariables.grayDarker} /></span>
        <span className={styles.reportHeaderDateRangeTextStart}>{startDate.format('MMM DD')}</span>
        <span> - </span>
        <span className={styles.reportHeaderDateRangeTextEnd}>{endDate.subtract(1, 'days').format('MMM DD')}</span>
      </div>
    );
  }
}

function ReportWrapperHeader({
  title,
  startDate,
  endDate,
  spaces,
  hideDetailsLink,
  loading,
}) {
  return (
    <div>
      <div className={styles.reportHeader}>
        {/* Left side contains title, space list, and when on mobile, the date range. */}
        <h2 className={styles.reportHeaderTitle}>{title}</h2>
        <div className={styles.reportHeaderDetailsLink} style={{opacity: hideDetailsLink ? 0 : 1}}>
          {loading ? (
            <div className={classnames(styles.unloadedTextBar, styles.unloadedTextBarDetailsLink)} />
          ) : (
            <div className={styles.reportHeaderDetailsLinkText}>Details</div>
          )}
        </div>

        <div className={styles.reportHeaderSpaces}>
          {loading ? (
            <div className={styles.unloadedTextBar} style={{width: 120}} />
          ) : (
            spaces.length > 0 ? (
              spaces.length === 1 ? spaces[0] : `${spaces.length} selected spaces`
            ) : null
          )}
        </div>

        {loading ? (
          <div className={styles.unloadedTextBar} style={{width: 120}} />
        ) : (
          <ReportWrapperHeaderDateRange startDate={startDate} endDate={endDate} />
        )}
      </div>
    </div>
  );
}

export default function ReportWrapper({
  title,
  startDate,
  endDate,
  spaces,
  children,

  hideDetailsLink,
  loading,
}) {
  return (
    <div className={styles.reportWrapper}>
      <ReportWrapperHeader
        title={title}
        startDate={startDate}
        endDate={endDate}
        spaces={spaces}
        hideDetailsLink={hideDetailsLink}
        loading={loading}
      />
      {children}
    </div>
  );
}
ReportWrapper.propTypes = {
  title: propTypes.string.isRequired,
  startDate: propTypes.any,
  endDate: propTypes.any,
  children: propTypes.node,
  spaces: propTypes.arrayOf(propTypes.string).isRequired,
  hideDetailsLink: propTypes.bool,
  loading: propTypes.bool,
};
ReportWrapper.defaultProps = {
  hideDetailsLink: true,
};
