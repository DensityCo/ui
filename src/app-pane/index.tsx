import React from 'react';
import styles from './styles.scss';

const AppPane: React.FunctionComponent<{}> = ({ children }) => (
  <div className={styles.appPane}>
		{children}
	</div>
);
AppPane.displayName = 'AppPane';
export default AppPane;
