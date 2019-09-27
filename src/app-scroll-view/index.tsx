import React from 'react';
import styles from './styles.scss';

const AppScrollView: React.FunctionComponent<{backgroundColor: string}> = ({
	children,
	backgroundColor='#FFFFFF',
}) => (
  <div
    className={styles.appScrollView}
    style={{ backgroundColor }}
	>{children}</div>
);

AppScrollView.displayName = 'AppScrollView';
export default AppScrollView;
