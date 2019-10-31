import React from 'react';
import styles from './styles.scss';

const AppScrollView: React.FC<any> = ({ children, backgroundColor='#FFFFFF' }) => {
  return <div
    className={styles.appScrollView}
    style={{ backgroundColor }}>{children}</div>;
}

AppScrollView.displayName = 'AppScrollView';
export default AppScrollView;
