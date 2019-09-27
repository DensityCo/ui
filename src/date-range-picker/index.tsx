import React, { useContext } from 'react';
import classnames from 'classnames';
import { DateRangePicker as ReactDatesDateRangePicker } from '@density/react-dates';
import propTypes from 'prop-types';
import moment from 'moment';

import InputBox from '../input-box';
import Icons from '../icons';
import { InputBoxChoice, InputBoxAnchor } from '../input-box';

import styles from './styles.scss';

export enum DateRangePickerAnchor {
	ANCHOR_RIGHT = 'ANCHOR_RIGHT',
	ANCHOR_LEFT = 'ANCHOR_LEFT',
}

export enum DateRangePickerFocusedInput {
  START_DATE_ACTIVE = 'startDate',
  END_DATE_ACTIVE = 'endDate',
}

export const ANCHOR_RIGHT = DateRangePickerAnchor.ANCHOR_RIGHT,
  ANCHOR_LEFT = DateRangePickerAnchor.ANCHOR_LEFT,
  START_DATE_ACTIVE = DateRangePickerFocusedInput.START_DATE_ACTIVE,
  END_DATE_ACTIVE = DateRangePickerFocusedInput.END_DATE_ACTIVE;

export const DateRangePickerContext = React.createContext<'SMALL_WIDTH'>(null);

// internal date range picker (via ReactDates)
function ReactDateRangePicker({ onChange, anchor, focusedInput, ...restProps }) {
  const context = useContext(DateRangePickerContext);

  if (context === 'SMALL_WIDTH') {
    restProps.numberOfMonths = 1;
  }

  return (
		<div className={classnames(styles.dateRangePicker, {
			[styles.dateRangePickerAnchorLeft]: !anchor || anchor === DateRangePickerAnchor.ANCHOR_LEFT,
			[styles.dateRangePickerAnchorRight]: anchor === DateRangePickerAnchor.ANCHOR_RIGHT,
			[styles.dateRangePickerFocused]: focusedInput,
		})}>
			<ReactDatesDateRangePicker
				onDatesChange={onChange}
				customArrowIcon={<span>&mdash;</span>}
				focusedInput={focusedInput}
				{...restProps}
			/>
		</div>
  );
}

type CommonRange = {
	id: string,
	name: string,
	startDate: moment.Moment,
	endDate: moment.Moment,
};
type DateRangePickerProps = {
	startDate: moment.Moment,
	endDate: moment.Moment,
	onChange: (focus: {startDate: moment.Moment, endDate: moment.Moment}) => void,
	focusedInput: DateRangePickerFocusedInput | null,
	onFocusChange: (focus: DateRangePickerFocusedInput | null) => void,
	anchor: InputBoxAnchor,
	commonRanges?: Array<CommonRange>,
	showCommonRangeSubtitles?: boolean,
	onSelectCommonRange?: (dates: {startDate: moment.Moment, endDate: moment.Moment}) => void,
};

// exposed component that renders both the date range picker and
// common range list, and binds them together
const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = ({
	anchor,
	commonRanges,
	showCommonRangeSubtitles,
	onSelectCommonRange,
	startDate,
	endDate,
	onChange,
	focusedInput,
	onFocusChange,
	...restProps
}) => {
  const context = useContext(DateRangePickerContext);

  const commonRangeList = Array.isArray(commonRanges) ? (
    <div className={styles.dateRangePickerCommonRangeList}>
      <InputBox
        type="select"
        width={70 /* px */}
        listBoxWidth={200 /* px */}
        anchor={context === 'SMALL_WIDTH' ? InputBoxAnchor.ANCHOR_RIGHT : anchor}
        value={{
          id: 'icon',
          label: <div style={{ marginTop: 4, marginLeft: -5, marginRight: 3 }}>
            <Icons.Calendar width={22} height={22} color="dark" />
          </div>,
        }}
        choices={commonRanges.map(range => ({
					...range,
          label: <span>{range.name}</span>,
        }))}
        onChange={choice => onSelectCommonRange({
					startDate: choice.startDate,
					endDate: choice.endDate,
				})}
      />
    </div>
  ) : null;

	return (
		<div className={styles.dateRangePickerWrapper}>
			<ReactDateRangePicker 
				anchor={anchor}
				startDate={startDate}
				endDate={endDate}
				onChange={onChange}
				focusedInput={focusedInput}
				onFocusChange={onFocusChange}
				{...restProps}
			/>
			{commonRangeList}
		</div>
	);
}
DateRangePicker.displayName = 'DateRangePicker';
export default DateRangePicker;
