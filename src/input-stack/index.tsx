import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';
import propTypes from 'prop-types';

export const InputStackGroup: React.FC<any> = ({children}) => {
  return <div className={styles.inputStackGroup}>
    <div>{children}</div>
  </div>;
}

InputStackGroup.displayName = 'InputStackGroup';
InputStackGroup.propTypes = {
  children: propTypes.node,
};

export class InputStackItem extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {focused: false};
  }
  render() {
    const propsRest = Object.assign({}, this.props) as any;
    delete propsRest.invalid;
    delete propsRest.focused;
    delete propsRest.className;

    return <div className={classnames(
      styles.inputStackItem,
      this.props.invalid ? styles.inputStackItemInvalid : null,
      this.state.focused ? styles.inputStackItemFocus : null,
    )}>
      <input
        {...propsRest}
        onFocus={data => {
          this.setState({focused: true});
          this.props.onFocus && this.props.onFocus(data);
        }}
        onBlur={data => {
          this.setState({focused: false});
          this.props.onBlur && this.props.onBlur(data);
        }}
      />
    </div>;
  }
}

// InputStackItem.displayName = 'InputStackItem';
// InputStackItem.propTypes = {
//   invalid: propTypes.bool,
//   focused: propTypes.bool,
// };
