import React from 'react';
import styles from './styles.scss';

export default function AppScrollView({ children, backgroundColor='#FFFFFF' }) {
  return <div
    className={styles.appScrollView}
    style={{ backgroundColor }}>{children}</div>;
}

AppScrollView.displayName = 'AppScrollView';
