import React from 'react';
import styles from './styles.module.scss';
import colors from '../../variables/colors.json';

const AppPane: React.FC<{
  backgroundColor?: React.CSSProperties['backgroundColor']
}> = ({
  backgroundColor = colors.white,
  children,
}) => {
  return <div className={styles.appPane} style={{backgroundColor}}>{children}</div>;
}

AppPane.displayName = 'AppPane';
export default AppPane;
