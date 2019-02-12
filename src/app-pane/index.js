import React from 'react';
import styles from './styles.scss';

export default function AppPane({ children }) {
  return <div className={styles.appPane}>{children}</div>;
}
