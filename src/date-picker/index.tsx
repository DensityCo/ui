import React from 'react';
import classnames from 'classnames';
import { SingleDatePicker } from '@density/react-dates';
import Icons from '../icons';
import propTypes from 'prop-types';

import colorVariables from '../../variables/colors.json';
import styles from './styles.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'ANALYTICS_CONTROL_BAR': styles.contextAnalyticsControlBar,
};

export const ANCHOR_RIGHT = 'ANCHOR_RIGHT',
  ANCHOR_LEFT = 'ANCHOR_LEFT';

export const DatePickerContext = React.createContext(null);

const DatePicker: React.FC<any> = (props) => {
  const restProps = Object.assign({}, props);
  delete restProps.onChange;
  delete restProps.anchor;
  delete restProps.className;
  delete restProps.arrowRightDisabled;
  delete restProps.arrowLeftDisabled;

  return <DatePickerContext.Consumer>{context => (
    <div className={classnames(CONTEXT_CLASSES[context], styles.datePicker, {
      [styles.datePickerAnchorLeft]: !props.anchor || props.anchor === ANCHOR_LEFT,
      [styles.datePickerAnchorRight]: props.anchor === ANCHOR_RIGHT,
      [styles.datePickerFocused]: props.focused,
    })}>
      <div className={styles.datePickerContainer}>
        <div
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconLeft,
            {[styles.datePickerIconDisabled]: props.arrowLeftDisabled},
          )}
          role="button"
          onClick={() => {
            if (!props.arrowLeftDisabled) {
              const yesterday = props.date.clone().subtract(1, 'day');
              return props.onChange(yesterday);
            }
          }}
        >
          <Icons.ArrowLeft
            color={props.arrowLeftDisabled ? colorVariables.grayDark : colorVariables.brandPrimary}
            width={20}
            height={20}
          />
        </div>
        <SingleDatePicker
          numberOfMonths={1}
          onDateChange={props.onChange}
          {...restProps}
        />
        {context === 'ANALYTICS_CONTROL_BAR' ? <div style={{marginTop: 5, marginLeft: 24, marginRight: 12}}>
          <Icons.ChevronDown />
        </div> : null}
        <div
          className={classnames(
            styles.datePickerIcon,
            styles.datePickerIconRight,
            {[styles.datePickerIconDisabled]: props.arrowRightDisabled},
          )}
          role="button"
          onClick={() => {
            if (!props.arrowRightDisabled) {
              const tomorrow = props.date.clone().add(1, 'day');
              return props.onChange(tomorrow);
            }
          }}
        >
          <Icons.ArrowRight
            color={props.arrowRightDisabled ? colorVariables.grayDark : colorVariables.brandPrimary}
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )}</DatePickerContext.Consumer>;
}

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = {
  date: propTypes.any.isRequired,
  onChange: propTypes.func,
  focused: propTypes.bool,
  onFocusChange: propTypes.func,
  anchor: propTypes.oneOf([ANCHOR_LEFT, ANCHOR_RIGHT]),
  arrowRightDisabled: propTypes.bool,
  arrowLeftDisabled: propTypes.bool,
};
export default DatePicker;
