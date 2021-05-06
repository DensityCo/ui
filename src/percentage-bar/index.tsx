import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import classnames from 'classnames';

// By default, hide the percentage bar below screen widths of this width.
const PERCENTAGE_BAR_DEFAULT_BREAK_WIDTH = 768;

const MDASH = String.fromCharCode(8212);

import styles from './styles.module.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'LIST_VIEW': styles.contextListView,
};

export const PercentageBarContext = React.createContext<string | null>(null);

export default function PercentageBar({
  percentage,
  breakWidth,
  percentageFormatter,
}: {
  percentage: number,
  breakWidth?: number,
  percentageFormatter?: (number) => string,
}) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // Context
  const context = useContext(PercentageBarContext);
  const isListViewContext = context === 'LIST_VIEW';

  useEffect(() => {
    window.addEventListener('resize', forceUpdate);
    return () => window.removeEventListener('resize', forceUpdate);
  }, [forceUpdate]);

  breakWidth = breakWidth || PERCENTAGE_BAR_DEFAULT_BREAK_WIDTH;
  percentageFormatter = percentageFormatter || (n => `${(n * 100).toFixed(isListViewContext ? 0 : 1)}%`);

  // Ensure that percentage never overflows the bar.
  if (percentage > 1) {
    percentage = 1;
  }

  const formattedPercentage = percentageFormatter(percentage);

  // Check if the percentage bar has enough screen width to render the bar or not.
  const isExpanded = document.body && document.body.clientWidth >= breakWidth;

  const percentageGraphic = <div
    className={classnames(
      context && CONTEXT_CLASSES[context],
      styles.percentageBar
    )}
    style={{display: isExpanded ? 'inline-block' : 'none'}} /* Is the bar visible? */
  >
    <div
      className={classnames(
        context && CONTEXT_CLASSES[context],
        styles.percentageBarColoredSection
      )}
      style={{width: `${percentage * 100}%`}} />
  </div>;

  const percentageText = <span
    className={classnames(
      context && CONTEXT_CLASSES[context],
      styles.percentageBarText,
      formattedPercentage === null ?  styles.percentageBarTextDisabled : null,
    )}

    // If the text is preceded by a bar (ie, isExpanded is true), then style it differently.
    style={{
      textAlign: (isExpanded && !isListViewContext) ? 'right' : 'left',
      width: isExpanded ? isListViewContext ? '36px' : '56px' : '32px',
    }}
  >
    {formattedPercentage === null ? MDASH : formattedPercentage}
  </span>;

  return <div className={styles.percentageBarContainer}>
    {isListViewContext ? 
      <Fragment>{percentageText}{percentageGraphic}</Fragment> :
      <Fragment>{percentageGraphic}{percentageText}</Fragment>}
  </div>;
}
