import React from 'react';
import styles from './styles.scss';

const AppPane: React.FC<any> = ({ children }) => {
  return <div className={styles.appPane}>{children}</div>;
}

AppPane.displayName = 'AppPane';
export default AppPane;
