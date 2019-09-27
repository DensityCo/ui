import React from 'react';
import styles from './styles.scss';

const AppFrame: React.FunctionComponent<{}> = ({ children }) => (
  <div className={styles.appFrame}>
		{children}
	</div>
);
AppFrame.displayName = 'AppFrame';
export default AppFrame;
