import React from 'react';
import classnames from 'classnames';

import { inputStackHeight } from './variables.json';
import styles from './styles.scss';
import propTypes from 'prop-types';

export const InputStackGroup: React.FunctionComponent<{}> = ({children}) => (
  <div className={styles.inputStackGroup}>
    <div>{children}</div>
  </div>
);
InputStackGroup.displayName = 'InputStackGroup';

type InputElementProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputStackItemProps = InputElementProps & {
	invalid?: boolean,
	focused?: boolean,
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
};

export class InputStackItem extends React.Component<InputStackItemProps, {focused: boolean}> {
  state = { focused: false };
	static displayName: string;

  render() {
		const {
			invalid,
			focused,
			onFocus,
			onBlur,
			...propsRest
		} = this.props;

    return <div className={classnames(styles.inputStackItem, {
			[styles.inputStackItemInvalid]: invalid,
			[styles.inputStackItemFocus]: focused,
    })}>
      <input
        {...propsRest}
        onFocus={data => {
          this.setState({focused: true});
          onFocus && onFocus(data);
        }}
        onBlur={data => {
          this.setState({focused: false});
          onBlur && onBlur(data);
        }}
      />
    </div>;
  }
}

InputStackItem.displayName = 'InputStackItem';
