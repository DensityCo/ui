import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import styles from './styles.scss';

export default function PagerButtonGroup({
  showFirstLastButtons,

  disabledPrevious,
  disabledNext,
  disabledStart,
  disabledEnd,

  onClickPrevious,
  onClickNext,
  onClickStart,
  onClickEnd,
}) {
  return <div className={styles.pagerButtonGroup}>
    {showFirstLastButtons ? <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledStart})}
      onClick={e => {
        if (!disabledStart) {
          onClickStart(e);
        }
      }}
    >&laquo;</div> : null}

    <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledPrevious})}
      onClick={e => {
        if (!disabledPrevious) {
          onClickPrevious(e);
        }
      }}
    >&lsaquo;</div>
    <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledNext})}
      onClick={e => {
        if (!disabledNext) {
          onClickNext(e);
        }
      }}
    >&rsaquo;</div>

    {showFirstLastButtons ? <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledEnd})}
      onClick={e => {
        if (!disabledEnd) {
          onClickEnd(e);
        }
      }}
    >&raquo;</div> : null}
  </div>;
}

PagerButtonGroup.displayName = 'PagerButtonGroup';
PagerButtonGroup.propTypes = {
  onClickNext: propTypes.func.isRequired,
  onClickPrevious: propTypes.func.isRequired,

  showFirstLastButtons: propTypes.bool,
  onClickStart: propTypes.func,
  onClickEnd: propTypes.func,

  disabledStart: propTypes.bool,
  disabledEnd: propTypes.bool,
  disabledNext: propTypes.bool,
  disabledPrevious: propTypes.bool,
};
