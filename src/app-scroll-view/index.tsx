import React from 'react';
import styles from './styles.module.scss';

const AppScrollView: React.FC<any> = ({ children, backgroundColor='#FFFFFF' }) => {
  return <div
    className={styles.appScrollView}
    style={{ backgroundColor }}>{children}</div>;
}

AppScrollView.displayName = 'AppScrollView';
export default AppScrollView;
