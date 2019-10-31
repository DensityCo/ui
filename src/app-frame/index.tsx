import React from 'react';
import styles from './styles.scss';

export default function AppFrame({ children }: any) {
  return <div className={styles.appFrame}>{children}</div>;
}

AppFrame.displayName = 'AppFrame';
