import React from 'react';
import classnames from 'classnames';
import { SingleDatePicker } from '@density/react-dates';
import Icons from '../icons';
import propTypes from 'prop-types';
import moment from 'moment';

import colorVariables from '../../variables/colors.json';
import styles from './styles.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'ANALYTICS_CONTROL_BAR': styles.contextAnalyticsControlBar,
};

export enum DatePickerAnchor {
	ANCHOR_LEFT = 'ANCHOR_LEFT',
	ANCHOR_RIGHT = 'ANCHOR_RIGHT',
};

// To maintain backwards compatibility
export const ANCHOR_RIGHT = DatePickerAnchor.ANCHOR_RIGHT,
						 ANCHOR_LEFT = DatePickerAnchor.ANCHOR_LEFT;

export const DatePickerContext = React.createContext<keyof typeof CONTEXT_CLASSES>(null);

type DatePickerProps = {
	date: moment.Moment,
  anchor: DatePickerAnchor,
  focused: boolean,
	onChange: (date: moment.Moment) => void,
  arrowRightDisabled: boolean,
  arrowLeftDisabled: boolean,
}

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
	date,
	anchor,
	arrowRightDisabled,
	arrowLeftDisabled,
	onChange,
	...restProps
}) => (
  <DatePickerContext.Consumer>{context => (
    <div className={classnames(CONTEXT_CLASSES[context], styles.datePicker, {
      [styles.datePickerAnchorLeft]: !anchor || anchor === ANCHOR_LEFT,
      [styles.datePickerAnchorRight]: anchor === ANCHOR_RIGHT,
      [styles.datePickerFocused]: focus,
    })}>
      <div className={styles.datePickerContainer}>
        <div
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconLeft,
            {[styles.datePickerIconDisabled]: arrowLeftDisabled},
          )}
          role="button"
          onClick={() => {
            if (!arrowLeftDisabled) {
              const yesterday = date.clone().subtract(1, 'day');
              return onChange(yesterday);
            }
          }}
        >
          <Icons.ArrowLeft
            color={arrowLeftDisabled ? colorVariables.grayDark : colorVariables.brandPrimary}
            width={20}
            height={20}
          />
        </div>
        <SingleDatePicker
					date={date}
          numberOfMonths={1}
          onDateChange={onChange}
          {...restProps}
        />
        {context === 'ANALYTICS_CONTROL_BAR' ? <div style={{marginTop: 5, marginLeft: 24, marginRight: 12}}>
          <Icons.ChevronDown />
        </div> : null}
        <div
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconRight,
            {[styles.datePickerIconDisabled]: arrowRightDisabled},
          )}
          role="button"
          onClick={() => {
            if (!arrowRightDisabled) {
              const tomorrow = date.clone().add(1, 'day');
              return onChange(tomorrow);
            }
          }}
        >
          <Icons.ArrowRight
            color={arrowRightDisabled ? colorVariables.grayDark : colorVariables.brandPrimary}
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )}</DatePickerContext.Consumer>
);

DatePicker.displayName = 'DatePicker';
export default DatePicker;
