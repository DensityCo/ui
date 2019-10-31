import React from 'react';
import styles from './styles.scss';

const AppFrame: React.FC<any> = ({ children }) => {
  return <div className={styles.appFrame}>{children}</div>;
}

AppFrame.displayName = 'AppFrame';
export default AppFrame;
