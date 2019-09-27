import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import styles from './styles.scss';

export const ToastContext = React.createContext<keyof typeof CONTEXT_CLASSES>(null);

const CONTEXT_CLASSES = {
  MULTILINE: styles.multiline,
};

type ToastProps = {
	type?: 'default' | 'error',
  visible: boolean,
  onDismiss: () => void,
};

const Toast: React.FunctionComponent<ToastProps> = ({ type='default', visible, onDismiss, children }) => {
  const context = useContext(ToastContext);
  return (
    <div className={classnames(
      styles.toast,
      styles[type],
      CONTEXT_CLASSES[context],
      {[styles.visible]: visible},
    )}>
      <span className={styles.toastText}>{children}</span>
      <span role="button" className={styles.toastDismiss} onClick={() => onDismiss()}>Dismiss</span>
    </div>
  );
}
Toast.displayName = 'Toast';
export default Toast;
