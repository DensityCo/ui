import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

type PagerButtonGroupProps = {
	showFirstLastButtons: boolean,

	disabledPrevious: boolean,
	disabledNext: boolean,
	disabledStart: boolean,
	disabledEnd: boolean,

	onClickPrevious: () => void,
	onClickNext: () => void,
	onClickStart: () => void,
	onClickEnd: () => void,
};

const PagerButtonGroup: React.FunctionComponent<PagerButtonGroupProps> = ({
  showFirstLastButtons,

  disabledPrevious,
  disabledNext,
  disabledStart,
  disabledEnd,

  onClickPrevious,
  onClickNext,
  onClickStart,
  onClickEnd,
}) => (
  <div className={styles.pagerButtonGroup}>
    {showFirstLastButtons ? <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledStart})}
      onClick={e => {
        if (!disabledStart) {
          onClickStart();
        }
      }}
    >&laquo;</div> : null}

    <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledPrevious})}
      onClick={e => {
        if (!disabledPrevious) {
          onClickPrevious();
        }
      }}
    >&lsaquo;</div>
    <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledNext})}
      onClick={e => {
        if (!disabledNext) {
          onClickNext();
        }
      }}
    >&rsaquo;</div>

    {showFirstLastButtons ? <div
      className={classnames(styles.pagerButton, {[styles.pagerButtonDisabled]: disabledEnd})}
      onClick={e => {
        if (!disabledEnd) {
          onClickEnd();
        }
      }}
    >&raquo;</div> : null}
  </div>
);
PagerButtonGroup.displayName = 'PagerButtonGroup';
export default PagerButtonGroup;
