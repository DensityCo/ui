import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import styles from './styles.module.scss';

export const ToastContext = React.createContext<string | null>(null);

const CONTEXT_CLASSES = {
  MULTILINE: styles.multiline,
};

const Toast: React.FC<any> = ({ type, visible, onDismiss, children }) => {
  const context = useContext(ToastContext);
  return (
    <div className={classnames(
      styles.toast,
      styles[type],
      context && CONTEXT_CLASSES[context],
      {[styles.visible]: visible},
    )}>
      <span className={styles.toastText}>{children}</span>
      <span role="button" className={styles.toastDismiss} onClick={onDismiss}>Dismiss</span>
    </div>
  );
}

Toast.defaultProps = { type: 'default' };
Toast.propTypes = {
  type: propTypes.oneOf(['default', 'error']),
  visible: propTypes.bool,
  onDismiss: propTypes.func,
  children: propTypes.node.isRequired,
};
Toast.displayName = 'Toast';
export default Toast;
